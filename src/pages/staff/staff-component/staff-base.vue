<style scoped lang="scss">
  @import "../staff.scss";
</style>
<template>
  <div>
    <Row :gutter="15">
      <Col :lg="12" :sm="24">
        <div class="card mb-15">
          <div class="card-header">
            <p class="card-title">基础信息：</p>
            <div class="card-extra">
              <Button type="primary" >保存</Button>
              <Button >编辑</Button>
            </div>
          </div>
          <div class="card-body">
            <div class="info-panel">
              <ul class="form-ul">
                <li>
                  <span class="label">姓名：</span>
                  <span>亚瑟</span>
                </li>
                <li>
                  <span class="label">电话：</span>
                  <span>366666666</span>
                </li>
                <li>
                  <span class="label">工号：</span>
                  <span>89757</span>
                </li>
                <li>
                  <span class="label">上班状态：</span>
                  <span class="text-grey">休息中</span>
                </li>
                <li>
                  <span class="label">所属网点：</span>
                  <Select style="width: 200px;">
                    <Option value="">24服务小区</Option>
                  </Select>
                </li>
                <li>
                  <span class="label">所属组：</span>
                  <span style="margin-right: 15px;">3组</span>
                  <a href="##" class="text-blue">查看组信息</a>
                </li>
                <li>
                  <span class="label">账号状态：</span>
                  <span class="text-grey">启用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">账号信息：</h4>
            <div class="card-extra">
              <Button>查看</Button>
            </div>
          </div>
          <div class="card-body">
            <ul class="form-ul">
              <li>
                <span class="label">账号：</span>
                <span>123456789</span>
              </li>
            </ul>
          </div>
        </div>
      </Col>
      <Col :lg="12" :sm="24">
        <div class="card mb-15">
          <div class="card-header">
            <p class="card-title">服务类型：</p>
            <div class="card-extra">
              <Button>查看</Button>
            </div>
          </div>
          <div class="card-body">
              <ul class="service-lists">
                <li>用气服务</li>
                <li>用电服务</li>
                <li>用水服务</li>
                <li>供暖服务</li>
              </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">统计：</h4>
            <div class="card-extra">
              <Button>查看</Button>
            </div>

          </div>
          <div class="card-body">
            <ul class="form-ul_column2">
              <li>历史处理工单：<span>600</span></li>
              <li>本月处理工单：<span>200</span></li>
              <li>历史售后工单：<span>600</span></li>
              <li>本月售后工单：：<span>600</span></li>
              <li>历史申述次数：：<span>600</span></li>
              <li>本月申述次数：：<span>600</span></li>
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "staff-base"
    }
</script>

