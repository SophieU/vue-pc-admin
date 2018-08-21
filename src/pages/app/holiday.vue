<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button @click="showHolidayModal('add')" type="primary" icon="md-add">添加假期</Button>
          </div>
        </div>

        <Table :columns="holidayCol" :data="holidayList"></Table>
        <div class="pagination">
          <Page :total="40" show-sizer show-elevator></Page>
        </div>
      </Card>
      <!--编辑，添加假期-->
      <Modal v-model="holidayModal" :title="holidayModalTitle">
        <Form :label-width="150" style="width:400px;">
          <FormItem label="假期名称：">
            <Input></Input>
          </FormItem>
          <FormItem label="最小请假单位：">
            <Select>
              <Option value="1">按天请假</Option>
            </Select>
          </FormItem>
          <FormItem label="计算请假时长方式：">
            <Select>
              <Option value="1">按工作日计算请假时长</Option>
            </Select>
          </FormItem>
          <FormItem label="有效期规则：">
            <CheckboxGroup>
              <Checkbox label="按入职日期起12个月"></Checkbox>
              <Checkbox label="允许延长有效期"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="每人发放天数：">
            <Input ></Input>
          </FormItem>
          <div class="tips" style="text-align: center;">（保存后，全公司员工将按新的规则重新计算）</div>
        </Form>
      </Modal>
      <!--删除提醒-->
      <Modal v-model="deleteModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除提醒</span>
        </p>
        <div style="text-align:center">
          <p>数据删除后，将不可恢复.</p>
          <p>确认要删除吗？？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  >删除</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "holiday",
      data(){
          return{
            holidayModal:false, //假期设置弹窗
            holidayModalTitle:'添加假期',
            holidayCol:[
              {
                title:'假期名称',
                key:'holidayName',
                align:'center',
              },{
                title:'请假单位',
                key:'holidayUnit',
                align:'center',
              },{
                title:'计算请假时长方式',
                key:'holidayCalc',
                align:'center',
              },{
                title:'操作',
                align:'center',
                render:(h,params)=>{

                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small',
                      },
                      style:{
                        marginRight:'10px'
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        type:'error',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                           this.deleteModal=true;
                           this.controlRow=params.row;
                           console.log(params.row)
                        }
                      }
                    },'删除')
                  ])
                }
              }
            ],
            holidayList:[
              {
                holidayName:'年假',
                holidayUnit:'按小时请假',
                holidayCalc:'按工作日请假',
              },{
                holidayName:'事假',
                holidayUnit:'按小时请假',
                holidayCalc:'按工作日请假',
              },{
                holidayName:'病假',
                holidayUnit:'按小时请假',
                holidayCalc:'按工作日请假',
              },
            ],
            deleteModal:false,
            controlRow:'', //当前操作的行数据
          }
      },
      methods:{
        showHolidayModal(type){
          this.holidayModal=true;
          switch(type){
            case 'add':
              this.holidayModalTitle='添加假期';
              break;
            case 'edit':
              this.holidayModalTitle='编辑假期';
              break;
          }
        },
        //确定删除
        sureDelete(){
          this.$Message.error('当前假期还有进行中的流程，不能删除！');
        },
      }
    }
</script>

<style scoped>

</style>
