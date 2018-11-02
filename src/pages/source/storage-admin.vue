<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" @click="$router.push({name:'materials'})">新增辅材分类</Button>
            <Button @click="filter=true">筛选</Button>
          </div>
          <div class="pull-right">
            <Button @click="downloadExcel" type="primary">excel导出</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :columns="columns" :data="storageLists"></Table>
          <div class="pagination">
            <Page :total="totalCount" show-sizer show-elevator
              @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"
            ></Page>
          </div>
        </div>
        <!--筛选-->
        <Drawer width="425" title="辅材筛选" v-model="filter">
          <div class="clearfix mb-15">
            <div class="pull-left">
              <Button @click="clearFilter">清空筛选条件</Button>
            </div>
            <div class="pull-right">
              <Button @click="sureFilter" type="primary">确定</Button>
            </div>
          </div>
          <div>
            <Form :model="filterForm" label-position="top">
              <FormItem label="组织名称">
                <Select v-model="filterForm.departmentId">
                  <Option :key="index" v-for="(item,index) in organLists" :value="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="报修类型">
                <Select v-model="filterForm.repairCategoryId">
                  <Option :key="index" v-for="(item,index) in repairLists" :value="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="名称">
                <Input v-model="filterForm.materialName" />
              </FormItem>
            </Form>
          </div>
        </Drawer>
      </Card>
    </div>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "storage-admin",
      data(){
          return{
            filter:false,
            columns:[
              {title:'组织名称',key:'departmentName',align:'center'},
              {title:'名称',key:'materialName',align:'center'},
              {title:'报修分类',key:'repairCategoryName',align:'center'},
              {title:'型号',key:'materialSpec',align:'center'},
              {title:'单位',key:'materialUnit',align:'center'},
              {title:'当前库存',key:'storage',align:'center'},
            ],
            storageLists:[],
            pageNo:1,
            pageSize:10,
            totalCount:0,
            filterForm:{
              repairCategoryId:'',
              materialName:'',
              departmentId:'',
            },
            organLists:[],
            repairLists:[],
          }
      },
      methods:{
        downloadExcel(){
          let param = util.formatterParams(this.filterForm);
          this.$http.post(`/repair/material/storage/list/export?${param}`,null,{responseType:'blob'})
            .then(res=>{
              let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
              let downloadElement = document.createElement('a');
              let href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = '库存列表.xlsx'; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
            })
        },
          /*getOrgan(){
            this.$http.get(`/repair/material/storage/departmentList`)
              .then(res=>{
                if(res.data.code===0){
                  this.organLists=res.data.data;
                }
              })
          },*/
        getRepairType(){
            this.$http.get(`/repair/category/list`)
              .then(res=>{
                if(res.data.code===0){
                  this.repairLists=res.data.data;
                }
              })
        },
          getLists(filter){
            let param = `pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
            if(filter){
              param=param+'&'+util.formatterParams(filter);
            }
            this.$http.post(`/repair/material/storage/list?${param}`)
              .then(res=>{
                  if(res.data.code===0){
                    let data = res.data.data;
                    this.storageLists=data.list;
                    this.pageSize=data.pageSize;
                    this.totalCount=data.totalCount;
                    this.filter=false;
                  }else{
                    console.log('辅材库存管理列表获取失败：'+res.data.msg);
                  }
              })
          },
          pageChange(val){
              this.pageNo=val;
              this.getLists();
          },
          pageSizeChange(val){
              this.pageSize=val;
              this.getLists();
          },
        //筛选
        sureFilter(){
          let filterForm = this.filterForm;
          this.getLists(filterForm);
        },
        clearFilter(){
          this.filterForm={
            repairCategoryId:'',
            materialName:'',
            departmentId:'',
          };
          this.filter=false;
        }
      },
      mounted(){
          this.getLists();
          // this.getOrgan();
        util.getDepartment(data=>{
          this.organLists=data;
        });
          this.getRepairType();
      }
    }
</script>

<style scoped>

</style>
