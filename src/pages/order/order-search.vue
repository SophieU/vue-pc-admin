
<template>
  <Card>
    <ul  class="tab-nav mb-15">
      <li @click="toggleTab(ind)" :class="nav.check?'nav-active':''" v-for="(nav,ind) in orderNav" :key="nav.title">
        <Badge  :count="nav.count" :overflow-count="99">
          <span class="nav-title">{{nav.title}}</span>
        </Badge>
      </li>
    </ul>
    <div class="tab-content">
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button type="primary" @click="showModal=true">新建</Button>
          <Button @click="filter=true">筛选</Button>
        </div>
        <div class="pull-right">
          <Button type="primary" @click="downloadExcel">excel导出</Button>
        </div>
      </div>

      <div class="tabler-wrapper">
        <Table :columns="columns" :data="lists"></Table>
        <div class="pagination">
          <Page :total="totalCount" show-sizer show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
          ></Page>
        </div>
      </div>
    </div>
    <!--新建-->
    <create-order :createOrder="showModal" @close="closeModal"></create-order>
    <!--筛选-->
    <Drawer width="425" title="工单筛选"  v-model="filter" @on-close="clearFilter">
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button @click="clearFilter">清空筛选条件</Button>
        </div>
        <div class="pull-right">
          <Button @click="sureFilter" type="primary">确定筛选</Button>
        </div>
      </div>
      <i-form :model="filterForm" refs="filterForm">
        <form-item label="报修类型">
          <Select v-model="filterForm.repairCategoryId">
            <Option v-for="item in repairLists" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </form-item>
        <form-item label="工单编号">
          <Input v-model="filterForm.orderSn" />
        </form-item>

        <form-item label="服务人员">
          <Input v-model="filterForm.serviceUserName"/>
        </form-item>
        <form-item label="联系电话">
          <Input v-model="filterForm.userPhone" :number="true"
                 :maxlength="11"
                 @on-blur="validateTel(filterForm.userPhone)"
          />
          <span v-if="!telValid" class="text-red">请输入正确格式的手机号</span>
        </form-item>
        <form-item label="工单状态">
          <div style="clear:both;">
            <CheckboxGroup v-model="filterForm.orderStateList">
              <Checkbox v-if="item.state" v-for="item in orderNav" :label="item.state" :key="item.state">{{item.title}}</Checkbox>
            </CheckboxGroup>
          </div>

        </form-item>
        <form-item label="是否上传证据">
          <i-switch v-model="filterForm.hasEvidence" true-value="Y" false-value="">
            <span slot="open">是</span>
          </i-switch>
        </form-item>
        <form-item label="是否有回访记录">
          <i-switch v-model="filterForm.hasReturnVisit" true-value="Y" false-value="">
            <span slot="open">是</span>
          </i-switch>
        </form-item>
        <form-item label="质保中">
          <i-switch v-model="filterForm.isWarranty" true-value="Y" false-value="">
            <span slot="open">是</span>
          </i-switch>
        </form-item>
        <form-item label="售后记录">
          <i-switch v-model="filterForm.afterSaleRecord" true-value="Y" false-value="">
            <span slot="open">是</span>
          </i-switch>
        </form-item>
        <form-item label="渠道来源">
          <Select v-model="filterForm.orderSource">
            <Option value="APP">APP</Option>
            <Option value="CALL_CENTER">呼叫中心</Option>
            <Option value="STATION">服务网点</Option>
          </Select>
        </form-item>
        <form-item label="创建时间">
          <DatePicker @on-change="filterDateChange" v-model="filterForm.dateRange" type="daterange" style="width:100%;"></DatePicker>
        </form-item>
      </i-form>
    </Drawer>
  </Card>
</template>

