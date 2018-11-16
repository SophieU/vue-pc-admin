<template>
  <div>
    <h4>辅材使用：</h4>
    <Row class="expand-row" v-for="material in materialLists" :key="material.materialName">
      <Col span="4">名称：{{material.materialName}}；</Col>
      <Col span="4">型号：{{material.materialSpec}}；</Col>
      <Col span="4">单位：{{material.materialUnit}}；</Col>
      <Col span="4">数量：{{material.serviceNumber}}</Col>
    </Row>
  </div>

</template>

<script>
    export default {
        name: "expand-table",
        props:['materialLists']
    }
</script>

<style scoped>

</style>
