<style scoped lang="scss">
  @import "./source.scss";
  .native-input{
    width: 600px;
  }
</style>
<template>
    <Card class="storage-detail">
      <div class="clearfix mb-15">
        <div class="pull-right">
          <Button type="primary">excel导出</Button>
        </div>
      </div>
      <div>
        <table class="native-table mb-15">
          <thead>
          <tr>
            <th>组织名称</th>
            <th>单号</th>
            <th>创建时间</th>
            <th>出库类别</th>
            <th>操作人</th>
            <th>出库成本</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>24小区服务</td>
            <td>24342424</td>
            <td>2018/08/20</td>
            <td>出库-退货</td>
            <td>张某</td>
            <td>100.00</td>
          </tr>
          </tbody>
        </table>
        <div class="mb-15">
          <span>原始单号：</span>
          <input class="native-input" type="text" readonly value="23344">
        </div>
        <div>
          <table class="native-table">
            <thead>
            <tr>
              <th>辅材名称</th>
              <th>报修分类</th>
              <th>型号</th>
              <th>单位</th>
              <th>成本价</th>
              <th>数量</th>
              <th>出库成本</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>软管</td>
              <td>用气服务</td>
              <td>PVC25</td>
              <td>米</td>
              <td>5.00</td>
              <td>20</td>
              <td>100.00</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
</template>

<script>
    export default {
        name: "storage-detail"
    }
</script>


