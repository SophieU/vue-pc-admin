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
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">批量作废</Button>
            <Button type="primary">批量催费</Button>
            <Button type="primary">导出</Button>
          </div>
        </div>
        <Table :columns="dueColumn"></Table>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "pay-settting",
      data(){
          return{
            dueColumn:[
              {type:'selection',width:50},
              {title:'小区名称',key:'communityName'},
              {title:'资源名称',key:'sourceName'},
              {title:'计费名称',key:'calcName'},
              {title:'业主姓名',key:'ownerName'},
              {title:'业主手机号',key:'ownerTel'},
              {title:'应收金额',key:'dueFee'},
              {title:'滞纳金',key:'lateFee'},
              {title:'状态',key:'status'},
              {title:'计费员',key:'calcStaff'},
              {title:'计费周期',key:'calcRange'},
              {title:'应收时间'},
              {title:'操作'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
