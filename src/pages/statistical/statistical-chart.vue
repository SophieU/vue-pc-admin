<style scoped lang="scss">
  @import "./statistical";
</style>
<template>
   <div>
     <Card class="mb-15">
        <Form :model="filterForm" inline>
          <FormItem style="margin-bottom: 0;">
            <DatePicker @on-change="dateRangeChange" v-model="filterForm.dateRange" placeholder="请选择时间范围" style="width:200px;" type="daterange"></DatePicker>
          </FormItem>
          <FormItem style="margin-bottom: 0;">
            <Select v-model="filterForm.stationId" placeholder="选择服务网点" style="width:150px;">
              <Option v-for="item in stationLists" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <Button @click="searchDate" type="primary" class="lang-btn">搜索</Button>
        </Form>
     </Card>
     <Row :gutter="15" class="mb-15">
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">订单总数：{{totalOrder.totalNum}}</p>
           <div class="chart-container" id="chartTotal">

           </div>
           <pie :data-lists="totalOrder.detailList"
                title="各类报修工单占比"
                idName="chartTotal"
           ></pie>
         </Card>
       </Col>
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">订单回访率:（{{visited.rate+'%'}}）</p>
           <div class="chart-container" id="chartRate"></div>
           <pie :data-lists="visited.dataLists"
                title="订单回访率"
                :color="['#2d8cf0','#ff9900']"
                idName="chartRate"
           ></pie>
           <!--<div class="chart-container" id="chart"></div>-->
         </Card>
       </Col>
     </Row>
     <Row :gutter="15" class="mb-15">
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">订单平均接单时长：{{timeCoast.avgAcceptTime+'min'}}</p>
           <div class="chart-container" id="timeCoastChart"></div>
           <bar
             :data-lists="timeCoast.dataLists"
             title="订单平均接单时长"
             idName="timeCoastChart"
             toolName="接单时长"
           ></bar>
         </Card>
       </Col>
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">异常工单占比：{{(abnormal.exceptionRate*100).toFixed(2)+'%'}}</p>
           <div class="chart-container" id="abnormalChart"></div>
           <pie :data-lists="abnormal.dataLists"
                title="异常工单占比"
               :color="['#2db7f5','#19be6b']"
               idName="abnormalChart"
           ></pie>
         </Card>
       </Col>
     </Row>
     <Row :gutter="15" class="mb-15">
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">近7日订单流水：{{weekFlow.totalEarning}}</p>
           <div class="chart-container" id="weekFlowChart"></div>
           <line-chart
             :data-lists="weekFlow.dataLists"
             title="近7日订单流水"
             idName="weekFlowChart"
             toolName="订单金额"
           ></line-chart>

         </Card>
       </Col>
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">最近增长订单：{{weekTrend.lastIncrementNum}}</p>
           <div class="chart-container" id="weekTrendChart"></div>
           <line-chart
             :data-lists="weekTrend.dataLists"
             title="近7日订单走势"
             idName="weekTrendChart"
             toolName="订单金额"
           ></line-chart>
         </Card>
       </Col>
     </Row>
     <Row :gutter="15" class="mb-15">
       <Col :lg="12" :sm="24">
         <Card>
           <p slot="title">服务网点热点-(最热网点：{{hotStation.bestHotStationName}})</p>
           <div class="chart-container" id="hotStationChart"></div>
           <bar
             :data-lists="hotStation.dataLists"
             title="服务网点热点"
             idName="hotStationChart"
             toolName="工单量"
           ></bar>
         </Card>
       </Col>
       <!--<Col :lg="12" :sm="24">-->
         <!--<Card>-->
           <!--<div class="chart-container"></div>-->
         <!--</Card>-->
       <!--</Col>-->
     </Row>
   </div>
</template>

