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
  ul,li{
    list-style: none;
  }
#app {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei";
}
@import './style/common.scss';
</style>
