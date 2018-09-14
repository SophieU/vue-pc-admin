<template>
    <div>
      <div class="mb-15">
        <Card>
          <div class="filter-form">
            <Form  label-position="left" :inline="true">
              <FormItem label="选择小区：">
                <Select style="width: 150px">
                  <Option value="1">青秀城</Option>
                </Select>
              </FormItem>
              <FormItem label="审批类型：">
                <Select style="width: 150px">
                  <Option value="1">请假</Option>
                </Select>
              </FormItem>
              <FormItem label="审批编号：">
                <Input />
              </FormItem>
              <FormItem label="发起时间：">
                <DatePicker type="daterange" placement="bottom-end" ></DatePicker>
              </FormItem>
              <FormItem label="完成时间：">
                <DatePicker type="daterange" placement="bottom-end"  ></DatePicker>
              </FormItem>
              <FormItem label="审批人：">
                <Input />
              </FormItem>
              <FormItem >
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>

      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">导出</Button>
          </div>
        </div>
        <Table :columns="exportTableCol" :data="exportData"></Table>
        <div class="pagination">
          <Page :total="40" show-sizer show-elevator></Page>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "export-data",
      data(){
          return {
            exportTableCol:[
              {type:'selection',width:50},
              {title:'审批编号',key:'id',align:'center',},
              {title:'发起时间',key:'startTime',align:'center',},
              {title:'完成时间',key:'endTime',align:'center',},
              {title:'审批人',key:'checkLeader',align:'center',},
              {title:'审批类型',key:'checkType',align:'center',width:100},
              {title:'审批状态',key:'status',align:'center'}
            ],
            exportData:[
              {id:'12455',startTime:'2018-01-18 11:12',endTime:'2018-01-18 17:00',checkLeader:'李世民、李隆基、杨玉环',checkType:'请假',status:'审核通过'}
            ]
          }
      }
    }
</script>

<style scoped>

</style>
