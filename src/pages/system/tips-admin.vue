<template>
    <div>
      <Card class="mb-15">
        <p slot="title">服务时间提示</p>
        <div slot="extra">
          <div class="inner-center" style="margin-top: -5px;">
            <Button class="lang-btn" @click="cancel">取消</Button>
            <Button @click="save" class="lang-btn" type="primary">保存</Button>
          </div>
        </div>
        <div>
          <div id="serveTime"></div>
          <!--<Input v-model="serviceTime" type="textarea" :rows="5"/>-->
        </div>
      </Card>
      <Card class="mb-15">
        <p slot="title">服务费用提示</p>
        <div>
          <div id="serveFee"> </div>
          <!--<Input  v-model="serviceFee" type="textarea" :rows="5"/>-->
        </div>
      </Card>
      <Card class="mb-15">
        <p slot="title">其他提示</p>
        <div>
          <div id="otherTips"> </div>
          <!--<Input  v-model="other" type="textarea" :rows="5"/>-->
        </div>
      </Card>
      <Card>

      </Card>
    </div>
</template>

<script>
  import E from 'wangeditor';
    export default {
        name: "tips-admin",
      data(){
        return {
          serviceTime:'',
          serviceFee:'',
          other:'',
          editor1:{},
          editor2:{},
          editor3:{}
        }
      },
      methods:{
          getTips(){
            this.$http.get('/repair/reminder/info')
              .then(res=>{
                if(res.data.code===0){
                  let data = res.data.data;
                  let config=[
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'emoticon',  // 表情
                    'undo',  // 撤销
                    'redo'  // 重复
                  ]
                  this.editor1 = new E('#serveTime');
                  let editor1 = this.editor1;
                  editor1.customConfig.menus =config;
                  editor1.create();
                  editor1.txt.html(data.serviceTime);

                  this.editor2 = new E('#serveFee');
                  let editor2 = this.editor2;
                  editor2.customConfig.menus =config;
                  editor2.create();
                  editor2.txt.html(data.serviceFee);

                   this.editor3 = new E('#otherTips');
                  let editor3 = this.editor3;
                  editor3.customConfig.menus =config;
                  editor3.create();
                  editor3.txt.html(data.other);

                  this.serviceTime=data.serviceTime;
                  this.serviceFee=data.serviceFee;
                  this.other=data.other;
                }else{
                  this.$Message.error('获取信息失败')
                }
              })
          },
        save(){
            let serviceTime = this.editor1.txt.html();
            let serviceFee = this.editor2.txt.html();
            let other = this.editor3.txt.html();
            // let params = {
            //   serviceTime:serviceTime,
            //   serviceFee:serviceFee,
            //   other:other
            // };
            this.$http.post(`/repair/reminder/save`,{
              serviceTime:serviceTime,
              serviceFee:serviceFee,
              other:other
            }).then(res=>{
              if(res.data.code===0){
                this.$Message.success('保存成功');
                this.getTips();
              }else{
                this.$Message.error(res.data.msg);
              }
            })
        },
        cancel(){
            this.getTips();
        },

      },
      mounted(){
        this.getTips();
      }
    }
</script>

<style scoped>
  .inner-center{
    text-align: center;
  }
</style>
