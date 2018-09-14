<style scoped lang="scss">
  @import './fee-manage.scss';
</style>
<template>
    <div>
      <Card class="mb-15">
        <div class="filter-form">
          <Form inline :label-width="80">
            <FormItem label="选择小区：">
              <Select style="width: 200px;">
                <Option value="">力宝小区</Option>
              </Select>
            </FormItem>
            <FormItem label="资源名称：">
              <Input placeholder="选择树形"/>
            </FormItem>
            <Button type="primary">漏关查询</Button>
            <Button type="success">开始计费</Button>
            <Button>重置</Button>
          </Form>
        </div>
      </Card>
      <Card>
        <Tabs>
          <TabPane :label="'一次性计费'">
            <table class="form-table" style="max-width:800px;margin: 50px auto;">
              <tr>
                <td>选择计费名称 <i class="must">*</i></td>
                <td>
                  <Select>
                    <Option value="">物业费</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td>基本单价 <i class="must">*</i></td>
                <td><Input type="text" /></td>
              </tr>
              <tr>
                <td>数量 <i class="must">*</i></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>应收时间 <i class="must">*</i></td>
                <td><DatePicker placement="top" type="date"></DatePicker></td>
              </tr>
              <tr>
                <td>开始时间 <i class="must">*</i></td>
                <td><DatePicker placement="top" type="date"></DatePicker></td>
              </tr>
              <tr>
                <td>结束时间 <i class="must">*</i></td>
                <td><DatePicker placement="top" type="date"></DatePicker></td>
              </tr>
              <tr>
                <td>备注</td>
                <td>
                  <Input type="textarea" />
                </td>
              </tr>
            </table>
          </TabPane>
          <TabPane :label="'周期性计费'">
            <div class="tab-block">
              <h4>周期性计费标准列表：</h4>
              <table class="tab-table">
                <tr>
                  <td style="width:50px;"><Checkbox></Checkbox></td>
                  <td>计费标准</td>
                </tr>
              </table>
            </div>
            <div class="tab-block">
              <h4>应收时间设置：</h4>
              <table class="tab-table">
                <tr>
                  <td style="width: 120px;">应收时间</td>
                  <td>
                    <span >每月</span>
                     <Select style="display: inline-block; width: 100px;">
                       <Option value="">01</Option>
                       <Option value="">02</Option>
                     </Select>
                    <span>号</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="tab-block">
              <h4>计费条件设置：</h4>
              <table class="tab-table">
                <tr>
                  <td rowspan="2">计费时段</td>
                  <td>
                    <Radio >自动至
                      <DatePicker type="date" placement="top"></DatePicker>
                      <span class="text-red">（按上次收费时间自动连续生成费用）</span>
                    </Radio>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Radio></Radio>
                    <DatePicker placement="top" format="yyyy年MM月dd日" style="width: 300px;" type="daterange" placeholder="请选择时间段"></DatePicker>
                  </td>
                </tr>
              </table>
            </div>
            <div class="tab-block">
              <h4>当前已生效的计费规则：</h4>
              <table class="grey-head-table">
                <thead>
                <tr>
                  <th>小区名称</th>
                  <th>计费名称</th>
                  <th>应收时间</th>
                  <th>计费时段</th>
                  <th>状态</th>
                  <th>操作员</th>
                  <th>操作时间</th>
                  <th>操作</th>
                </tr>
                </thead>
              </table>
            </div>
          </TabPane>
          <TabPane :label="'预缴设置'">
            <div class="tab-block">
              <h4>预缴生效时段设置 <i class="must">*</i></h4>
              <DatePicker style="width: 200px;margin: 15px 0;" type="daterange" placeholder="请选择时间段"></DatePicker>
            </div>
            <div class="tab-block">
              <h4>预缴奖励说明 <i class="must">*</i></h4>
              <div class="rich-editor" id="rich-editor">
                <p>这是初始文字</p>
              </div>
            </div>
            <div class="tab-block">
              <h4>预缴周期设置 <i class="must">*</i></h4>
              <table class="tab-table">
                <thead class="btn-head">
                  <tr>
                    <th colspan="3">
                      <Button type="primary">增加</Button>
                      <Button type="warning">删除</Button>
                      <Radio>允许打折</Radio>
                    </th>
                  </tr>
                </thead>
               <tbody>
                 <tr>
                   <td style="width: 60px;"><Checkbox></Checkbox></td>
                   <td>预缴周期（单位：月）<i class="must">*</i></td>
                   <td>折扣设置</td>
                 </tr>
                 <tr>
                   <td><Checkbox></Checkbox> </td>
                   <td>
                     <InputNumber :min="1" />
                     <span>个月</span>
                   </td>
                   <td><InputNumber disabled/></td>
                 </tr>

               </tbody>
              </table>
            </div>

          </TabPane>
        </Tabs>
      </Card>

    </div>
</template>

<script>
  import wangEditor from 'wangeditor';
    export default {
        name: "pay-settting",
      mounted(){
         let E = wangEditor;
         let editor = new E('#rich-editor');
        editor.customConfig.uploadImgServer='/upload';
         editor.create();
      }
    }
</script>


