<template>
    <Card>
      <div class="mb-15">
        <Button>筛选</Button>
      </div>
      <div class="table-wrapper">
        <Table :columns="columns"></Table>
      </div>
      <!--筛选-->
      <Drawer title="工单筛选" v-model="filter" width="425">
        <div class="clearfix mb-15">
          <div class="pull-left">
            <Button>清空筛选条件</Button>
          </div>
          <div class="pull-right">
            <Button type="primary">确定</Button>
          </div>
        </div>
        <Form label-position="top">
          <FormItem label="员工姓名">
            <Input search enter-button />
          </FormItem>
          <FormItem label="员工手机">
            <Input search enter-button />
          </FormItem>
          <FormItem label="员工工号">
            <Input search enter-button />
          </FormItem>
          <FormItem label="接单单数">

          </FormItem>
          <FormItem label="所属服务网点">
            <Select>
              <Option value="">网点1</Option>
            </Select>
          </FormItem>
          <FormItem label="网点休息中">
            <i-switch></i-switch>
          </FormItem>
          <FormItem label="备用网点值班中">
            <i-switch></i-switch>
          </FormItem>
          <FormItem label="账号停用">
            <i-switch></i-switch>
          </FormItem>
          <FormItem label="所属服务网点">
            <Select>
              <Option value="">组1</Option>
            </Select>
          </FormItem>
        </Form>
      </Drawer>
    </Card>
</template>

<script>
    export default {
        name: "staff-admin",
      data(){
          return {
            filter:false,
            columns:[
              {title:'姓名',key:'name',align:'center'},
              {title:'手机',key:'name',align:'center'},
              {title:'工号',key:'name',align:'center'},
              {title:'所属网点',key:'name',align:'center'},
              {title:'所属组',key:'name',align:'center'},
              {title:'值班状态',key:'name',align:'center'},
              {title:'备用网点值班',key:'name',align:'center'},
              {title:'账号状态',key:'name',align:'center'},
              {title:'接单数',key:'name',align:'center',"sortable": true},
            ],
            lists:[
              {}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
