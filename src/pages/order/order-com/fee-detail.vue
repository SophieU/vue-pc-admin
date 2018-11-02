<template>
<div>
  <div class="card no-border mb-15">
    <div class="card-header">
      <div class="card-title">统计</div>
    </div>
    <div class="card-body">
      <table class="native-table">
        <thead>
        <tr>
          <th>工单金额</th>
          <th>实收金额</th>
          <th>支付方式</th>
          <th>支付单号</th>
          <th>支付时间</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{detail.totalAmount}}</td>
          <td>{{detail.receivedAmount}}</td>
          <td>{{detail.payType}}</td>
          <td>{{detail.paySn}}</td>
          <td>{{detail.payTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="card no-border">
    <div class="card-header">
      <div class="card-title">明细</div>
    </div>
    <div class="card-body">
      <table class="native-table">
        <thead>
        <tr>
          <th>类别</th>
          <th>项目</th>
          <th>数量</th>
          <th>单价</th>
          <th>小计</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in detail.offerPlanVos" :key="index">
            <td>{{item.planType}}</td>
            <td>{{item.planName	}}</td>
            <td>{{item.serviceNum}}</td>
            <td>{{item.serviceCost}}</td>
            <td>{{item.amount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "fee-detail",
      data(){
          return {
            detail:{}
          }
      },
      methods:{
          getFeeDetail(id){
            this.$http.get(`/repair/order/charge/list?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  this.detail=res.data.data;
                }else{
                  console.log('工单收费明细获取：'+res.data.msg);
                }
              })
          }
      },
      mounted(){
          let id = this.$route.query.id;
          this.getFeeDetail(id);
      }
    }
</script>

<style scoped>

</style>
