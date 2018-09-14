<template>
<div>
  <Card>
    <div class="filter-form">
      <Form inline :label-width="100">
        <FormItem label="房屋编号：">
          <Input />
        </FormItem>
        <FormItem label="业主手机号：">
          <Input />
        </FormItem>
        <FormItem label="业主姓名：">
          <Input />
        </FormItem>
        <FormItem label="报修类型：">
          <Select style="width:147px;">
            <Option value="">全部</Option>
            <Option value="">类目</Option>
          </Select>
        </FormItem>
        <FormItem label="报单状态：">
          <Select style="width:147px;">
            <Option value="">全部</Option>
            <Option value="">类目</Option>
          </Select>
        </FormItem>
        <FormItem label="报单编号：">
          <Input />
        </FormItem>
        <FormItem label="预约时间：">
          <DatePicker style="width:200px;" type="daterange"></DatePicker>
        </FormItem>
          <Button type="primary">搜索</Button>
      </Form>
    </div>

  </Card>
  <Card class="mt-15">
    <Table :columns="columns" :data="orderLists"></Table>
    <div class="pagination">
      <Page :total="40" show-sizer show-elevator></Page>
    </div>
  </Card>
</div>
</template>

<script>
    export default {
        name: "order",
        data(){
            return {
              columns:[
                {title:"报单编号",key:""},
                {title:"预约时间",key:""},
                {title:"房屋编号",key:""},
                {title:"业主手机号",key:""},
                {title:"业主姓名",key:""},
                {title:"下单时间",key:""},
                {title:"报修类型",key:""},
                {title:"报单状态",key:""},
                {title:"操作",key:""},
              ],
              orderLists:[],
            }
        }
    }
</script>

<style scoped>

</style>
