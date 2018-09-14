<template>
    <div>
     <Card>
       <Form inline :label-width="80" class="filter-form">
         <FormItem label="状态：">
           <Select style="width: 200px;">
             <Option value="">全部</Option>
             <Option value="">已发布</Option>
             <Option value="">已执行</Option>
             <Option value="">执行中</Option>
           </Select>
         </FormItem>
         <FormItem label="类目：">
           <Select style="width: 200px;">
             <Option value="">宏昌一</Option>
           </Select>
         </FormItem>
         <FormItem>
           <Button type="primary">搜索</Button>
         </FormItem>
       </Form>
     </Card>
      <Card class="mt-15">
        <div class="clearfix mb-15">
          <div class="pull-right">
            <Button @click="addRest=true" type="primary" >发布休工期</Button>
          </div>
        </div>
        <Table :columns="restColumn" :datas="restList"></Table>
        <div class="pagination">
          <Page :total="40" show-sizer show-elevator></Page>
        </div>
      </Card>

      <Modal title="新增休工期" v-model="addRest">
        <Form :label-width="120">
          <FormItem label="休工区间设置：">
            <DatePicker style="width:250px;"  type="daterange"></DatePicker>
          </FormItem>
          <FormItem label="受影响类目：">
            <Input style="width:300px;" placeholder="弹出树形结构"/>
          </FormItem>
          <FormItem label="通知用户：">
            <Input style="width:300px;"  type="textarea" />
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "rest",
      data(){
        return {
          addRest:false,
          restColumn:[
            {title:"休工区间",key:"restTime"},
            {title:"受影响类目",key:"effectType"},
            {title:"状态",key:"status"},
            {title:"发布时间",key:"pubTime"},
            {title:"操作",render:(h)=>{
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
                    type:'warning',
                    size:'small'
                  },
                },'删除'),
              ])
              }},
          ],
          restList:[]
        }
      }
    }
</script>

<style scoped>

</style>
