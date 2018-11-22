<style scoped lang="scss">
  @import './home-components.scss';
  .search-td{
    white-space:normal;
    text-align:left;
    padding: 4px 10px;
  }
</style>
<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="activeModal"
      title="取消工单"
      width="700"
      @on-visible-change="modalChange"
    >
      <div class="new_order_wrapper">
        <i-form :model="cancelOrder" :label-width="80" inline>
          <form-item label="服务区域">
            <Input v-model="cancelOrder.regionName" ></Input>
          </form-item>
          <form-item label="联系手机">
            <Input v-model="cancelOrder.userPhone"></Input>
          </form-item>
          <form-item label="工单编号">
            <Input v-model="cancelOrder.orderSn" />
          </form-item>
          <form-item label="报修分类">
            <Select :clearable="true" v-model="cancelOrder.repairCategoryId" style="width:162px;">
              <Option :key="item.id" v-for="item in repairLists" :value="item.id">{{item.name}}</Option>
            </Select>
          </form-item>
          <Button type="primary" @click="searchOrder">搜索</Button>
        </i-form>
        <div class="table-wrapper">
          <Table size="small" :columns="orderColumn" :data="orderLists"></Table>
          <div  v-if="orderLists.length>0" class="pagination">
            <Page :current.sync="pageNo" :page-size="5" :total="totalCount" @on-change="pageChange"></Page>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="activeModal=false">关闭</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import util from '../../../libs/util'
    export default {
        name: "cancelOrder",
      data(){
          return{
             cancelOrder: {
               regionName:'',
               repairCategoryId:'',
               orderSn:'',
               userPhone:'',
               searchType:1
            },
            orderIdSearch:false, //服务区域搜索状态标识
            repairLists:[],
            totalCount:0,
            pageNo:1,
            pageSize:5,
            orderLists:[],
            orderColumn:[
              {title:'工单详情',align:'left',render:(h,param)=>{
                let row = param.row;
                let string = `工单${row.orderSn}，
                ${row.regionName}，
               ${row.stationName}，
                ${row.repairCategoryName}，
                ${row.orderState}，
                ${row.userPhone}，
                ${row.createTime}`;
                  return h('span',string)
                }},
              {title:'操作',align:'center',width:80,render:(h,param)=>{
                let _this = this;
                return  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    on:{
                        click:()=>{
                          let id = param.row.id;
                          let state=param.row.orderState;
                          let isWarranty = param.row.isInWarrantyPeriod;
                          _this.$router.push({name:'orderControl',query:{id:id,state:state,isWarranty:isWarranty}})
                        }
                    }
                  },'查看')
                }}
            ]
          }
      },
      props:{
        cancelModal:Boolean
      },
      computed:{
          activeModal:{
            get:function(){
              return this.cancelModal;
            },
            set:function(newValue){
              this.$emit('close','cancelModal');
            }
          }
      },
      methods:{
          //点击搜索
        searchOrder(page){
          let pageNo = page.pageNo?page.pageNo:1;
          let cancelForm = util.formatterParams(this.cancelOrder);
          let query =`pageNo=${pageNo}&pageSize=${this.pageSize}`;

          this.$http.post(`/index/search/order?${query}&${cancelForm}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.totalCount=data.totalCount;
                this.orderLists=data.list;
                this.pageNo=data.pageNo;
              }
            })
        },
        //选中搜索值
        sureSearch(prop,val){
          this.cancelOrder[prop] = val;
          this[prop+'Search']=false;
        },
        pageChange(val){
          this.pageNo=val;
          this.searchOrder({pageNo:val});
        },
        modalChange(visible){
          if(!visible){
           this.cancelOrder= {
              regionName:'',
                repairCategoryId:'',
                orderSn:'',
                userPhone:'',
                searchType:1
            }
            this.orderLists=[]
          }
        }
      },
      mounted(){
        util.getRepairType(data=>{
          this.repairLists=data;
        })
      }
    }
</script>

