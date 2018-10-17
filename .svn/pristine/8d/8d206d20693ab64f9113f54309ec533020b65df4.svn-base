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
        name: "income-detail",
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
            {title:'工单收入',key:'name',align:'center'},
            {title:'员工结算',key:'name',align:'center'},
            {title:'平台佣金',key:'name',align:'center'},
            {title:'辅料成本',key:'name',align:'center'},
            {title:'辅料亏损',key:'name',align:'center'},
            {title:'服务收益',key:'name',align:'center'},
          ],
          repairLists:[],
          detailColumn:[
            {title:'报修类型',key:'name',align:'center'},
            {title:'服务网点',key:'name',align:'center'},
            {title:'工单收入',key:'name',align:'center'},
            {title:'员工结算',key:'name',align:'center'},
            {title:'平台佣金',key:'name',align:'center'},
            {title:'辅料成本',key:'name',align:'center'},
            {title:'辅料亏损',key:'name',align:'center'},
            {title:'服务收益',key:'name',align:'center'},
          ],
          detailLists:[],
        }
      }
    }
</script>

<style scoped>

</style>
