<style scoped lang="scss">
  @import "./source.scss";
</style>
<template>
    <Card style="padding-bottom: 30px;">
      <div class="mb-15 clearfix">
        <div class="pull-left">
          <Button @click="$router.back()" >返回上一页</Button>
        </div>
        <div class="pull-right">
          <Button @click="sureIn" type="primary">确认入库</Button>
        </div>
      </div>
      <Form style="margin-right: 100px;" ref="formIn" :model="formIn" :rules="formInRules" :label-width="100">
        <!--<FormItem label="组织名称">-->
          <!--<Select v-model="formIn.organ" class="w300">-->
            <!--<Option v-for="organ in organLists" :key="organ.id" :value="organ.id+'-'+organ.type">{{organ.name}}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <FormItem label="入库类型" prop="inputType">
          <Select v-model="formIn.inputType" class="w300">
            <Option value="PURCHASE">采购</Option>
          </Select>
        </FormItem>
        <FormItem label="原始单号" prop="sn">
          <Input v-model="formIn.sn" class="w400"/>
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
              <th>单位 </th>
              <th>单价 <span class="text-red">*</span></th>
              <th>数量 <span class="text-red">*</span></th>
              <th>入库成本 <span class="text-red">*</span></th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(material,index) in materialCheckedlists" :key="material.id">
                <td>{{material.name}}</td>
                <td>{{material.spec}}</td>
                <td>{{material.unit}}</td>
                <td  style="width:200px;">
                    <InputNumber style="width:80%;" v-model="material.price" :min="1" placeholder="请输入单价"
                                 :precision="2"
                                 @on-change="inputChange(index)"
                    ></InputNumber>
                  <p v-if="material.notValid&&material.notValidType.indexOf('price')>-1" class="text-red">请输入单价</p>
                </td>
                <td style="width:200px;">
                  <Input placeholder="请输入数量" v-model="material.num" style="width:80%;" @on-keydown="inputNumInt($event)" @on-change="inputChange(index)"/>
                  <p  v-if="material.notValid&&material.notValidType.indexOf('num')>-1" class="text-red">请输入数量</p>
                </td>
                <td style="width:200px;">
                    <InputNumber  :precision="2" readonly style="width:80%;" v-model="material.amount"  :min="1" placeholder="请输入入库成本"></InputNumber>
                  <p  v-if="material.notValid&&material.notValidType.indexOf('amount')>-1" class="text-red">请输入成本价</p>
                </td>
                <td>
                  <Button type="text" class="text-red" @click="deleteMaterial(index)">删除</Button>
                </td>
              </tr>

            </tbody>
          </table>
      </div>
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
                <!--bug 3109 保留：或型号-->
                <Input v-model="searchForm.searchKey" placeholder="请输入辅材名称"/>
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
  import util from '../../libs/util';
    export default {
        name: "new-out",
      data(){
          return {
            test:true,
            showModal:false,
            lists:[ ],
            organLists:[], //组织列表
            formIn:{
              // organ:'',
              sn:'',
              inputType:'',
              detailList:'',
            },
            formInRules:{
              inputType:[{required:true,message:'请选择入库类型',trigger:'change'}],
            },
            repairType:[{name:'全部',id:'0'}], //报修分类列表
            searchForm:{
              categoryId:'',
              searchKey:'',
              pageSize:5,
              pageNo:1,
            },
            materialTotal:0, //辅材搜索，列表总条数
            materialLists:[], //辅材列表
            materialCheck:[], //弹窗已选辅材
            materialCheckTemp:[], //弹窗已选辅材
            materialCheckedlists:[],//界面已选辅材


          }
      },
      methods:{
        sureIn(){
            let form = this.formIn;
            let detailList = this.materialCheckedlists;
            let detailValid = true;
            this.materialCheckedlists=detailList.map(item=>{
              item.notValidType=[];
              item.notValid=false;
              if(!item.price){
                detailValid=false;
                item.notValid=true;
                item.notValidType.push('price');
              }
              if(!item.num){
                detailValid=false;
                item.notValid=true;
                item.notValidType.push('num');
              }
              if(!item.amount){
                detailValid=false;
                item.notValid=true;
                item.notValidType.push('amount');
              }
              return item;
            });
            if(!detailValid) return;
            this.$refs['formIn'].validate(valid=>{
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
                this.$http.post(`/repair/material/input/order/add`,{
                  ...form
                }).then(res=>{
                  if(res.data.code===0){
                    this.$Message.success('保存成功');
                    this.$router.push({name:'import'})
                  }else{
                    this.$Message.error(res.data.msg);
                  }
                })
              }
            })

        },
        //获取辅材分类
        getRepairType(){
            this.$http.get(`/repair/category/list`)
              .then(res=>{
                if(res.data.code===0){
                  this.repairType=this.repairType.concat(res.data.data);
                }else{
                  console.log('报修分类获取失败：'+res.data.msg);
                }
              })
        },
        //搜索辅材
        searchMaterial(){
            let searchForm = this.searchForm;
            if(searchForm.categoryId==='0'){
              delete searchForm.categoryId;
            }
            let param =util.formatterParams(searchForm);
          this.$http.post(`/repair/material/selectList?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                let checkedLists = this.materialCheckTemp;
                // 用于标记已选辅材
                /*
                * materialLists:搜索结果列表
                * */
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
                if(!item.price){
                  item.price=null;
                }else{
                  item.price*=1;
                }
                return item;
            });
            this.materialCheckedlists = this.materialCheckedlists.concat(checkTemp);

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
        //弹窗显示状态变化
        modalVisible(visible){
            /*
            *  materialLists:[], //辅材列表
            *    materialCheckedlists  //界面已选辅材
            * */
            if(!visible){
                //显示时，比对已选辅材，并设置disabled
              this.materialCheckTemp=[];
              this.materialLists=[];
              this.materialCheck=this.materialCheckedlists;
              this.searchForm={
                  categoryId:'',
                  searchKey:'',
                  pageSize:5,
                  pageNo:1,
              };
            }else{
              this.searchMaterial();
            }
        },
        //计算入库成本
        inputChange(index){
            this.materialCheckedlists=this.materialCheckedlists.map((item,ind)=>{
              if(index===ind){
                if(item.price&&item.num){
                  item.amount=parseFloat((item.price*item.num).toFixed(2));
                }else{
                  item.amount=null;
                }
              }
              return item;
            });
        },
        inputNumInt(event){
            let key=event.key;
            if(/\D/.test(key)){
              if(key!=='Backspace'){
                event.preventDefault();
              }
            }
        },
        //删除已选辅材
        deleteMaterial(index){
            this.materialCheckedlists.splice(index,1);
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
        }
      },
      mounted(){
          this.getRepairType();
          this.searchMaterial();

      },

    }
</script>


