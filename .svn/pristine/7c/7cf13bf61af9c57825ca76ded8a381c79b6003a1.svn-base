<template>
  <div id="order_week_trend" style="width: 100%;height: 100%;"></div>
</template>

<script>
  import echarts from 'echarts';
    export default {
        name: "orderWeekTrend",
        data(){
          return {}
        },
        mounted(){
          this.$nextTick(()=>{
            var orderWeekTrend = echarts.init(document.getElementById('order_week_trend'))
            const option = {
              xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              tooltip: {
                trigger: 'axis'
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
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
            };;
            orderWeekTrend.setOption(option);
            window.addEventListener('resize', function () {
              orderWeekTrend.resize();
            });
          });

        }
    }
</script>

<style scoped>

</style>
