<style scoped lang="scss">
  @import './main.scss';
</style>
<template>
  <div class="main" :class="{'main-hide-text':collapse}">
    <div class="sidebar-menu" :style="{width:collapse?'60px':'200px',overflow:collapse?'visible':'auto'}">
      <sidebar>
        <div slot="top"  class="logo-con">
          <img v-show="!collapse" src="../assets/bg/logo03.png" alt="">
          <img v-show="collapse" src="../assets/bg/logo.png" alt="">
        </div>
      </sidebar>
    </div>
    <div class="main-header-con" :style="{paddingLeft:collapse?'60px':'200px'}">
      <div class="main-header">
        <!--收缩按钮-->
        <div class="navicon-con">
          <Button type="text" @click="toggleCollapse" :style="{transform:'rotateZ('+(this.collapse?'-90':'0')+'deg)'}">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <!--面包导航-->
          <breadcrumb-nav></breadcrumb-nav>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <Row class="user-dropdown-innercon" type="flex" justify="end" align="middle">
              <Dropdown>
                <a href="javascript:void(0)">
                  13708044289
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>退出</DropdownItem>
                  <DropdownItem>炸酱面</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar style="background-color: #87d068" icon="person" />
            </Row>
          </div>
        </div>
        <div class="tags-con">
          <tags-page-opened></tags-page-opened>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from './main-components/sidebar/sidebar'
  import breadcrumbNav from './main-components/breadcrumb-nav'
  import tagsPageOpened from './main-components/tags-page-opened'
    export default {
        name: "Main",
      components:{
        sidebar,
        breadcrumbNav,
        tagsPageOpened
      },
      data:()=>{
          return {
            cachePage:true,//后续改为computed属性
            collapse:false, //菜单收起状态
          }
      },
      methods:{
        toggleCollapse(){
          this.collapse=!this.collapse;
        }
      }
    }
</script>


