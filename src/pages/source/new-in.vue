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
          <Button :loading="loadingSave" @click="sureIn" type="primary">确认入库</Button>
        </div>
      </div>
      <i-form style="margin-right: 100px;" ref="formIn" :model="formIn" :rules="formInRules" :label-width="100">
        <!--<FormItem label="组织名称">-->
          <!--<Select v-model="formIn.organ" class="w300">-->
            <!--<Option v-for="organ in organLists" :key="organ.id" :value="organ.id+'-'+organ.type">{{organ.name}}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <form-item label="入库类型" prop="inputType">
          <Select v-model="formIn.inputType" class="w300">
            <Option value="PURCHASE">采购</Option>
          </Select>
        </form-item>
        <form-item label="原始单号" prop="sn">
          <Input v-model="formIn.sn" class="w400"/>
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
                    <InputNumber style="width:80%;" v-model="material.price" :min="0" placeholder="请输入单价"
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
                    <InputNumber  :precision="2" readonly style="width:80%;" v-model="material.amount"  :min="0" placeholder="请输入入库成本"></InputNumber>
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
      <CheckModal :alreadyExist="materialCheckedlists" :showModal="showModal" @close="showModal=false" @checkSubmit="checkSubmit"></CheckModal>
    </Card>
</template>

<script>
  import CheckModal from './component/choose-material';

    export default {
        name: "new-out",
      components:{
        CheckModal
      },
      data(){
          return {
            loadingSave:false,
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
            materialTotal:0, //辅材搜索，列表总条数
            materialCheckedlists:[],//界面已选辅材

          }
      },
      methods:{
        sureIn(){
          this.loadingSave=true;
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
            if(!detailValid){
              this.loadingSave=false;
              return;
            }
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
                  this.loadingSave=false;
                })
              }else{
                this.loadingSave=false;
              }
            })

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
        //确定弹窗
        checkSubmit(lists){
          // let checkLists = this.materialCheckTemp;
          this.showModal=false;
          this.materialCheckedlists = this.materialCheckedlists.concat(lists);
        },

      },
    }
</script>


