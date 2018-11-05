<template>
  <!--正在上传中-->
  <Modal v-model="model" title="正在上传中..." :mask-closable="false" :footer-hide="true" :closable="false">
    <Progress :percent="percent" status="active" />
  </Modal>
</template>

<script>
    export default {
        name: "upload-progress",
     props:{
          model:Boolean,
       percent:Number,
     },
    /*  watch:{
          model(val){
              console.log(val)
              if(val){
                let percent=0;
                let timer = setInterval(()=>{
                  if(percent>=95){
                    clearTimeout(timer);
                  }else{
                    percent=percent+5;
                  }
                  this.$store.commit('setUploadProgress',{visible:true,percent:percent});
                },100);
              }else{
                this.$store.commit('setUploadProgress',{visible:false,percent:0});
              }
          }
      }*/
    }
</script>

<style scoped>

</style>
