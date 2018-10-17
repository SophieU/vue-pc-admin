<template>
    <div>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button @click="filter=true">筛选</Button>
            <Button type="primary">新添辅材</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">excel导出</Button>
          </div>
        </div>
        <div class="table-wrapper">
          <Table :columns="columns" :data="storageLists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </div>
        <Drawer width="425" title="辅材筛选" v-model="filter">
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
              <FormItem label="组织名称">
                <Select>
                  <Option value="0">24小区服务中心</Option>
                </Select>
              </FormItem>
              <FormItem label="报修类型">
                <Select>
                  <Option value="用气服务">用气服务</Option>
                </Select>
              </FormItem>
              <FormItem label="名称">
                <Input search  enter-button />
              </FormItem>
            </Form>
          </div>
        </Drawer>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "storage-admin",
      data(){
          return{
            filter:false,
            columns:[
              {title:'组织名称',key:'organName',align:'center'},
              {title:'名称',key:'name',align:'center'},
              {title:'报修分类',key:'type',align:'center'},
              {title:'型号',key:'version',align:'center'},
              {title:'单位',key:'unit',align:'center'},
              {title:'当前库存',key:'storage',align:'center'},
            ],
            storageLists:[
              {organName:'24小区服务中心',name:'管道',type:'用气服务',version:'PVC5',unit:'米',storage:'50'}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
