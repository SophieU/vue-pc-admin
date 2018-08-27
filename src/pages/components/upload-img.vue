<template>
    <div>
      <div class="upload-list">
        <template>
          <img src="@/assets/bg/notPass.png" alt="">
          <div class="upload-list-cover">
            <Icon type="ios-trash-outline" ></Icon>
          </div>
        </template>
        <template>
          <Propgress hide-info></Propgress>
        </template>
      </div>
      <Upload
        ref="upload"
        :format="['jpg','jpeg','png']"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </div>
</template>

<script>
  import UploadImg from './'
    export default {
        name: "upload-img"
    }
</script>

<style scoped>

</style>
