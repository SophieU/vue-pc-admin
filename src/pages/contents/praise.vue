<style scoped lang="scss">
  @import "./contents.scss";
</style>
<template>
    <div class="praise">
      <Card>
        <div class="filter-form">
          <Form ref="filterForm" inline :label-width="80">
            <FormItem label="业主名称：">
              <Input placeholder="请输入业主名称" />
            </FormItem>
            <FormItem label="投诉时间：">
              <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="状态">
              <Select v-model="filterForm.status" style="width:200px">
                <Option value="">未处理</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </Card>

      <div class="mt-15">
        <Card>
          <Tabs type="card">
            <TabPane label="投诉">
              <Table border :columns="columns" :data="complainList"></Table>
              <div class="pagination">
                <Page :total="40" size="small" show-elevator show-sizer />
              </div>
            </TabPane>
            <TabPane label="表扬">
              <Table border :columns="columns" :data="praiseList"></Table>
              <div class="pagination">
                <Page :total="40" size="small" show-elevator show-sizer />
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>

    </div>
</template>

<script>
    export default {
        name: "praise",
        data(){
          return {
            filterForm:{
              status:null
            },
            columns:[
              {
                title:"编号",
                key:"index",
                align: 'center',
              },{
                title:"投诉时间",
                key:"time",
                align: 'center',
              },{
                title:"业主姓名",
                key:"customName",
                align: 'center',
              },{
                title:"业主电话",
                align: 'center',
                key:"customTel",
              },{
                title:"业主住址",
                align: 'center',
                key:"customAdd",
              },{
                title:"状态",
                align: 'center',
                key:"status",
              },{
                title:"操作",
                render:function(h,params){
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      }
                    },'处理')
                  ])
                },
              }
            ],
            complainList:[
              {
                index:1,
                time:'2018-05-18 15:21:22',
                customName:'文哲',
                customTel:'18112341234',
                customAdd:'2栋-1单元-1008',
                status:'未处理'
              }
            ],
            praiseList:[
              {
                index:1,
                time:'2018-05-18 15:21:22',
                customName:'文哲',
                customTel:'18112341234',
                customAdd:'2栋-1单元-1008',
                status:'未处理'
              }
            ]
          }
        }
    }
</script>

