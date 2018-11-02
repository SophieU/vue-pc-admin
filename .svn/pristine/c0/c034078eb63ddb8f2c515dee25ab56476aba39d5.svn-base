<template>
    <Card style="padding: 30px 10px;">
      <Table :columns="column" :data="settleLists"></Table>
    </Card>
</template>

<script>
    export default {
        name: "settle-account",
      data(){
          return{
            column:[
              {title:'工单类型',key:'orderType',align:'center'},
              {title:'对应商户',key:'merchant',align:'center'},
            ],
            settleLists:[
              {orderType:'用气服务',merchant:'天富气公司'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
