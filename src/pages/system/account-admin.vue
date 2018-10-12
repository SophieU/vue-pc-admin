
<style scoped lang="scss">
  @import "./system.scss";
</style>

<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" icon="md-add-circle" @click="openModal(1)">新建</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :data="accountList" :columns="column"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </div>
      </Card>
      <Modal v-model="activeModal"
             :title="modalStatus===1?'新建账号':'编辑账号'">
        <div class="modal_wrap_form">
          <Form v-model="accountForm" label-position="top">
            <FormItem label="登陆账号">
              <Input />
            </FormItem>
            <FormItem label="登陆密码">
              <Input />
            </FormItem>
            <FormItem label="账户角色">
              <Select>
                <Option value="1">管理员</Option>
                <Option value="1">超级管理员</Option>
              </Select>
            </FormItem>
            <FormItem label="手机号">
              <Input />
            </FormItem>
            <FormItem >
              <Row>
                <Col span="4">账号状态</Col>
                <Col span="12">
                  <i-switch size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                </Col>
              </Row>
            </FormItem>

          </Form>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "account-admin",
      data(){
          return{
            activeModal:false,
            modalStatus:1,
            column:[
              {
                title:'账号',
                key:'account',
                align:'center'
              },{
                title:'手机',
                key:'tel',
                align:'center'
              },{
                title:'角色',
                key:'role',
                align:'center'
              },{
                title:'状态',
                key:'status',
                align:'center'
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;
                  return h('Button',{
                    props:{
                      type:'text'
                    },
                    on:{
                      click(){
                        _this.openModal(0);
                        console.log('编辑')
                      }
                    }
                  },'编辑');

                }
              }
            ],
            accountList:[
              {
                account:'admin',
                tel:'13688888888',
                role:'系统管理员',
                status:'正常'
              },{
                account:'admin',
                tel:'13688888888',
                role:'系统管理员',
                status:'停用'
              },
            ],
            accountForm:{

            }
          }
      },
      methods:{
        openModal(type){
          this.activeModal=true;
          this.modalStatus=type;
        }
      }
    }
</script>
