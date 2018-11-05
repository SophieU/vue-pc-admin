<template>
  <Card v-if="detail">
    <div class="clearfix mb-15">
      <div class="pull-left">
        <Button type="primary" @click="$router.back()">返回上一页</Button>
      </div>
      <div class="pull-right">
        <Button type="primary">excel导出</Button>
      </div>
    </div>
    <div>
      <table class="native-table mb-15">
        <thead>
        <tr>
          <th>组织名称</th>
          <th>单号</th>
          <th>创建时间</th>
          <th>盘点盈亏</th>
          <th>盈亏成本</th>
          <th>操作人</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{detail.departmentName}}</td>
          <td>{{detail.orderSn}}</td>
          <td>{{detail.createTime}}</td>
          <td>{{detail.diffNum}}</td>
          <td>{{detail.amount}}</td>
          <td>{{detail.creator}}</td>
        </tr>
        </tbody>
      </table>
      <table class="native-table">
        <thead>
        <tr>
          <th>辅材名称</th>
          <th>报修分类</th>
          <th>型号</th>
          <th>单位</th>
          <th>成本价</th>
          <th>系统数量</th>
          <th>盘点数</th>
          <th>盈亏数</th>
          <th>盈亏成本</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in detail.detailList" :key="index">
            <td>{{item.materialName}}</td>
            <td>{{item.repairCategoryName}}</td>
            <td>{{item.materialSpec}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.price}}</td>
            <td>{{item.num}}</td>
            <td>{{item.checkedNum}}</td>
            <td>{{item.diffNum}}</td>
            <td>{{item.amount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>

</template>

<script>
    export default {
        name: "inventory-detail",
      data(){
        return {
          detail:null
        }
      },
      methods:{
          getDetail(id){
            this.$http.get(`/repair/material/check/order/info?id=${id}`)
              .then(res=>{
                /*if(res.data.code===0){
                  this.detail=res.data.data;
                }else{
                  console.log('盘点详情：'+res.data.msg);
                }*/
                this.detail={
                  "id": "c1388d059fc44c8e875cad01bff5c150",
                  "departmentName": "test",
                  "sn": "4581245",
                  "createTime": "2018-10-16 20:31",
                  "diffNum": "1",
                  "amount": "5.00",
                  "creator": "admin",
                  "detailList": [
                    {
                      "materialName": "辅材1",
                      "repairCategoryName": "燃气服务",
                      "materialSpec": "型号1",
                      "price": 5,
                      "num": 10,
                      "checkedNum": 11,
                      "diffNum": 1,
                      "amount": 5
                    }
                  ]
                }
              })
          }
      },
      mounted(){
          let id = this.$route.params.id;
          this.getDetail(id);
      }
    }
</script>

<style scoped>

</style>
