<style lang="scss">
  @import './main.scss';
  .main-header-con{
    background-image:url('./home/header-bg.jpg');
    background-repeat:no-repeat;
    background-size:100% 100%;
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
            <Icon color="#fff" type="md-menu" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <!--面包导航-->
          <Dropdown style="margin-left: 20px" @on-click="selectVillage">
            <Button ghost type="default" :class="'ghost-btn'">
                {{!curVillage?'选择小区':curVillage}}

              <Icon type="ios-arrow-down" />
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

          <message-tip v-model="mesCount"></message-tip>
          <div class="user-dropdown-menu-con">
            <Row class="user-dropdown-innercon" type="flex" justify="end" align="middle">
              <Dropdown>
                <a href="javascript:void(0)">
                  <span class="main-user-name">13708044289</span>
                  <Icon color="#fff" type="ios-arrow-down" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>个人中心</DropdownItem>
                  <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar style="background-color: #87d068;margin-left:15px;" icon="ios-person" />
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
  import messageTip from './main-components/message-tip'
  import util from '../libs/util'
  import http from '../libs/api'

    export default {
        name: "Main",
      components:{
        sidebar,
        breadcrumbNav,
        tagsPageOpened,
        messageTip
      },
      data:()=>{
          return {
            collapse:false, //菜单收起状态
            mesCount:1,
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
            return this.$store.state.app.pageOpenedList; //打开的页面标签组合
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
          this.$store.commit('updateMenulist');
          let pathArr = util.setCurrentPath(this,this.$route.name);
          if(pathArr.length>=2){
            this.$store.commit('addOpenSubmenu',pathArr[1].name); //展开子菜单
          }
          // this.userName=Cookie.get('user');
          this.checkTag(this.$route.name);
          this.checkScreen();

        },
        handleSubmenuChange(val){
          // console.log(val)
        },
        //选择小区
        selectVillage(name){
          this.$store.commit('setCurVillage',name);

          // this.$store.state.app.curVillage=name;
          console.log(this.$store.state.app.curVillage)
        },
        checkTag (name) {
          //打开一个标签（如关闭一个后，打开最近的）
          let openpageHasTag = this.pageTagsList.some(item => {
            if (item.name === name) {
              return true;
            }
          });
          if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
            util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
          }
        },
        checkScreen(){
          let screenWidth = document.body.clientWidth;
          if(screenWidth<1200){
            this.collapse=true;
          }else{
            this.collapse=false;
          }
        },
        //全局消息提醒
        sosTips(){
          let vm = this;
          this.$Notice.warning({
            title:'报警提示',
            duration: 0,
            name:'sosTip',
            render:h=>{
              return h('div',[
                h('span','当前有紧急报警信号，请点击确定前往查看！'),
                h('Button',
                  {
                    props:{
                      type:'primary',size:'small'
                    },
                    style:{'marginTop':'15px'},
                    on:{
                      click:()=>{
                        vm.$router.push({name:'sos'})
                        vm.$Notice.close('sosTip')
                      }
                    }
                  },

                  '前往查看',)
              ])
            }
          })
        }
      },
      mounted(){
          this.init();
          window.addEventListener('resize',this.checkScreen);
         //测试全局提醒sos功能
          /*setTimeout(()=>{
            this.sosTips()
          })*/
      },
      created(){
        //显示 打开的页面列表
        this.$store.commit('setOpenedList');
      },

      watch:{
          '$route'(to){
            this.$store.commit('setCurrentPageName',to.name);
            let pathArr = util.setCurrentPath(this,to.name);
            if (pathArr.length > 2) {
              this.$store.commit('addOpenSubmenu', pathArr[1].name);
            }
            this.checkTag(to.name);
            localStorage.currentPageName = to.name;
          },
      }
    }
</script>



