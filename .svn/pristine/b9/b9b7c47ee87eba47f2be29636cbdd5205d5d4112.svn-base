<template>
    <Breadcrumb  separator=">">
      <BreadcrumbItem v-for="item in currentPath"
                      :to="item.path"
                      :key="item.name"

      >{{itemTitle(item)}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumb-nav",
        data:()=>{
          return {};
        },
      props:{
        currentPath:Array,
      },
      methods:{
          itemTitle(item){
            return item.title;
          }
      },
    }
</script>

<style scoped>

</style>
