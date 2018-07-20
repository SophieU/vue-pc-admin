<template>
    <div class="not-found">
      <h3>404</h3>
      <img src="../../assets/bg/404.png" alt="">
      <h4>您访问的内容不存在</h4>
      <div class="btn-group">
        <Button type="text"><router-link to="/">返回首页</router-link></Button>
        <Button type="primary" @click="$router.back()">返回上一页</Button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "notfounds"
    }
</script>

<style scoped lang="scss">
  .not-found{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items:center ;
    flex-direction: column;
    h3{
      font-size: 50px;
      color: #ccc;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    h4{
      font-size: 20px;
      color: #999;
      font-weight: normal;
      margin: 20px 0;
    }

  }
</style>
