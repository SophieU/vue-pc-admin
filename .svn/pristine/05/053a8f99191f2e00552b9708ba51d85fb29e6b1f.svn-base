<template>
    <Card>
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button @click="newOut" type="primary">新建出库</Button>
          <Button @click="filter=true">筛选</Button>
        </div>
        <div class="pull-right">
          <Button type="primary">excel导出</Button>
        </div>
      </div>

      <div class="table-wrapper">
        <Table :columns="columns" :data="lists"></Table>

      </div>
      <Drawer title="出库筛选" width="425" v-model="filter">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <div>
          <i-form label-position="top">
            <form-item label="创建时间">
              <DatePicker type="daterange" style="width: 100%;"></DatePicker>
            </form-item>
            <form-item label="服务网点">
              <Select>
                <Option value="">网点1</Option>
              </Select>
            </form-item>
            <form-item label="出库类型">
              <Select>
                <Option value="">类型1</Option>
              </Select>
            </form-item>
            <form-item label="原始单号">
              <Input />
            </form-item>
          </i-form>
        </div>
      </Drawer>
    </Card>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "out-admin",
      data(){
          return {
            filter:false,
            totalCount:0,
            pageNo:1,
            pageSize:10,
            columns:[
              {title:'组织名称',key:'departmentName',align:'center'},
              {title:'单号',key:'orderSn',align:'center'},
              {title:'创建时间',key:'createTime',align:'center'},
              {title:'出库类别',key:'outputType',align:'center'},
              {title:'操作人',key:'creator',align:'center'},
              {title:'出库成本',key:'cost',align:'center'},
              {title:'操作',align:'amount',render:(h,params)=>{
                let _this = this;
                return h('Button',{
                  props:{type:'primary',size:'small'},
                  on:{
                    click(){
                      _this.$router.push({name:'outDetail'})
                    }
                  }
                },'查看')
                }},
            ],
            lists:[],
            filterForm:{
              dateRange:[],
              startTime:'',
              endTime:'',
              departmentId:'',
              departmentType:'',
              outputType:'',
              sn:'',
            }
          }
      },
      methods:{
          newOut(){
            this.$router.push({name:'newOut'})
          },
        getLists(filter){
            let pageNo =this.pageNo;
            let pageSize = this.pageSize;
            let params=`pageNo=${pageNo}&pageSize=${pageSize}`;
            if(filter){
              params=params+util.formatterParams(filter);
            }
            this.$http.post(`/repair/material/output/order/list?${params}`)
              .then(res=>{
                if(res.data.code===0){
                  let data=res.data.data;
                  this.lists= data.lists;
                  this.totalCount=data.totalCount;
                  this.pageSize=data.pageSize;
                }
              })
        },
        //获取下拉组织
        getOrgan(){
          this.$http.get(`/repair/material/input/order/departmentList`)
            .then(res=>{
              if(res.data.code===0){
                this.organLists=res.data.data;
              }
            })
        }
      },
      mounted(){
          this.getLists();
      }
    }
</script>

<style scoped>

</style>
