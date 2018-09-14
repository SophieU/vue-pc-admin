<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="选择小区：">
              <Select>
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="统计时间：">
              <DatePicker type="date"></DatePicker>
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
        <table class="grey-head-table" >
          <thead>
          <tr>
            <th>统计时间</th>
            <th>科目名称</th>
            <th>退款金额</th>
            <th>税率</th>
            <th>滞纳金</th>
            <th>现金</th>
            <th>现金减退款</th>
            <th>抵扣</th>
            <th>POS</th>
            <th>支付宝</th>
            <th>微信</th>
            <th>实收总计</th>
            <th>总计减税额</th>
            <th>总计减退款</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colspan="14">暂无数据</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td class="totalTd" colspan="14">
              <span>总计（共0条）</span>
              <span>退款金额：</span>
              <span>滞纳金：</span>
              <span>现金：</span>
              <span>现金减退款：</span>
              <span>抵扣：</span>
              <span>POS：</span>
              <span>支付宝：</span>
              <span>微信：</span>
              <span>实收总计：</span>
              <span>总计减退款：</span>
            </td>
          </tr>

          </tfoot>
        </table>
      </Card>

    </div>
</template>

<script>
    export default {
        name: "subject-total"
    }
</script>

<style scoped>

</style>
