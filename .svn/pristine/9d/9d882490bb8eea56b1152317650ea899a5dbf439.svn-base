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
      <Modal v-model="repairModal"
        :title="modalTitle===1?'新建报修分类':'编辑报修分类'"
      >
        <div  class="modal_wrap_form">

          <Form v-model="typeForm" label-position="top">
            <FormItem label="报修分类名称">
              <Input />
            </FormItem>
            <FormItem label="上门费收费标准">
              <Row :gutter="15">
                <Col span="16">
                  <Input />
                </Col>
                <Col span="8">
                  <Checkbox >收取上门费</Checkbox>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="员工上门费结算标准">
              <Input />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="repairModal=false">取消</Button>
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
        <Form v-model="repairFilter" >
          <FormItem label="报修名称">
            <Input v-model="repairFilter.name" search  enter-button @on-search="searchName"/>
          </FormItem>
          <FormItem label="收取上门费">
            <i-switch v-model="repairFilter.needFee"  />
          </FormItem>
        </Form>

      </Drawer>
    </div>
</template>

<script>
    export default {
        name: "repair-type",
      data(){
          return {
            switch1:true,
            modalTitle:1, //1：新建，0：编辑
            repairModal:false,
            filter:false, //筛选
            tableColumn:[
              {
                title:'名称',
                key:'name',
                align:'center'
              },{
                title:'上门费',
                key:'serviceFee',
                align:'center'
              },{
                title:'客户上门结算标准',
                key:'customFee',
                align:'center'
              },{
                title:'职工结算标准',
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
                name:'用气服务',
                serviceFee:0,
                customFee:'0.00',
                staffFee:0.00,
              },{
                name:'用气服务',
                serviceFee:50,
                customFee:50,
                staffFee:20,
              },
            ],
            typeForm:{

            },
            repairFilter:{
              name:'',
              needFee:true
            }
          }
      },
      methods:{
          activeModal(type){
            this.repairModal=true;
            this.modalTitle=type;
          },
          //筛选搜索名称
          searchName(name){
              console.log(name)
          },

      }
    }
</script>

