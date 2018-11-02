<template>
  <Card>
    <div class="clearfix mb-15">
      <div class="pull-left">
        <Button @click="viewType='month'" :type="viewType==='month'?'primary':'default'">本月</Button>
        <Button @click="viewType='three'" :type="viewType==='three'?'primary':'default'">前三月</Button>
        <Button @click="filter=true">筛选</Button>
      </div>
      <div class="pull-right">
        <Button @click="exportExcel" type="primary">excel导出</Button>
      </div>
    </div>
    <div>
      <div class="table-wrapper mb-15">
        <table class="native-table">
          <thead>
          <tr>
            <th>采购数</th>
            <th>采购成本</th>
            <th>退货数</th>
            <th>退货成本</th>
            <th>结余</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{earningCount.inputNum}}</td>
            <td>{{earningCount.inputAmount}}</td>
            <td>{{earningCount.outputNum}}</td>
            <td>{{earningCount.outputAmount}}</td>
            <td>{{earningCount.earning}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrapper mb-15">
        <Table :columns="repairColumns" :data="categoryEarningCountList"></Table>
      </div>
      <div class="table-wrapper">
        <h4 class="mb-15">明细</h4>
        <Table :columns="detailColumn" :data="detailLists"></Table>
        <div class="pagination">
          <Page :total="totalCount" show-elevator show-sizer
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
          ></Page>
        </div>
      </div>
    </div>

    <!--筛选-->
    <Drawer title="工单筛选" v-model="filter" width="450" @on-close="clearFilter('filterForm')">
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button @click="clearFilter('filterForm')">清空筛选条件</Button>
        </div>
        <div class="pull-right">
          <Button @click="sureFilter" type="primary">确定</Button>
        </div>
      </div>
      <Form ref="filterForm" :model="filterForm" label-position="top">
        <FormItem label="报修类型" prop="repairCategoryId">
          <Select v-model="filterForm.repairCategoryId">
            <Option v-for="item in repairLists" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="材料名称" prop="name">
          <Input v-model="filterForm.materialName" />
        </FormItem>
        <FormItem label="服务网点" prop="departmentId">
          <Select v-model="filterForm.departmentId">
            <Option v-for="item in stationLists" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="时间" prop="dateRange">
          <DatePicker @on-change="filterDateChange" v-model="filterForm.dateRange" type="daterange" style="width:100%;"></DatePicker>
        </FormItem>

      </Form>
    </Drawer>
  </Card>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "materials-calc",
      data(){
        return{
          viewType:'month', // month,three
          filter:false,
          repairColumns:[
            {title:'报修类型',key:'name',align:'center'},
            {title:'采购数',key:'inputNum',align:'center'},
            {title:'采购成本',key:'inputAmount',align:'center'},
            {title:'退货数',key:'outputNum',align:'center'},
            {title:'退货成本',key:'outputAmount',align:'center'},
            {title:'结余',key:'earning',align:'center'},
          ],
          detailColumn:[
            {title:'材料名称',key:'materialName',align:'center'},
            {title:'报修类型',key:'repairCategoryName',align:'center'},
            {title:'日期',key:'createTime',align:'center'},
            {title:'单号',key:'sn',align:'center'},
            {title:'单号类型',key:'changeType',align:'center'},
            {title:'服务网点',key:'departmentName',align:'center'},
            {title:'数量',key:'num',align:'center'},
            {title:'成本',key:'amount',align:'center'},
            {title:'操作',align:'center',render:(h,params)=>{
                let _this = this;
                return h('Button',{
                  props:{
                    type:'text',
                    size:'small'
                  },
                  on:{
                    click:()=>{
                      let id = params.row.id;
                      // INPUT-入库，OUTPUT-出库
                      let type = params.row.type;
                      if(type==='INPUT'){
                        this.$router.push({name:'inDetail',params:{id:id}})
                      }else if(type==='OUTPUT'){
                        this.$router.push({name:'outDetail',params:{id:id}})
                      }
                    }
                  }
                },'查看订单')
              }},
          ],
          repairLists:[], //下拉报修分类
          stationLists:[], //下拉网点列表
          detailLists:[],
          earningCount:{}, //统计总数
          categoryEarningCountList:[],
          pageNo:1,
          pageSize:10,
          totalCount:0,
          filterForm:{
            repairCategoryId:'',
            departmentId:'',
            dateRange:[],
            materialName:'',
          }
        }
      },
      methods:{
        getTotal(filter){
          let param = {
            timeType:1,
          };
          if(this.viewType==='month'){
            param.timeScope=1
          }else if(this.viewType==='three'){
            param.timeScope=2
          }
          if(filter){
            param={...filter};
            if(filter.startDate&&filter.endDate){
              param.timeType=2;
              delete param.timeScope;
            }
          }
        param = util.formatterParams(param);
          this.$http.post(`/material/earning/count?${param}`).then(res=>{
            if(res.data.code===0){
              let data = res.data.data;
              this.earningCount=data.earningCount;
              this.categoryEarningCountList=data.categoryEarningCountList;
              if(filter&&filter.startDate){
                this.viewType='';
              }
            }else{
              console.log('辅材核算统计失败：'+res.data.msg);
            }
          })
        },
        getDetailLists(filter){
          let query = `pageSize=${this.pageSize}&pageNo=${this.pageNo}`;
          let param = {
            timeType:1,
          };
          if(this.viewType==='month'){
            param.timeScope=1
          }else if(this.viewType==='three'){
            param.timeScope=2
          }
          if(filter){
            param={...filter};
            if(filter.startDate&&filter.endDate){
              param.timeType=2;
              this.viewType='';
              delete param.timeScope;
            }
          }
          param = util.formatterParams(param);
          this.$http.post(`/material/earning/list?${query}&${param}`).then(res=>{
            if(res.data.code===0){
              let data= res.data.data;
              this.detailLists=data.list;
              this.pageSize=data.pageSize;
              this.totalCount=data.totalCount;
              this.filter=false;
            }else{
              console.log('辅材核算明细列表失败：'+res.data.msg);
            }
          })
        },
        pageChange(val){
          this.pageNo=val;
          this.getDetailLists();
        },
        pageSizeChange(val){
          this.pageSize=val;
          this.getDetailLists();
        },
        filterDateChange(val){
          this.filterForm.startDate=val[0];
          this.filterForm.endDate=val[1];
        },
        clearFilter(name){
          this.$refs[name].resetFields();
          this.filter=false;
          this.viewType='month';
          this.getDetailLists();
          this.getTotal();
        },
        sureFilter(){
          let filterForm = {...this.filterForm};
          delete filterForm.dateRange;
          this.getDetailLists(filterForm);
          this.getTotal(filterForm);
        },
        exportExcel(){
          let filter = {...this.filterForm};
          let param = {
            timeType:1,
          };
          if(this.viewType==='month'){
            param.timeScope=1
          }else if(this.viewType==='three'){
            param.timeScope=2
          }
          for(let key in filter){
            if(filter[key].length>0||filter[key]>0){
              param[key]=filter[key];
            }
            if(param.startDate&&param.endDate){
              param.timeType=2;
              delete param.timeScope;
              delete param.dateRange;
            }
          }
          let query=util.formatterParams(param);

          this.$http.post(`/material/earning/export?${query}`,null,{responseType:'blob'})
            .then(res=>{
             util.downloadExcel(res);
            })
        }
      },
      mounted(){
          util.getRepairType(data=>{
            this.repairLists=data;
          });
          util.getStationLists(data=>{
            this.stationLists=data;
          });

          this.getTotal();
          this.getDetailLists();
      },
      watch:{
        viewType(newVal){
          if(newVal){
            this.getDetailLists();
            this.getTotal();
          }
        }
      }
    }
</script>

<style scoped>

</style>
