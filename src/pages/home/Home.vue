<template>
  <div class="home">
    <Layout>
      <Header :class="'home-header'">
        <Menu mode="horizontal" :class="'header-menu'" active-name="1">
          <div class="layout-logo"><img src="./logo03.png" alt=""></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
    </Layout>
    <Layout >
      <Sider :class="sideMenu" ref="sideMenu"  width="240"  collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="collapse">
          <Icon @click.native="collapsedSider" :class="rotateIcon"  type="navicon-round" size="24"></Icon>
        </div>
        <Menu :class="menuitemClasses" active-name="1-2" theme="dark" width="auto" :open-names="['1']">
          <Submenu name="1" :class="'sub-menu'">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                <span>Item 1</span>
            </template>
            <MenuItem  v-show="!isCollapsed"  name="1-1">Option 1</MenuItem>
            <MenuItem  v-show="!isCollapsed" name="1-2">Option 2</MenuItem>
            <MenuItem  v-show="!isCollapsed" name="1-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="2" :class="'sub-menu'">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              <span>Item 2</span>
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <MenuItem name="1-3" :class="'sub-menu'">
            <Icon type="settings"></Icon>
            <span>Option 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout :style="!this.isCollapsed?{marginLeft:'240px',padding:'0 24px 24px'}:{marginLeft:'78px',padding:'0 24px 24px'}" >

        <Breadcrumb :style="{margin: '24px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>

  </div>
</template>

<script>
    export default {
        name: "Home",
      data:()=>{
          return {
            isCollapsed:false
          }
      },
      computed:{
        menuitemClasses(){
          return [
            'menu-item',
            this.isCollapsed?'collapsed-menu':''
          ]
        },
        rotateIcon(){
          return [
            'menu-icon',
            this.isCollapsed ? 'rotate-icon' : ''
          ]
        },
        sideMenu(){
          return 'side-menu'
        },
      },
      methods:{
        collapsedSider () {
          this.$refs.sideMenu.toggleCollapse();
        }
      }
    }
</script>

<style scoped lang="scss">
  .home{
    background: #f5f7f9;
    overflow: hidden;

  }
  .home-header{
    background: url('./header-bg.jpg') no-repeat center center;
    background-size:100% 100%;
    height: 70px;
    padding: 0 30px;
    .layout-logo{
      display: inline-block;
      height: 85%;
      img{
        display: block;
        height: 100%;
      }
    }
    .header-menu{
      background: transparent;
      height: 100%;
      display: flex;
      align-items:center;
      justify-content: space-between;
      &:after{
        content: '';
        display: none;
      }
    }
  }

  /*.layout-nav{*/
    /*width: 420px;*/
    /*margin: 0 auto;*/
    /*margin-right: 20px;*/
  /*}*/
  //折叠菜单
  .collapse{
    text-align: center;
    padding: 8px 0;
    border-bottom: 1px solid rgb(55, 61, 65);
    .menu-icon{
      transition:all .3s;
      cursor: pointer;
      color: #fff;
    }
    .rotate-icon{
      transform:rotate(-90deg);
    }
  }

  .side-menu{
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    background: #37445a;
    overflow-y: auto;
    overflow-x:hidden;
    .menu-item{
      span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
      }
      i{

        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;

      }

    }
    .collapsed-menu{
      span{
        width: 0;
        transition: width .2s ease;
      }
      i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
        &.ivu-icon-ios-arrow-down{
          width: 0;
        }
      }

    }
  }
  //主内容

  @media screen and (max-width: 1200px){
    .home-header{
      height: 50px;
    }
    .side-menu{
      top: 50px;
    }
  }

</style>
