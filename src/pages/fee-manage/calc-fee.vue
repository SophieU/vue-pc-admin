<template>
    <div>
      <Card class="mb-15">
        <Form inline :label-width="80">
          <FormItem label="计费科目：">
            <Select style="width:200px;">
              <Option value="">电梯住宅管理费</Option>
              <Option value="">小区物业费</Option>
            </Select>
          </FormItem>
          <FormItem label="计费名称：">
            <Input />
          </FormItem>
          <FormItem label="状态：" style="width: 200px;">
            <Select>
              <Option value="">全部</Option>
              <Option value="">已关联</Option>
              <Option value="">未关联</Option>
            </Select>
          </FormItem>
          <Button type="primary">搜索</Button>
          <Button>重置</Button>
        </Form>
      </Card>
      <Card>
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button type="primary">欠费记录批量导入</Button>
            <Button>漏关查询</Button>
            <Button @click="addCalc">添加</Button>
          </div>
        </div>
        <Table :columns="calcColumn" :data="calcLists"></Table>
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
          return {
            calcColumn:[
              {title:'序号',type:'index'},
              {title:'计费名称',type:'calcName'},
              {title:'计费科目',type:'calcType'},
              {title:'单价',type:'price'},
              {title:'计量单位',type:'unit'},
              {title:'状态',type:'status'},
              {title:'创建人',type:'creator'},
              {title:'创建时间',type:'createTime'},
              {title:'操作',render:(h,params)=>{
                return h('div',[
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'10px'
                    }
                  }),h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'10px'
                    }
                  }),h('Button',{
                    props:{
                      type:'warning',
                      size:'small'
                    },
                  }),
                ])
                }}
            ],
            calcLists:[]
          }
      },
      methods:{
          addCalc(){
            console.log(this.$router)
            this.$router.push({name:'addCalc'})
          }
      }
    }
</script>

<style scoped>

</style>
