<template>
  <div>
    <Card>
      <h3 slot="title">角色列表</h3>
      <div>
        <Table :columns="columns" ></Table>
      </div>
    </Card>
  </div>
</template>

<script>
    export default {
        name: "role-admin",
      data(){
          return{
            columns:[
              {title:'序号',type:'index'},
              {title:'角色名称',key:'roleName'},
              {title:'关联账号',key:'relateAccount'},
              {title:'操作',render(h,params){
                return h('div',[
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    }
                  },'编辑'),
                   h('Button',{
                    props:{
                      type:'warning',
                      size:'small'
                    }
                  },'删除'),

                ])
                }},
            ],
            roleLists:[
              {roleName:'物业财务',relateAccount:'15812341234'}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
