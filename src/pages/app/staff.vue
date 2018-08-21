
<style scoped lang="scss">
  @import "app-manage.scss";
</style>

<template>
    <div class="stuff-manage">
      <Card>
        <div class="filter-form">
          <Form ref="filterForm" inline :label-width="80">
            <FormItem label="业主名称：">
              <Input placeholder="请输入业主名称" />
            </FormItem>
            <FormItem label="投诉时间：">
              <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="状态：">
              <Select v-model="filterForm.status" style="width:200px">
                <Option value="">未处理</Option>
              </Select>
            </FormItem>
            <FormItem >
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Row :gutter="16" style="margin-top:15px;">
        <Col span="6">
          <Card>
            <div>
              <ul ref="treeBox" id="treeBox" class="ztree"></ul>
            </div>
          </Card>
        </Col>
        <Col span="18">
          <Card>
            <div class="clearfix mb-15">
              <div class="pull-right">
                <Button type="primary" icon="md-add" @click="staffModal=true">新增人员</Button>
              </div>
            </div>
            <div class="table-wrapper">
              <Table size="small" :columns="staffListsColumn" :data="staffLists" border ></Table>
              <div class="pagination">
                <Page :total="40" size="small" show-elevator show-sizer />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <!--新增人员-->
      <Modal
        v-model="staffModal"
        :title="staffTitle"
      >
        <Form :model="staffForm" :label-width="100" :rules="staffRule">
          <FormItem label="姓名" prop="name">
            <Input v-model="staffForm.name" style="width: 250px"></Input>
          </FormItem>
          <FormItem label="登录手机号" prop="tel">
            <Input v-model="staffForm.tel" style="width: 250px"></Input>
          </FormItem>
          <FormItem label="登录密码" prop="pwd">
            <Input v-model="staffForm.pwd" style="width: 250px"></Input>
          </FormItem>
          <FormItem label="所属部门" prop="part">
            <Input v-model="staffForm.part" disabled style="width: 250px"></Input>
          </FormItem>
          <FormItem label="职务" prop="work">
            <Input v-model="staffForm.work" style="width: 250px"></Input>
          </FormItem>
          <FormItem label="是否部门主管" prop="leader">
            <RadioGroup v-model="staffForm.leader">
              <Radio label="是">
                <span>是</span>
              </Radio>
              <Radio label="否">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="入职时间" prop="enterTime">
            <DatePicker v-model="staffForm.enterTime" type="date" style="width: 250px"></DatePicker>
          </FormItem>
          <FormItem label="身份" prop="role">
            <div class="form-tag" :class="staffForm.role==='staff'?'checked':''" @click="checkRole('staff')">
              <span class="check-text">普通员工</span>
            </div>
            <div class="form-tag" :class="staffForm.role==='leader'?'checked':''" @click="checkRole('leader')">
              <span class="check-text">管理人员</span>
            </div>
          </FormItem>
          <FormItem label="开通应用" prop="app">
            <div class="form-tag" :class="staffForm.app.indexOf('maintain')>-1?'checked':''" @click="checkApp('maintain')">
              <span class="check-text">维修</span>
            </div>
            <div class="form-tag" :class="staffForm.app.indexOf('guard')>-1?'checked':''" @click="checkApp('guard')">
              <span class="check-text">保安</span>
            </div>
            <div class="form-tag" :class="staffForm.app.indexOf('clean')>-1?'checked':''" @click="checkApp('clean')">
              <span class="check-text"  >保洁</span>
            </div>
            <div class="form-tag" :class="staffForm.app.indexOf('afforest')>-1?'checked':''" @click="checkApp('afforest')">
              <span class="check-text" >保绿</span>
            </div>
          </FormItem>
          <FormItem label="选择类目" prop="category" v-if="staffForm.app.indexOf('maintain')>-1">
            <!--<Button type="primary" >选择类目</Button>-->
            <textarea @click="categoryModal=true" class="textarea" rows="3" style="width: 300px;"></textarea>
          </FormItem>
        </Form>
      </Modal>
      <!--类目弹层-->
      <Modal
        v-model="categoryModal"
        title="选择类目"
      >
        <div class="ztree" id="cateGoryTree"></div>
      </Modal>
      <!--删除提醒-->
      <Modal
        v-model="deleteModal"
      >
        <div class="delete-modal">
          <!--<Icon type="ios-alert" />-->
          <h4>警告</h4>
          <p>数据删除后，将不可恢复，确认要删除吗？？</p>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "stuff-manage",
        data(){
            return {
              deleteModal:false,
              categoryModal:false,
              staffModal:false,
              staffTitle:'新增人员',
              filterForm:{
                status:null
              },
              staffForm:{
                role:'staff',
                app:[]
              },
              staffRule:{
                name:[{required:true}],
                tel:[{required:true}],
                pwd:[{required:true}],
                part:[{required:true}],
                work:[{required:true}],
                leader:[{required:true}],
                enterTime:[{required:true}],
                role:[{required:true}],
                app:[{required:true}],
              },
              treeDatas:[
                {name:'青秀城',open:true,children:[
                    {name:'财务部群'},
                    {name:'客服部群'},
                    {name:'后勤部群'},
                    {name:'人事部群'},
                    {name:'保安队群'},
                    {name:'保洁队群'},
                    {name:'维修队群'},
                    {name:'保绿队群'},
                  ]}
              ],
              staffListsColumn:[
                {
                  type: 'index',
                  title:'编号',
                  width:70,
                },{
                  title:'姓名',
                  key:'name',
                  align:'center',
                  width:100
                },{
                  title:'登录手机',
                  align:'center',
                  key:'tel',
                  width:120
                },{
                  title:'身份',
                  key:'role',
                  align:'center',
                  width:120
                },{
                  title:'部门',
                  key:'part',
                  align:'center',
                  width:120
                },{
                  title:'职务',
                  key:'work',
                  align:'center',
                  width:120
                },{
                  title:'是否部门主管',
                  key:'isLeader',
                  tooltip:true,
                  align:'center',
                  width:120
                },{
                  title:'开通应用',
                  key:'application',
                  align:'center',
                  width:100
                },{
                  title:'创建日期',
                  key:'createDate',
                  tooltip:true,
                  align:'center',
                  width:180
                },{
                  title:'操作',
                  width:130,
                  fixed:'right',
                  render:(h,params)=>{
                    let _this = this;
                    return h('div',[
                      h('Button',{
                        props:{
                          type:'primary',
                          size:'small'
                        },
                        style:{
                          marginRight:'8px'
                        },
                        on:{
                          click:function(){
                            // this.remove(params.index)
                            _this.staffModal=true;
                            console.log(params)
                          }
                        }
                      },'编辑'),
                      h('Button',{
                        props:{
                          type:'error',
                          size:'small'
                        },
                        on:{
                          click:function(){
                            _this.deleteModal=true;
                            console.log(params)
                          }
                        }
                      },'删除')
                    ]);
                  }
                }
              ],
              staffLists:[{
                index:1,
                name:'红三',
                tel:'18112311231',
                role:'普通员工',
                part:'做事',
                work:'维修',
                isLeader:'否',
                application:'维修',
                createDate:'2018-08-02 14:35:15',
              }]
            }
        },
      mounted(){
        this.setStaffTree();
        this.setCateGoryTree();
      },
      methods:{
          test(){
            console.log(1)
            this.categoryModal=true
          },
        checkRole(val){
            this.staffForm.role=val;
            this.staffForm.app=[];
          },
        checkApp(val){
          let app = this.staffForm.app;
          if(app.indexOf(val)>-1){
            let index = app.indexOf(val);
            app.splice(index,1);
          }else{
            if(this.staffForm.role==='leader'){
              this.staffForm.app.push(val);
            }else{
              this.staffForm.app=[val];
            }
          }
        },
          //设置人员树
          setStaffTree(){
            const addHoverDOM=(tree,treeNode)=>{
              let sObj = $("#" + treeNode.tId + "_span");
              let addTitle = '添加';
              if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
              let addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                + "' title='" + addTitle + "' onfocus='this.blur();'></span>";
              sObj.after(addStr);
              let btn = $("#addBtn_" + treeNode.tId);
              if (btn) btn.bind("click", function () {//绑定添加按钮事件
                let zTree = $.fn.zTree.getZTreeObj("treeBox");
                zTree.addNodes(treeNode, {id: 1, parentId: treeNode.id, name: "自定义"});
                // let param = {
                //   orgName: "自定义",
                //   parentId: treeNode.id,
                //   biotopeId: $scope.search.biotopeId
                // };

                // ajaxService.post("/property/org/addDep", param, function (data) {
                //   zTree.addNodes(treeNode, {id: data.id, parentId: treeNode.id, name: "自定义"});
                // });
                return false;
              });
            }
            /*鼠标移开时,隐藏按钮*/
            function removeHoverDom(treeId, treeNode) {
              $("#addBtn_" + treeNode.tId).unbind().remove();
            }


            let setting = {
              check:{
                enable:true
              },
              edit:{
                enable:true,
                addTitle:'添加',
                removeTitle:'删除',
                renameTitle:'重命名',
              },
              view:{
                addHoverDom:addHoverDOM,
                removeHoverDom:removeHoverDom
              }
            };
            let zNode=this.treeDatas;
            let zTreeObj=null;
            this.$nextTick(()=>{
              let treeBox = this.$refs.treeBox;
              zTreeObj = $.fn.zTree.init($("#treeBox"), setting, zNode);
            })
          },
          //选择类目树
        setCateGoryTree(){
          let cateGoryTree = null;
          let _this = this;
          let setting = {
            check:{
              enable:true
            },
            callback:{
              onCheck:function(event,treeId,treeNode){
                console.log(treeNode)
              }
            }
          }
          let zNodes=[
            {name:'水',open:true,children:[
                {name:'水龙头维修'},
                {name:'水管小广告'},
              ]},
            {name:'电',open:true,children:[
                {name:'接电线'},
                {name:'装插座'}
              ]},
            {name:'气',children:[
                {name:'天然气检查'}
              ]},
          ];
          cateGoryTree=$.fn.zTree.init($("#cateGoryTree"),setting,zNodes);
        }
      }
    }
</script>
