<template>
  <div class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu v-show="!collapse"
                  :menu-list="menuList"
                  :open-names="openNames"

    ></sidebar-menu>
    <sidebar-menu-collapse
        v-show="collapse"
        :menu-list="menuList"
    ></sidebar-menu-collapse>
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
      },
      menuList:{
        type:Array,
        required:true,
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../main.scss';
</style>
