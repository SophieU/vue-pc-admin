<style scoped lang="scss">
  @import './home-components.scss';
</style>
<template>
  <div>
    <Modal
      v-model="activeModal"
      title="取消工单"
    >
      <div class="new_order_wrapper">
        <Form :model="cancelOrder" label-position="top">
          <FormItem label="服务区域">
            <Input search suffix="ios-search" v-model="cancelOrder.repairDis" ></Input>
          </FormItem>
          <FormItem label="报修分类">
            <Select v-model="cancelOrder.repairType">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="联系手机">
            <Input v-model="cancelOrder.tel"></Input>
          </FormItem>
          <FormItem label="工单编号">
            <div class="search-wrap">
              <Input search enter-button="搜索" v-model="cancelOrder.orderId" @on-search="searchThis('orderId')"></Input>
              <transition name="fade">
                <div class="search-result" v-if="orderIdSearch">
                  <ul>
                    <li v-for="item in [1,2,3,4]" @click="sureSearch('orderId','123456789456')">123456789456</li>
                  </ul>
                </div>
              </transition>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="activeModal=false">取消</Button>
        <Button type="primary">发送至服务网点</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
    export default {
        name: "cancelOrder",
      data(){
          return{
             cancelOrder: {
              tel: '',
              repairType: '',
              repairDis: '',
              orderId: '',
            },
            orderIdSearch:false, //服务区域搜索状态标识
          }
      },
      props:{
        cancelModal:Boolean
      },
      computed:{
          activeModal:{
            get:function(){
              return this.cancelModal;
            },
            set:function(newValue){
              this.$emit('close','cancelModal');
            }
          }
      },
      methods:{
          //点击搜索
        searchThis(model){
          this[model+'Search']=true;
          //ajax查询
        },
        //选中搜索值
        sureSearch(prop,val){
          this.cancelOrder[prop] = val;
          this[prop+'Search']=false;
        }
      }
    }
</script>

