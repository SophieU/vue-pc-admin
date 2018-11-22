<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" icon="md-add-circle" @click="goControl(1)">新建</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :data="roleLists" :columns="roleColumns"></Table>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "role-admin",
      data(){
          return{
            roleColumns:[
              {
                title:'角色名',
                key:'name',
                align:'center'
              },{
              title:'角色描述',
                key:'description',
                align:'center'
              },{
              title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;
                  let id = params.row.id;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      },
                      style:{marginRight:'8px'},
                      on:{
                        click(){
                          _this.viewInfo=true;
                          _this.goControl(2,id);
                        }
                      }
                    },'查看'),
                     h('Button',{
                      props:{
                        type:'success',
                        size:'small'
                      },
                       on:{
                         click(){
                           _this.viewInfo=true;
                           _this.goControl(0,id);
                         }
                       }
                    },'编辑'),

                  ])
                }
              }
            ],
            roleLists:[],

          }
      },
      methods:{
          goControl(type,id){
            /*
            * @params: type:跳转类型，1:新建，0：编辑，2：查看
            * */
            this.$router.push({name:'editRole',query:{type:type,id:id}});
          },
        getRoleLists(){
          this.$http.get(`/role/list`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.roleLists=data;
              }
            })
        },
       /* getRoleInfo(id){
            this.$http.get(`/role/info?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  this.roleInfo={

                  }
                }
              })
        }*/
      },
      mounted(){
        this.getRoleLists();
      }
    }
</script>

<style scoped>

</style>
