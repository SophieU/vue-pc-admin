<style scoped lang="scss">
  @import "./system.scss";
</style>

<template>
    <div>
      <Card>
        <div>
          <div class="clearfix mb-15">
            <div class="pull-left">
              <Button icon="md-add" @click="activeModalNew">新建</Button>
              <Button icon="ios-funnel" @click="filter=true" >筛选</Button>
            </div>
            <div class="pull-right">
              <Button icon="ios-cloud-download-outline" @click="downExcel">excel导入模板下载</Button>
              <div class="inline-block">
                <Upload :action="uploadUrl" :with-credentials="true" :show-upload-list="false"
                       :on-success="uploadSuccess"
                        :before-upload="uploading"
                >
                  <Button icon="ios-cloud-upload-outline">excel导入</Button>
                </Upload>
              </div>
            </div>
          </div>
          <div class="table-wrapper">
            <Table :data="lists" :columns="tableColumn" ></Table>
          </div>
        </div>
      </Card>
      <!--报修弹窗-->
      <Modal v-model="serviceModal"
        :title="modalTitle"
             @on-visible-change="modalHide"
      >
        <div class="modal_wrap_form">
          <Form ref="typeForm" :model="typeForm"  :rules="typeFormRule" label-position="top">
            <FormItem label="报修分类" prop="repairCategoryId">
              <Select v-model="typeForm.repairCategoryId">
                <Option v-for="repair in repairLists" :key="repair.id" :value="repair.id">{{repair.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="服务名称"  prop="name">
              <Input v-model="typeForm.name"/>
            </FormItem>
            <FormItem label="质保天数"  prop="warrantyPeriod">
              <!--<Input v-model="typeForm.warrantyPeriod" />-->
              <InputNumber  style="width:100%;" v-model="typeForm.warrantyPeriod"  :min="1"
                            :precision="0"
              ></InputNumber>
            </FormItem>
            <FormItem label="服务收费"  prop="serviceFee">
              <!--<Input   v-model="typeForm.serviceFee" />-->
              <InputNumber  style="width:100%;" v-model="typeForm.serviceFee"
                            :precision="2"
              ></InputNumber>
            </FormItem>
            <FormItem label="员工结算标准"  prop="employeeServiceCommission">
              <!--<Input  v-model="typeForm.employeeServiceCommission"/>-->
              <InputNumber
                style="width:100%;"
                v-model="typeForm.employeeServiceCommission"
                :precision="2"
              ></InputNumber>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="serviceModal=false">取消</Button>
          <Button @click="saveType" type="primary">{{modalTitle===1?'添加':'保存'}}</Button>
        </div>
      </Modal>
      <!--报修筛选-->
      <Drawer title="服务筛选"  v-model="filter" width="425">
        <div class="filter-top mb-15 clearfix">
          <div class="pull-left">
            <Button @click="clearFilter" icon="md-close-circle">清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button @click="filterData" type="primary">确定筛选</Button>
          </div>
        </div>
        <Form v-model="serviceFilter" >
          <FormItem label="报修分类">
            <Select v-model="serviceFilter.repairCategoryId">
              <Option :key="repair.id" v-for="repair in repairLists" :value="repair.id">{{repair.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="服务名称">
            <Input v-model="serviceFilter.name"/>
          </FormItem>
          <FormItem label="质保天数大于0">
            <i-switch v-model="serviceFilter.warrantyPeriodFlag"  />
          </FormItem>
        </Form>

      </Drawer>
      <!--正在上传中-->
      <Modal v-model="uploadingModal" title="正在上传中..." :mask-closable="false" :footer-hide="true" :closable="false">
        <Progress :percent="uploadPercent" status="active" />
      </Modal>
    </div>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "service-type",
      computed:{
        uploadUrl:function(){
          let baseUrl=localStorage.getItem('baseURL');
          let url = baseUrl+'/repair/service/category/import';
          return url;
        }
      },
      data(){
          return {
            uploadingModal:false,
            uploadPercent:0,
            modalTitle:'新建服务分类', //1：新建，0：编辑
            serviceModal:false,
            filter:false, //筛选
            tableColumn:[
              {
                title:'服务名称',
                key:'name',
                align:'center'
              },{
                title:'报修分类',
                key:'repairCategoryName',
                align:'center'
              },{
                title:'质保天数',
                key:'warrantyPeriod',
                align:'center'
              },{
                title:'客户收费标准',
                key:'serviceFee',
                align:'center'
              },{
                title:'员工结算标准',
                key:'employeeServiceCommission',
                align:'center'
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click(){
                          let id = params.row.id;
                          _this.getTypeInfo(id);
                          _this.serviceModal=true;
                          _this.modalTitle='编辑服务分类';
                        }
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click(){
                          let id = params.row.id;
                          _this.$store.commit('setDeleteModal',{model:true,callback:function(){
                              _this.deleteType(id);
                            }});

                        }
                      }
                    },'删除'),

                  ])
                }
              },
            ],
            lists:[],
            repairLists:[], //报修分类，用于下拉选择
            typeForm:{
              id:'',
              repairCategoryId:'',
              name:'',
              warrantyPeriod:0,
              serviceFee:0,
              employeeServiceCommission:0,
            },
            typeFormRule:{
              name:[{required:true,message:'请输入服务名称',trigger:'blur'}],
              repairCategoryId:[{required:true,message:'请选择报修分类',trigger:'blur'}],
              warrantyPeriod:[{required:true,message:'请设置质保天数',trigger:'blur',type:'number'}],
              serviceFee:[
                {required:true,message:'请设置服务收费标准',trigger:'blur',type:'number'},
                // {validator:inputNumValidator,trigger:'blur'}
              ],
              employeeServiceCommission:[
                {required:true,message:'请设置员工结算标准',trigger:'blur',type:'number'},
                // {validator:inputNumValidator,trigger:'blur'}
              ],
            },
            serviceFilter:{
              name:'',
              warrantyPeriodFlag:false,
              repairCategoryId:''
            }
          }
      },
      methods:{
          activeModalNew(){
            this.modalTitle='新建服务分类';
            this.typeForm={
              id:'',
              repairCategoryId:'',
              name:'',
              warrantyPeriod:0,
              serviceFee:0,
              employeeServiceCommission:0,
            };
            this.serviceModal=true;

          },
          //筛选搜索名称
          filterData(){
            let data =this.serviceFilter;
            let filter = {
              name:data.name,
              warrantyPeriodFlag:data.warrantyPeriodFlag?'Y':'',
              repairCategoryId:data.repairCategoryId
            };
             this.getServiceList(filter);
            this.filter=false;
          },
        //清空筛选
        clearFilter(){
          this.serviceFilter={
            name:'',
            warrantyPeriodFlag:true,
            repairCategoryId:''
          };
          this.filter=false;
          this.getServiceList();
        },
          getServiceList(filterData){
            let params = '';
            if(filterData){
              params=util.formatterParams(filterData);
            }
            this.$http.get(`/repair/service/category/list?${params}`)
              .then(res=>{
                if(res.data.code===0){
                  this.lists=res.data.data;
                }else{
                  this.$Message.error(res.data.msg);
                }
              })
          },
          getTypeInfo(id){
              this.$http.get(`/repair/service/category/info?id=${id}`)
                .then(res=>{
                  if(res.data.code===0){
                    let data = res.data.data;
                    this.typeForm=data;
                    this.typeForm.warrantyPeriod*=1;
                    this.typeForm.serviceFee*=1;
                    this.typeForm.employeeServiceCommission*=1;
                  }else{
                    this.$Message.error(res.data.msg);
                  }
                })
          },
          //获取报修分类列表
          gerRepairList(){
            this.$http.get(`/repair/category/list`)
              .then(res=>{
                if(res.data.code===0){
                  this.repairLists=res.data.data;
                }else{
                  this.$Message.error(res.data.msg);
                }
              });
          },
        saveType(){
            let typeForm= this.typeForm;
            let url='';
            if(typeForm.id.length>0){
              url='/repair/service/category/edit'
            }else{
              url='/repair/service/category/add'
            }
            this.$http.post(url,{
              ...typeForm
            }).then(res=>{
              if(res.data.code===0){
                this.$Message.success('保存成功');
                this.getServiceList();
              }else{
                this.$Message.error(res.data.msg);
              }
              this.serviceModal=false;
            });
        },
        deleteType(id){
            this.$http.delete(`/repair/service/category/delete?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  this.$Message.info('删除成功');
                  this.$store.commit('setDeleteModal',{model:false});
                  this.getServiceList();
                }else{
                  this.$Message.info(res.data.msg)
                  _this.$store.commit('setDeleteModal',{model:false});
                }
              })
        },
        modalHide(value){
            if(!value){
              this.$refs['typeForm'].resetFields();
            }
        },
        //下载excel
        downExcel(){
            let baseUrl=localStorage.getItem('baseURL');
            let url = baseUrl+'/repair/service/category/import/template';
            window.location.href=url;
        },
        //上传回调
        uploadSuccess(res,file,fileLists){
          setTimeout(()=>{
            if(res.code===0){
              this.$Message.success('上传成功');
            }else{
              this.$Message.error(res.msg);
            }
            this.uploadPercent=100;
            this.uploadingModal=false;
            this.getServiceList();
          },1500)
        },
        //正在上传效果
        uploading(){
          this.uploadingModal=true;
          let _this=this;
          let timer = setInterval(()=>{
            if(_this.uploadPercent>=90){
              clearTimeout(timer);
            }else{
              _this.uploadPercent=_this.uploadPercent+5;
            }
          },100);
        }

      },
      mounted(){
          this.getServiceList();
          this.gerRepairList();
      }
    }
</script>

