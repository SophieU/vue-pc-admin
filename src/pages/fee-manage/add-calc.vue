<template>
    <div>
      <Card>
        <p slot="title">
          添加计费公式
        </p>
        <div>
          <Form :label-width="120" style="width:800px;margin:0 auto;">
            <FormItem label="选择小区：">
              <Select>
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="计费名称：">
              <Input />
            </FormItem>
            <FormItem label="计费科目：">
              <Select>
                <Option value="">物业费</Option>
              </Select>
            </FormItem>
            <FormItem label="公摊系数：">
              <Input />
            </FormItem>
            <FormItem label="是否收取滞纳金：">
              <Select>
                <Option value="">不收取</Option>
                <Option value="">收取</Option>
              </Select>
            </FormItem>
            <FormItem label="计费公式：">
              <Select style="width:200px;">
                <Option value="">面积*物业单价</Option>
              </Select>
              <Button type="primary">新增计费公式</Button>
            </FormItem>
            <FormItem label="备注：">
              <Input type="textarea" />
            </FormItem>
            <FormItem label="单价设置：">
              <div class="mb-15">
                <Button type="primary" icon="md-add">增加</Button>
                <Button type="warning" icon="md-trash">删除</Button>
              </div>
              <Table :columns="priceColumn" :data="priceLists"></Table>
            </FormItem>
            <div style="text-align:center;">
              <Button type="primary">保存设置</Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "add-calc",
      data(){
          return{
            priceColumn:[
              {type:'selection',width:60,align:'center'},
              {title:'单价 *',key:'price'},
              {title:'计量单位 *',key:'calcUnit'},
              {title:'生效日期 *',key:'startTime'},
            ],
            priceLists:[]
          }
      }
    }
</script>

<style scoped>

</style>
