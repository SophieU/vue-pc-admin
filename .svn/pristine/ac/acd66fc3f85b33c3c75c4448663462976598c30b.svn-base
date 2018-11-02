
<style scoped lang="scss">
  @import "../order";
</style>
<template>
    <div class="order-control">
      <div class="card">
        <div class="card-body">
          <div class="control-flex">
            <div class="label-title">用户述求：</div>
            <div class="select-wrap">
              <Select style="width: 200px;display: block;" class="mb-15" @on-change="demandChange">
                <Option value="cancel">取消订单</Option>
                <Option value="after">发起售后</Option>
              </Select>
              <Select style="width: 200px;" v-if="currentCon==='cancel'">
                <Option value="">取消原因</Option>
              </Select>
            </div>
            <div class="btn-wrap">
              <Button type="primary" v-if="currentCon==='cancel'">取消工单</Button>
              <Button type="primary" v-if="currentCon==='after'">发起售后</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "order-control",
      data(){
        return {
          currentCon:'', //cancel:取消工单，after:发起今后
        }
      },
      methods:{
        demandChange(value){
          console.log(value);
          switch(value){
            case 'cancel':
              this.currentCon='cancel';
              break;
            case 'after':
              this.currentCon='after';
              break;
            default:
              this.currentCon='';
          }
        }
      }
    }
</script>

