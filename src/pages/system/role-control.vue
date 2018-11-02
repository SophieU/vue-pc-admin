<template>
  <div>
    <Card style="padding-bottom: 30px;">
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button type="primary" @click="goback()">返回上一页</Button>
        </div>
        <div class="pull-right">
          <Button @click="goback" v-if="!viewInfo">取消</Button>
          <Button type="primary" v-if="viewInfo" @click="viewInfo=false">编辑</Button>
          <Button v-if="!viewInfo" type="primary" @click="saveThis">保存</Button>
        </div>
      </div>
      <div class="role-panel">
        <Form :model="roleInfo" label-position="top">
          <Row :gutter="40">
            <Col span="12">
              <h4>基础信息</h4>
                <FormItem label="角色名称">
                  <Input :disabled="viewInfo" v-model="roleInfo.name"/>
                </FormItem>
                <FormItem label="角色描述">
                  <Input :disabled="viewInfo" v-model="roleInfo.description" type="textarea" :rows="10"/>
                </FormItem>
            </Col>
            <Col span="12">
              <h4>功能权限</h4>
              <!--<span>{{authListsCheck}}</span>-->
              <Tree ref="authTree" :data="authLists" show-checkbox multiple @on-check-change="checkNodes"></Tree>
             <!-- <dl class="auth-lists">
                <CheckboxGroup v-model="authListsCheck">
                  <template v-for="(auth,index) in authLists">
                    <dt><Checkbox  @click.prevent.native="checkOne($event,auth)" :disabled="viewInfo" :label="auth.id">{{auth.name}}</Checkbox></dt>
                    <dd v-if="auth.children.length>0">
                      <template  v-for="authChild in auth.children" v-if="authChild.children.length<=0">
                        <Checkbox @click.prevent.native="checkOne($event,authChild)" :label="authChild.id" :disabled="viewInfo" >{{authChild.name}}</Checkbox>
                      </template>
                      <template v-else>
                        <div class="third-auth">
                          <div class="third-auth-title"><Checkbox @click.prevent.native="checkOne($event,authChild)" :label="authChild.id" :disabled="viewInfo">{{authChild.name}}</Checkbox></div>
                          <ul class="auth-lists">
                            <li v-for="(authGround,ind) in authChild.children" :key="ind"  >
                              <Checkbox :label="authGround.id"  :disabled="viewInfo" >{{authGround.name}}</Checkbox>
                            </li>
                          </ul>
                        </div>
                      </template>
                    </dd>
                  </template>
                </CheckboxGroup>


              </dl>-->
             <!-- <ul class="auth-lists">
                <li><Checkbox :disabled="viewInfo">服务网点管理</Checkbox></li>
                <li>
                  <CheckboxGroup >
                    <Checkbox :disabled="viewInfo" label="查看服务网点"></Checkbox>
                    <Checkbox :disabled="viewInfo" label="编辑服务网点"></Checkbox>
                    <Checkbox :disabled="viewInfo" label="添加服务网点"></Checkbox>
                  </CheckboxGroup>
                </li>
                <li >
                  <Checkbox :disabled="viewInfo">管理服务区域</Checkbox>
                </li>
              </ul>-->
            </Col>
          </Row>
        </Form>


      </div>
    </Card>
  </div>
</template>

