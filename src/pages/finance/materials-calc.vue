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
        <FormItem label="创建时间">
          <DatePicker type="daterange" style="width:100%;"></DatePicker>
        </FormItem>
        <FormItem label="服务网点">
          <Select>
            <Option value="">网点1</Option>
          </Select>
        </FormItem>
        <FormItem label="入库类型">
          <Select>
            <Option value="">研1</Option>
          </Select>
        </FormItem>
        <FormItem label="原始单号">
          <Input search enter-button/>
        </FormItem>

      </Form>
    </Drawer>
  </Card>
</template>

<script>
    export default {
        name: "materials-calc",
      data(){
        return{
          filter:false,
          proColumns:[
            {title:'采购数',key:'name',align:'center'},
            {title:'采购成本',key:'name',align:'center'},
            {title:'退货数',key:'name',align:'center'},
            {title:'退货成本',key:'name',align:'center'},
            {title:'结余',key:'name',align:'center'},
          ],
          proLists:[],
          repairColumns:[
            {title:'报修类型',key:'name',align:'center'},
            {title:'采购数',key:'name',align:'center'},
            {title:'采购成本',key:'name',align:'center'},
            {title:'退货数',key:'name',align:'center'},
            {title:'退货成本',key:'name',align:'center'},
            {title:'结余',key:'name',align:'center'},
          ],
          repairLists:[],
          detailColumn:[
            {title:'材料名称',key:'name',align:'center'},
            {title:'报修类型',key:'name',align:'center'},
            {title:'日期',key:'name',align:'center'},
            {title:'单号',key:'name',align:'center'},
            {title:'单号类型',key:'name',align:'center'},
            {title:'服务网点',key:'name',align:'center'},
            {title:'数量',key:'name',align:'center'},
            {title:'成本',key:'name',align:'center'},
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
