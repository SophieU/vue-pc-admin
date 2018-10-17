
<style scoped lang="scss">
  @import "../order";
</style>
<template>
  <div>
    <div class="card no-border mb-15">
      <div class="card-header">
        <div class="card-title">回访信息1</div>
      </div>
      <div class="card-body">
        <table class="native-table mb-15">
          <thead>
          <tr>
            <th>回访日期</th>
            <th>回访人</th>
            <th>结果</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>2018/08/20  20:00</td>
            <td>admin</td>
            <td>通过</td>
          </tr>
          </tbody>
        </table>

        <div class="visite-remarks">
          <div class="visite-item">
            <div>
              <span class="label">满意度：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span>这是备注</span>
            </div>
          </div>
          <div class="visite-item">
            <div>
              <span class="label">材料更换：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span >这是备注</span>
            </div>
          </div>
          <div class="visite-item">
            <div>
              <span class="label">取消订单：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span >这是备注</span>
            </div>
          </div>
          <div class="visite-item">
            <div>
              <span class="label">私自收费：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span >这是备注</span>
            </div>
          </div>
          <div class="visite-item">
            <div>
              <span class="label">关闭订单：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span >这是备注</span>
            </div>
          </div>
          <div class="visite-item">
            <div>
              <span class="label">其他：</span>
              <span>5</span>
            </div>
            <div class="text-grey">
              <span class="label">备注：</span>
              <span >这是备注</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "visited-info"
    }
</script>

