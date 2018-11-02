<style scoped lang="scss">
  @import './service.scss';
</style>
<template>
    <Card class="area-setting">
      <Row :gutter="30">
        <Col span="12">
          <Card>
            <p slot="title">区域列表</p>
            <Button @click="addArea" slot="extra" type="primary" style="margin-top: -5px;">添加区域</Button>
            <ul class="area-lists">
              <li @click="editThis(ind)" :class="editInd===ind?'active':''" v-for="(area,ind) in areaLists">{{area.name}}</li>
            </ul>
          </Card>
        </Col>
        <Col span="12">
          <Card>
            <p slot="title">区域信息</p>
            <Button @click="deleteArea" slot="extra" type="error" style="margin-top: -5px;">删除区域</Button>
            <div>
              <Form :label-width="100">
                <FormItem label="区域名称">
                  <Input :maxlength="32" style="width: 300px;" v-model="areaName"/>
                </FormItem>
                <div class="inner-center">
                  <Button :loading="loadingSave" @click="saveThis" class="lang-btn" type="primary" >保存</Button>
                </div>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
</template>

<script>
    export default {
        name: "area-admin",
        data(){
          return {
            areaLists:[],
            editInd:0,
            areaName:'',
            editId:'', //编辑的Id
            radioCheck:'',
            loadingSave:false,
          }
        },
      methods:{
          getAreaLists(){
            this.$http.get('/repair/region/list')
              .then(res=>{
                let data = res.data;
                if(data.code===0){
                  this.areaLists=data.data;
                }
                //首次设置默认
                if(this.editInd===0){
                  this.areaName=this.areaLists[0].name;
                  this.editId=this.areaLists[0].id;
                }
              })
          },
          editThis(ind){
            this.editInd=ind;
            this.editId=this.areaLists[ind].id;
            this.areaName=this.areaLists[ind].name;
          },
        //保存设置
          saveThis(){
              let name = this.areaName;
              let id = this.editId;
              let apiUrl='';
              let paramStr='';
              let control='edit';
              //修改
              if(name.length>0&&id.length>0){
                apiUrl='/repair/region/edit';
                paramStr=`name=${name}&id=${id}`;
              }else if(name.length>0&&!id.length){
                //新增
                apiUrl='/repair/region/add';
                paramStr=`name=${name}`;
                control='add'
              }
              this.loadingSave=true;
              this.$http.post(`${apiUrl}?${paramStr}`)
                .then(res=>{
                  let data = res.data;
                  if(data.code===0){
                    this.$Message.success('保存成功');
                    this.getAreaLists();
                    this.loadingSave=false;
                  }else{
                    this.$Message.error(`保存失败,${data.msg}`);
                    this.loadingSave=false;
                  }
                })
          },
        //添加区域
        addArea(){
            this.areaLists.push({name:'新建小区',id:''});
            this.editInd=this.areaLists.length-1;
            this.areaName='新建小区';
            this.editId='';
        },
        deleteArea(){
            let id = this.editId;
            let len = this.areaLists.length;
            if(!id){
              this.areaLists.splice(len-1,1);
            }else{
              this.$http.delete(`/repair/region/delete?id=${id}`)
                .then(res=>{
                  let data = res.data;
                  if(data.code===0){
                    this.$Message.success('删除成功');
                    this.getAreaLists();
                  }else{
                    this.$Message.error(`删除失败，${data.msg}`)
                  }
                })
            }

        }
      },
      mounted(){
          this.getAreaLists();
      }
    }
</script>

