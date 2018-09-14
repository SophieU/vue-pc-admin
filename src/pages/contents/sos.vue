<style scoped lang="scss">
  @import "./contents.scss";
</style>
<template>
  <div class="sos">
    <Card>
      <div class="form-filter">
        <Form :mode="formFilter" inline :label-width="80">
          <!--<FormItem label="选择小区" >-->
            <!--<Select v-model="formFilter.village"  style="width:150px">-->
              <!--<Option value="beijing">New York</Option>-->
              <!--<Option value="shanghai">London</Option>-->
              <!--<Option value="shenzhen">Sydney</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <FormItem label="报警来源" >
            <Select v-model="formFilter.from"  >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="报警地址" >
            <Input placeholder="请输入报警地址" v-model="formFilter.fromAdd"></Input>
          </FormItem>
          <FormItem label="警源电话" >
            <Input placeholder="请输入联系电话" v-model="formFilter.phone"></Input>
          </FormItem>
          <FormItem label="警源姓名" >
            <Input placeholder="请输入报警者姓名" v-model="formFilter.phone"></Input>
          </FormItem>
          <FormItem label="状态" >
            <Select v-model="formFilter.status"  >
              <Option value="beijing">已受理</Option>
              <Option value="shanghai">未受理</Option>
              <Option value="shenzhen">已解决</Option>
              <Option value="shenzhen">已关闭</Option>
            </Select>
          </FormItem>
          <FormItem label="报警内容" >
            <Input placeholder="请输入报警内容" v-model="formFilter.phone"></Input>
          </FormItem>
          <FormItem label="报警时间" >
            <DatePicker type="daterange" show-week-numbers placeholder="选择报警时间" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem label="受理人电话" >
            <Input placeholder="请输入受理人电话" v-model="formFilter.phone"></Input>
          </FormItem>
          <FormItem label="受理人姓名" >
            <Input placeholder="请输入受理人姓名" v-model="formFilter.phone"></Input>
          </FormItem>
          <FormItem label="解决时间" >
            <DatePicker type="date" show-week-numbers placeholder="选择解决时间" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>

      </div>
    </Card>
    <Card style="margin-top:20px;">
      <Table :disabled-hover="true" :row-class-name="sosRowDanger" :columns="sosTableColumn" :data="sosTable"></Table>
      <div class="pagination">
        <Page :total="40" size="small" show-elevator show-sizer />
      </div>
      <Modal v-model="acceptModal" title="受理报警" @on-ok="acceptSOS" >
        <div class="accept-modal">
          <div class="sos-info">
            <p>报警地址：<strong>1栋1单元1906</strong></p>
            <p>报警来源： 安心桥</p>
            <p>报警时间： 2018-3-26 11:59      2分钟前</p>
            <p>业主姓名： 李世民</p>
            <p>报警内容： 老人摔倒了</p>
          </div>
          <div class="cur-guard">
            <h4>当前巡更人员</h4>
            <RadioGroup v-model="sosGuard"  size="large">
              <Radio label="李隆基">
                <span>李隆基</span>
              </Radio>
              <Radio label="李炅">
                <span>李炅</span>
              </Radio>
              <Radio label="武媚娘">
                <span>武媚娘</span>
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </Modal>
      <Modal v-model="viewDetail" title="报警详情">
        <div class="view-detail">
          <Timeline >
            <TimelineItem>
              <p class="time">2018-04-26 12:05</p>
              <div class="timeline-content">
                <p>系统收到报警</p>
                <p>报警地址：<strong>1栋1单元1906</strong></p>
                <p>报警来源：  安心桥</p>
                <p>业主姓名： 李世民</p>
                <p>报警内容： 老人摔倒了</p>
              </div>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018-04-26 12:05</p>
              <div class="timeline-content">
                <p>巡更人员已受理</p>
                <p>受理人姓名：于文龙</p>
                <p>受理人联系方式： 18602870966</p>
              </div>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018-04-26 12:05</p>
              <div class="timeline-content">
                <p>已处理险情。</p>
                <p>处理结果：</p>
                <p>已与业主取得联系，经确认为误报。</p>
              </div>
            </TimelineItem>

          </Timeline>
        </div>
      </Modal>
      <Modal v-model="closeSOS" title="关闭报警">
        <div class="close-sos">
          <Form :mode="closeForm"  label-position="top">
            <FormItem label="请选择关闭报警信号的理由">
              <Select v-model="closeForm.reason"  >
                <Option value="beijing">接到业主电话，确认为误报</Option>
              </Select>
            </FormItem>
            <FormItem label="其他原因">
              <Input v-model="closeForm.other" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入其他原因"></Input>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
  import expandRow from './components/sos-table-expand'
    export default {
        name: "sos",
      components:{
          expandRow,
      },
      data(){
          return{
            closeForm:{
              reason:'',
              other:'',
            },
            acceptModal:false,
            viewDetail:false,//查看报警详情
            closeSOS:false, //关闭报警
            formFilter:{},
            sosGuard:'', //指派受理SOS人员
            sosTableColumn:[
              {type:'expand',
                width:50,
                render:(h,params)=>{
                  let row = params.row;
                  if(row.sosStatus==='已受理'){
                    return h(expandRow,{
                      props:{
                        row:params.row
                      }
                    })
                  }
                }
              },
              {title:'编号',key:'index',width:60,align:'center',},
              {title:'报警时间',key:'sosTime',width:150,align:'center',},
              {title:'所在小区',key:'village',align:'center',},
              {title:'报警地址',key:'sosAdd',align:'center',},
              {title:'报警源电话',key:'sosTel',align:'center',},
              {title:'报警源姓名',key:'sosName',align:'center',},
              {title:'报警内容',key:'sosContent',align:'center',},
              {title:'状态',key:'sosStatus',align:'center',},
              // {title:'受理人姓名',key:'dealName'},
              // {title:'受理人电话',key:'dealTel'},
              // {title:'解决时间',key:'dealTime'},
              {title:'操作',
                key:'action',
                fixed: 'right',
                align:'center',
                width:200,
                render:(h,params)=>{
                 let vm = this;
                  return  h('div',[
                            h('Button',{
                              props:{
                                type:'text',
                                size:'small',

                              },
                              class:'primary-text-btn',
                              on:{
                                click:()=>{
                                  vm.acceptModal=true;
                                }
                              }
                            },'受理'),
                            h('Button',{
                              props:{
                                type:'text',
                                size:'small'
                              },
                              class:'danger-text-btn',
                              on:{
                                click:()=>{
                                  vm.closeSOS=true;
                                }
                              }
                            },'关闭'),
                            h('Button',{
                              props:{
                                type:'text',
                                size:'small'
                              },
                              class:'primary-text-btn',
                              on:{
                                click:()=>{
                                  vm.viewDetail=true;
                                }
                              }
                            },'查看详情'),
                      ])
                    }
                },
            ],
            sosTable:[
              {
                index:1,
                sosTime:'2016-10-11 17:10',
                village:'力宝大夏',
                sosAdd:'1栋1单元101',
                sosTel:'18602870966',
                sosName:'李世民',
                sosContent:'老人摔倒了',
                sosStatus:'未受理',
                // dealName:'',
                // dealTel:'',
                // dealTime:'',
              }, {
                index:2,
                sosTime:'2016-10-11 17:10',
                village:'力宝大夏',
                sosAdd:'1栋1单元101',
                sosTel:'18602870966',
                sosName:'杨玉环',
                sosContent:'煤气报警',
                sosStatus:'已受理',
                dealName:'二狗子',
                dealTel:'13113313311',
                dealTime:'2016-10-11 17:10',
              },
            ]
          }
      },
      methods:{
        sosRowDanger(row,index){
          if(row.sosStatus==='未受理'){
            return 'danger-sos-row'
          }else{
            return ''
          }
        },
        //受理
        acceptSOS(){
          console.log('受理报警')
        }
      }
    }
</script>



