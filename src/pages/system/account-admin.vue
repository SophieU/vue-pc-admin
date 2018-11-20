
<style scoped lang="scss">
  @import "./system.scss";
</style>

<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" icon="md-add-circle" @click="openModalNew">新建</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :data="accountList" :columns="column"></Table>
          <div class="pagination">
            <Page :total="totalCount" :page-size="pageSize" show-sizer show-elevator></Page>
          </div>
        </div>
      </Card>
      <Modal v-model="activeModal"
             :title="modalTitle"
             :mask-closable="false"
              @on-visible-change="modalChange"
      >
        <div class="modal_wrap_form">
          <Form ref="accountForm" :model="accountForm" :rules="accountRule" label-position="top">
            <FormItem label="登陆账号" prop="loginName">
              <Input :disabled="view" v-model="accountForm.loginName"/>
            </FormItem>
            <FormItem label="登陆密码" prop="password">
              <Input :maxlength="10"  :disabled="view||!editPwdInput" type="password" v-model="accountForm.password">
                <Button v-show="modalTitle!=='新建账号'" :disabled="view" slot="append" @click="editPwd">修改密码</Button>
              </Input>
            </FormItem>
            <FormItem label="账户角色" prop="roleId">
              <Select  :disabled="view" v-model="accountForm.roleId">
                <Option :key="role.id" v-for="role in roleLists" :value="role.id">{{role.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="手机号" prop="mobile">
              <Input :maxlength="11" :disabled="view" v-model="accountForm.mobile"/>
            </FormItem>
            <FormItem >
              <Row>
                <Col span="4">账号状态</Col>
                <Col span="12">
                  <i-switch  :disabled="view" size="large" :true-value="'Y'" :false-value="'N'" v-model="accountForm.isOpen">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                </Col>
              </Row>
            </FormItem>

          </Form>
        </div>
        <div slot="footer">
          <Button  @click="activeModal=false">取消</Button>
          <Button v-if="view" type="primary" @click="view=false;modalTitle='编辑账号'">编辑</Button>
          <Button :loading="loadingSend" v-if="!view" type="primary" @click="saveAccount">确定</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "account-admin",
      data(){
          const validateTel = function(rule,value,callback){
            let telReg=/^1[3456789]\d{9}/;
           if(telReg.test(value)){
             callback();
           }else{
             callback(new Error('请输入正确的手机号'))
            }
          };
          const minLenVal=function(rule,value,callback){
            let pwdReg = /^[a-zA-Z0-9]{6,10}$/;
            if(pwdReg.test(value)){
              callback();
            }else{
              callback(new Error());
            }
          }

          return{
            loadingSend:false,
            editPwdInput:false,//修改密码
            view:false, //查看状态
            pageNo:1,
            hasNextPage:true,
            totalCount:0,
            pageSize:10,
            activeModal:false,
            modalTitle:'新建账号',
            column:[
              {
                title:'账号',
                key:'loginName',
                align:'center'
              },{
                title:'手机',
                key:'mobile',
                align:'center'
              },{
                title:'角色',
                key:'roleName',
                align:'center'
              },{
                title:'状态',
                key:'state',
                align:'center'
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;

                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click(){
                          let id =params.row.id;
                          _this.activeModal=true;
                          _this.editPwdInput=false;
                          _this.view=true;
                          _this.modalTitle='查看账号';
                          _this.getAccountInfo(id);
                        }
                      }
                    },'查看'),
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click(){
                          let id =params.row.id;
                          _this.activeModal=true;
                          _this.editPwdInput=false;
                          _this.view=false;
                          _this.modalTitle='编辑账号';
                          _this.getAccountInfo(id);
                        }
                      }
                    },'编辑')
                  ]);

                }
              }
            ],
            accountList:[],
            roleLists:[],
            accountForm:{
              loginName:'',
              password:'', 
              mobile:'',
              type:'',
              isOpen:'Y',
              roleId:'',
              callCenterId:'',
              id:'',
            },
            accountRule:{
              loginName:[{required:true,message:'请输入账号名',trigger:'blur'}],
              password:[{required:true,message:'请输入密码',trigger:'blur'},
                {validator:minLenVal,message:'密码应为6-10位字母或数字',trigger:'blur'},
              ],
              mobile:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {validator:validateTel,trigger:'blur'}
              ],
              roleId:[{required:true,message:'请选择账户角色',trigger: 'change'}]
            }
          }

      },
      methods:{
        openModalNew(){
          this.view=false;
          this.modalTitle='新建账号';
          this.accountForm={
            loginName:'',
            password:'',
            mobile:'',
            isOpen:'Y',
            roleId:'',
            id:'',
            callCenterId:'',
            type:''
          };
          this.activeModal=true;
          this.editPwdInput=true;
        },
        getLists(){
          this.$http.get(`/user/list`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.totalCount=data.totalCount;
                this.hasNextPage=data.hasNextPage;
                if(this.hasNextPage){
                  this.pageNo=data.nextPage;
                }
                this.accountList=data.list;
              }else{
                console.log('账户管理列表：'+res.data.msg);
              }
            })
        },
        //获取账号信息
        getAccountInfo(id){
          this.$http.get(`/user/info?id=${id}`)
            .then(res=>{
              if(res.data.code===0){
                this.accountForm=res.data.data;
                this.accountForm.password='111111'; //默认待清除密码

                // this.accountForm.isOpen=this.accountForm.isOpen==='Y'?true:false;
              }else{
                this.$Message.error(res.data.msg);
              }
            })
        },
        //获取角色列表
        getRoleLists(){
          this.$http.get(`/role/list`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.roleLists=data;
              }
            })
        },
        //保存账号
        saveAccount(){
          let account = this.accountForm;
          let url = '';
          if(account.id.length>0){
            url='/user/edit'
          }else{
            url='/user/add'
          }
          this.loadingSend=true;
          this.$refs['accountForm'].validate(valid=>{
            if(valid){
              if(account.password==='111111'){
                delete account.password;
              }
              this.$http.post(url,{...account}).then(res=>{
                if(res.data.code===0){
                  this.$Message.success('保存成功');
                  this.activeModal=false;
                  this.editPwdInput=false;
                  this.getLists();
                }else{
                  this.$Message.error(res.data.msg);
                }
                this.loadingSend=false;
              });
            }else{
              this.loadingSend=false;
            }
          })

        },
        editPwd(){
          this.accountForm.password='';
          this.editPwdInput=true;
        },
        modalChange(visible){
          if(!visible){
            this.accountForm={
              loginName:'',
              password:'',
              mobile:'',
              isOpen:'Y',
              roleId:'',
              id:'',
              callCenterId:'',
              type:''
            };
            this.$refs['accountForm'].resetFields();

          }
        }

      },
      mounted(){
          this.getLists();
          this.getRoleLists();
      }
    }
</script>
