<template>
  <Card :padding="0">
    <div class="info-card-con">
      <Col class="infor-card-total-con" span="8" :style="{backgroundColor: color, color: 'white'}">
        <Row class="height-100" type="flex" align="middle" justify="center">
          <Icon :type="icon" size="42"></Icon>
        </Row>
      </Col>
       <Col span="16" class="height-100">
        <Row class="data-card height-100" type="flex" justify="space-between" align="middle">
            <count-up
              class="infor-card-count user-created-count"
              :id-name="idName"
              :end-val="endVal"
              :color="color"
              :countSize="countSize"
              :countWeight="countWeight"
            >
              <p class="total-text" slot="intro">{{title}}</p>
            </count-up>
        </Row>
      </Col>
    </div>
  </Card>
</template>

<script>
  import countUp from './countUp';
    export default {
        name: "infoCard",
      components:{
          countUp
      },
      props:{
        idName: String,
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
        endVal:{
          type:Number
        },
        countSize: {
          type: String,
          default: '30px'
        },
        countWeight: {
          type: Number,
          default: 700
        },
        iconSize: {
          type: Number,
          default: 40
        }
      }
    }
</script>

<style scoped lang="scss">
  @import './home-components.scss';
</style>
