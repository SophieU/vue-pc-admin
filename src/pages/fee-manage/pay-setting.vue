<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="100">
            <FormItem label="物业公司名称：">
              <Input placeholder="请输入物业公司名称"/>
            </FormItem>
            <Button type="primary">搜索</Button>
            <Button >重置</Button>
          </Form>
        </div>
      </Card>
      <Card>
        <Table :columns="columns" :data="payData"></Table>
        <div class="pagination">
          <Page :total="50" show-sizer show-elevator></Page>
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
              {title:'公司名称',key:'name',align:'center'},
              {title:'联系人',key:'contact',align:'center'},
              {title:'联系电话',key:'tel',align:'center'},
              {title:'操作',render(h,params){
                return h('div',[
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'10px'
                    }
                  },'微信'),
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    }
                  },'支付宝')
                ])
                }},
            ],
            payData:[
              {name:'力宝物业',contact:'陈皮阿四',tel:'18800000000'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
