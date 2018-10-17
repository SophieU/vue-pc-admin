<style scoped lang="scss">
  @import "./system.scss";
</style>

<template>
    <div>
      <Card>
        <div>
          <div class="clearfix mb-15">
            <div class="pull-left">
              <Button icon="md-add" @click="activeModal(1)">新建</Button>
              <Button icon="ios-funnel" @click="filter=true" >筛选</Button>
            </div>
            <div class="pull-right">
              <Button>excel导入模板下载</Button>
              <Button>excel导入</Button>
            </div>
          </div>
          <div class="table-wrapper">
            <Table :data="lists" :columns="tableColumn" ></Table>
            <div class="pagination">
              <Page :total="40" show-sizer show-elevator></Page>
            </div>
          </div>
        </div>
      </Card>
      <!--报修弹窗-->
      <Modal v-model="serviceModal"
        :title="modalTitle===1?'新建服务分类':'编辑服务分类'"
      >
        <div class="modal_wrap_form">
          <Form v-model="typeForm" label-position="top">
            <FormItem label="报修分类">
              <Select v-model="typeForm.repairType">
                <Option value="111">修水表</Option>
              </Select>
            </FormItem>
            <FormItem label="服务名称">
              <Input />
            </FormItem>
            <FormItem label="质保天数">
              <InputNumber :max="10" :min="1" ></InputNumber>
            </FormItem>
            <FormItem label="服务收费">
              <InputNumber :max="10" :min="1" ></InputNumber>
            </FormItem>
            <FormItem label="员工结算标准">
              <Input />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="serviceModal=false">取消</Button>
          <Button type="primary">{{modalTitle===1?'添加':'保存'}}</Button>
        </div>
      </Modal>
      <!--报修筛选-->
      <Drawer title="服务筛选"  v-model="filter" width="425">
        <div class="filter-top mb-15 clearfix">
          <div class="pull-left">
            <Button icon="md-close-circle">清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form v-model="serviceFilter" >
          <FormItem label="报修分类">
            <Select v-model="serviceFilter.repairType">
              <Option value="111">修水表</Option>
            </Select>
          </FormItem>
          <FormItem label="服务名称">
            <Input search enter-button v-model="serviceFilter.name"/>
          </FormItem>
          <FormItem label="质保天数大于0">
            <i-switch v-model="serviceFilter.guaranteed"  />
          </FormItem>
        </Form>

      </Drawer>
    </div>
</template>

<script>
    export default {
        name: "service-type",
      data(){
          return {
            switch1:true,
            modalTitle:1, //1：新建，0：编辑
            serviceModal:false,
            filter:false, //筛选
            tableColumn:[
              {
                title:'服务名称',
                key:'name',
                align:'center'
              },{
                title:'报修分类',
                key:'repairType',
                align:'center'
              },{
                title:'质保天数',
                key:'guaranteed',
                align:'center'
              },{
                title:'客户收费标准',
                key:'staffFee',
                align:'center'
              },{
                title:'员工结算标准',
                key:'staffFee',
                align:'center'
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text'
                      },
                      on:{
                        click(){
                          _this.activeModal(0);
                        }
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        type:'text'
                      },
                      on:{
                        click(){
                          console.log('点了删除')
                        }
                      }
                    },'删除'),

                  ])
                }
              },
            ],
            lists:[
              {
                name:'管理更换',
                repairType:'用气服务',
                guaranteed:0,
                customFee:0,
                staffFee:0,
              }
            ],
            typeForm:{
              repairType:''
            },
            serviceFilter:{
              name:'',
              guaranteed:true,
              repairType:''
            }
          }
      },
      methods:{
          activeModal(type){
            this.serviceModal=true;
            this.modalTitle=type;
          },
          //筛选搜索名称
          searchName(name){
              console.log(name)
          },

      }
    }
</script>

