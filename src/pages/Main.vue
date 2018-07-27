<style lang="scss">
  @import './main.scss';
  .main-header-con{
    background-image:url('./home/header-bg.jpg');
  }
</style>
<template>
  <div class="main" :class="{'main-hide-text':collapse}">
    <div class="sidebar-menu" :style="{width:collapse?'60px':'200px',overflow:collapse?'visible':'auto'}">
      <sidebar
        :menu-list="menuList"
        :open-names="openedSubmenuArr"
        :collapse = "collapse"
        @on-change="handleSubmenuChange"
      >
        <div slot="top"  class="logo-con">
          <img v-show="!collapse" src="../assets/bg/logo03.png"  key="max-logo" >
          <img v-show="collapse" src="../assets/bg/logo.png"  key="min-logo" >
        </div>
      </sidebar>
    </div>
    <!--顶部-->
    <div class="main-header-con" :style="{paddingLeft:collapse?'60px':'200px'}">
      <div class="main-header">
        <!--收缩按钮-->
        <div class="navicon-con">
          <Button type="text" @click="toggleCollapse" :style="{transform:'rotateZ('+(this.collapse?'-90':'0')+'deg)'}">
            <Icon color="#fff" type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <!--面包导航-->
          <Dropdown style="margin-left: 20px" @on-click="selectVillage">
            <Button type="ghost" :class="'ghost-btn'">
                {{!curVillage?'选择小区':curVillage}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem :key="vil" v-for="vil in village" :name="vil">{{vil}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--<div class="main-breadcrumb">-->
            <!--<breadcrumb-nav></breadcrumb-nav>-->
          <!--</div>-->
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <Row class="user-dropdown-innercon" type="flex" justify="end" align="middle">
              <Dropdown>
                <a href="javascript:void(0)">
                  <span class="main-user-name">13708044289</span>
                  <Icon color="#fff" type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>设置</DropdownItem>
                  <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar style="background-color: #87d068;margin-left:15px;" icon="person" />
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="main-content" :style="{left:collapse?'60px':'200px'}">
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
  import http from '../libs/api'
    export default {
        name: "Main",
      components:{
        sidebar,
        breadcrumbNav,
        tagsPageOpened
      },
      data:()=>{
          return {
            collapse:false, //菜单收起状态
            village:[
              "力宝大夏","南城都汇","蓝光CoCo","青秀城"
            ],

          }
      },

      computed:{
          cachePage(){
            return this.$store.state.app.cachePage;
          },
          menuList(){
              return this.$store.state.app.menuList;
          },
          openedSubmenuArr(){
              return this.$store.state.app.openedSubmenuArr;
          },
          pageTagsList(){
            return this.$store.state.app.pageOpenedList;
          },
          curVillage(){
              return this.$store.state.app.curVillage;
          }
      },
      methods:{
        toggleCollapse(){
          this.collapse=!this.collapse;
        },
        init(){
          this.$store.commit('updateMenuList');
        },
        handleSubmenuChange(val){
          console.log(val)
        },
        //选择小区
        selectVillage(name){
          this.$store.commit('setCurVillage',name);

          // this.$store.state.app.curVillage=name;
          console.log(this.$store.state.app.curVillage)
        }
      },
      mounted(){
          this.init();
      }
    }
</script>



