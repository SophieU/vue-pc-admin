<template>
  <div>
    <div class="card no-border mb-15">
      <div class="card-header">
        <div class="card-title">质保信息</div>
      </div>
      <div class="card-body">
        <Table :columns="warrantyColumn" :data="warrantyList"></Table>

      </div>
    </div>
    <div class="card no-border">
      <div class="card-header">
        <div class="card-title">售后记录</div>
      </div>
      <div class="card-body">
        <Table :columns="afterColumn" :data="afterSaleList"></Table>

      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './expand-table';
    export default {
        name: "after-service",
      data(){
          return {
            warrantyList:[],
            afterSaleList:[],
            id:'',
            warrantyColumn:[
              {title:'生效日期',key:'effectiveTime',align:'center'},
              {title:'项目类型',key:'planType',align:'center'},
              {title:'项目名称',key:'planName',align:'center'},
              {title:'失效日期',key:'expiryTime',align:'center'},
            ],
            afterColumn:[
              {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                  console.log(params.row.materialList)
                  return h(expandRow, {
                    props: {
                      materialLists: params.row.materialList
                    }
                  })
                }
              },
              {title:'日期',key:'createTime',align:'center'},
              {title:'处理人',key:'serviceUserName',align:'center'},
              {title:'状态',key:'afterSaleState',align:'center'},
              {title:'处理凭据',align:'center',render:(h,params)=>{
                let _this = this;
                    return h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                          let id= _this.id;
                          _this.$router.push({name:'orderProve',query:{id:id}})
                        }
                      }
                    },'查看')
                }},
            ]
          }
      },
      methods:{
          getAfter(id){
            this.$http.get(`/repair/order/after/sale/list?id=${id}`)
              .then(res=>{
                if(res.data.code===0){
                  let data = res.data.data;
                  this.warrantyList=data.warrantyList;
                  this.afterSaleList=data.afterSaleList;
                }else{
                  console.log('售后获取失败：'+res.data.msg);
                }
              })
          }
      },
      mounted(){
          let id = this.$route.query.id;
          this.id=id;
          this.getAfter(id);
      }
    }
</script>

<style scoped>

</style>
