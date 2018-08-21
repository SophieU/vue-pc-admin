<template>
  <Card :padding="0">
    <div class="info-card-con">
      <Col class="infor-card-total-con" span="8" :style="{backgroundColor: color, color: 'white'}">
        <div class="height-100 infor-card-total">
          <h3 class="total-count">{{total}}</h3>
          <p class="total-text">{{title}}</p>
        </div>
      </Col>
      <Col span="16" class="height-100">
        <Row class="data-card height-100" type="flex" justify="space-between" align="middle">
          <div class="infor-intro-data" v-if="!single">
            <div class="infor-intro-text">已处理 <strong :style="{color:color}">{{deal}}</strong></div>
            <div class="infor-intro-text">未处理 <strong :style="{color:color}">{{wating}}</strong></div>
          </div>
          <Icon :type="icon" :color="color" size="32"></Icon>
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
        },
        icon:{
          type:String,
          default:'md-analytics'
        },
        title:{
          type:String,
        },
        total:{
          type:Number
        },
        deal:{
          type:Number
        },
        wating:{
          type:Number
        },
        single:{
          type:Boolean
        }
      }
    }
</script>

<style scoped lang="scss">
  @import './home-components.scss';
</style>
