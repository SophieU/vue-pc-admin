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
                key:'desc',
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
                      }
                    },'查看'),
                     h('Button',{
                      props:{
                        type:'text'
                      }
                    },'编辑'),

                  ])
                }
              }
            ],
            roleLists:[
              {
                name:'admin',
                desc:'管理员'
              }
            ],
          }
      },
      methods:{
          goControl(type){
            /*
            * @params: type:跳转类型，1:新建，0：编辑，2：查看
            * */
            this.$router.push({name:'roleControl'})
          }
      }
    }
</script>

<style scoped>

</style>
