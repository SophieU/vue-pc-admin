<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  html,body{
    padding: 0;
    margin: 0;
    height: 100%;
  }
#app {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei";
}
  .text-right{
    text-align:right;
  }
  /*transition定义动画*/
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;

  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    opacity: 0;
  }
  .slide-fade-enter, .slide-fade-leave
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
  }
  .slide-enter-active{
    animation: slideLeft .3s linear;
  }
  .slide-leave-active{
    animation:slideRight .3s linear;
  }
  .slide-leave,.slide-enter{
    opacity: 0;
    transform:translateX(30px)
  }
  @keyframes slideLeft {
    0%{
      transform:translateX(30px);
      opacity: 0;
    }
    100%{
      transform:translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideRight {
    0%{
      transform:translateX(0px);
      opacity: 1;
    }
    100%{
      transform:translateX(30px);
      opacity: 0;
    }
  }


  /*登录页对iview的修改*/
  .ivu-btn-primary{
    color: #fff;
    background-color: #039dff;
    border-color: #039dff;
  }
.login-container{
  .ivu-form-item-required .ivu-form-item-label:before{
    content: '';
    display: none;
  }
  .ivu-form{
    .ivu-btn{
      &:focus{
        box-shadow: none;
      }
    }
    .ivu-form-item-label{
      font-size: 14px!important;
      padding-bottom: 8px;
      color: #aeaeae;
    }
    .ivu-input{
      border: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      &:focus{
        border-color: #039dff;
        box-shadow: none;
      }
    }
    .ivu-input-group-prepend{
      color: #039dff;
      text-align: center;
      font-size: 18px;
      background-color: transparent;
      border: none;
      border-bottom:1px solid #ccc;
      border-radius: 0;
    }
    .ivu-input-group-append{
      background-color: transparent;
      border: none;
      padding-left: 4px;
      .ivu-btn{
        border-color: #039dff;
        background-color: #039dff;
        color: #fff;
        margin: -6px -7px;
        margin-left: 5px;
        outline:none;
        &:active{
          background: #2b85e4;
        }
      }
    }
  }
}

  .collapsed-menu .ivu-menu-submenu-title-icon{
    display: none!important;
  }
</style>
