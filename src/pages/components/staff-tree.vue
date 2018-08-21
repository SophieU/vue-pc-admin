<template>
    <div>
      <Modal v-model="showStaff" title="选择工作人员" width="300" @on-cancle="cancel">
        <div class="ztree" id="staffTree"></div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "staff-tree",
        props:{
          show:{
            type:Boolean,
            required:true,
            default:false
          },
          cancel:{
            type:Function
          }
        },
      computed:{
        showStaff:{
          get(){
            return this.show
          },
          set(){
            this.cancel();
          }
        }
      },
      mounted(){
          let ztreeObj=null;
          let setting={
            check:{
              enable:true,
              chkStyle:'radio',
            }
          }
          let zNodes=[
            {name:'青秀城',open:true,children:[
                {name:'财务组',children:[
                    {name:'张一'},
                    {name:'张二'},
                  ]},
                {name:'销售组',children:[
                    {name:'李一'},
                    {name:'李二'},
                  ]},
                {name:'客服组',children:[
                    {name:'五一'},
                    {name:'五二'},
                  ]},
                {name:'保洁组',children:[
                    {name:'刘一'},
                    {name:'刘二'},
                  ]},
                {name:'保安组',children:[
                    {name:'谢一'},
                    {name:'谢二'},
                  ]},
              ]}
          ];
        ztreeObj= $.fn.zTree.init($('#staffTree'),setting,zNodes);
      }
    }
</script>

<style scoped>

</style>
