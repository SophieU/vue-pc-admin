<template>
  <Card :padding="0">
    <div class="info-card-con">
      <Col class="infor-card-total-con" span="8" :style="{backgroundColor: color, color: 'white'}">
        <div class="height-100 infor-card-total">
          <h3 class="total-count">20</h3>
          <p class="total-text">今日收到报警</p>
        </div>
      </Col>
      <Col span="16" class="height-100">
        <Row class="data-card height-100" type="flex" justify="space-between" align="middle">
          <div class="infor-intro-data">
            <div class="infor-intro-text">已处理 <strong :style="{color:color}">15</strong></div>
            <div class="infor-intro-text">未处理 <strong :style="{color:color}">5</strong></div>
          </div>
          <Icon type="android-person-add" :color="color" size="32"></Icon>
        </Row>

      </Col>
    </div>
  </Card>
</template>

<script>
    export default {
        name: "infoCard",
      props:{
        color:{
          type:String,
          default:'#2d8cf0',
        }
      }
    }
</script>

<style scoped lang="scss">
  @import './home-components.scss';
</style>