<script>
    export default {
        name: "role-control",
      data(){
        return {
          type:1, //页面操作类型—— 1:新建，0：编辑，2：查看
          id:'',
          viewInfo:false, //查看/编辑 状态
          roleInfo:{
            name:'',
            description:'',
            resourceList:'',
            id:'',
            callCenterId:'',
          },
          authLists:[],
          authListsCheck:[],
          menuLists:[
            {
              title: 'parent 1',
              expand: true,
              selected: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true,
                  children: [
                    {
                      title: 'leaf 1-1-1',
                      disabled: true
                    },
                    {
                      title: 'leaf 1-1-2'
                    }
                  ]
                },
                {
                  title: 'parent 1-2',
                  expand: true,
                  children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      methods:{
          checkNodes(arr){
            this.authListsCheck=arr.map(item=>{
              return item.id;
            })
          },
          //处理选中点的子节点选择判断
       /*   iteratorCheck(node){
            let nodeCollection = [];
            if(node.children&&node.children.length>0){
              node.children.forEach(item=>{
                nodeCollection.push(item.id);
                let childCheck = this.iteratorCheck(item);
                nodeCollection.push(...childCheck);
              })
            }
            return nodeCollection;
          },
          checkOne(event,node){
            let isChecked = event.target.checked;
            let checkResult = this.iteratorCheck(node);
            checkResult.push(node.id);
            if(isChecked===undefined){
              return;
            }
            if(isChecked){
              // this.authListsCheck=this.authListsCheck.push(...checkResult);
              this.authListsCheck.push(...checkResult);
            }else{
              let temp=this.authListsCheck.filter(item=>{
                let inResult = false;
                checkResult.forEach(res=>{
                  if(item===res){
                    inResult=true;
                  }
                });

                if(!inResult){
                  return item;
                }
              });
              this.authListsCheck=temp;
            }
          },*/
        goback(){
          this.$router.back();
        },
        getRoleInfo(id){
          this.$http.get(`/role/info?id=${id}`)
            .then(res=>{
              if(res.data.code===0){
                this.roleInfo=res.data.data;
                this.authListsCheck=res.data.data.resourceList;
                this.getAuth();
              }else{
                this.$Message.error(res.data.msg)
              }
            })
        },
        saveThis(){
          let type = this.type;
          let url='';
          let params=this.roleInfo;
          if(type===1){
            url='/role/add'
          }else{
            url='/role/edit'
          }
          this.$http.post(url,{
            name:params.name,
            description:params.description,
            resourceList:this.authListsCheck,
            id:params.id
          }).then(res=>{
            if(res.data.code===0){
              this.$Message.success('保存成功');
              this.$router.push({name:'role'});
            }else{
              this.$Message.error(res.data.msg);
            }
          })
        },
        getAuth(){
          this.$http.get(`/resource/list`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                let checkedLists = this.authListsCheck;
                let transformRes = {};
                let _this = this;
               if(checkedLists.length>0){
                 transformRes = this.iteratorTree(data,function(item){
                   item.title=item.name;
                   item.expand=true;
                     item.disabled=_this.viewInfo;
                   checkedLists.forEach(check=>{
                     if(item.id===check){
                       item.checked=true;
                     }
                   })
                 })
               }else{
                 transformRes = this.iteratorTree(data,function(item){
                   item.title=item.name;
                   item.expand=true;
                   item.disabled=_this.viewInfo;
                   // item.selected=true;
                 });
               }

                  this.authLists=transformRes;
              }else{
                console.log(res.data.msg);
              }
            })
        },
        //深度遍历
        iteratorTree(obj,cb){
          let result = [];
          let _this = this;
            if(obj instanceof Array){
             result= obj.map(item=>{
                typeof cb==='function'&&cb(item);
                // item.disabled=_this.viewInfo;
                if(item.children&&item.children.length>0){
                  this.iteratorTree(item.children,cb)
                }
                return item;
              })
            }
          return result;

        }
      },
      mounted(){
          /*
          type:角色类型  1:新建，0：编辑，2：查看
          * */
          this.type = this.$route.params.type;
          this.id = this.$route.params.id;

          if(this.type===0){
            this.getRoleInfo(this.id);
          }else if(this.type===2){
            this.viewInfo=true;
            this.getRoleInfo(this.id);
          }else{
            this.getAuth();
          }

          // this.$store.app.
      },
      watch:{
        viewInfo(val){
          this.getAuth();
        },
        authListsCheck(val){
         /* let authLists = this.authLists;
          let hasAuthLists = val;
          let result = this.iteratorTree(authLists,function(item){
            for(let i =0;i<hasAuthLists.length;i++){
              if(item.id==hasAuthLists[i]){
                // item.selected=true
                item.checked=true
              }
            }
          })
          console.log(result)

          this.authLists=result;*/
        }
      }
    }
</script>

<style scoped lang="scss">
  h4{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .role-panel{
    position: relative;
    .footer-right{
      position: absolute;
      bottom: 15px;
      right: 50%;
      transform: translateX(335%);
    }
    .auth-lists{
      dt{
        color: #000;
        font-size: 16px;
      }
      dd{
        padding-left: 20px;
        font-size: 15px;
      }
      li{
        display: inline-block;
      }
      /*margin-bottom: 50px;*/
    }
    .third-auth{
      .auth-lists{
        padding-left: 20px;
      }
    }
  }
</style>
