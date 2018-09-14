<style scoped lang="scss">
  @import './statistical.scss';
</style>
<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="80">
            <FormItem label="选择小区：">
              <Select style="width: 200px;">
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="起止时间：">
              <DatePicker style="width: 250px;" type="daterange"></DatePicker>
            </FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </Form>
        </div>
      </Card>
      <Card>
        <h4 slot="title">力保物业（状元府）</h4>
        <div class="repair-statistical">
          <div class="data-row">
            <div class="data-block" style="color: #808695;">
              <h3>0</h3>
              <p>收到工单</p>
            </div>
            <div class="data-block" style="color: #19be6b;">
              <h3 >0</h3>
              <p>已受理</p>
            </div>
            <div style="color:#2d8cf0;" class="data-block">
              <h3>0</h3>
              <p>已完成</p>
            </div>
            <div class="data-block" style="color: #ff9900">
              <h3>0</h3>
              <p>已取消</p>
            </div>
          </div>
          <div class="data-row2" >
            <div class="total-info">
              <img src="../../assets/ico/icon-time.png" alt="">
              <span>平均受理时间：0 分钟</span>
            </div>
            <div class="total-info">
              <img src="../../assets/ico/icon-satisfaction.png" alt="">
              <span>客户满意度：100%</span>
            </div>
            <div class="total-info">
              <img src="../../assets/ico/icon-satisfaction.png" alt="">
              <span>已累计完成工单0起</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "repair-statistical"
    }
</script>


