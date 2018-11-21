<template>
    <div class="forbid">
      <div class="inner-content">
        <img class="forbidImg" src="./forbid.png" alt="">
        <p class="forbid-text">抱歉，您无权限查看</p>
        <div class="btn-groups">
          <Button @click="goNext('index')">跳转首页</Button>
          <Button type="primary" @click="goNext('back')">返回上一页</Button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "forbid",
      methods:{
        goNext(type){
          switch(type){
            case "index":
              this.$router.push({name:'home'});
              break;
            case "back":
              this.$router.back();
              break;
            default:
              console.log('不匹配跳转');
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .forbid{
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    left:20px;
    right: 20px;
    bottom:20px;
    border-radius: 6px;
    text-align: center;
    .forbidImg{
      margin-bottom: 50px;
    }
    .forbid-text{
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
</style>
