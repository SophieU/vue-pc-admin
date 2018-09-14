<template>
    <div>
      <Card>
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="一级类目：">
              <Select style="width: 200px;">
                <Option value="">全部</Option>
              </Select>
            </FormItem>
            <FormItem label="联系方式：">
              <Input />
            </FormItem>
            <Button type="primary">搜索</Button>
          </Form>
        </div>
      </Card>
      <Card class="mt-15">
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">新增二级类目</Button>
          </div>
        </div>
          <Table :columns="columns" :data="emergencyLists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "emergency",
      data(){
          return{
            columns:[
              {title:"编号",type:"index",key:""},
              {title:"一级类目",key:""},
              {title:"二级类目",key:""},
              {title:"联系方式",key:""},
              {title:"操作",key:""},
            ],
            emergencyLists:[],
          }
      }
    }
</script>

<style scoped>

</style>
