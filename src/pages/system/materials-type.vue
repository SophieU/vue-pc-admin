<style scoped lang="scss">
  @import "./system.scss";
</style>

<template>
    <div>
      <Card>
        <div>
          <div class="clearfix mb-15">
            <div class="pull-left">
              <Button icon="md-add" @click="activeModal(1)">新建</Button>
              <Button icon="ios-funnel" @click="filter=true" >筛选</Button>
            </div>
            <div class="pull-right">
              <Button @click="download">excel导入模板下载</Button>
              <div class="inline-block">
                <Upload :action="uploadUrl"
                        :with-credentials="true"
                        :on-success="uploadSuccess"
                        :before-upload="uploading"
                        :show-upload-list="false"
                >
                  <Button icon="ios-cloud-upload-outline">excel导入</Button>
                </Upload>
              </div>
            </div>
          </div>
          <div class="table-wrapper">
            <Table :data="lists" :columns="tableColumn" ></Table>
            <div class="pagination">
              <Page  :total="totalCount" :page-size="pageSize" show-sizer show-elevator
                @on-change="pageChange"
                     @on-page-size-change="pageSizeChange"
              ></Page>
            </div>
          </div>
        </div>
      </Card>
      <!--报修弹窗-->
      <Modal
        width="800"
        v-model="materialsModal"
        :mask-closable="false"
        :title="modalTitle===1?'新建辅材分类':'编辑辅材分类'"
        @on-visible-change="modalHide"
      >
        <div  class="two_column_form">
          <i-form ref="typeForm" :rules="typeFormRule" :model="typeForm" label-position="top">
            <div class="flex_form">
              <div class="left">
                <form-item label="报修分类" prop="repairCategoryId">
                  <Select v-model="typeForm.repairCategoryId">
                    <Option v-for="repair in repairLists" :key="repair.id" :value="repair.id">{{repair.name}}</Option>
                  </Select>
                </form-item>
                <form-item label="辅材名称" prop="name">
                  <Input v-model="typeForm.name"/>
                </form-item>
                <form-item label="辅材型号" prop="spec">
                  <Input  v-model="typeForm.spec"/>
                </form-item>
                <form-item label="单位" prop="unit">
                  <Input v-model="typeForm.unit"/>
                </form-item>
                <form-item label="质保天数" prop="warrantyPeriod">
                  <InputNumber :min="0" style="width:100%" v-model="typeForm.warrantyPeriod"/>
                </form-item>
                <form-item label="员工结算标准" prop="employeeCommission">
                  <!--<InputMoney v-model="typeForm.employeeCommission" ></InputMoney>-->
                  <InputNumber :precision="2" :min="0" style="width:100%;" v-model="typeForm.employeeCommission"/>
                </form-item>
              </div>
              <div class="right">
                <form-item :label="'客户收费标准'+(latestPrice?latestPrice:' ')" prop="charges">
                  <InputNumber :precision="2" :min="0" style="width:100%" v-model="typeForm.charges"/>
                </form-item>
                <form-item label="辅材图片（要求比例：1:1）">
                  <div class="imgWrap">
                    <img v-show="typeForm.image" :src="typeForm.imagePrefix+'/'+typeForm.image" alt="">
                    <Upload accept="image/*" :action="uploadImgUrl"
                            :on-success="uploadImgSuccess"
                            :data="{'token':qnToken}"
                            :show-upload-list="false"
                    >
                      <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                  </div>
                </form-item>
              </div>
            </div>
          </i-form>
        </div>
        <div slot="footer">
          <Button @click="materialsModal=false">取消</Button>
          <Button :loading="loadingSend" @click="save" type="primary">{{modalTitle===1?'添加':'保存'}}</Button>
        </div>
      </Modal>
      <!--报修筛选-->
      <Drawer title="报修筛选"  v-model="filter" width="425" @on-close="clearFilter">
        <div class="filter-top mb-15 clearfix">
          <div class="pull-left">
            <Button @click="clearFilter" icon="md-close-circle">清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button @click="filterSubmit" type="primary">确定筛选</Button>
          </div>
        </div>
        <i-form v-model="materialsFilter" >
          <form-item label="报修分类">
            <Select v-model="materialsFilter.repairCategoryId">
              <Option v-for="repair in repairLists" :key="repair.id" :value="repair.id">{{repair.name}}</Option>
            </Select>
          </form-item>
          <form-item label="辅材名称">
            <Input v-model="materialsFilter.name" />
          </form-item>
          <form-item label="辅材型号">
            <Input v-model="materialsFilter.spec" />
          </form-item>
          <form-item label="质保天数大于0">
            <i-switch v-model="materialsFilter.warrantyPeriodFlag" :true-value="'Y'" :false-value="''"></i-switch>
          </form-item>
          <form-item label="图片有无">
            <i-switch size="large" v-model="materialsFilter.hasImage" :true-value="'Y'" :false-value="''">
              <span slot="open">有</span>
              <span slot="close">全部</span>
            </i-switch>
          </form-item>
        </i-form>

      </Drawer>
      <!--正在上传中-->
      <!--<Modal v-model="uploadingModal" title="正在上传中..." :mask-closable="false" :footer-hide="true" :closable="false">
        <Progress :percent="uploadPercent" status="active" />
      </Modal>-->
    </div>
