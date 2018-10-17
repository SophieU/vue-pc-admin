<style scoped lang="scss">
  @import "./order";
</style>
<template>
    <div class="order-detail">
      <Row :gutter="15">
        <Col :lg="8" :sm="24">
          <Card>
            <div class="order-title">
              <span><Icon color="#57a3f3" type="ios-list" size="28"/>SHZ0120180820001</span>
              <span class="status">已完成</span>
            </div>
            <div class="order-item">
              <span class="label">报修类型：</span>
              <span class="item-info">
                <p>用气服务</p>
                <p class="text-grey">(同意上门费)</p>
              </span>
            </div>
            <Divider />
            <!--报修地址等-->
            <div class="order-item">
              <span class="label">报修地点：</span>
              <span class="item-info">24小区</span>
            </div>
            <div class="order-item">
              <span class="label"> 详细地址：</span>
              <span class="item-info">3-3-3号</span>
            </div>
            <div class="order-item">
              <span class="label">用户手机：</span>
              <span class="item-info">13666666666</span>
            </div>
            <div class="order-item">
              <span class="label">联系电话：</span>
              <span class="item-info">13666666666</span>
            </div>
            <!--接单师傅等-->
            <Divider />
            <div class="order-item">
              <span class="label">接单师傅：</span>
              <span class="item-info">
                <span>Vincent</span>
                <span class="text-blue" style="margin-left:10px;">查看</span>
              </span>
            </div>
            <div class="order-item">
              <span class="label">师傅电话：</span>
              <span class="item-info">13666666666</span>
            </div>
            <!--费用等-->
            <Divider />
            <div class="order-item">
              <span class="label">工单费用：</span>
              <span class="item-info">90.00</span>
            </div>
            <div class="order-item">
              <span class="label">工单渠道：</span>
              <span class="item-info">95598</span>
            </div>
            <!--回访等-->
            <Divider />
            <div class="order-item">
              <span class="label">回访：</span>
              <span class="item-info">是</span>
            </div>
            <div class="order-item">
              <span class="label">质保中：</span>
              <span class="item-info">是</span>
            </div>
            <div class="order-item">
              <span class="label">售后记录：</span>
              <span class="item-info">3</span>
            </div>
            <div class="order-item">
              <span class="label">故障原因：</span>
              <span class="item-info">管子坏了</span>
            </div>
            <div class="order-item">
              <span class="label">服务网点：</span>
              <span class="item-info">24服务网点</span>
            </div>
            <div class="order-item">
              <span class="label">创建时间：</span>
              <span class="item-info">2018/08/20  20:00</span>
            </div>
          </Card>
        </Col>
        <Col :lg="16" :sm="24">
          <Card>
            <ul class="mb-15 nav-ul">
              <router-link active-class="text-blue" tag="li" :to="{name:'orderFlow'}">处理流程</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'feeDetail'}">收费明细</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'orderProve'}">证据证明</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'orderDetailIncome'}">工单收益</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'afterService'}">售后质保</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'visitedInfo'}">回访信息</router-link>
              <router-link active-class="text-blue" tag="li" :to="{name:'orderControl'}">订单操作</router-link>
            </ul>
            <router-view></router-view>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "order-detail"
    }
</script>


