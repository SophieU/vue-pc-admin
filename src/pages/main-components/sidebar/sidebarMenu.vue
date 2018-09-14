<style scoped lang="scss">
  @import './menu.scss';
</style>
<template>
  <Menu accordion ref="sideMenu" :active-name="$route.name" :open-names="openNames" theme="dark" width="auto" @on-select="changeMenu">
    <Submenu v-for="item in menuList" :name="item.name" :key="item.name">
      <template slot="title">
        <Icon  :type="item.icon" :size="16"></Icon>
        <span class="layout-text">{{item.title}}</span>
      </template>
      <template v-for="child in item.children" >
        <MenuItem :name="child.name" :key="'menuitem'+child.name" v-if="!child.children">
          <Icon size="16" :type="child.icon" :key="'icon'+child.name"></Icon>
          <span class="layout-text" :key="'title'+child.name">{{child.title}}</span>
        </MenuItem>
        <Submenu :name="child.name" v-else-if="child.children&&child.children.length>0">
          <template slot="title">
            <Icon :type="child.icon" :size="16"></Icon>
            <span class="layout-text">{{child.title}}</span>
          </template>
          <template v-for="sub in child.children" >
            <MenuItem :name="sub.name" :key="'menuitem'+sub.name" >
              <Icon size="16" :type="sub.icon" :key="'icon'+sub.name"></Icon>
              <span class="layout-text" :key="'title'+sub.name">{{sub.title}}</span>
            </MenuItem>
          </template>
        </Submenu>
        <!--<MenuGroup :title="child.group" v-if="child.children">-->
          <!--<template v-for="sub in child.children">-->
              <!--<MenuItem :name="sub.name" :key="'menuitem'+sub.name">-->
                <!--<Icon size="16" :type="sub.icon" :key="'icon'+sub.name"></Icon>-->
                <!--<span class="layout-text" :key="'title'+sub.name">{{sub.title}}</span>-->
              <!--</MenuItem>-->
          <!--</template>-->
        <!--</MenuGroup>-->
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
      methods:{
        changeMenu(active){
          this.$emit('on-change',active);
        },

      },
      //手动更新菜单展开项
      updated(){
        this.$nextTick(()=>{
          if(this.$refs.sideMenu){
            this.$refs.sideMenu.updateOpened();
          }
        })
      }
    }
</script>


