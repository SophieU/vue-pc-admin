<template>
    <Card>
      <Tabs value="name1">
        <TabPane :label="waitting" name="name1">
          <Table :columns="waitColumns" :data="waitData"></Table>
        </TabPane>
        <TabPane :label="visited" name="name2">
          <div class="mb-15 clearfix">
            <div class="pull-right">
              <Button type="primary" @click="filter=true">筛选</Button>
            </div>
          </div>
          <Table :columns="visitedColumns" :data="visitedData"></Table>
        </TabPane>
      </Tabs>

      <Drawer width="425" title="工单筛选"  v-model="filter">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form>
          <FormItem label="回访结果">
            <Select>
              <Option value="">五一</Option>
            </Select>
          </FormItem>
          <FormItem label="工单编号">
            <Input search enter-button/>
          </FormItem>
          <FormItem label="创建时间">
            <DatePicker type="daterange" style="width:100%;"></DatePicker>
          </FormItem>
          <FormItem label="服务网点">
            <Select>
              <Option value="1">1111</Option>
            </Select>
          </FormItem>
          <FormItem label="售后回访">
            <Select>
              <Option value="">123456</Option>
            </Select>
          </FormItem>
        </Form>
      </Drawer>
    </Card>
</template>

<script>
    export default {
        name: "visite",
        data () {
          return {
            filter:false,
            waitting: (h) => {
              return h('div', [
                h('span', '待回访'),
                h('Badge', {
                  props: {
                    count: 1
                  },
                  style:{
                    marginLeft:'10px'
                  }
                })
              ])
            },
            visited:(h)=>{
              return h('div',[
                h('span','已回访'),
                h('Badge',{
                  props:{
                    count:1
                  },
                  style:{
                    marginLeft:'10px'
                  }
                })
              ])
            },
            waitColumns:[
              {title:'工单编号',key:'id',align:'center'},
              {title:'售后回访',key:'id',align:'center'},
              {title:'工单状态',key:'id',align:'center'},
              {title:'报修类型',key:'id',align:'center'},
              {title:'服务网点',key:'id',align:'center'},
              {title:'接单师傅',key:'id',align:'center'},
              {title:'创建日期',key:'id',align:'center'},
            ],
            waitData:[],
            visitedColumns:[
              {title:'工单编号',key:'id',align:'center'},
              {title:'售后回访',key:'id',align:'center'},
              {title:'工单状态',key:'id',align:'center'},
              {title:'报修类型',key:'id',align:'center'},
              {title:'服务网点',key:'id',align:'center'},
              {title:'接单师傅',key:'id',align:'center'},
              {title:'创建日期',key:'id',align:'center'},
              {title:'回访结果',key:'id',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                    return h('Button',{
                      props:{
                        type:'text'
                      }
                    },'查看')
                }},
            ],
            visitedData:[]
          }
        }
    }
</script>

<style scoped>

</style>
