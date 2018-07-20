<template>
    <Breadcrumb  separator=">">
      <BreadcrumbItem v-for="item in currentPath"
                      :href="item.path"
                      :key="item.name"

      >{{itemTitle(item)}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumb-nav",
        data:()=>{
          return {
            currentPath:[
              {
                title: '首页',
                path: '##',
                name: 'home_index'
              },{
              path:'##',
                name:'one',
                title: '一级',
              },{
                path:'##',
                name:'two',
                title: '一级',
              }
            ]
          }
        },
      methods:{
          itemTitle(item){
            return item.title;
          }
      }
    }
</script>

<style scoped>

</style>
