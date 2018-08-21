<style scoped lang="scss">
  @import "./app-manage.scss";
</style>
<template>
  <div class="flow">
    <transition name="fade" mode="out-in">

    <Card v-if="page==='list'" key="list">
      <div class="clearfix mb-15">
        <div class="pull-right">
          <Button @click="workTimeModal=true" icon="md-alarm">设置工作时间</Button>
        </div>
      </div>
      <table class="flow-table mb-15">
        <thead>
          <tr>
            <th>流程名称</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        <tr  class="body-title">
          <td colspan="3">考勤休假</td>
        </tr>
        <tr>
          <td>请假</td>
          <td>
            <Icon type="md-arrow-round-down" />
            <Icon type="md-arrow-round-up" />
          </td>
          <td>
            <button @click="goSetting('请假')" class="btn-link">审批流程</button>
          </td>
        </tr>
        </tbody>
        <tbody>
        <tr class="body-title">
          <td colspan="3">行政审批</td>
        </tr>
        <tr>
          <td>用章申请</td>
          <td>
            <Icon type="md-arrow-round-down" />
            <Icon type="md-arrow-round-up" />
          </td>
          <td>
            <button @click="goSetting('用章')" class="btn-link">审批流程</button>
          </td>
        </tr>
        <tr>
          <td>通用审批</td>
          <td>
            <Icon type="md-arrow-round-down" />
            <Icon type="md-arrow-round-up" />
          </td>
          <td>
            <button @click="goSetting('通用')" class="btn-link">审批流程</button>
          </td>
        </tr>
        </tbody>
      </table>
    </Card>
      <Card v-if="page==='setting'" class="flow-setting" key="setting">
        <div class="card-header" slot="title">
          <h3 class="card-title">审批流程设置</h3>
          <div>
            <Button @click="save" type="primary">保存设置</Button>
            <Button @click="back">返回上一步</Button>
          </div>
        </div>
        <div class="exam-content">
          <div class="exam-block">
            <div class="exam-title">默认审批人：</div>
            <div class="exam-box">
              <Button @click="approverModal=true" type="primary" shape="circle" icon="md-add"></Button>
            </div>
          </div>
          <div class="exam-block">
            <div class="exam-title">分条件审批：</div>
            <div class="exam-box">
              <Button type="primary" @click="conditionModal=true">添加</Button>
            </div>
          </div>
          <div class="exam-block more-setting">
            <div class="exam-title">更多设置：</div>
            <div class="exam-box">
              <div class="exam-more">
                <span>审批人去重： </span>
                <Select style="width:200px">
                  <Option v-for="item in [1,2,3,4]" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </transition>
    <!--工作时间弹窗-->
    <Modal v-model="workTimeModal" title="设置工作时间" @on-ok="saveWorkTime">
      <Form :model="workTimeForm" :label-width="150">
        <FormItem label="上午上班时间：">
          <TimePicker :confirm="true" type="time" :steps="[1,5]" format="HH:mm" v-model="workTimeForm.startAM"></TimePicker>
        </FormItem>
        <FormItem label="上午下班时间：">
          <TimePicker  :confirm="true" type="time":steps="[1,5]"  format="HH:mm" v-model="workTimeForm.endAM"></TimePicker>
        </FormItem>
        <FormItem label="下午上班时间：">
          <TimePicker type="time"  :confirm="true" :steps="[1,5]" format="HH:mm" v-model="workTimeForm.startPM"></TimePicker>
        </FormItem>
        <FormItem label="下午下班时间：">
          <TimePicker type="time"  :confirm="true" :steps="[1,5]" format="HH:mm" v-model="workTimeForm.endPM"></TimePicker>
        </FormItem>
        <p class="tips" style="text-align: center;">（保存后，全公司员工将按新的规则重新计算）</p>
      </Form>
    </Modal>
    <!--添加审批人弹窗-->
    <Modal v-model="approverModal" title="选择审批人">
      <Form :label-width="150" :model="approverForm">
        <FormItem label="审批人类型：">
          <RadioGroup v-model="approverForm.approverType">
            <Radio label="leader">主管-指定一级</Radio>
            <Radio label="staff">指定成员</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="指定主管：" v-if="approverForm.approverType==='leader'">
          <Select style="width: 200px;">
            <Option value="一级主管">一级主管</Option>
            <Option value="一级主管">二级主管</Option>
            <Option value="一级主管">三级主管</Option>
            <Option value="一级主管">直接上级</Option>
          </Select>
        </FormItem>
        <FormItem label="指定人员：" v-else>
          <div class="staff-box">
            <Tag color="primary" type="dot">李二狗</Tag>
          </div>
          <Button @click="staffModal=true" type="info">选择人员</Button>
        </FormItem>
      </Form>
    </Modal>
<!--条件弹窗-->
    <Modal v-model="conditionModal" title="设置条件" class="conditionModal">
      <Form :label-width="80">
        <div class="cond-block">
          <p>当审批人满足以下条件时：</p>
          <FormItem label="请假类型：">
            <CheckboxGroup >
              <Checkbox label="年假"></Checkbox>
              <Checkbox label="调休"></Checkbox>
              <Checkbox label="事假"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="时长：">
            <Row>
              <Col span="6">
                <Select>
                  <Option value="1">大于</Option>
                  <Option value="1">等于</Option>
                  <Option value="1">小于</Option>
                  <Option value="1">大于等于</Option>
                  <Option value="1">小于等于</Option>
                </Select>
              </Col>
              <Col span="10">
                <Input ></Input>
              </Col>
            </Row>
          </FormItem>

        </div>
        <div class="cond-block">
          <p>对应审批人：</p>
          <FormItem label="审批人：">
            <Button size="small" type="primary" icon="md-add" shape="circle" ></Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <staff-tree :show="staffModal" :cancel="()=>this.staffModal=false"></staff-tree>
  </div>
</template>

<script>
  import staffTree from '@/pages/components/staff-tree.vue'
    export default {
        name: "flow-admin",
      components:{
        staffTree
      },
      data(){
          return{
            page:'list',
            workTimeModal:false, //工作时间弹窗
            workTimeForm:{}, //工作时间
            approverModal:false, //审批人弹窗
            conditionModal:false, //条件弹窗
            staffModal:false, //员工树弹窗
            approverForm:{  //审批人弹窗
              approverType:'leader'
            },
          }
      },
      methods:{
        save(){
          this.page='list'
        },
        back(){
          this.page='list'
        },
        goSetting(type){
          this.page='setting'
        },
        //设置工作时间
        saveWorkTime(){
          console.log('保存工作时间')
        },
      }
    }
</script>


