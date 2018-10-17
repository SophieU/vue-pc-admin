<template>
    <Card>
      <ul  class="tab-nav mb-15">
        <li @click="toggleTab(ind)" :class="nav.check?'nav-active':''" v-for="(nav,ind) in orderNav" :key="nav.title">
          <Badge   :count="nav.count">
            <span class="nav-title">{{nav.title}}</span>
          </Badge>
        </li>
      </ul>
      <div class="tab-content">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" @click="showModal=true">新建</Button>
            <Button @click="filter=true">筛选</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">excel导出</Button>
          </div>
        </div>

        <div class="tabler-wrapper">
          <Table :columns="columns" :data="lists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </div>
      </div>
      <!--新建-->
      <create-order :createOrder="showModal" @close="closeModal"></create-order>
      <!--筛选-->
      <Drawer width="425" title="工单筛选"  v-model="filter">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form>
          <FormItem label="报修类型">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="工单编号">
            <Input search enter-button/>
          </FormItem>

          <FormItem label="服务人员">
            <Input search enter-button/>
          </FormItem>

          <FormItem label="用户手机">
            <Input search enter-button/>
          </FormItem>
          <FormItem label="工单状态">
            <CheckboxGroup>
              <Checkbox label="待分配"></Checkbox>
              <Checkbox label="待上门"></Checkbox>
              <Checkbox label="已上门"></Checkbox>
              <Checkbox label="待付款"></Checkbox>
              <Checkbox label="待服务"></Checkbox>
              <Checkbox label="已完成"></Checkbox>
              <Checkbox label="售后中"></Checkbox>
              <Checkbox label="已取消"></Checkbox>
              <Checkbox label="已关闭"></Checkbox>
              <Checkbox label="异常"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="证据上传">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>

          <FormItem label="回访记录">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="质保中">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="售后记录">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="渠道来源">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="创建时间">
            <DatePicker type="daterange" style="width:100%;"></DatePicker>
          </FormItem>
        </Form>
      </Drawer>
    </Card>
</template>

<script>
  import createOrder from '../home/component/createOrder';
    export default {
        name: "order-search",
      components:{
        createOrder
      },
      data(){
          return {
            filter:false,
            orderNav:[
              {title:'所有工单',count:22},
              {title:'待分配',count:1,check:true},
              {title:'待上门',count:1},
              {title:'已上门',count:1},
              {title:'待付款',count:1},
              {title:'待服务',count:1},
              {title:'已完成',count:1},
              {title:'售后中',count:1},
              {title:'已取消',count:1},
              {title:'已关闭',count:1},
              {title:'异常',count:1},
            ],
            columns:[
              {title:'工单编号',key:'id',align:'center'},
              {title:'客户手机',key:'id',align:'center'},
              {title:'报修类型',key:'id',align:'center'},
              {title:'服务网点',key:'id',align:'center'},
              {title:'接单师傅',key:'id',align:'center'},
              {title:'工单状态',key:'id',align:'center'},
              {title:'证据',key:'id',align:'center'},
              {title:'回访记录',key:'id',align:'center'},
              {title:'质保中',key:'id',align:'center'},
              {title:'售后记录',key:'id',align:'center'},
              {title:'创建日期',key:'id',sortable:true,align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click(){
                          _this.$router.push('/orderDetail')
                        }
                      }
                    },'查看'),
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      }
                    },'处理订单'),
                  ])
                }},
            ],
            lists:[{}],
            showModal:false,
          }
      },
      methods:{
        toggleTab(ind){
          let tabs = this.orderNav[ind];
          if(tabs){
            tabs.check=true;
          }
          let arr = this.orderNav.map((item,index)=>{
            if(index===ind){
              item.check=true;
            }else{
              item.check=false;
            }
            return item;
          });
          this.orderNav=arr;
        },
        closeModal(param){
          console.log(param)
          this.showModal=false;
        }
      }
    }
</script>

<style scoped>

</style>