</template>

<script>
  import util from '../../libs/util';
  import InputMoney from '../main-components/input-money'
  import qiniu from '../../libs/qiniu-upload';
  let baseUrl = localStorage.getItem('baseURL');
    export default {
        name: "materials-type",
      components:{
        InputMoney
      },
      computed:{
        uploadUrl:function(){
          let url = baseUrl+'/repair/material/category/import';
          return url;
        },
        uploadImgUrl:function(){
          let uploadImg = 'http://upload.qiniup.com/';
            return uploadImg
        },
        qnToken:function(){
          let qnToken = localStorage.getItem('qnToken');
          return qnToken;
        }
      },
      data(){
          return {
            test:11,
            loadingSend:false,
            uploadingModal:false,
            uploadPercent:0, // 上传进度百分比
            modalTitle:'新建', //1：新建，0：编辑
            materialsModal:false,
            totalCount:0,
            pageSize:10,
            pageNo:1,
            filter:false, //筛选
            repairLists:[],
            tableColumn:[
              {
                title:'名称',
                key:'name',
                align:'center'
              },{
                title:'报修分类',
                key:'repairCategoryName',
                align:'center'
              },{
                title:'型号',
                key:'spec',
                align:'center'
              },{
                title:'单位',
                key:'unit',
                align:'center'
              },{
                title:'图片',
                key:'hasImage',
                align:'center'
              },{
                title:'保质天数',
                key:'warrantyPeriod',
                align:'center'
              },{
                title:'客户收费标准',
                key:'charges',
                align:'center'
              },{
                title:'员工结算标准',
                key:'employeeCommission',
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
                          let id= params.row.id;
                          _this.getLatestPrice(id);
                          _this.getInfo(id);
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
                              _this.$http.delete(`/repair/material/category/delete?id=${id}`)
                                .then(res=>{
                                  if(res.data.code===0){
                                    _this.$Message.info('删除成功');
                                    _this.$store.commit('setDeleteModal',{model:false});
                                    _this.getLists();
                                  }else{
                                    _this.$Message.error(res.data.msg);
                                    _this.$store.commit('setDeleteModal',{model:false});
                                  }
                                })
                            }});

                        }
                      }
                    },'删除'),

                  ])
                }
              },
            ],
            lists:[],
            typeForm:{
              id:'',
              repairCategoryId:'',
              name:'',
              unit:'',
              spec:'',
              warrantyPeriod:0,
              employeeCommission:0,
              charges:0,
              image:'',
            },
            typeFormRule:{
              repairCategoryId:[{required:true,message:'请选择报修分类',trigger:'change'}],
              name:[{required:true,message:'请输入辅材名称',trigger:'blur'}],
              unit:[{required:true,message:'请输入单位',trigger:'blur'}],
              spec:[{required:true,message:'请输入型号',trigger:'blur'}],
              warrantyPeriod:[{required:true,message:'请输入质保期',trigger:'blur',type:'number'}],
              employeeCommission:[{required:true,message:'请输入员工收费标准',trigger:'change',type:'number'}],
              charges:[{required:true,message:'请输入用户收费标准',trigger:'blur',type:'number'}],
            },
            materialsFilter:{
              name:'',
              repairCategoryId:'',
              spec:'',
              warrantyPeriodFlag:'',
              hasImage:''
            },
            latestPrice:'',
          }
      },
      methods:{
        uploadImgSuccess(res,file,fileList){
          let key = res.key;
          this.typeForm.imagePrefix=localStorage.getItem('qnPrefix');
          this.typeForm.image=key;
        },
          activeModal(type){
            this.materialsModal=true;
            this.modalTitle=type;
          },
          getLists(filter){
            let params = {
              pageNo:this.pageNo,
              pageSize:this.pageSize,
            };
            params=util.formatterParams(params)+'&';
            if(filter){
              params+=util.formatterParams(filter);
            }
            this.$http.post(`/repair/material/category/list?${params}`)
              .then(res=>{
                if(res.data.code===0){
                  this.lists=res.data.data.list;
                  this.totalCount=res.data.data.totalCount;
                }else{
                  console.log(res.data.msg);
                }
                this.filter=false;
              })
          },
        getInfo(id){
            this.$http.get(`/repair/material/category/info?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  this.typeForm=res.data.data;
                  this.typeForm.warrantyPeriod*=1;
                  this.typeForm.employeeCommission*=1;
                  this.typeForm.charges*=1;
                  this.modalTitle='编辑';
                  this.materialsModal=true;
                }else{
                  this.$Message.error('获取辅材信息失败'+res.data.msg);
                }
              })
        },
        //获取报修分类
        getRepairList(){
          this.$http.get(`/repair/category/list`)
            .then(res=>{
              if(res.data.code===0){
                this.repairLists=res.data.data;
              }else{
                console.log('故障原因管理-获取报修分类失败：'+res.data.msg);
              }

            })
        },
        download(){
          this.$http.get(`/repair/material/category/import/template`,{responseType:'blob'})
            .then(res=>{
              util.downloadExcel(res);
            })
        },
        uploadSuccess(res){
          setTimeout(()=>{
            if(res.code===0){
              this.$Message.success('上传成功');
            }else{
              this.$Message.error(res.msg);
            }
           /* this.uploadPercent=100;
            this.uploadingModal=false;*/
           this.$store.commit('setUploadProgress',false);
           this.$store.commit('setUploadPercent',100);
            this.getLists();
          },1000)
        },
        uploading(){
          // this.uploadingModal=true;
          this.$store.commit('setUploadProgress',true);
          this.$store.commit('setUploadPercent',0);


        },
        modalHide(value){
            if(!value){
              this.typeForm={
                id:'',
                repairCategoryId:'',
                name:'',
                unit:'',
                spec:'',
                warrantyPeriod:0,
                employeeCommission:0,
                charges:0,
                image:'',
              };
              this.latestPrice='';
              this.$refs['typeForm'].resetFields(); //重置验证
            }
        },
        save(){
            let url = '';
            this.loadingSend=true;
            this.$refs['typeForm'].validate(valid=>{

              if(valid){
                let typeForm = this.typeForm;
                if(typeForm.id.length<=0){
                  url='/repair/material/category/add'
                }else{
                  url='/repair/material/category/edit'
                }
                if(!typeForm.image){
                  delete typeForm.image;
                }

                delete typeForm.imagePrefix;
                this.$http.post(url,{
                  ...typeForm
                }).then(res=>{
                  if(res.data.code===0){
                    this.$Message.success('保存成功');
                    this.materialsModal=false;
                    this.getLists();
                  }else{
                    this.$Message.error('保存失败'+res.data.msg);
                    // this.materialsModal=false;
                  }
                  this.loadingSend=false;
                })
              }else{
                this.loadingSend=false;
              }
            })
        },
        filterSubmit(){
          let filter = this.materialsFilter;

          this.pageNo=1;
          this.getLists(filter);
        },
        clearFilter(){
          this.pageNo=1;
          this.materialsFilter={
            name:'',
              repairCategoryId:'',
              spec:'',
              warrantyPeriodFlag:'',
              hasImage:''
          };
          this.getLists();
        },
        pageChange(page){
          this.pageNo=page;
          this.getLists();
        },
        pageSizeChange(size){
          this.pageSize=size;
          this.getLists();
        },
        getLatestPrice(id){
          this.$http.get(`/repair/material/category/newest/input/price?id=${id}`)
            .then(res=>{
              if(res.data.code===0){
                if(res.data.data){
                  let price = parseFloat(res.data.data).toFixed(2);
                  this.latestPrice=`（最新成本价：${price})`;
                }else{
                  this.latestPrice='';
                }

              }
            })
        }
      },
      mounted(){
          this.getLists();
          this.getRepairList();
      }
    }
</script>

