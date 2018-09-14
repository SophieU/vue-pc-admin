<style scoped lang="scss">
  @import "./contents.scss";
</style>
<template>
    <div>
      <Card>
        <div class="form-filter">
          <Form :mode="formFilter" inline :label-width="80">
            <FormItem label="发布时间">
              <DatePicker type="date" show-week-numbers placeholder="选择发布时间" style="width: 150px"></DatePicker>
            </FormItem>
            <FormItem label="状态" >
              <Select v-model="formFilter.status"  style="width:150px">
                <Option value="beijing">全部</Option>
                <Option value="shenzhen">已发布</Option>
                <Option value="shenzhen">已取消</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary">搜索</Button>
              <Button >重置</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Card style="margin-top:10px;">
        <Tabs type="card">
          <TabPane label="发布">
            <div class="clearfix">
              <Button type="primary" style="float:right;margin-bottom: 15px;" >
                <router-link :to="{path:'/publish-pk'}" style="color: #fff;">发布PK</router-link>
              </Button>
            </div>
            <div class="publish-table">
              <Table :columns="pkTableColumn" :data="pkTable"></Table>
              <div class="pagination">
                <Page :total="40" size="small" show-elevator show-sizer />
              </div>
            </div>
          </TabPane>
          <TabPane label="调研">
            <div class="clearfix">
              <Button type="primary" style="float:right;margin-bottom: 15px;" >发布调研</Button>
            </div>
            <div class="survey-table">
              <Table :columns="surveyColumn" :data="pkTable"></Table>
              <div class="pagination">
                <Page :total="40" size="small" show-elevator show-sizer />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "chamber",
      data(){
          return{
            formFilter:{},
            pkTableColumn:[
              {title:'标题',key:'title',align:'center'},
              {title:'发布人',key:'pubUser',align:'center',width:100},
              {title:'发布时间',key:'pubDate',align:'center'},
              {title:'正方',key:'pubDate',align:'center'},
              {title:'反方',key:'pubDate',align:'center'},
              {title:'参与人数',key:'pubDate',align:'center'},
              {title:'操作',key:'action',align:'center'},
            ],
            pkTable:[],
            surveyColumn:[
              {title:'标题',key:'title',align:'center'},
              {title:'发布人',key:'pubUser',align:'center',width:100},
              {title:'发布时间',key:'pubDate',align:'center'},
              {title:'投票类型',key:'pubDate',align:'center'},
              {title:'参与',key:'pubDate',align:'center'},
              {title:'操作',key:'action',align:'center'},
            ]
          }
      }
    }
</script>


