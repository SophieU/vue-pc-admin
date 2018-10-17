<template>
  <Card>
    <div class="clearfix mb-15">
      <div class="pull-left">
        <Button type="primary" @click="newInvent">新建盘点</Button>
        <Button>筛选</Button>
      </div>
      <div class="pull-right">
        <Button type="primary">excell导出</Button>
      </div>
    </div>
    <div class="table-wrapper">
      <Table :columns="columns" :data="lists"></Table>
    </div>

    <!--筛选-->
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
        </Form>
      </div>
    </Drawer>
  </Card>
</template>

<script>
    export default {
        name: "inventory-admin",
      data(){
          return {
            filter:false,
            columns:[
              {title:'组织名称',key:'name',align:'center'},
              {title:'单号',key:'orderId',align:'center'},
              {title:'创建时间',key:'date',align:'center'},
              {title:'盈亏数',key:'profitLossNum',align:'center'},
              {title:'盈亏成本',key:'profitLossBase',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                let _this= this;
                return h('Button',{
                    props:{
                      type:'text'
                    },
                    on:{
                      click(){
                        _this.$router.push({name:'inventoryDetail'})
                      }
                    }
                  },'查看')
                }},
            ],
            lists:[
              {}
            ]
          }
      },
      methods:{
        newInvent(){
          this.$router.push({name:'inventoryNew'})
        }
      }
    }
</script>

<style scoped>

</style>
