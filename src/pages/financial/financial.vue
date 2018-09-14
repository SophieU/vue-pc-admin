<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="选择小区:">
              <Select>
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="资源名称：">
              <Input placeholder="树形结构" />
            </FormItem>
            <FormItem label="是否已对账：">
              <Select>
                <Option value="">全部</Option>
                <Option value="">是</Option>
                <Option value="">否</Option>
              </Select>
            </FormItem>
            <FormItem label="支付方式：">
              <Select>
                <Option value="">全部</Option>
                <Option value="">支付宝</Option>
                <Option value="">微信</Option>
                <Option value="">现金</Option>
                <Option value="">Pos机</Option>
              </Select>
            </FormItem>
            <FormItem label="收费时间：">
              <DatePicker type="daterange" placeholder="请选择时间范围"></DatePicker>
            </FormItem>
            <FormItem label="支付渠道：">
              <Select>
                <Option value="">全部</Option>
                <Option value="">线上</Option>
                <Option value="">线下</Option>
              </Select>
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
        <table class="grey-head-table">
          <thead>
          <tr>
            <th>流水号</th>
            <th>缴费时间</th>
            <th>小区名称</th>
            <th>资源名称</th>
            <th>应收金额</th>
            <th>抵扣金额</th>
            <th>折扣优惠</th>
            <th>实收金额</th>
            <th>支付方式</th>
            <th>支付渠道</th>
            <th>是否已对账</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td class="totalTd" colspan="11">
              <span>总计：</span>
              <span>应收金额：</span>
              <span>实收金额：</span>
            </td>
          </tr>
          </tfoot>
        </table>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "financial-reconciliation",
      data(){
          return{
            columns:[
              {title:'流水'}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
