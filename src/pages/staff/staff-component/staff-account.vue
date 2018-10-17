<template>
<div class="card">
  <div class="card-header">
    <p class="card-title">账号信息：</p>
  </div>
  <div class="card-body">
    <Form :label-width="80" style="width: 500px;">
      <FormItem label="账号：">
        <Input disabled value="123456789"/>
      </FormItem>
      <FormItem label="密码：">
        <Input type="password" disabled value="123456789"/>
      </FormItem>

    </Form>
  </div>
</div>
</template>

<script>
    export default {
        name: "staff-account"
    }
</script>

<style scoped>

</style>
