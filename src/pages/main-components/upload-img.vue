<style scoped lang="scss">
  .upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
    img{
      width: 100%;
      height: 100%;
    }

  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .upload-list:hover .upload-list-cover{
    display: block;
  }
  .upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor:pointer;
    margin:  0 2px;
  }

</style>
<template>
    <div>
      <div class="upload-list" v-for="item in uploadList">
        <template v-if="item.status==='finished'">
          <img :src="item.url" alt="item.name">
          <div class="upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        :on-success="handleSuccess"
        :default-file-list="defaultList"
        :max-size="2048"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        multiple
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
  /*
  * 	 show-upload-list : 是否显示已上传文件列表
  * 	 type:上传控件类型
  * */

    export default {
        name: "upload-img",
      data(){
          return {
            defaultList:[],
            uploadList:[],
            imgName:'',
            visible:false,

          }
      },
      methods:{
        handleSuccess(res,file){
          file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
          file.name = '7eb99afb9d5f317c912f08b5212fd69a';
          console.log('upload success')
        },
        handleMaxSize(){
          console.log('exceed size')
        },
        handleBeforeUpload(){
          console.log('before upload')
          const check=this.uploadList.length<5;
          if(!check){
            this.$Notice.warning({
              title:'超过5张图，不能再传了'
            })
          }
          return check;
        },
        handleRemove(file){
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file),1);
        }
      },
      mounted () {
        this.uploadList = this.$refs.upload.fileList;
      }
    }
</script>


