<template>
  <div>
    <Card class="mb-15">
      <div class="filter-form">
        <Form inline :label-width="100">
          <FormItem label="选择小区：">
            <Select style="width: 200px;">
              <Option value="">力宝小区</Option>
            </Select>
          </FormItem>
          <FormItem label="资源名称：">
            <Input placeholder="树形结构" readonly/>
          </FormItem>
          <FormItem label="开票状态：">
            <Select  style="width: 150px;">
              <Option value="">全部</Option>
              <Option value="">已开票</Option>
              <Option value="">未开票</Option>
              <Option value="">已核销</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式：">
            <Select style="width: 150px;">
              <Option value="">全部</Option>
              <Option value="">支付宝</Option>
              <Option value="">微信</Option>
              <Option value="">现金</Option>
              <Option value="">Pos机</Option>
            </Select>
          </FormItem>
          <FormItem label="支付渠道：">
            <Select style="width: 100px;">
              <Option value="">线上</Option>
              <Option value="">线下</Option>
            </Select>
          </FormItem>
          <FormItem label="缴费时间：">
            <DatePicker style="width: 200px;" type="daterange" placeholer="请选择时间范围"></DatePicker>
          </FormItem>
          <FormItem label="票据编号：">
            <Input />
          </FormItem>
          <Button type="primary">搜索</Button>
          <Button>重置</Button>
        </Form>
      </div>
    </Card>
    <Card>
      <div class="clearfix mb-15">
        <div class="pull-right">
          <Button type="primary">导出</Button>
        </div>
      </div>
      <Table :columns="column"></Table>
      <div class="pagination">
        <Page :total="40" show-sizer show-elevator></Page>
      </div>
    </Card>
  </div>
</template>

<script>
    export default {
        name: "bill-total",
      data(){
          return{
            column:[
              {title:'缴费时间'}, {title:'小区名称'},  {title:'资源名称'},
              {title:'业主手机号'},{title:'业主姓名'},{title:'实收金额'},
              {title:'支付方式'},{title:'支付渠道'},{title:'开票状态'},{title:'票据单号'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
