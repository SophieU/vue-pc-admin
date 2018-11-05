
<style scoped lang="scss">
  @import './service';
</style>
<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button type="primary" @click="newStation">新建</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :loading="loading" :data="portLists" :columns="columns"></Table>
          <div class="pagination">
            <Page :page-size="pageSize" :total="totalCount" show-sizer show-elevator
                  @on-change="pageToggle"
                  @on-page-size-change="pageSizeToggle"
            ></Page>
          </div>
        </div>
      </Card>
      <Modal v-model="portSetting" :title="modalTitle+'服务网点'" @on-visible-change="modalHide">
        <Form ref="portSet" :model="portSettingForm" :rules="portSettingRule" :label-width="120" label-position="right">
          <FormItem label="服务网点名称" prop="name">
            <Input :disabled="viewInfo" v-model="portSettingForm.name" class="form-input"/>
          </FormItem>
          <FormItem label="服务网点地址" prop="address">
            <Input :disabled="viewInfo" v-model="portSettingForm.address"  class="form-input"/>
          </FormItem>
          <FormItem label="服务网点电话" prop="phone">
            <Input :disabled="viewInfo" placeholder="请输入手机或座机号" @on-keydown="validateInputTel"  v-model="portSettingForm.phone" class="form-input"/>
          </FormItem>
          <FormItem label="服务区域设置" prop="regionList">
            <CheckboxGroup v-model="portSettingForm.regionList" >
              <ul class="column_3">
                <li v-for="station in stationLists"><Checkbox :disabled="viewInfo" :label="station.id" >{{station.name}}</Checkbox></li>
              </ul>
            </CheckboxGroup>

          </FormItem>
          <FormItem label="管理员账号" prop="loginName">
            <Input :disabled="viewInfo" v-model="portSettingForm.loginName" class="form-input"/>
          </FormItem>
          <FormItem label="登陆密码" prop="password">
            <Input :disabled="viewInfo" type="password" placeholder="请设置6~10位密码"  v-model="portSettingForm.password" class="form-input"/>
          </FormItem>
          <FormItem label="备用网点">
            <i-switch :disabled="viewInfo" v-model="portSettingForm.isSlave">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Form>
        <div slot="footer">
          <div class="inner-center">
            <template  v-if="!viewInfo">
              <Button @click="portSetting=false">取消</Button>
              <Button :loading="loadingSave" @click="saveStation('portSet')" type="primary">确认</Button>
            </template>
            <!--查看-->
            <template v-else>
                <Button @click="viewInfo=false" type="primary">编辑</Button>
                <Button @click="portSetting=false">返回</Button>
            </template>

          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "service-port",
      data(){
          const validatePhone=function(rule,value,callback){
            if(value===''){
              callback(new Error('请输入联系电话'))
            }else{
              if(value!==''){
                let regTel=/^1[3456789]\d{9}/;
                let regTel2=/0\d{2,3}-\d{7,8}/;
                if(regTel.test(value)||regTel2.test(value)){
                  callback();
                }else{
                  callback(new Error('请输入正确格式的电话'))
                }
              }
            }
          };
          const validatePWDLen = function(rule,value,callback){
            if(value.length<6){
              callback(new Error('密码至少6位'));
            }else if(value.length>10){
              callback(new Error('密码最多10位'));
            }else{
              callback();
            }
          };
          return{
            loadingSave:false,
            viewInfo:false, //查看网点信息时，所有项 不可编辑
            modalTitle:'添加',
            pageNo:1,
            loading:true,
            totalCount:0,
            pageSize:10,
            columns:[
              {title:'网点名称',key:'name',align:'center'},
              {title:'备用网点',key:'isSlave',align:'center'},
              {title:'网点地址',key:'address',align:'center'},
              {title:'联系电话',key:'phone',align:'center'},
              {title:'服务区域数量',key:'regionNum',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                  let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{type:'text'},
                      on:{
                        click:()=>{
                          let id = params.row.id;
                          _this.viewInfo=true;
                          _this.modalTitle='查看';
                          _this.getStation(id);
                          _this.getStationInfo(id);
                        }
                      }
                    },'查看'),
                    h('Button',{
                      props:{type:'text'},
                      on:{
                        click:()=>{
                          let id=params.row.id;
                          _this.viewInfo=false;
                          _this.modalTitle='编辑';
                          _this.getStation(id);
                          _this.getStationInfo(id);
                        }
                      }
                    },'编辑'),
                  ])
                }},
            ],
            portLists:[], //列表数据
            portSetting:false, //开启弹窗
            portSettingForm:{
              name:'',
              address:'',
              phone:'',
              isSlave:false,
              regionList:[],
              loginName:'',
              password:'',
            },
            stationLists:[], //可用的区域列表
            portSettingRule:{ //表单验证
              name:[{ required: true, message: '请输入网点名称', trigger: 'blur' }],
              address:[{ required: true, message: '请输入网点地址', trigger: 'blur' }],
              phone:[
                { required: true, message: '请输入网点电话', trigger: 'blur' },
                { validator: validatePhone, trigger: 'blur' }],
              loginName:[{ required: true, message: '管理员账号', trigger: 'blur' }],
              password:[
                  { required: true, message: '管理员密码', trigger: 'blur' },
                  {validator:validatePWDLen, trigger: 'blur' },
                ],
            }
          }
      },
      methods:{
          //获取列表
          getLists(){
            let params = `pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
            this.$http.get(`/repair/station/list?${params}`)
              .then(res=>{
                let data = res.data;
                if(data.code===0){
                  this.loading=false;
                  this.portLists=data.data.list;
                  this.pageSize=data.data.pageSize;
                  this.totalCount = data.data.totalCount;

                }

              })
          },
        //页码变化
        pageToggle(page){
            console.log(page)
          this.pageNo=page;
          this.getLists();
        },
        //每页条数变化
        pageSizeToggle(size){
          this.pageSize=size;
          this.getLists();
        },
        getStation(id){
          this.$http.get(`/repair/station/region/list?id=${id}`)
            .then(res=>{
              if(res.data.code===0){
                let data=res.data.data;
                this.stationLists=data;
              }
            })
        },
        //新增或修改网点
        saveStation(name){
            this.loadingSave=true;
          let formData= this.portSettingForm;
          let params={
            name:formData.name,
            address:formData.address,
            phone:formData.phone,
            isSlave:formData.isSlave?'Y':'N',
            stationAdmin:{
              loginName:formData.loginName,
              // password:formData.password
            },
            regionList:formData.regionList
          };
          let url = '';
          if(formData.id){
            //有id为修改
            url='/repair/station/edit';
            params.id=formData.id;
            params.stationAdmin.id=formData.stationId;
            if(formData.password!=='000000'){ //未修改密码时的默认值
              params.stationAdmin.password=formData.password;
            }
          }else{
            url='/repair/station/add';
            params.stationAdmin.password=formData.password;
          }

          this.$refs[name].validate(valid=>{
            if(valid){
              this.$http.post(url,{
                ...params
              }).then(res=>{
                if(res.data.code===0){
                  this.$Message.success('保存成功');
                  this.init();
                  this.getLists();
                }else{
                  this.$Message.error(`保存失败,${res.data.msg}`)
                }
                this.portSetting=false;
              })
            }else{
              this.$Message.error('输入有误，表单未提交');
            }
            this.loadingSave=false;
          })

        },
        init(){
          this.pageNo=1;
          this.hasNextPage=true;

        },
        //验证电话输入，只能是数字或-
        validateInputTel(event){
            let key = event.key;
            let reg=/(\d|\-)/;
            if(!reg.test(key)&&key!=='Backspace'){
              event.preventDefault();
              return false;
            }
        },
        //查询网点信息
        getStationInfo(id){
            // /repair/station/info?id=1
            this.$http.get(`/repair/station/info?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  let data = res.data.data;
                  this.portSettingForm={
                    name:data.name,
                    address:data.address,
                    phone:data.phone,
                    isSlave:data.isSlave==='Y'?true:false,
                    regionList:data.regionList,
                    loginName:data.stationAdmin?data.stationAdmin.loginName:'',
                    password:data.stationAdmin?'000000':'',
                    stationId:data.stationAdmin?data.stationAdmin.id:'',
                    id:data.id,
                  };
                  this.portSetting=true;
                }
              })
        },
        //新建网点
        newStation(){
          this.portSettingForm={
              name:'',
              address:'',
              phone:'',
              isSlave:false,
              regionList:[],
              loginName:'',
              password:'',
          };
          this.getStation();
          this.modalTitle='添加';
          this.viewInfo=false;
          this.portSetting=true;
        },
        modalHide(val){
            if(!val){
              this.$refs['portSet'].resetFields(); //重置验证信息

            }
        }
      },
      mounted(){
          this.getLists();
          this.getStation();
      },
      watch:{
        // regionListCheck(newVal,oldVal){
        //   console.log('reginListCheck changed'+newVal)
        //
        // }
      }
    }
</script>

