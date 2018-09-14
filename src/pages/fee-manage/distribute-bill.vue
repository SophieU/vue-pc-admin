<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="选择小区：">
              <Select style="width:200px;">
                <Option value="">状元府</Option>
              </Select>
            </FormItem>
            <FormItem label="票据状态：">
              <Select style="width:100px;">
                <Option value="">已分配</Option>
                <Option value="">未分配</Option>
                <Option value="">已开票</Option>
              </Select>
            </FormItem>
            <FormItem label="票据分类：">
              <Select style="width:100px;">
                <Option value="">普通发票</Option>
                <Option value="">增值发票</Option>
                <Option value="">收据</Option>
              </Select>
            </FormItem>
            <FormItem label="票据编号：">
              <Input  style="width:200px;"/>
              <span>至</span>
              <Input  style="width:200px;"/>
            </FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </Form>
        </div>
      </Card>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">批量分配</Button>
            <Button>批量回收</Button>
          </div>
        </div>
        <Table :columns="columns"></Table>
        <div class="pagination">
          <Page :total="40" show-sizer show-elevator></Page>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "pay-settting",
      data(){
          return{
            columns:[
              {type:'selection'},
              {title:'小区名称'},
              {title:'票据编号'},
              {title:'票据种类'},
              {title:'票据状态'},
              {title:'操作'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
