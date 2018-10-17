<template>
    <Card>
      <div class="clearfix mb-15">
        <div class="pull-left">
          <Button @click="newOut" type="primary">新建出库</Button>
          <Button @click="filter=true">筛选</Button>
        </div>
        <div class="pull-right">
          <Button type="primary">excel导出</Button>
        </div>
      </div>

      <div class="table-wrapper">
        <Table :columns="columns" :data="lists"></Table>

      </div>
      <Drawer title="出库筛选" width="425" v-model="filter">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <div>
          <Form label-position="top">
            <FormItem label="创建时间">
              <DatePicker type="daterange" style="width: 100%;"></DatePicker>
            </FormItem>
            <FormItem label="服务网点">
              <Select>
                <Option value="">网点1</Option>
              </Select>
            </FormItem>
            <FormItem label="出库类型">
              <Select>
                <Option value="">类型1</Option>
              </Select>
            </FormItem>
            <FormItem label="原始单号">
              <Input />
            </FormItem>
          </Form>
        </div>
      </Drawer>
    </Card>
</template>

<script>
    export default {
        name: "out-admin",
      data(){
          return {
            filter:false,
            columns:[
              {title:'服务网点',key:'port',align:'center'},
              {title:'单号',key:'order',align:'center'},
              {title:'创建时间',key:'date',align:'center'},
              {title:'出库类别',key:'outType',align:'center'},
              {title:'操作人',key:'user',align:'center'},
              {title:'出库成本',key:'cost',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                let _this = this;
                return h('Button',{
                  props:{type:'text'},
                  style:{color:'#039dff'},
                  on:{
                    click(){
                      _this.$router.push({name:'outDetail'})
                    }
                  }
                },'查看')
                }},
            ],
            lists:[
              {port:'11',order:'11',date:'11',outType:'11',user:'11',cost:'11'},
              {port:'11',order:'11',date:'11',outType:'11',user:'11',cost:'11'},
            ]
          }
      },
      methods:{
          newOut(){
            this.$router.push({name:'newOut'})
          }
      }
    }
</script>

<style scoped>

</style>
