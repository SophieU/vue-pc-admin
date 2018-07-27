<template>
  <Menu accordion ref="sideMenu" :active-name="$route.name" :open-names="openNames" theme="dark" width="auto" @on-select="changeMenu">
    <Submenu v-for="item in menuList" :name="item.name" :key="item.name">
      <template slot="title">
        <Icon :type="item.icon" :size="16"></Icon>
        <span class="layout-text">{{item.title}}</span>
      </template>
      <template v-for="child in item.children">
        <MenuItem :name="child.name" :key="'menuitem'+child.name">
          <Icon size="16" :type="child.icon" :key="'icon'+child.name"></Icon>
          <span class="layout-text" :key="'title'+child.name">{{child.title}}</span>
        </MenuItem>
      </template>
    </Submenu>
  </Menu>
</template>

<script>
    export default {
        name: "sidebarMenu",
      data:()=>{
        return{
        }
      },
      props:{
          menuList:Array,
          openNames:Array
      },
      mounted(){
          console.log(this.$route.name)
      },
      methods:{
        changeMenu(active){
          this.$emit('on-change',active);
        }
      }
    }
</script>

<style scoped lang="scss">
@import './menu.scss';
</style>
