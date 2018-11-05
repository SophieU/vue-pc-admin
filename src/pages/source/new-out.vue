<style scoped lang="scss">
  @import "./source.scss";
</style>
<template>
    <Card style="padding-bottom:30px;">
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button @click="$router.back()">返回上一页</Button>
        </div>
        <div class="pull-right">
          <Button :loading="loadingSave" @click="sureOut" type="primary">确定出库</Button>
        </div>
      </div>

      <Form ref="outForm" :model="outputForm" :rules="outputFormRule" :label-width="100" style="margin-right:200px;">
        <FormItem label="出库类型" prop="outputType">
          <Select v-model="outputForm.outputType" class="w300">
            <Option value="REFUND">退货</Option>
          </Select>
        </FormItem>
        <FormItem label="原始单号">
          <Input v-model="outputForm.sn" class="w400"/>
        </FormItem>
        <FormItem label="辅材">
          <Button @click="showModal=true">添加辅材</Button>
        </FormItem>
      </Form>
      <div class="table-wrapper">
        <table class="native-table">
          <thead>
          <tr>
            <th>辅材名称</th>
            <th>型号</th>
            <th>单位</th>
            <th>单价</th>
            <th>数量  <span class="text-red">*</span></th>
            <th>出库成本</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(material,index) in materialCheckedlists" :key="index">
            <td>{{material.name}}</td>
            <td>{{material.spec}}</td>
            <td>{{material.unit}}</td>
            <td>{{material.price}}</td>
            <td style="width:200px">
              <InputNumber @on-change="numChange(material.num,index)" style="width:80%;" v-model="material.num" :step="1" :min="1" placeholder="请输入数量"></InputNumber>
              <p v-if="material.notValid&&material.notValidType.indexOf('num')>-1" class="text-red">请输入单价</p>
            </td>
            <td>{{material.amount}}</td>
            <td>
              <Button @click="deleteMater(index)" type="text" class="text-red">删除</Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--辅材弹窗-->
      <!--辅材弹窗-->
      <Modal title="选择辅材" v-model="showModal" width="650" @on-visible-change="modalVisible">
        <div>
          <div class="mb-15">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70">
              <FormItem label="辅材类别">
                <Select style="width:160px ;" v-model="searchForm.categoryId">
                  <Option v-for="repair in repairType" :value="repair.id" :key="repair.id">{{repair.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="关键字">
                <Input v-model="searchForm.searchKey" placeholder="请输入辅材名称或型号"/>
              </FormItem>
              <Button @click="searchMaterial" type="primary">搜索</Button>
            </Form>
          </div>
          <div class="table-wrapper">
            <table class="native-table">
              <thead>
              <tr>
                <th>辅材名称</th>
                <th>型号</th>
                <th>单位</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(material,index) in materialLists" :key="material.id">
                <td>{{material.name}}</td>
                <td>{{material.spec}}</td>
                <td>{{material.unit}}</td>
                <td>
                  <!--<Button type="text" class="text-blue">选择</Button>-->
                  <Checkbox :disabled="material.disabled" v-model="material.checked" @on-change="checkChange" :true-value="1+'-'+index" :false-value="0+'-'+index">选择</Checkbox>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="pagination">
              <Page @on-change="materialPageChange" size="small" :total="materialTotal" ></Page>
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button @click="showModal=false">关闭</Button>
          <Button type="primary" @click="sureMaterial">确认</Button>
        </div>
      </Modal>

    </Card>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "new-out",
      data(){
          return {
            sureAdd:false, //添加辅材，loading控制
            loadingSave:false,
            showModal:false,
            outputForm:{
              sn:'',
              outputType:'',
            },
            outputFormRule:{
              outputType:[{required:true,message:'请选择出库类型',trigger:'change'}]
            },
            searchForm:{
              categoryId:'',
              searchKey:'',
              pageSize:5,
              pageNo:1,
            },
            repairType:[],//报修分类列表
            materialCheckedlists:[ ],
            materialTotal:0, //辅材搜索，列表总条数
            materialLists:[], //辅材列表
            materialCheck:[], //弹窗已选辅材
            materialCheckTemp:[], //弹窗已选辅材
          }
      },
      methods:{
        deleteMater(ind){
          this.materialCheckedlists.splice(ind,1);
        },
        //弹窗显示状态变化
        modalVisible(visible){
          /*
          *  materialLists:[], //辅材列表
          *    materialCheckedlists  //界面已选辅材
          * */
          if(!visible){
            this.materialCheckTemp=[];
            this.materialLists=[];
            this.materialCheck=this.materialCheckedlists;
            this. searchForm={
              categoryId:'',
              searchKey:'',
              pageSize:5,
              pageNo:1,
            };
          }
        },
        //辅材分页切换
        materialPageChange(val){
          this.searchForm.pageSIze=val;
          this.searchMaterial();
        },
        //确定弹窗
        sureMaterial(){
          let checkLists = this.materialCheckTemp;
          this.showModal=false;
          let checkTemp = checkLists.map(item=>{
            item.num=null;
            item.amount=null;


            return item;
          });
          this.materialCheckedlists = this.materialCheckedlists.concat(checkTemp);

        },
        //搜索辅材
        searchMaterial(){
          let param =util.formatterParams(this.searchForm);
          this.$http.post(`/repair/material/selectList?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                let checkedLists = this.materialCheckTemp;
                // 用于标记已选辅材
                this.materialLists = data.list.map((item,index)=>{
                  checkedLists.forEach(checkItem=>{
                    if(item.id===checkItem.id){
                      item.checked='1-'+index;
                    }
                  });
                  if(!item.checked){
                    item.checked='0-'+index;
                  }
                  return item;
                });
                // 禁用已选项
                let hasChecked = this.materialCheck;
                let lists = this.materialLists;
                this.materialLists=this.compareChoosed(hasChecked,lists);

                //设置页码
                this.materialTotal = data.totalCount
              }else{
                console.log('辅材搜索失败：'+res.data.msg)
              }
            })
        },
        //数量输入改变
        numChange(val,index){
          this.materialCheckedlists=this.materialCheckedlists.map((item,ind)=>{
            if(index===ind&&item.num>0){
              item.amount=(item.price*item.num).toFixed(2)
            }
            return item;
          });
        },
        //获取辅材分类
        getRepairType(){
          this.$http.get(`/repair/category/list`)
            .then(res=>{
              if(res.data.code===0){
                this.repairType=res.data.data;
              }else{
                console.log('报修分类获取失败：'+res.data.msg);
              }
            })
        },
        //弹窗选择辅材交互
        checkChange(val){
          /**
           * 辅材选择切换：val构成： boolean-index
           */
          let materialLists = this.materialLists;
          val = val.split('-');
          let checked = val[0];
          let index = parseInt(val[1]);
          if(checked==='1'){
            this.materialCheckTemp.push(materialLists[index])
          }else{
            this.materialCheckTemp.map((item,ind)=>{
              if(item.id===materialLists[index].id){
                this.materialCheckTemp.splice(ind,1);
              }
            });
          }

        },
        /*用于比对已选辅材*/
        compareChoosed(hasCheck,lists){
          lists=lists.map(item=>{
            hasCheck.forEach(check=>{
              if(item.id===check.id){
                item.disabled=true;
              }
            });
            if(!item.disabled){
              item.disabled=false;
            }
            return item;
          });
          return lists;
        },
        sureOut(){
          this.loadingSave=true;
          let form = this.outputForm;
          let detailList = this.materialCheckedlists;
          let detailValid = true;
          this.materialCheckedlists=detailList.map(item=>{
            item.notValidType=[];
            item.notValid=false;
            if(!item.num){
              detailValid=false;
              item.notValid=true;
              item.notValidType.push('num');
            }
            return item;
          });
          if(!detailValid){
            this.loadingSave=false;
            return;
          }
          this.$refs['outForm'].validate(valid=>{
            if(valid){
              form.detailList=detailList.map(item=>{
                let data = {
                  materialId:item.id,
                  price:item.price,
                  amount:item.amount,
                  num:item.num
                };
                return data;
              });
              this.$http.post(`/repair/material/output/order/add`,{
                ...form
              }).then(res=>{
                this.loadingSave=false;
                if(res.data.code===0){
                  this.$Message.success('保存成功');
                  this.$router.push({name:'output'})
                }else{
                  this.$Message.error(res.data.msg);
                }
              })
            }else{
              this.loadingSave=false;
            }
          })
        }
      },
      mounted(){
          this.getRepairType();
          this.searchMaterial();
      }
    }
</script>