<script>
  import util from '../../libs/util'
  import createOrder from '../home/component/createOrder';
    export default {
        name: "order-search",
      components:{
        createOrder
      },
      computed:{
          downLink(){
            let baseUrl = localStorage.getItem('baseURL');
            return baseUrl+'/repair/order/list/export';
          }
      },
      data(){
          return {
            telValid:true, //fitlerForm中验证手机号
            showModal:false,
            filter:false,
            currentTab:'',
            orderNav:[
              {title:'所有工单',state:'',count:0,check:true},
              {title:'待分配',state:'ASSIGNED',count:0},
              {title:'待上门',state:'WAIT_DOOR',count:0},
              {title:'已上门',state:'WAITING_DOOR',count:0},
              {title:'待付款',state:'STAY_PAY',count:0},
              {title:'待服务',state:'WAIT_SERVICE',count:0},
              {title:'已完成',state:'FINISH',count:0},
              {title:'售后中',state:'AFTER_SALE',count:0},
              {title:'已取消',state:'CANCEL',count:0},
              {title:'已关闭',state:'CLOSED',count:0},
              {title:'异常',state:'EXCEPTION',count:0},
            ],
            columns:[
              {title:'工单编号',key:'orderSn',align:'center',minWidth:200},
              {title:'客户手机',key:'userPhone',align:'center',width:120},
              {title:'报修类型',key:'repairCategoryName',align:'center',width:100},
              {title:'服务网点',key:'stationName',align:'center',width:100},
              {title:'接单师傅',key:'receiveUserName',align:'center',width:100},
              {title:'工单状态',key:'orderState',align:'center',width:100},
              {title:'证据',key:'hasEvidence',align:'center',width:100},
              {title:'回访记录',key:'hasReturnVisit',align:'center',width:100},
              {title:'质保中',key:'isWarranty',align:'center',width:100},
              {title:'售后中',key:'isAfterSale',align:'center',width:100},
              {title:'售后记录',key:'afterSaleRecord',align:'center',width:100},
              {title:'创建日期',key:'createTime',sortable:true,align:'center',minWidth:150},
              {title:'操作',fixed:'right',align:'center',width:150,render:(h,params)=>{
                let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      },
                      style:{marginRight:'8px'},
                      on:{
                        click(){
                          let id= params.row.id;
                          sessionStorage.setItem('viewOrderId',id);
                          _this.$router.push({name:'orderDetail',query:{id:id}});
                        }
                      }
                    },'查看'),
                    h('Button',{
                      props:{
                        type:'success',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                          let id = params.row.id;
                          let state=params.row.orderState;
                          let isWarranty = params.row.isInWarrantyPeriod;
                          sessionStorage.setItem('viewOrderId',id);
                          _this.$router.push({name:'orderControl',query:{id:id,state:state,isWarranty:isWarranty}})
                        }
                      }
                    },'处理订单'),
                  ])
                }},
            ],
            lists:[],
            filterForm:{},
            inFilter:false, //标记正在筛选中
            pageNo:1,
            pageSize:10,
            totalCount:0,
            repairLists:[]
          }
      },
      methods:{
        validateTel(val){
          let telReg = /^1[3456789]\d{9}/;
          if(!telReg.test(val)){
            this.telValid=false;
          }else{
            this.telValid=true;
          }
          // 为空
          if(!val){
            this.telValid=true;
          }
        },
        downloadExcel(){
          let filterForm = {...this.filterForm};
          delete filterForm.dateRange;
          this.$http.post(`/repair/order/list/export`,{
            ...filterForm
          },{responseType:'blob'})
            .then(res=>{
              util.downloadExcel(res);
            })

        },
        toggleTab(ind){
          let arr = this.orderNav.map((item,index)=>{
            if(index===ind){
              item.check=true;
              this.currentTab=item.state;
            }else{
              item.check=false;
            }
            return item;
          });

          this.orderNav=arr;
        },
        closeModal(param){
          this.showModal=false;
          this.getLists()
        },
        //获取工单列表
        getLists(){
          let param = {
            pageNo:this.pageNo,
            pageSize:this.pageSize,
          };
          let state = this.currentTab;
          let filter=null;
          if(state){
            param.orderStateList=[state];
          }

          if(this.inFilter){
            filter = {...this.filterForm};
            delete filter.dateRange;
            param=Object.assign({},param,filter);
          }

          this.$http.post(`/repair/order/list`,{...param}).then(res=>{
            if(res.data.code===0){
              let data= res.data.data;
              this.lists=data.list;
              this.pageSize=data.pageSize;
              this.totalCount=data.totalCount;
              if(!param.orderStateList){
                this.orderNav[0].count=data.totalCount;
              }
            }else{
              console.log('工单列表获取失败：'+res.data.msg);
            }
            this.filter=false;
          })

        },
        //筛选
        filterDateChange(val){
          this.filterForm.createTimeStart=val[0];
          this.filterForm.createTimeEnd=val[1];
        },
        clearFilter(){
          this.filterForm={
            hasEvidence:'',
            hasReturnVisit:'',
            isWarranty:'',
            afterSaleRecord:''
          };
          this.filter=false;
          this.inFilter=false;
          this.getLists();
        },
        sureFilter(){
          let filterForm = {...this.filterForm};
          delete filterForm.dateRange;
          this.inFilter=true;
          this.getLists();
        },
        pageChange(val){
          this.pageNo=val;
          this.getLists();
        },
        pageSizeChange(val){
          this.pageSize=val;
          this.getLists();
        },
        //不同状态的数值
        getStateCount(){
          this.$http.get(`/repair/order/state/count`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.orderNav=this.orderNav.map(item=>{
                  for(let i=0;i<data.length;i++){
                    let state = data[i].state;
                    if(item.state===state){
                      let num = parseInt(data[i].countNum);
                      item.count=num;
                    }

                  }
                  return item;
                });

              }else{
                console.log('/repair/order/state/count:'+res.data.msg);
              }
            })
        }
      },
      mounted(){
          this.getLists();
          this.getStateCount();
          util.getRepairType(data=>{
            this.repairLists=data;
          })
      },
      watch:{
        currentTab(newVal){
          this.pageNo=1;
          this.pageSize=10;
          this.totalCount=0;
          this.inFilter=false;
          this.getLists();
        }
      }
    }
</script>

<style scoped lang="scss">

</style>
