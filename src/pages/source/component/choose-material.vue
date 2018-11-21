<template>
  <Modal :closable="false" :mask-closable="false" title="选择辅材" v-model="showModal" width="650" @on-visible-change="modalVisible">
    <div>
      <div class="mb-15">
        <i-form ref="searchForm" :model="searchForm" inline :label-width="70">
          <form-item label="辅材类别">
            <Select style="width:160px ;" v-model="searchForm.categoryId">
              <Option v-for="repair in repairType" :value="repair.id" :key="repair.id">{{repair.name}}</Option>
            </Select>
          </form-item>
          <form-item label="关键字">
            <!--bug 3109 保留：或型号-->
            <Input v-model="searchForm.searchKey" placeholder="请输入辅材名称"/>
          </form-item>
          <Button @click="searchMaterial" type="primary">搜索</Button>
        </i-form>
      </div>
      <div class="table-wrapper">
        <table class="native-table">
          <thead>
          <tr>
            <th>辅材名称</th>
            <th>型号</th>
            <th>单位</th>
            <th>
              <Checkbox
                :indeterminate="indeterminate"
                v-model="checkAll"
                @click.prevent.native="toggleCheckAll"
              >全选</Checkbox>
            </th>
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
          <Page :current.sync="searchForm.pageNo" @on-change="materialPageChange" size="small" :total="materialTotal" :page-size="5"></Page>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button @click="$emit('close')">关闭</Button>
      <Button type="primary" @click="sureMaterial">确认</Button>
    </div>
  </Modal>
</template>

<script>
  import util from '../../../libs/util'
    export default {
        name: "choose-material",
      props:['showModal','alreadyExist','hasInput'],
      data(){
          return {
            indeterminate:false,
            checkAll:false,
            repairType:[{name:'全部',id:'0'}], //报修分类列表
            searchForm:{
              categoryId:'',
              searchKey:'',
              pageSize:5,
              pageNo:1,
            },
            materialLists:[],
            materialTotal:0, //辅材搜索，列表总条数
            materialCheck:[], //弹窗已选辅材，最终选择项
            materialCheckTemp:[], //弹窗已选辅材
            materialCheckedlists:[],//界面已选辅材
          }
      },

      methods:{
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
          //全选
        toggleCheckAll(){
          //样式控制
          if(this.indeterminate){
            this.checkAll=false;
          }else{
            this.checkAll=!this.checkAll;
          }
          this.indeterminate=false;
          //逻辑控制
          if(this.checkAll){
            this.materialLists.map((item,index)=>{
              item.checked='1-'+index;
              this.materialCheckTemp.push(item);
            });
          }else{
            this.materialLists.map((item,index)=>{
              item.checked='0-'+index;
              this.materialCheckTemp=this.materialCheckTemp.filter((temp,index)=>{
                let checkTempStr = JSON.stringify(this.materialLists);
                if(checkTempStr.indexOf(temp.id)<=-1){
                  return true;
                }
              });
            })
          }
        },
        //搜索辅材
        searchMaterial(){
          let searchForm = this.searchForm;
          if(searchForm.categoryId==='0'){
            delete searchForm.categoryId;
          }
          let param =util.formatterParams(searchForm);
          if(this.hasInput){
            param+='&hasInput=Y'
          }
          this.$http.post(`/repair/material/category/selectList?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                // 应对已经选择，然后又点了搜索的情况
                let checkedLists = this.materialCheckTemp;
                // 用于标记已选辅材
                //materialLists:搜索结果列表
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
               // let hasChecked = this.materialCheck;
                let lists = this.materialLists;
                this.materialLists=this.compareChoosed(this.alreadyExist,lists);

                //设置页码
                this.materialTotal = data.totalCount;

              }else{
                console.log('辅材搜索失败：'+res.data.msg)
              }
            })
        },
        //弹窗显示状态变化
        modalVisible(visible){
          /*
          *  materialLists:[], //辅材列表
          *    materialCheckedlists  //界面已选辅材
          * */
          if(!visible){
            //显示时，比对已选辅材，并设置disabled
            this.checkAll=false;
            this.indeterminate=false;
            this.materialCheckTemp=[];
            this.materialLists=[];
           // this.materialCheck=this.alreadyExist;
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
        //弹窗选择辅材交互
        checkChange(val){
          /**
           * 辅材选择切换：val构成： boolean-index
           */
          let materialLists = this.materialLists;
          val = val.split('-');
          let checked = val[0];
          let index = parseInt(val[1]);
          this.indeterminate=true;
          this.checkAll=false;
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
        //确定弹窗
        sureMaterial(){
          let checkLists = this.materialCheckTemp;
          let alreadyCheck = JSON.stringify(this.alreadyExist);

          //排除已选
          checkLists=checkLists.filter(item=>{
            let id =item.id;
            if(alreadyCheck.indexOf(id)<=-1){
              return true;
            }
          });
          //input number 初始值设置
          let lists = checkLists.map(item=>{
            item.num=null;
            item.amount=null;
            if(!item.price){
              item.price=null;
            }else{
              item.price*=1;
            }
            return item;
          });

          this.$emit('checkSubmit',lists)

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
        //辅材分页切换
        materialPageChange(val){
          this.searchForm.pageNo=val;
          this.indeterminate=false;
          this.checkAll=false;
          this.searchMaterial();
        },
      },
      mounted(){
          this.getRepairType();
          this.searchMaterial();
      },
      watch:{
          showModal(val){
            this.materialCheckTemp=JSON.parse(JSON.stringify(this.alreadyExist));
          }
      }
    }
</script>

<style scoped>

</style>
