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
      v-model="activeModal"
      title="发起售后"
      width="650"
    >
      <div class="create_service">
        <Form :model="newService" inline :label-width="80">
          <FormItem label="服务区域">
            <Input v-model="newService.regionName"></Input>
          </FormItem>
          <FormItem label="工单编号">
            <Input v-model="newService.orderSn"/>
          </FormItem>
          <FormItem label="师傅名称">
            <Input v-model="newService.serverName"></Input>
          </FormItem>
          <FormItem label="联系手机">
            <Input v-model="newService.userPhone"></Input>
          </FormItem>
          <FormItem label="报修分类">
            <Select v-model="newService.repairCategoryId" style="width:162px;">
              <Option v-for="item in repairLists" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <Button type="primary" style="margin-left: 20px;" @click="searchOrder">搜索</Button>
        </Form>
        <div class="table-wrapper">
          <Table size="small" :columns="orderColumn" :data="orderLists"></Table>
          <div  v-if="orderLists.length>0" class="pagination">
            <Page :total="totalCount" @on-change="pageChange"></Page>
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
        name: "createOrder",
      props:{
        initiateService:Boolean
      },
      data(){
          return{
            newService: {
              regionName:'',
              repairCategoryId:'',
              orderSn:'',
              userPhone:'',
              serverName:'',
              searchTyp:2
            },
            orderIdSearch:false,
            repairLists:[],
            totalCount:0,
            pageNo:1,
            pageSize:5,
            orderLists:[],
            orderColumn:[
              {title:'工单详情',align:'left',render:(h,param)=>{
                  let row = param.row;
                  let string = `工单${row.orderSn}，
                区域：${row.regionName}，
                网点：${row.stationName}，
                状态：${row.orderState}，
                ${row.repairCategoryName}，
                ${row.userPhone}，
                ${row.createTime}`
                  return h('span',string)
                }},
              {title:'操作',align:'center',width:80,render:(h,param)=>{
                  let _this = this;
                  return  h('Button',{
                    props:{
                      type:'text',
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
      computed:{
          activeModal:{
            get:function(){
              return this.initiateService;
            },
            set:function(newValue){
              this.$emit('close','initiateService');
            }
          }
      },
      methods:{
        //点击搜索
        searchOrder() {
          let newService = util.formatterParams(this.newService);
          let query = `pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
          this.$http.post(`/index/search/order?${query}&${newService}`)
            .then(res => {
              if (res.data.code === 0) {
                let data = res.data.data;
                this.totalCount = data.totalCount;
                this.orderLists = data.list;
              }
            })
        },
        pageChange(val){
          this.pageNo=val;
          this.searchOrder();
        }
      },
      mounted(){
          util.getRepairType(data=>{
            this.repairLists=data;
          })
      }
    }
</script>


