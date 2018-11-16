<template>
    <div></div>
</template>

<script>
  // import echarts from 'echarts'
    export default {
        name: "bar-chart",
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
          drawBar(){

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
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
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
                barWidth: '60%',
                type: 'bar'
              }]
            };
            // setOption(option,notMerge,lazyUpdate); notMerge设为true，则不保留数据
            myChart.setOption(option,true);
          }
      },
      mounted(){
        let _this = this;
        let timer = setInterval(()=>{
          if(_this.dataLists&&_this.dataLists.length>0){
            clearInterval(timer);
            _this.drawBar();
          }
        },1000);
      },
      watch:{
        dataLists(){
          this.drawBar();
        }
      }
    }
</script>

<style scoped>

</style>
