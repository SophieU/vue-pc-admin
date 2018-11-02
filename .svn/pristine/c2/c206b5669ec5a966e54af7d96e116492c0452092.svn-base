
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
                <Option v-for="option in selectLists" :key="option.value" :value="option.value">{{option.name}}</Option>
                <!--<Option value="after">发起售后</Option>-->
              </Select>
              <Select v-model="cancelReason" style="width: 200px;" v-if="currentCon==='cancel'" placeholder="请选择取消原因">
                <Option v-for="reason in reasonLists" :value="reason.id" :key="reason.id">{{reason.reasonName}}</Option>
              </Select>
            </div>
            <div class="btn-wrap">
              <Button @click="cancelOrder" type="primary" v-if="currentCon==='cancel'">取消工单</Button>
              <Button @click="startAfter" type="primary" v-if="currentCon==='after'">发起售后</Button>
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
          id:'',
          reasonLists:[],
          cancelReason:'',
          selectLists:[], //下拉选项
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
        },
        cancelOrder(){
          let params = {
            reasonId:this.cancelReason
          };
          this.$http.post(`/repair/order/cancel?id=${this.id}&reasonId=${this.cancelReason}`,{
            ...params
          }).then(res=>{
              if(res.data.code===0){
                this.$Message.success('取消成功');
                this.$router.push({name:'order_filter'});
              }else{
                this.$Message.error('取消失败，'+res.data.msg);
              }
            })
        },
        startAfter(){
          this.$http.post(`/repair/order/after/sale/add?id=${this.id}`)
            .then(res=>{
              if(res.data.code===0){
                this.$Message.success('售后发起成功');
                this.$router.push({name:'order_filter'});
              }else{
                this.$Message.error('发起失败');
              }
            })
        },
        getCancelReason(){
          this.$http.post(`/repair/order/cancel/reason/list`)
            .then(res=>{
              if(res.data.code===0){
                this.reasonLists=res.data.data;
              }else{
                console.log('取消原因获取失败：'+res.data.msg);
              }
            })
        },

        setControl(){
          let state = this.state;
          let cancleAble=["待上门","待分配"];
          let serviceAble=["已完成"];
          let isInWarranty=this.$route.query.isWarranty;
          console.log(state)
          let selectLists=[];
          if(cancleAble.indexOf(state)>-1){
            selectLists.push({name:'取消订单',value:'cancel'})
          }
          if(serviceAble.indexOf(state)>-1&&isInWarranty==='是'){
            selectLists.push({name:'发起售后',value:'after'})
          }
          this.selectLists=selectLists;
        }
      },
      mounted(){
          let id = this.$route.query.id;
          this.state=this.$route.query.state;
          this.id=id;
          this.getCancelReason();
          this.setControl();
      }
    }
</script>

