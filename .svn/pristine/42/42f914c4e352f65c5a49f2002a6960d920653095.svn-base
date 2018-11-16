<template>
    <div></div>
</template>

<script>
  // import echarts from 'echarts';
    export default {
        name: "line-chart",
      props:{
        dataLists:{
          required:true,
          type:Array
        },
        title:{
          required:true,
          type:String
        },
        color:Array,
        idName:String,
        toolName:String
      },
      methods:{
        drawLine(){
          let dataLists= this.dataLists;
          let id = this.idName;
          let xAxis=dataLists.map(item=>{
            return item.name;
          });
          let lists = dataLists.map(item=>{
            return item.value;
          });
          let myChart = echarts.init(document.getElementById(id));
          let option = {
            title : {
              text: this.title,
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
              name:this.toolName,
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
          myChart.setOption(option,true);
        }
      },
      mounted(){
        let _this = this;
        let timer = setInterval(()=>{
          if(_this.dataLists&&_this.dataLists.length>0){
            clearInterval(timer);
            _this.drawLine();
          }
        },1000);
      },
      watch:{
        dataLists(){
          this.drawLine();
        }
      }
    }
</script>

<style scoped>

</style>
