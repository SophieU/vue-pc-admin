<style scoped lang="scss">
  @import './home-components.scss';
</style>
<template>
  <div>
    <Modal
      v-model="activeModal"
      title="新建工单"
    >
      <div class="new_order_wrapper">
        <Form :model="newOrder" label-position="top">
          <FormItem label="一生约绑定手机(非必填)">
            <div class="search-wrap">
              <Input search suffix="ios-search" v-model="newOrder.ysyTel" @on-search="searchThis('ysyTel')"></Input>
              <transition name="fade">
                <div class="search-result" v-if="ysyTelSearch">
                  <ul>
                    <li v-for="item in [1,2,3,4]" @click="sureSearch('ysyTel','123456789')">12345789646</li>
                  </ul>
                </div>
              </transition>

            </div>
          </FormItem>
          <FormItem label="联系电话">
            <Input v-model="newOrder.tel"></Input>
          </FormItem>
          <FormItem label="报修分类">
            <Row :gutter="15">
              <Col span="16">
                <Select v-model="newOrder.repairType">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </Col>
              <Col span="8">
                <Checkbox >
                  <span>接受上门费</span>
                </Checkbox>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="服务区域">
            <div class="search-wrap">
              <Input search suffix="ios-search" v-model="newOrder.repairDis" @on-search="searchThis('repairDis')"></Input>
              <transition name="fade">
                <div class="search-result" v-if="repairDisSearch">
                  <ul>
                    <li v-for="item in [1,2,3,4]" @click="sureSearch('repairDis','网点1')">网点1</li>
                  </ul>
                </div>
              </transition>
            </div>
          </FormItem>
          <FormItem label="详细地址">
            <Input v-model="newOrder.address"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button>取消</Button>
        <Button type="primary">发送至服务网点</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
    export default {
        name: "createOrder",
      data(){
          return{
            newOrder: {
              ysyTel: '',
              tel: '',
              repairType: '',
              repairDis: '',
              address: '',
            },
            ysyTelSearch:false, //ysyTel搜索状态标识
            repairDisSearch:false, //服务区域搜索状态标识
          }
      },
      props:{
        createOrder:Boolean
      },
      computed:{
          activeModal:{
            get:function(){
              return this.createOrder;
            },
            set:function(newValue){
              this.$emit('close','createModal');
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
          this.newOrder[prop] = val;
          this[prop+'Search']=false;
        }
      }
    }
</script>

