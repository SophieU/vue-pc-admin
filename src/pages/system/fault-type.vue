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
      <Modal v-model="faultModal"
        :title="modalTitle===1?'新建故障原因管理':'编辑故障原因管理'"
      >
        <div  class="modal_wrap_form">

          <Form v-model="typeForm" label-position="top">
            <FormItem label="报修分类">
              <Select v-model="typeForm.repairType">
                <Option value="用气服务">用气服务</Option>
                <Option value="用气服务2">用气服务2</Option>
              </Select>
            </FormItem>
            <FormItem label="故障名称">
              <Input />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="faultModal=false">取消</Button>
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
        <Form v-model="faultFilter" >
          <FormItem label="报修分类">
            <Select >
              <Option value="用气服务">用气服务</Option>
              <Option value="用气服务2">用气服务2</Option>
            </Select>
          </FormItem>
          <FormItem label="故障名称">
            <Input v-model="faultFilter.name" search  enter-button @on-search="searchName"/>
          </FormItem>
        </Form>

      </Drawer>
    </div>
</template>

<script>
    export default {
        name: "fault-type",
      data(){
          return {
            switch1:true,
            modalTitle:1, //1：新建，0：编辑
            faultModal:false,
            filter:false, //筛选
            tableColumn:[
              {
                title:'故障名称',
                key:'name',
                align:'center'
              },{
                title:'报修分类',
                key:'serviceFee',
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
              }
            ],
            typeForm:{
              repairType:''
            },
            faultFilter:{
              name:'',
              needFee:true
            }
          }
      },
      methods:{
          activeModal(type){
            this.faultModal=true;
            this.modalTitle=type;
          },
          //筛选搜索名称
          searchName(name){
              console.log(name)
          },

      }
    }
</script>

