<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="选择小区：" >
              <Select style="width: 150px;">
                <Option value="">状元府</Option>
              </Select>
            </FormItem>
            <FormItem label="资源名称：">
              <Input placeholder="树形结构" readonly/>
            </FormItem>
            <FormItem label="计费名称：">
              <Select style="width: 150px;">
                <Option value="">全部</Option>
              </Select>
            </FormItem>
            <FormItem label="业主手机号：">
              <Input />
            </FormItem>
            <FormItem label="业主姓名：">
              <Input />
            </FormItem>
            <FormItem label="计费员：">
              <Input />
            </FormItem>
            <FormItem label="状态：">
              <Select style="width: 150px;">
                <Option value="">全部</Option>
                <Option value="">正常</Option>
                <Option value="">已退费</Option>
              </Select>
            </FormItem>
            <FormItem label="应收时间：">
              <DatePicker type="date"></DatePicker>
            </FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </Form>
        </div>
      </Card>
      <Card>
        <div class="clearfix">
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
        name: "infact-search",
      data(){
          return {
            columns:[
              {title:'小区名称'},
              {title:'资源名称'},
              {title:'业主手机号'},
              {title:'业主姓名'},
              {title:'票据单号'},
              {title:'实收金额'},
              {title:'收费时间'},
              {title:'收费员'},
              {title:'支付方式'},
              {title:'支付渠道'},
              {title:'操作'},
            ]
          }
      }

    }
</script>

<style scoped>

</style>
