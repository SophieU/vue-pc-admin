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
              <Button>excel导入模板下载</Button>
              <Button>excel导入</Button>
            </div>
          </div>
          <div class="table-wrapper">
            <Table :data="lists" :columns="tableColumn" ></Table>
            <div class="pagination">
              <Page :total="40" show-sizer show-elevator></Page>
            </div>
          </div>
        </div>
      </Card>
      <!--报修弹窗-->
      <Modal
        width="800"
        v-model="materialsModal"
        :title="modalTitle===1?'新建辅材分类':'编辑辅材分类'"
      >
        <div  class="two_column_form">
          <Form v-model="typeForm" label-position="top">
            <div class="flex_form">
              <div class="left">
                <FormItem label="报修分类">
                  <Select v-model="typeForm.repairType">
                    <Option value="用气服务">用气服务</Option>
                    <Option value="用气服务2">用气服务2</Option>
                  </Select>
                </FormItem>
                <FormItem label="辅材名称">
                  <Input />
                </FormItem>
                <FormItem label="辅材型号">
                  <Input />
                </FormItem>
                <FormItem label="单位">
                  <Input />
                </FormItem>
                <FormItem label="质保天数">
                  <Input />
                </FormItem>
                <FormItem label="员工结算标准">
                  <Input />
                </FormItem>
              </div>
              <div class="right">
                <FormItem label="客户收费标准（最新成本价：5.00）">
                  <Input />
                </FormItem>
                <FormItem label="辅材图片（要求尺寸：）">
                  <div class="imgWrap">
                    <img src="../../assets/imgs/404.png" alt="">
                    <Button icon="md-cloud-upload">上传图片</Button>
                  </div>

                </FormItem>
              </div>
            </div>


          </Form>
        </div>
        <div slot="footer">
          <Button @click="materialsModal=false">取消</Button>
          <Button type="primary">{{modalTitle===1?'添加':'保存'}}</Button>
        </div>
      </Modal>
      <!--报修筛选-->
      <Drawer title="报修筛选"  v-model="filter" width="425">
        <div class="filter-top mb-15 clearfix">
          <div class="pull-left">
            <Button icon="md-close-circle">清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form v-model="materialsFilter" >
          <FormItem label="报修分类">
            <Select >
              <Option value="用气服务">用气服务</Option>
              <Option value="用气服务2">用气服务2</Option>
            </Select>
          </FormItem>
          <FormItem label="辅材名称">
            <Input v-model="materialsFilter.name" search  enter-button @on-search="searchName"/>
          </FormItem>
          <FormItem label="辅材型号">
            <Input v-model="materialsFilter.model" search  enter-button @on-search="searchName"/>
          </FormItem>
          <FormItem label="质保天数大于0">
            <i-switch v-model="materialsFilter.guaranteed"></i-switch>
          </FormItem>
          <FormItem label="图片有无">
            <i-switch v-model="materialsFilter.hasImg"></i-switch>
          </FormItem>
        </Form>

      </Drawer>
    </div>
</template>

<script>
    export default {
        name: "materials-type",
      data(){
          return {
            switch1:true,
            modalTitle:1, //1：新建，0：编辑
            materialsModal:false,
            filter:false, //筛选
            tableColumn:[
              {
                title:'名称',
                key:'name',
                align:'center'
              },{
                title:'报修分类',
                key:'serviceFee',
                align:'center'
              },{
                title:'型号',
                key:'model',
                align:'center'
              },{
                title:'单位',
                key:'unit',
                align:'center'
              },{
                title:'图片',
                key:'img',
                align:'center'
              },{
                title:'保质天数',
                key:'guaranteed',
                align:'center'
              },{
                title:'客户收费标准',
                key:'guaranteedFee',
                align:'center'
              },{
                title:'员工结算标准',
                key:'staffFee',
                align:'center'
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{
                  let _this = this;
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'text'
                      },
                      on:{
                        click(){
                          _this.activeModal(0);
                        }
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        type:'text'
                      },
                      on:{
                        click(){
                          console.log('点了删除')
                        }
                      }
                    },'删除'),

                  ])
                }
              },
            ],
            lists:[
              {
                name:'管理更新',
                serviceFee:'用气服务',
                model:'PVC5',
                unit:'米',
                img:true,
                guaranteed:'30天',
                customFee:0,
                staffFee:0
              }
            ],
            typeForm:{
              repairType:''
            },
            materialsFilter:{
              name:'',
              needFee:true,
              model:'',
              guaranteed:false,
              hasImg:false
            }
          }
      },
      methods:{
          activeModal(type){
            this.materialsModal=true;
            this.modalTitle=type;
          },
          //筛选搜索名称
          searchName(name){
              console.log(name)
          },

      }
    }
</script>

