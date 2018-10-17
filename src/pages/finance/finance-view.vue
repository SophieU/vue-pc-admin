<template>
    <Card>
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button>本月</Button>
          <Button>前三月</Button>
          <Button @click="filter=true">筛选</Button>
        </div>
        <div class="pull-right">
          <Button type="primary">excel导出</Button>
        </div>
      </div>
      <div>
        <div class="table-wrapper mb-15">
          <Table :columns="proColumns" :data="proLists"></Table>
        </div>
        <div class="table-wrapper mb-15">
          <Table :columns="repairColumns" :data="repairLists"></Table>
        </div>
        <div class="table-wrapper">
          <h4 class="mb-15">明细</h4>
          <Table :columns="detailColumn" :data="detailLists"></Table>
        </div>
      </div>

      <!--筛选-->
      <Drawer title="工单筛选" v-model="filter" width="425">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form label-position="top">
          <FormItem label="报修类型">
            <Select>
              <Option value="">研1</Option>
            </Select>
          </FormItem>
          <FormItem label="服务人员">
            <Input search enter-button/>
          </FormItem>
          <FormItem label="服务网点">
            <Select>
              <Option value="">网点1</Option>
            </Select>
          </FormItem>
          <FormItem label="时间">
            <DatePicker type="daterange" style="width:100%;"></DatePicker>
          </FormItem>
        </Form>
      </Drawer>
    </Card>
</template>

<script>
    export default {
        name: "finance-view",
      data(){
          return{
            filter:false,
            proColumns:[
              {title:'项目名称',key:'name',align:'center'},
              {title:'工单总数',key:'name',align:'center'},
              {title:'工单收入',key:'name',align:'center'},
              {title:'员工结算',key:'name',align:'center'},
              {title:'平台佣金',key:'name',align:'center'},
              {title:'服务收益',key:'name',align:'center'},
            ],
            proLists:[],
            repairColumns:[
              {title:'报修类型',key:'name',align:'center'},
              {title:'工单总数',key:'name',align:'center'},
              {title:'工单收入',key:'name',align:'center'},
              {title:'员工结算',key:'name',align:'center'},
              {title:'平台佣金',key:'name',align:'center'},
              {title:'服务收益',key:'name',align:'center'},
            ],
            repairLists:[],
            detailColumn:[
              {title:'创建日期',key:'name',align:'center'},
              {title:'工单单号',key:'name',align:'center'},
              {title:'支付方式',key:'name',align:'center'},
              {title:'交易号',key:'name',align:'center'},
              {title:'报修类型',key:'name',align:'center'},
              {title:'服务网点',key:'name',align:'center'},
              {title:'工单状态',key:'name',align:'center'},
              {title:'工单金额',key:'name',align:'center'},
              {title:'师傅姓名',key:'name',align:'center'},
              {title:'师傅提成',key:'name',align:'center'},
              {title:'平台佣金比',key:'name',align:'center'},
              {title:'平台佣金',key:'name',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                 let _this = this;
                 return h('Button',{
                   props:{
                     type:'text'
                   }
                 },'查看订单')
                }},
            ],
            detailLists:[],
          }
      }
    }
</script>

<style scoped>

</style>
