<style scoped lang="scss">
  @import './home_index.scss';
</style>
<template>
  <div class="home-index">
    <Row :gutter="15">
      <Col :xs="24" :sm="12" :md="6" :style="{marginBottom:'10px'}">
        <info-card title="今日收到报警" :total="20" :deal="15" :wating="5"></info-card>
      </Col>
      <Col :xs="24" :sm="12" :md="6" :style="{marginBottom:'10px'}">
        <info-card  title="今日收到投诉" :total="20" :deal="15" :wating="5"
          color="#FED478" icon="ios-help-buoy"></info-card>
      </Col>
      <Col :xs="24" :sm="12" :md="6" :style="{marginBottom:'10px'}">
        <info-card  title="今日受理工单" :total="20" :deal="15" :wating="5"
          color="#68D576" icon="md-hammer"></info-card>
      </Col>
      <Col :xs="24" :sm="12" :md="6" :style="{marginBottom:'10px'}">
        <info-card title="今日活跃用户" :total="20" :single="true"
          color="#F05B48" icon="md-person-add"></info-card>
      </Col>
    </Row>
    <Row :gutter="15">
      <Col :sm="24" :lg="8" class-name="height-100">
        <Card style="width:100%;">
          <p slot="title"> 小区公告</p>
          <a href="#" slot="extra" >
            更多
            <Icon type="chevron-right"></Icon>
          </a>
          <ul class="broadcast-list">
            <li class="broadcast" v-for="item in broadcast">
              <a  :href="item.url" target="_blank">{{ item.content }}</a>
              <span>2018-12-10</span>
            </li>
          </ul>
        </Card>
      </Col>
      <Col :sm="24" :lg="8">
        <Card style="width:100%;">
          <p slot="title">缴费动态</p>
          <ul class="charge-list" :style="{height:'202px'}">
            <li>李隆基刚缴费</li>
          </ul>
        </Card>
      </Col>
      <Col :sm="24" :lg="8">
        <Card style="width:100%;margin-bottom: 10px;">
          <p slot="title">常用操作</p>
          <div class="controls">
            <div class="control-btn">
              <Icon type="md-calendar"  size="40"/>
              <p>发布公告</p>
            </div>
            <div class="control-btn">
              <Icon type="md-settings" size="40"/>
              <p>报事报修</p>
            </div>
            <div class="control-btn">
              <Icon type="md-easel" size="40"/>
              <p>系统管理</p>
            </div>
            <div class="control-btn">
              <Icon type="md-pie" size="40"/>
              <p>统计查看</p>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col :lg="24" :sm="24">
        <Card :style="{width:'100%'}">
          <p slot="title">最新报警信号</p>
          <div class="table-wrapper">
            <Table :data="sosList" border :columns="sosColumns" width="100%"></Table>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import infoCard from './component/infoCard'
    export default {
        name: "Index",
      components:{
        infoCard
      },
      data(){
        return{
          broadcast:[
            {url:'http://www.baidu.com',content:'五一节停水通知',time:'2018-07-12 12：10'}
          ],
          sosColumns:[
            {
              title:'编号',
              key: 'num',
              width: 60,
            },{
              title:'报警时间',
              key: 'time',
              width: 150,
            },{
              title:'报警来源',
              key: 'from',
              width: 90,
            },{
              title:'所在小区',
              key: 'village',
              width: 100,
            },{
              title:'报警地址',
              key: 'address',
              width: 150,
            },{
              title:'报警源电话',
              key: 'sosTel',
              width: 120,
            },{
              title:'报警源姓名',
              key: 'sosName',
              width: 100,
            },{
              title:'状态',
              key: 'status',
              width: 100,
            },{
              title:'受理人姓名',
              key: 'solveName',
              width: 100,
            },{
              title:'受理人电话',
              key: 'solveTel',
              width: 120,
            },{
              title:'解决时间',
              key: 'solveTime',
              width: 150,
            },{
              title:'报警内容',
              key: 'content',
              width: 100,
            },{
              title:'操作',
              key: 'control',
              width: 200,
              fixed:'right',
              render:(h,params)=>{
                return h('div',[
                  h('Button',{
                    props:{
                      type:'primary',
                      size:'small',
                      on:{
                        click:()=>{
                          //点击时，params是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
                          this.show(params.index)
                        }
                      }
                    }
                  },'受理'),
                  h('Button',{
                    props:{
                      type:'error',
                      size:'small',
                    },
                    style: {
                      marginRight: '5px',
                      marginLeft:'5px'
                    },
                    on:{
                      click:()=>{
                        this.remove(params.index)
                      }
                    }
                  },'关闭'),
                  h('Button',{
                    props:{
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.$router.push('/')
                      }
                    }
                  },'查看详情'),

                ])
              }
            },
          ],
          sosList:[
            {
              num:1,
              time:'2018-06-14 12:05',
              from:'安心桥',
              village:'力宝大厦',
              address:'1栋1单元101',
              sosTel:'18602870966',
              sosName:'李世民',
              status:'未受理',
              solveName:'',
              solveTime:'',
              content:'老人摔倒了',
            },{
              num:2,
              time:'2018-06-14 12:05',
              from:'安心桥',
              village:'力宝大厦',
              address:'1栋1单元101',
              sosTel:'18602870966',
              sosName:'李隆基',
              status:'已受理',
              solveName:'杨玉环',
              solveTel:'1234123456',
              solveTime:'1011-12-11 09:10',
              content:'老人摔倒了',
            },
          ]
        }
      }
    }
</script>


