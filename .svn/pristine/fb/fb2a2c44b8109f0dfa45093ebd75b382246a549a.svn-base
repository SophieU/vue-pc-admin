<template>
  <div id="order_week_trend" style="width: 100%;height: 100%;"></div>
</template>

<script>
  // import echarts from 'echarts';
    export default {
        name: "orderWeekTrend",
        data(){
          return {}
        },
        mounted(){
          this.$nextTick(()=>{
            let orderWeekTrend = echarts.init(document.getElementById('order_week_trend'));
            this.$http.get(`/index/7days/order/increment/report`)
              .then(res=>{
                if(res.data.code===0){
                  let data = res.data.data;
                  let dataLists=data.detailList;
                  let xAxis=dataLists.map(item=>{
                    return item.name;
                  });
                  let lists = dataLists.map(item=>{
                    return item.value;
                  });
                  let option = {
                    title : {
                      text: '近7日工单走势',
                      x:'center'
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    xAxis: {
                      type: 'category',
                      data: xAxis
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [{
                      name:'工单数量',
                      data: lists,
                      type: 'line',
                      symbol: 'triangle',
                      symbolSize: 20,
                      lineStyle: {
                        normal: {
                          color: '#2d8cf0',
                          width: 4,
                          type: 'dashed'
                        }
                      },
                      itemStyle: {
                        normal: {
                          borderWidth: 3,
                          borderColor: '#2d8cf0',
                          color: '#fff'
                        }
                      }
                    }]
                  };
                  orderWeekTrend.setOption(option);
                }
                window.addEventListener('resize', function () {
                  orderWeekTrend.resize();
                });
              })


          });

        }
    }
</script>

<style scoped>

</style>
