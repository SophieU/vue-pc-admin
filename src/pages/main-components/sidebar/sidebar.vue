<template>
  <div class="ivu-shrinkable-menu">

    <slot name="top"></slot>
    <sidebar-menu v-show="!collapse"
                  :menu-list="menuList"
                  :open-names="openNames"
                  @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-collapse
        v-show="collapse"
        :menu-list="menuList"
        :open-names="openNames"
        @on-change="handleChange"
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
      },
      openNames:{
        type:Array
      }
    },
    methods:{
      handleChange(name){
        let willPush = true;
        if(this.beforePush!==undefined){
          if(!this.beforePush(name)){
            willPush=false;
          }
        }
        if(willPush){
          this.$router.push({
            name:name
          });
        }
        this.$emit('on-change',name)
      }
    },
  }
</script>

<style scoped lang="scss">
@import '../../main.scss';
</style>
