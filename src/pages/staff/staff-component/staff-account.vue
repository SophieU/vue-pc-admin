<template>
  <Card>
    <p slot="title">账号信息：</p>
    <Form :label-width="80" style="width: 500px;">
      <FormItem label="账号：">
        <Input disabled v-model="username"/>
      </FormItem>
      <FormItem label="密码：">
        <Input type="password" disabled value="123456789"/>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
    export default {
        name: "staff-account",
      computed:{
        username(){
          let account = this.$store.state.app.staffAccount;
          if(account){
            return account.username;
          }else{
            return '';
          }
        }
      }
    }
</script>

<style scoped>

</style>
