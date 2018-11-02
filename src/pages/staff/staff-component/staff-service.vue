<template>
  <Card>
    <p slot="title">服务类型：</p>
    <ul class="lists">
      <li  v-for="repair in repairLists"  :key="repair" ><Checkbox :value="true" disabled>{{repair}}</Checkbox> </li>
    </ul>
  </Card>
</template>
<script>
  import util from '../../../libs/util'
    export default {
        name: "staff-service",
      computed:{
        repairLists(){
          return this.$store.state.app.staffServiceType;
        }
      }
    }
</script>

<style scoped>
.lists li{
  padding: 4px 10px;
  font-size: 14px;
}
  .ivu-checkbox-wrapper{
   font-size: 14px;
  }
</style>
