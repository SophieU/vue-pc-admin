<template>
  <div>
    <table class="native-table mb-15">
      <thead>
      <tr>
        <th>历史订单总数</th>
        <th>本月订单总数</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>300</td>
        <td>300</td>
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
<!--筛选-->
    <Drawer width="425" title="收益筛选" v-model="filter">
      <div class="clearfix mb-15">
        <Button>清空筛选条件</Button>
        <Button>确定</Button>
      </div>
      <Form label-position="top">
        <FormItem label="服务类型">
          <Select>
            <Option value="">分类1</Option>
            <Option value="">分类1</Option>
          </Select>
        </FormItem>
        <FormItem label="工单时间">
          <DatePicker type="daterange" style="width: 100%;"></DatePicker>
        </FormItem>
        <FormItem label="工单状态">
          <CheckboxGroup >
            <Checkbox label="待分配"></Checkbox>
            <Checkbox label="待上门"></Checkbox>
            <Checkbox label="已上门"></Checkbox>
            <Checkbox label="待付款"></Checkbox>
            <Checkbox label="待服务"></Checkbox>
            <Checkbox label="已完成"></Checkbox>
            <Checkbox label="售后中"></Checkbox>
            <Checkbox label="已取消"></Checkbox>
            <Checkbox label="已关闭"></Checkbox>
            <Checkbox label="异常"></Checkbox>
          </CheckboxGroup >
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>

<script>
    export default {
        name: "staff-order-info",
      data(){
          return{
            filter:false,
            columns:[
              {title:'工单号',key:'id',align:'center'},
              {title:'报修类型',key:'id',align:'center'},
              {title:'创建时间',key:'id',align:'center'},
              {title:'工单状态',key:'id',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                  return h('Button',{
                    props:{
                      type:'text'
                    }
                  },'查看订单')
                }},
            ],
            lists:[{}]
          }
      }
    }
</script>

<style scoped>

</style>
