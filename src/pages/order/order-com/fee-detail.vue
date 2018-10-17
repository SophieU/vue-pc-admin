<template>
<div>
  <div class="card no-border mb-15">
    <div class="card-header">
      <div class="card-title">统计</div>
    </div>
    <div class="card-body">
      <table class="native-table">
        <thead>
        <tr>
          <th>工单金额</th>
          <th>实收金额</th>
          <th>支付方式</th>
          <th>支付单号</th>
          <th>支付时间</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>90.00</td>
          <td>90.00</td>
          <td>微信</td>
          <td>2923279373</td>
          <td>2018/08/28  20:39:40</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="card no-border">
    <div class="card-header">
      <div class="card-title">明细</div>
    </div>
    <div class="card-body">
      <table class="native-table">
        <thead>
        <tr>
          <th>类别</th>
          <th>项目</th>
          <th>数量</th>
          <th>单价</th>
          <th>小计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>上门费</td>
          <td>上门费</td>
          <td>1</td>
          <td>20.00</td>
          <td>20.00</td>
        </tr>
        <tr>
          <td>服务费</td>
          <td>软管检查</td>
          <td>1</td>
          <td>20.00</td>
          <td>20.00</td>
        </tr>
        <tr>
          <td>辅材费</td>
          <td>软管，PVC</td>
          <td>1</td>
          <td>20.00</td>
          <td>20.00</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "fee-detail"
    }
</script>

<style scoped>

</style>
