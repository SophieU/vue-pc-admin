<template>
<div>
 <Card>
   <div class="clearfix mb-15">
     <div class="pull-right">
       <Button @click="firstCatModal=true" type="primary">新增一级类目</Button>
     </div>
   </div>
   <Table :columns="categoryColumn" :data="categorys"></Table>
   <div class="pagination">
     <Page :total="40" show-sizer show-elevator></Page>
   </div>
 </Card>
  <Modal v-model="firstCatModal" title="新增一级类目">
    <Form :label-width="80">
      <FormItem label="类目图标">

      </FormItem>
      <FormItem label="类目名称：">
        <Input style="width: 200px;" />
      </FormItem>
      <FormItem label="类目排序：">
        <InputNumber :max="10" :min="1"></InputNumber>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>

<script>
    export default {
        name: "category",
      data(){
          return{
            firstCatModal:false, //新增一级类目弹窗
            categoryColumn:[
              {title:'类目图标',key:'icon',align:'center'},
              {title:'类目名称',key:'name',align:'center'},
              {title:'排序',key:'sort',sortable:true,align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
                return h('div',[
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'10px'
                    }
                  },'编辑'),
                  h('Button',{
                    props:{
                      type:'error',
                      size:'small'
                    }
                  },'删除')
                ])
                }},
            ],
            categorys:[]
          }
      }
    }
</script>

<style scoped>

</style>
