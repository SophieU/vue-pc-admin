<style scoped lang="scss">
  @import './home-components.scss';
</style>
<template>
  <div>
    <Modal
      v-model="activeModal"
      title="发起售后"
    >
      <div class="create_service">
        <Form :model="newService" label-position="top">
          <FormItem label="服务区域">
            <Input v-model="newService.district"></Input>
          </FormItem>
          <FormItem label="报修分类">
            <Select v-model="newService.type">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="师傅名称">
            <Input v-model="newService.staffName"></Input>
          </FormItem>
          <FormItem label="联系手机">
            <Input v-model="newService.tel"></Input>
          </FormItem>
          <FormItem label="工单编号">
            <div class="search-wrap">
              <Input search suffix="ios-search" v-model="newService.orderId" @on-search="searchThis('orderId')"></Input>
              <transition name="fade">
                <div class="search-result" v-if="orderIdSearch">
                  <ul>
                    <li v-for="item in [1,2,3,4]" @click="sureSearch('orderId','网点1')">1245500454</li>
                  </ul>
                </div>
              </transition>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary">关闭</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
    export default {
        name: "createOrder",
      props:{
        initiateService:Boolean
      },
      data(){
          return{
            newService: {
              district: '',
              type: '',
              staffName: '',
              tel:'',
              orderId:''
            },
            orderIdSearch:false,
          }
      },
      computed:{
          activeModal:{
            get:function(){
              return this.initiateService;
            },
            set:function(newValue){
              this.$emit('close','initiateService');
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
          this.newService[prop] = val;
          this[prop+'Search']=false;
        }
      }
    }
</script>


