<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="选择小区：">
              <Select style="width: 150px;">
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="资源名称：">
              <Input readonly placeholder="树形结构" />
            </FormItem>
            <FormItem label="业主手机号：">
              <Input />
            </FormItem>
            <FormItem label="业主姓名：">
              <Input />
            </FormItem>
            <FormItem label="退费时间：">
              <DatePicker type="daterange"></DatePicker>
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
        <div class="table-wrapper">
          <table class="grey-head-table">
            <thead>
            <tr>
              <th><Checkbox></Checkbox></th>
              <th>小区名称</th>
              <th>资源名称</th>
              <th>业主手机号	</th>
              <th>业主姓名</th>
              <th>应收金额</th>
              <th>滞纳金</th>
              <th>抵扣金额</th>
              <th>折扣优惠</th>
              <th>实收金额	</th>
              <th>退费金额</th>
              <th>操作员</th>
              <th>退费备注</th>
              <th>退费时间</th>
              <th>退费到账时间</th>
              <th>退费方式</th>
            </tr>
            </thead>
            <tbody>
            <tr></tr>
            </tbody>
            <tfoot>
            <tr>
              <td class="totalTd" colspan="16">
                <span>总计:</span>
                <span>应收金额：</span>
                <span>实收金额：</span>
                <span>退费金额：</span>
              </td>
            </tr>
            </tfoot>
          </table>
          <div class="pagination">
            <Page :total="40" show-elevator show-sizer></Page>
          </div>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "pay-settting"
    }
</script>

<style scoped>

</style>
