<template>
  <div ref="chart" ></div>
</template>

<script>
  import echarts from 'echarts';

    export default {
        name: "pie-chart",
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
        idName:String
      },
      computed:{
          lists(){
            if(this.dataLists.length>0){
              return this.props.dataLists;
            }
          }
      },
      methods:{
        drawPie(){
          let dataLists= this.dataLists;
          let legend=dataLists.map(item=>{
            return item.name;
          });
          let id = this.idName;
          let myChart = echarts.init(document.getElementById(id));
          let option = {
            title : {
              text: this.title,
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: legend
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:dataLists,
                color:this.color,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  }
                }
              }
            ]
          };
          myChart.setOption(option,true);
        }
      },
      mounted(){
          let _this = this;
          let timer = setInterval(()=>{
            if(_this.dataLists&&_this.dataLists.length>0){
              _this.drawPie();
              clearInterval(timer);
            }
          },1000);
      },
      watch:{
        dataLists(){
          this.drawPie();
        }
      }
    }
</script>

<style scoped>

</style>
