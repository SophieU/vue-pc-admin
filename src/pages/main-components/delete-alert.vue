<template>
  <Modal v-model="modelInner" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>删除提醒</span>
    </p>
    <div style="text-align:center">
      <p>数据一旦删除，将不可恢复</p>
      <p>确认要删除吗?</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long :loading="delete_loading" @click="del">删除</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
        name: "delete-alert",
      data(){
          return {
            deleteAlter:false,
            delete_loading:false
          }
      },
      props:{
          model:Boolean,
        callback:Function
      },
      computed:{
          modelInner:{
            get:function(){
              return this.model;
            },
            set:function(val){
              if(!val){
                this.$store.commit('setDeleteModal',{model:false})
              }
            }
          }
      },
      methods:{
        del(){
         this.callback();
        }
      }
    }
</script>

<style scoped>

</style>
