<template>
<div class="chat-manage">
  <Card>
    <div class="filter-form">
      <Form ref="filterForm" inline :label-width="60">
        <FormItem label="姓名">
          <Input placeholder="请输入员工姓名"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
  <Row :gutter="16" style="margin-top:15px;">
    <Col span="6">
      <Card>
        <div >
          <ul class="ztree" id="firmTree"></ul>
        </div>
      </Card>
    </Col>
    <Col span="18">
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button icon="md-add" type="primary" @click="staffTreeModal=true">添加群成员</Button>
            <Button icon="md-trash" type="warning" @click="deleteModal=true">删除群成员</Button>
            <Button icon="md-contacts" type="primary" @click="createGroupModal=true">创建群组</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :columns="staffListsColumn" :data="staffLists" border></Table>
          <div class="pagination">
            <Page :total="40" size="small" show-elevator show-sizer />
          </div>
        </div>
      </Card>
    </Col>
  </Row>
  <!--员工树-->
  <Modal v-model="staffTreeModal" title="选择员工" width="300">
    <ul class="ztree" id="staffTree"></ul>
  </Modal>
  <!--创建群组-->
  <Modal v-model="createGroupModal" title="创建群组">
    <div class="create-group">
      <Form :model="groupForm" :rules="groupRule" inline :label-width="80">
        <FormItem label="群组名称" prop="groupName">
          <Input style="width: 250px;" v-model="groupForm.groupName" placeholder="不超过8个字符" :maxlength="8"/>
        </FormItem>
        <FormItem label="群主" prop="groupLeader">
          <Input style="width: 250px;" v-model="groupForm.groupLeader" />
        </FormItem>
      </Form>
    </div>
  </Modal>
  <!--删除提醒-->
  <Modal v-model="deleteModal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>删除提醒</span>
    </p>
    <div style="text-align:center">
      <p>数据删除后，将不可恢复.</p>
      <p>确认要删除吗？？</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long  >删除</Button>
    </div>
  </Modal>

</div>
</template>

<script>
    export default {
        name: "chat",
        data(){
            return{
              staffTreeModal:false,
              deleteModal:false,
              createGroupModal:false,
              staffListsColumn:[
                {
                  type:'selection',
                  width:60
                },{
                  title:'姓名',
                  key:'name',
                },{
                  title:'群组',
                  key:'group',
                },{
                  title:'手机号',
                  key:'tel',
                },{
                  title:'权限',
                  key:'auth',
                },{
                  title:'操作',
                 render:(h,params)=>{
                    let _this = this;
                    if(params.row.auth==='群主'){
                      return h('Button',{
                        props:{
                          type:"primary",
                          size:'small'
                        }
                      },'转让群主')
                    }else{
                      return h('Button',{
                        props:{
                          type:"warning",
                          size:'small'
                        },
                        on:{
                          click:function(){
                            _this.deleteModal=true;
                          }
                        }
                      },'删除')
                    }

                 }
                },
              ],
              staffLists:[
                {
                  name:'张三',
                  group:'销售群',
                  tel:18112341234,
                  auth:'群主',
                },{
                  name:'王二',
                  group:'销售群',
                  tel:18112341234,
                  auth:'普通成员',
                }
              ],
              groupForm:{
                groupName:'',
                groupLeader:'',
              },
              groupRule:{
                groupName:[{
                  required:true,
                  message:'请输入群组名称'
                }],
                groupLeader:[{
                  required:true,
                  message:'请选择群主'
                }]
              }
            }
        },
      methods:{
          setStaffTree(){
            let staffTree=null;
            let setting = {
              check:{
                enable:true
              }
            };
            let zNodes=[
              {name:'财务部',children:[
                  {name:'张一'},
                  {name:'张一'},
                ]},
              {name:'销售部',children:[
                  {name:'张二'}
                ]}
            ];
            staffTree= $.fn.zTree.init($('#staffTree'),setting,zNodes);
          },
        setFirmTree(){
          let firmTree=null;
          let setting = {
            check:{
              enable:true
            },
            edit:{
              enable:true,
              showRemoveBtn:true,
              showRenameBtn:true
            }
          };
          let zNodes=[
            {name:'JK_未来城',open:true,children:[
                {name:'保安群',children:[
                    {name:'张小二'},
                  ]},
                {name:'保洁群',children:[
                    {name:'真干净'}
                  ]},
              ]},

          ];
          firmTree= $.fn.zTree.init($('#firmTree'),setting,zNodes);
        }
      },
      mounted(){
          this.setFirmTree();
          this.setStaffTree();
      }
    }
</script>

<style scoped>

</style>
