<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <div>
              <FormItem label="选择小区：">
                <Select  style="width: 200px;">
                  <Option value="">力宝小区</Option>
                </Select>
              </FormItem>
              <FormItem label="资源名称：">
                <Input  style="width: 200px;" placeholder="树形结构" readonly/>
              </FormItem>
              <FormItem label="收费时间：">
                <DatePicker  style="width: 200px;" type="daterange" placeholer="请选择时间范围"></DatePicker>
              </FormItem>
            </div>
           <div>
             <FormItem label="业主手机号：">
               <Input  style="width: 200px;"/>
             </FormItem>
             <FormItem label="业主姓名：">
               <Input  style="width: 200px;"/>
             </FormItem>
             <FormItem label="支付方式：">
               <Select  style="width: 200px;">
                 <Option value="">全部</Option>
                 <Option value="">支付宝</Option>
                 <Option value="">微信</Option>
                 <Option value="">现金</Option>
                 <Option value="">Pos机</Option>
               </Select>
             </FormItem>
             <Button type="primary">搜索</Button>
             <Button>重置</Button>
           </div>

          </Form>
        </div>
      </Card>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">导出</Button>
          </div>
        </div>
        <Table :columns="columns"></Table>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "subject-detail",
      data(){
          return {
            columns:[
              {title:'编号'}, {title:'小区名称'}, {title:'资源名称'}, {title:'业主电话'}, {title:'业主姓名'},
              {title:'收费时间'}, {title:'支付方式'}, {title:'票据号'}, {title:'票据类型'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
