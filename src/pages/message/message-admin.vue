<template>
    <Card>
      <div class="mb-15">
        <Button @click="showModal=true" type="primary" class="lang-btn">新建</Button>
      </div>
      <Table :columns="columns" :data="lists"></Table>
      <div class="pagination">
        <Page :total="totalCount" :page-size="pageSize" show-sizer show-elevator
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
        > </Page>
      </div>

      <Modal width="700" v-model="showModal" :title="modalTitle"
            @on-visible-change="modalHide"
      >
        <Form ref="msgForm" :model="msgForm" :rules="msgFormRule" label-position="top">
          <Row :gutter="25">
            <Col span="12">
              <FormItem label="消息主题" prop="title">
                <Input :disabled="viewInfo" v-model="msgForm.title"/>
              </FormItem>
              <FormItem label="消息内容" prop="content">
                <Input :disabled="viewInfo" v-model="msgForm.content" type="textarea" :rows="5"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="发送服务网点" prop="stationList">
                <div>
                  <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="checkAllHandle"
                    >全选</Checkbox>
                </div>
                <CheckboxGroup v-model="msgForm.stationList" @on-change="checkAllGroupChange">
                  <Checkbox  :disabled="viewInfo" v-for="port in servicePort" :key="port.id" :label="port.id">{{port.name}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button v-if="!viewInfo" @click="showModal=false">取消</Button>
          <Button :loading="loadingSave" v-if="!viewInfo" @click="sureSend" type="primary">确认并发送</Button>
          <Button v-if="viewInfo" @click="showModal=false" type="primary">关闭</Button>
        </div>
      </Modal>
    </Card>
</template>

<script>
    export default {
        name: "message-admin",
      data(){
          return {
            loadingSave:false,
            indeterminate:true,  // 设置 indeterminate 状态，只负责样式控制
            checkAll:false,
            showModal:false,
            modalTitle:'新建消息',
            viewInfo:false,
            columns:[
              {title:'序号',type:'index',align:'center'},
              {title:'消息主题',key:'title',align:'center'},
              {title:'发送时间',key:'createTime',align:'center'},
              {title:'操作人',key:'creator',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                let _this = this;
                    return h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click:function(){
                          let id = params.row.id;
                          _this.getInfo(id);
                          _this.modalTitle='查看消息';
                          _this.viewInfo=true;
                          _this.showModal=true;
                        }
                      }
                    },'查看')
                }},
            ],
            lists:[],
            servicePort:[],
            pageSize:10,
            pageNo:1,
            totalCount:0,
            msgForm:{
              title:'',
              content:'',
              stationList:[]
            },
            msgFormRule:{
              title:[{required:true,message:'请输入消息主题',trigger:'blur'}],
              content:[{required:true,message:'请输入消息内容',trigger:'blur'}],
              stationList:[{required:true,type: 'array',min: 1,message:'请选择网点',trigger: 'change'}],
            }
          }
      },
      methods:{
          //全选网点
        checkAllHandle(){
          if (this.indeterminate) {
            this.checkAll = false;
          } else {
            this.checkAll = !this.checkAll;
          }
          this.indeterminate = false;
          if(this.checkAll){
            this.msgForm.stationList=this.servicePort.map(item=>{
              return item.id
            });
          }else{
            this.msgForm.stationList = [];
          }
        },
        //全选变动
        checkAllGroupChange(data){
          if(data.length===this.servicePort.length){
            this.indeterminate=false;
            this.checkAll=true;
          }else if(data.length>0){
            this.indeterminate=true;
            this.checkAll=false;
          }else{
            this.indeterminate=false;
            this.checkAll=false;
          }
        },
        getLists(){
          let pageSize = this.pageSize;
          let pageNo = this.pageNo;
          this.$http.get(`/notice/list?pageSize=${pageSize}&pageNo=${pageNo}`)
            .then(res=>{
                if(res.data.code===0){
                  this.lists=res.data.data.list;
                  this.totalCount=res.data.data.totalCount;
                  this.pageSize=res.data.data.pageSize;
                }else{
                  console.log('信息获取失败：'+res.data.msg);
                }
            })
        },
        getPort(){
          this.$http.get(`/repair/station/select/list`)
            .then(res=>{
              if(res.data.code===0){
                  this.servicePort=res.data.data;
              }
            })
        },
        getInfo(id){
          this.$http.get(`/notice/info?id=${id}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                delete data.callCenterId;
                this.msgForm=data;
              }
            })
        },
        sureSend(){
          this.loadingSave=true;
          let form = this.msgForm;
          this.$refs['msgForm'].validate(valid=>{
            if(valid){
              this.$http.post(`/notice/add`,{
                ...form
              }).then(res=>{
                if(res.data.code===0){
                  this.$Message.success('发送成功');
                  this.pageNo=1;
                  this.pageSize=10;
                  this.getLists();
                }else{
                  this.$Message.error(res.data.msg);
                }
                this.showModal=false;
                this.loadingSave=false;
              })
            }else{
              this.loadingSave=false;
            }
          })
        },
        modalHide(visible){
          if(!visible){
            this.modalTitle='新建消息';
            this.viewInfo=false;
            this.msgForm={
                 title:'',
                 content:'',
                 stationList:[],
            }
          }
        },
        pageChange(val){
          this.pageNo=val;
          this.getLists();
        },
        pageSizeChange(val){
          this.pageSize=val;
          this.getLists();
        },

      },
      created(){
          this.getLists();
          this.getPort();
      }
    }
</script>

<style scoped>

</style>
