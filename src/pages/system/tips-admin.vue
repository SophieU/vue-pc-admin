<template>
    <div>
      <Card class="mb-15">
        <p slot="title">服务时间提示</p>
        <div>
          <Input type="textarea" :rows="5"/>
        </div>
      </Card>
      <Card class="mb-15">
        <p slot="title">服务费用提示</p>
        <div>
          <Input type="textarea" :rows="5"/>
        </div>
      </Card>
      <Card class="mb-15">
        <p slot="title">其他提示</p>
        <div>
          <Input type="textarea" :rows="5"/>
        </div>
      </Card>
      <Card>
        <div class="inner-center">
          <Button class="lang-btn">取消</Button>
          <Button class="lang-btn" type="primary">保存</Button>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "tips-admin"
    }
</script>

<style scoped>
  .inner-center{
    text-align: center;
  }
</style>
