<style scoped lang="scss">
  @import "./source.scss";
</style>
<template>
    <Card>
      <Form :label-width="100">
        <FormItem label="服务网点">
          <Select class="w300">
            <Option value="">42服务网点</Option>
          </Select>
        </FormItem>
        <FormItem label="出库类型">
          <Select class="w300">
            <Option value="">退货</Option>
          </Select>
        </FormItem>
        <FormItem label="入库类型">
          <Select class="w300">
            <Option value="">采购</Option>
            <Option value="">调拔</Option>
          </Select>
        </FormItem>

        <FormItem label="原始单号">
          <Input class="w400"/>
        </FormItem>
        <FormItem label="辅材">
          <Button @click="showModal=true">添加辅材</Button>
        </FormItem>
      </Form>
      <div class="table-wrapper">
        <table class="native-table">
          <thead>
          <tr>
            <th>辅材名称</th>
            <th>型号</th>
            <th>单位</th>
            <th>单价</th>
            <th>数量</th>
            <th>出库成本</th>
            <th>入库成本</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>软管</td>
            <td>PVC25</td>
            <td>米</td>
            <td>5.00</td>
            <td>
              <InputNumber :step="1" :min="1" placeholder="请输入数量"></InputNumber>
            </td>
            <td>
              <InputNumber  :min="1" placeholder="请输入出库成本"></InputNumber>
            </td>
            <td>
              <InputNumber  :min="1" placeholder="请输入入库成本"></InputNumber>
            </td>
            <td>
              <Button type="text" class="text-red">删除</Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--辅材弹窗-->
      <Modal title="选择辅材" v-model="showModal" width="650">
        <div>
          <div class="mb-15">
            <Row :gutter="15">
              <Col span="4">搜索</Col>
              <Col span="12">
                <Input />
              </Col>
              <Col span="4">
                <Button type="primary">搜索</Button>
              </Col>
            </Row>
          </div>
          <Row :gutter="15">
            <Col :span="8">
              <Card class="modal-card">
                <p slot="title" style="text-align: center;">辅材类别</p>
                <ul class="type-lists">
                  <li>全部服务</li>
                  <li>用气服务</li>
                  <li>用气服务</li>
                  <li>用气服务</li>
                  <li>用气服务</li>
                  <li>用气服务</li>
                </ul>
              </Card>
            </Col>
            <Col :span="16">
              <table class="native-table">
                <thead>
                <tr>
                  <th>辅材名称</th>
                  <th>型号</th>
                  <th>单位</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>软管</td>
                  <td>PVC25</td>
                  <td>米</td>
                  <td>
                    <Button type="text" class="text-blue">选择</Button>
                  </td>
                </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
        <div slot="footer">
          <Button @click="showModal=false">关闭</Button>
        </div>
      </Modal>
    </Card>
</template>

<script>
    export default {
        name: "new-out",
      data(){
          return {
            showModal:false,

            lists:[
              {name:'11',version:'11',unit:'11',price:'11',num:'11',cost:'11'}
            ]
          }
      }
    }
</script>


