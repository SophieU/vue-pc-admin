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
      <Form :model="filterForm" refs="filterForm">
        <FormItem label="报修类型">
          <Select v-model="filterForm.repairCategoryId">
            <Option v-for="item in repairLists" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="工单编号">
          <Input v-model="filterForm.orderSn" />
        </FormItem>

        <FormItem label="服务人员">
          <Input v-model="filterForm.serviceUserName"/>
        </FormItem>
        <FormItem label="联系电话">
          <Input v-model="filterForm.userPhone" :number="true"
                 :maxlength="11"
                 @on-blur="validateTel(filterForm.userPhone)"
          />
          <span v-if="!telValid" class="text-red">请输入正确格式的手机号</span>
        </FormItem>
        <FormItem label="工单状态">
          <div style="clear:both;">
            <CheckboxGroup v-model="filterForm.orderState">
              <Checkbox v-if="item.state" v-for="item in orderNav" :label="item.state" :key="item.state">{{item.title}}</Checkbox>
              <!--<Checkbox label="待上门"></Checkbox>-->
              <!--<Checkbox label="已上门"></Checkbox>-->
              <!--<Checkbox label="待付款"></Checkbox>-->
              <!--<Checkbox label="待服务"></Checkbox>-->
              <!--<Checkbox label="已完成"></Checkbox>-->
              <!--<Checkbox label="售后中"></Checkbox>-->
              <!--<Checkbox label="已取消"></Checkbox>-->
              <!--<Checkbox label="已关闭"></Checkbox>-->
              <!--<Checkbox label="异常"></Checkbox>-->
            </CheckboxGroup>
          </div>

        </FormItem>
        <FormItem label="是否上传证据">
          <i-switch v-model="filterForm.hasEvidence" true-value="Y" false-value="N">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否有回访记录">
          <i-switch v-model="filterForm.hasReturnVisit" true-value="Y" false-value="N">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="质保中">
          <i-switch v-model="filterForm.isWarranty" true-value="Y" false-value="N">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="售后记录">
          <i-switch v-model="filterForm.afterSaleRecord" true-value="Y" false-value="N">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="渠道来源">
          <Select v-model="filterForm.orderSource">
            <Option value="APP">APP</Option>
            <Option value="CALL_CENTER">呼叫中心</Option>
            <Option value="STATION">服务网点</Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间">
          <DatePicker @on-change="filterDateChange" v-model="filterForm.dateRange" type="daterange" style="width:100%;"></DatePicker>
        </FormItem>
      </Form>
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
              {title:'质保中',key:'qualityAssurance',align:'center',width:100},
              {title:'售后记录',key:'afterSaleRecord',align:'center',width:100},
              {title:'创建日期',key:'createTime',sortable:true,align:'center',minWidth:150},
              {title:'操作',fixed:'right',align:'center',width:150,render:(h,params)=>{
                let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
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
                        type:'text',
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
        },
        //获取工单列表
        getLists(filter){
          let query = `pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
          let param =util.formatterParams(filter);


          this.$http.post(`/repair/order/list?${query}&${param}`).then(res=>{
            if(res.data.code===0){
              let data= res.data.data;
              this.lists=data.list;
              this.pageSize=data.pageSize;
              this.totalCount=data.totalCount;
              this.filter=false;
            }else{
              console.log('工单列表获取失败：'+res.data.msg);
            }
          })

        },
        //筛选
        filterDateChange(val){
          this.filterForm.createTimeStart=val[0];
          this.filterForm.createTimeEnd=val[1];
        },
        clearFilter(){
          this.filterForm={};
          this.filter=false;
          this.inFilter=false;
          this.getLists();
        },
        sureFilter(){
          let filterForm = {...this.filterForm};
          delete filterForm.dateRange;
          this.inFilter=true;
          this.getLists(filterForm);
        },
        pageChange(val){
          this.pageNo=val;
          let currentTab = this.currentTab;
          let param = {orderState:currentTab};
          if(this.inFilter){
            delete this.filterForm.dateRange;
            param=Object.assign({},param,this.filterForm);
          }


          this.getLists(param);
        },
        pageSizeChange(val){
          this.pageSize=val;
          let currentTab = this.currentTab;
          let param = {orderState:currentTab};
          if(this.inFilter){
            delete this.filterForm.dateRange;
            param=Object.assign({},param,this.filterForm);
          }
          this.getLists(param);
        },
        //不同状态的数值
        getStateCount(){
          this.$http.get(`/repair/order/state/count`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                let total=0;
                this.orderNav=this.orderNav.map(item=>{
                  for(let i=0;i<data.length;i++){
                    let state = data[i].state;
                    if(item.state===state){
                      let num = parseInt(data[i].countNum);
                      item.count=num;
                      total+=num;
                    }

                  }
                  return item;
                });
                this.orderNav[0].count=total;
              }else{
                console.log('/repair/order/state/count:'+res.data.msg);
              }
            })
        }
      },
      mounted(){
          this.getLists({orderState:''});
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
          this.getLists({orderState:newVal});
        }
      }
    }
</script>

<style scoped>

</style>
