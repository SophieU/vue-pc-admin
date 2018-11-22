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

      <i-form ref="outForm" :model="outputForm" :rules="outputFormRule" :label-width="100" style="margin-right:200px;">
        <form-item label="出库类型" prop="outputType">
          <Select v-model="outputForm.outputType" class="w300">
            <Option value="REFUND">退货</Option>
          </Select>
        </form-item>
        <form-item label="原始单号">
          <Input v-model="outputForm.sn" class="w400"/>
        </form-item>
        <form-item label="辅材">
          <Button @click="showModal=true">添加辅材</Button>
        </form-item>
      </i-form>
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
              <InputNumber @on-change="numChange(material.num,index)" style="width:80%;" v-model="material.num" :step="1" :min="0" placeholder="请输入数量"></InputNumber>
              <p v-if="material.notValid&&material.notValidType.indexOf('num')>-1" class="text-red">请输入数量</p>
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
      <CheckModal :hasInput="true" :alreadyExist="materialCheckedlists" :showModal="showModal" @close="showModal=false" @checkSubmit="checkSubmit"></CheckModal>
    </Card>
</template>

<script>
  import util from '../../libs/util'
  import CheckModal from './component/choose-material';

    export default {
        name: "new-out",
      components:{
        CheckModal
      },
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
            repairType:[],//报修分类列表
            materialCheckedlists:[],
            materialLists:[], //辅材列表
          }
      },
      methods:{
        deleteMater(ind){
          this.materialCheckedlists.splice(ind,1);
        },
        //搜索辅材
        searchMaterial(){
          let param =util.formatterParams(this.searchForm);
          this.$http.post(`/repair/material/category/selectList?&hasInput=Y&${param}`)
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
        //确定弹窗
        checkSubmit(lists){
          // let checkLists = this.materialCheckTemp;
          this.showModal=false;
          this.materialCheckedlists = this.materialCheckedlists.concat(lists);
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
    }
</script>


