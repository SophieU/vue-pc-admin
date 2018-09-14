<template>
    <div>
      <Card>
        <Tabs>
          <TabPane label="app催费信息模板">
            <div id="editor1" class="mb-15"></div>
            <Button type="primary" >保存</Button>
          </TabPane>
          <TabPane label="催费单模板">
            <div class="editor-info">
              <h4 class="mb-15">说明：</h4>
              <div class="mb-15">
                <Tag type="border" color="default">【A】：物业公司名称</Tag>
                <Tag type="border" color="default">【B】：业主名称</Tag>
                <Tag type="border" color="default">【C】：制单日期</Tag>
                <Tag type="border" color="default">【D】：小区名称</Tag>
                <Tag type="border" color="default">【E】：房号</Tag>
                <Tag type="border" color="default">【F】：结算日期</Tag>
              </div>
            </div>
            <div id="editor2" class="mb-15"></div>
            <Button type="primary">保存</Button>
          </TabPane>
          <TabPane label="催费短信模板">
            <div id="editor3" class="mb-15"></div>
            <Button type="primary">保存</Button>
          </TabPane>
          <TabPane label="催费律师函模板">
            <div class="editor-info">
              <h4 class="mb-15">说明：</h4>
              <div class="mb-15">
                <Tag type="border" color="default">【A】：物业公司名称</Tag>
                <Tag type="border" color="default">【B】：业主名称</Tag>
                <Tag type="border" color="default">【C】：制单日期</Tag>
                <Tag type="border" color="default">【D】：小区名称</Tag>
                <Tag type="border" color="default">【E】：房号</Tag>
                <Tag type="border" color="default">【F】：结算日期</Tag>
                <Tag type="border" color="default">【G】：开始日期</Tag>
                <Tag type="border" color="default">【H】：结束日期</Tag>
                <Tag type="border" color="default">【I】：拖欠费用</Tag>
              </div>
            </div>
            <div id="editor4" class="mb-15"></div>
            <Button type="primary">保存</Button>
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
          let editor1 = new E('#editor1');
          editor1.create();
          // 配置服务器端地址
          editor1.customConfig.uploadImgServer = '/upload';

          let editor2= new E('#editor2');
          editor2.create();
          editor2.customConfig.uploadImgServer = '/upload';

          let editor3 = new E('#editor3');
          editor3.create();
          editor3.customConfig.uploadImgServer = '/upload';

          let editor4 = new E('#editor4');
          editor4.create();
          editor4.customConfig.uploadImgServer = '/upload';

      }
    }
</script>

<style scoped>

</style>
