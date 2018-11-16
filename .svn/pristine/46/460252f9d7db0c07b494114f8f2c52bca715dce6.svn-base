<style scoped lang="scss">
  @import './source.scss';
</style>
<template>
  <div class="new-inventory">
    <Card class="mb-15" style="padding-bottom:20px;">
      <p slot="title">盘点步骤</p>
      <div slot="extra">
        <Button style="margin-top: -5px;" type="primary" @click="$router.back()">返回上一页</Button>
      </div>
      <Row  :gutter="15" class="mb-15">
        <Col span="8">
          <div class="inventory-step">
            <span class="step">1</span>
            <div class="step-content">
              <Button @click="downTpl"  class="step-target"  style="margin-bottom: 4px;">
                下载数据
              </Button>
              <span>下载服务网点库存数据</span>
            </div>

          </div>
        </Col>
        <Col span="8">
          <div class="inventory-step">
            <span class="step">2</span>
            <div class="step-content">
              <Upload :action="uploadLink"
                :with-credentials="true"
                      :show-upload-list="false"
                      :on-success="uploadSuccess"

              >
                <Button class="step-target">上传数据</Button>
              </Upload>
              <span>盘点并上传盘点数据</span>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="inventory-step">
            <span  class="step">3</span>
            <div class="step-content">
              <Button :loading="loadingSave" style="margin-bottom: 4px;" @click="sureInvent" class="step-target" >确认完成</Button>
              <span>确认盘点</span>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
    <Card v-if="uploadExcel">
      <p slot="title">盘点预览</p>
      <div class="table-wrapper">
        <table class="native-table mb-15">
          <thead>
          <tr>
            <th>组织名称</th>
            <th>单号</th>
            <th>创建时间</th>
            <th>盘点盈亏</th>
            <th>盈亏成本</th>
            <th>操作人</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{uploadExcel.departmentName}}</td>
            <td>{{uploadExcel.orderSn}}</td>
            <td>{{uploadExcel.createTime}}</td>
            <td>{{uploadExcel.diffNum}}</td>
            <td>{{uploadExcel.amount}}</td>
            <td>{{uploadExcel.creator}}</td>
          </tr>
          </tbody>
        </table>
        <table class="native-table">
          <thead>
          <tr>
            <th>辅材名称</th>
            <th>型号</th>
            <th>单位</th>
            <th>成本价</th>
            <th>系统数量</th>
            <th>盘点数</th>
            <th>盈亏数</th>
            <th>盈亏成本</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in uploadExcel.detailList">
            <td>{{item.materialName}}</td>
            <td>{{item.materialSpec}}</td>
            <td>{{item.materialUnit}}</td>
            <td>{{item.price}}</td>
            <td>{{item.num}}</td>
            <td>{{item.checkedNum}}</td>
            <td>{{item.diffNum}}</td>
            <td>{{item.amount}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script>
  import util from '../../libs/util'
    export default {
        name: "inventory-new",
      computed:{
          uploadLink(){
            let baseUrl = localStorage.getItem('baseURL');
            return baseUrl+'/repair/material/check/order/import';
          }
      },
      data(){
          return {
            loadingSave:false,
            departmentId:'',
            uploadExcel:null,
            sureId:null,
          }
      },
      methods:{
        downTpl(){
          this.$http.get(`/repair/material/check/order/export`,{responseType:'blob'})
            .then(res=>{
              util.downloadExcel(res);
            })
        },
        uploadSuccess(res, file, fileList){
            if(res.code===0){
              this.uploadExcel=res.data;
              this.sureId=res.data.id;
            }else{
              this.$Message.error(res.msg);
            }
        },
        sureInvent(){
          this.loadingSave=true;
            let id = this.sureId;
            if(!id){
              this.$Message.warning('请先上传盘点数据');
              this.loadingSave=false;

            }else{
              this.$http.post(`/repair/material/check/order/verify?id=${id}`)
                .then(res=>{
                  this.loadingSave=false;
                  if(res.data.code===0){
                    this.$Message.success('盘点成功');
                    this.$router.push({name:'inventory'});
                  }else{
                    this.$Message.error(res.data.msg);
                  }
                })
            }
        }
      },
      mounted(){
      }
    }
</script>


