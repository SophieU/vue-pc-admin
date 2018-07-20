<template>
  <div class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu v-show="!collapse"></sidebar-menu>
    <sidebar-menu-collapse v-show="collapse"></sidebar-menu-collapse>
  </div>
</template>

<script>
  import sidebarMenu from './sidebarMenu'
  import sidebarMenuCollapse from './sidebarMenuCollapse'

  export default {
    name: "autoMenu",
    components:{
      sidebarMenu,
      sidebarMenuCollapse
    },
    props:{
      collapse:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>

</style>
