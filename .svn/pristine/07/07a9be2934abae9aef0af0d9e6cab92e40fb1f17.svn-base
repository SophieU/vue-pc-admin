<template>
  <div>
    <table class="native-table mb-15">
      <thead>
      <tr>
        <th>历史工单总数</th>
        <th>历史收益总计</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>300</td>
        <td>300.00</td>
      </tr>
      </tbody>
    </table>
     <table class="native-table mb-15">
      <thead>
      <tr>
        <th>本月工单总数</th>
        <th>本月收益总计</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>300</td>
        <td>300.00</td>
      </tr>
      </tbody>
    </table>
    <div class="clearfix mb-15">
      <div class="pull-left">
        <span>时间：2018/08/01-2018/08/31</span>
      </div>
      <div class="pull-right">
        <Button @click="filter=true">筛选</Button>
        <Button type="primary">excel导出</Button>
      </div>
    </div>
    <div class="table-wrapper">
      <Table :columns="columns" :data="lists"></Table>
    </div>
    <Drawer width="425" title="收益筛选" v-model="filter">
      <div class="clearfix mb-15">
        <Button>清空筛选条件</Button>
        <Button>确定</Button>
      </div>
      <Form label-position="top">
        <FormItem label="服务分类">
          <Select>
            <Option value="">分类1</Option>
            <Option value="">分类1</Option>
          </Select>
        </FormItem>
        <FormItem label="工单时间">
          <DatePicker type="daterange" style="width: 100%;"></DatePicker>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>

<script>
    export default {
        name: "staff-order-income",
      data(){
          return{
            filter:false,
            columns:[
              {title:'工单号',key:'id',align:'center'},
              {title:'服务类型',key:'id',align:'center'},
              {title:'创建时间',key:'id',align:'center'},
              {title:'上门费收益',key:'id',align:'center'},
              {title:'服务费收益',key:'id',align:'center'},
              {title:'辅材费收益',key:'id',align:'center'},
              {title:'收益总计',key:'id',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                  return h('Button',{
                    props:{
                      type:'text'
                    }
                  },'查看订单')

                }},
            ],
            lists:[
              {}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