<script>
  import util from '../../libs/util'
  import pie from './com/pie-chart';
  import lineChart from './com/line-chart';
  import bar from './com/bar-chart';
    export default {
        name: "statistical-chart",
      components:{
        pie,
        lineChart,
        bar
      },
      data(){
          return {
            stationLists:[],
            filterForm:{
              dateRange:[],
              stationId:'',
            },
            visited:{
              rate:0,
              dataLists:[]
            },
            totalOrder:{
              totalNum:0,
              detailList:[]
            },
            abnormal:{
              exceptionRate:0,
              dataLists:[]
            },
            timeCoast:{
              avgAcceptTime:0,
              dataLists:[]
            },
            weekFlow:{
              totalEarning:0,
              dataLists:[]
            },
            weekTrend:{
              lastIncrementNum:0,
              dataLists:[]
            },
            hotStation:{
              bestHotStationName:'',
              dataLists:[]
            }
          }
      },
      methods:{
        dateRangeChange(val){
          this.filterForm.startDate=val[0];
          this.filterForm.endDate=val[1];
        },
        searchDate(){
          let filterForm={...this.filterForm};
              delete filterForm.dateRange;
          this.init(filterForm);
        },
        //回访率
        getVisited(filter){
          let param ={};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/return/visit?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let visited=res.data.data;
                let rate=res.data.data.finishRate;
                let visitedData=[
                  {
                    name:'已回访',
                    value:visited.hasVisitedNum
                  },{
                    name:'未回访',
                    value:visited.waitVisitNum
                  }
                ]
                this.visited={
                  rate:rate,
                  dataLists:visitedData
                }
                // this.drawPie();
              }else{
                console.log('回访率接口：'+res.data.msg);
              }
            })
        },
        //总数
        getTotalOrder(filter){
          let param ={};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/repair/category?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data =res.data.data;
                this.totalOrder= data;
              }else{
                console.log('报修订单总数：'+res.data.msg);
              }
            })
        },
        //异常
        getAbnormal(filter){
          let param ={};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/exception?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.abnormal={
                  exceptionRate:data.exceptionRate,
                  dataLists:[
                    {
                      name:'正常工单',
                      value:(data.totalNum-data.exceptionNum),
                    },{
                    name:'异常工单',
                      value:data.exceptionNum
                    }
                  ]
                }
              }else{
                console.log('异常工单获取：'+res.data.msg)
              }
            })
        },
        //周流水
        getWeekFlow(filter){
          let param ={};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/7days/Earning?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.weekFlow={
                  totalEarning:data.totalEarning,
                  dataLists:data.detailList
                }
              }else{
                console.log('异常工单获取：'+res.data.msg)
              }
            })
        },
        //订单时长
        getTimeCoast(filter){
          let param = {};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/accept/time?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                if(!data){
                  data={
                    avgAcceptTime:0,
                    minAcceptTime:0,
                    maxAcceptTime:0,
                  }
                }
                this.timeCoast={
                  avgAcceptTime:data.avgAcceptTime,
                  dataLists:[
                    {name:'最长',value:data.maxAcceptTime},
                    {name:'最短',value:data.minAcceptTime},
                    {name:'平均',value:data.avgAcceptTime},
                  ]
                }
              }else{
                console.log('异常工单获取：'+res.data.msg)
              }
            })
        },
        //7日走势
        getWeekTrend(filter){
          let param = {};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/7days/increment?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.weekTrend={
                  lastIncrementNum:data.lastIncrementNum,
                  dataLists:data.detailList
                }
              }
            })
        },
        getHotStation(filter){
          let param = {};
          if(filter){
            param={...filter};
          }
          param=util.formatterParams(filter)
          this.$http.post(`/report/hot/station?${param}`)
            .then(res=>{
              if(res.data.code===0){
                let data = res.data.data;
                this.hotStation={
                  bestHotStationName:data.bestHotStationName,
                  dataLists:data.detailList
                }
              }
            })
        },
        init(filter){

          this.getVisited(filter);
          this.getTotalOrder(filter);
          this.getAbnormal(filter);
          this.getWeekTrend(filter);
          this.getWeekFlow(filter);
          this.getTimeCoast(filter);
          this.getHotStation(filter);
        }
      },
      mounted(){
          util.getStationLists(data=>{
            this.stationLists=data;
          });
          this.init();
      }
    }
</script>


