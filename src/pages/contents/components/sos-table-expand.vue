<template>
    <div>
      <Row class="expand-row">
        <Col span="8">
          <span class="expand-key">受理人姓名：</span>
          <span class="expand-value">{{row.dealName}}</span>
        </Col>
        <Col span="8">
          <span class="expand-key">受理人电话：</span>
          <span class="expand-value">{{row.dealTel}}</span>
        </Col>
        <Col span="8">
          <span class="expand-key">解决时间：</span>
          <span class="expand-value">{{row.dealTime}}</span>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "sos-table-expand",
        props:{
            row:Object
        },
      mounted(){

      }
    }
</script>

<style scoped>
.expand-row{
  margin-bottom: 15px;
}
</style>
