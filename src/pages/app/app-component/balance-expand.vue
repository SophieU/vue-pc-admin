<template>
    <div>
      <Row class="expand-row">
        <Col span="8">
          <span class="expand-key"> 剩余年假（天）: </span>
          <span class="expand-value">0</span>
        </Col>
        <Col span="8">
          <span class="expand-key">剩余调休（小时）: </span>
          <span class="expand-value">0</span>
        </Col>
        <Col span="8">
          <span class="expand-key">剩余病假（天）: </span>
          <span class="expand-value">0</span>
        </Col>
      </Row>
      <Row class="expand-row">
        <Col span="8">
          <span class="expand-key">剩余产假（天）: </span>
          <span class="expand-value">0</span>
        </Col>
        <Col span="8">
          <span class="expand-key">剩余婚假（天）: </span>
          <span class="expand-value">0</span>
        </Col>
        <Col span="8">
          <span class="expand-key">剩余丧假（天）: </span>
          <span class="expand-value">0</span>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "balance-expand",
        props:{
            row:Object
        }
    }
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
