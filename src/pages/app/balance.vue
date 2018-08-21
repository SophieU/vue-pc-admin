<style scoped lang="scss">
  @import "./app-manage.scss";
</style>
<template>
    <div>
      <Card>
        <p slot="title">员工假期余额汇总</p>
        <div class="balance-content">
          <div class="clearfix mb-15">
            <div class="pull-left">
              <span>部门/员工：</span>
              <Input style="width:150px;"></Input>
              <Button>请选择</Button>
            </div>
            <div class="pull-right">
              <Button @click="exportCSV" type="primary">导出</Button>
              <Button @click="excelModal=true" type="primary">Excel批量修改</Button>
            </div>
          </div>
          <Table ref="staffTable" :columns="staffHolidayCol" :data="staffHoliday"></Table>
        </div>
      </Card>
      <!--设置入职时间-->
      <Modal v-model="enterTimeModal" title="设置入职时间" width="400">
        <Form :label-width="100">
          <FormItem :model="staffEnterForm" label="员工姓名">
            <Input v-model="staffEnterForm.name" disabled style="width: 200px" />
          </FormItem>
          <FormItem label="所属部门">
            <Input v-model="staffEnterForm.depart" disabled style="width: 200px"/>
          </FormItem>
          <FormItem label="入职时间">
            <DatePicker v-model="staffEnterForm.enterTime" type="date" style="width: 200px"></DatePicker>
          </FormItem>
        </Form>
      </Modal>
      <!--人员树结构-->
      <Modal v-model="staffTreeModal" title="选择工作人员">
        <div class="ztree" id="staffTree"></div>
      </Modal>
      <!--Excel批量修改-->
      <Modal v-model="excelModal" title="Excel批量修改">
        <div class="excel-modal">
          <div class="excel-row">
            <span> 1.批量导出余额信息</span>
            <Button type="primary">导出</Button>
          </div>
          <div class="excel-row">
            <span>2.批量更新后重新导入</span>
            <div class="second-row">
              <span>选择文件：</span>
              <input style="width:250px;" type="file" />
              <Button type="primary">导入</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
  import expandRow from './app-component/balance-expand.vue';
    export default {
        name: "balance",
      components:{expandRow},
      data(){
          return {
            enterTimeModal:false, //入职时间弹窗
            excelModal:false, //excel修改弹窗
            staffTreeModal:false, //员工树弹窗
            staffHolidayCol:[
              // {type:'expand',
              //   title:'假期',
              //   width: 70,
              //   render: (h, params) => {
              //     return h(expandRow, {
              //       props: {
              //         row: params.row
              //       }
              //     })
              //   }
              // },
              {title:'姓名',key:'name',align:'center'},
              {title:'部门',key:'depart',align:'center'},
              {title:'入职时间',key:'enterTime',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {title:'剩余年假',key:'l1',align:'center'},
              {
                fixed:'right',
                align:'center',
                title:'操作',
                render:(h,params)=>{
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                          this.enterTimeModal=true;
                        }
                      }
                    },'设置入职时间'),
                  ])
                }
              }
            ],
            staffHoliday:[
              {
                name:'张三',
                depart:'财务部',
                enterTime:'2018-01-18',
              }
            ],
            staffEnterForm:{
              name:'张三',
              depart:'账务部',
              enterTime:''
            }
          }
      },
      methods:{
          //设置人员树
          setTree(){
            let staffTree= null;
            let setting={
              check:{
                enable:true
              }
            };
            let zNodes=[
              {name:'青秀城',open:true,children:[
                  {name:'维修组',children:[
                      {name:'李世民'},
                      {name:'李隆基'},
                    ]},
                  {name:'财务部',children:[
                      {name:'杨玉环'},
                      {name:'魏璎珞'},
                    ]},
                  {name:'客服部',children:[
                      {name:'武媚娘'},
                      {name:'太平'},
                    ]},
                  {name:'保洁部',children:[
                      {name:'甄嬛'},
                      {name:'芈月'},
                    ]},
                  {name:'保绿部',children:[
                      {name:'锦觅'},
                      {name:'旭凤'},
                    ]},

                ]}
            ];
            staffTree=$.fn.zTree.init($('#staffTree'),setting,zNodes);
          },
        exportCSV(){
          this.$refs.staffTable.exportCsv({
            filename: '员工假期余额'
          });
        }
      },
      mounted(){
        this.setTree();
      }
    }
</script>


