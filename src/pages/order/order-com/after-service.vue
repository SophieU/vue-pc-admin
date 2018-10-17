<template>
  <div>
    <div class="card no-border mb-15">
      <div class="card-header">
        <div class="card-title">质保信息</div>
      </div>
      <div class="card-body">
        <table class="native-table">
          <thead>
          <tr>
            <th>生效日期</th>
            <th>项目类型</th>
            <th>项目名称</th>
            <th>失效日期</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>2018/08/23  20:00</td>
            <td>辅料</td>
            <td>软管，PVC25</td>
            <td>2018/08/28  20:39:40</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card no-border">
      <div class="card-header">
        <div class="card-title">售后记录</div>
      </div>
      <div class="card-body">
        <table class="native-table">
          <thead>
          <tr>
            <th>日期</th>
            <th>处理人</th>
            <th>状态</th>
            <th>处理凭据</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>2018/08/23  20:00</td>
            <td>张某</td>
            <td>已完成</td>
            <td>查看</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="4">
              <h5>辅材使用：</h5>
              <div>名称：软管；型号：PVC25；单位：1m；数量：5</div>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "after-service"
    }
</script>

<style scoped>

</style>
