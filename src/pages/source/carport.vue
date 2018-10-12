<template>
    <div>
      <div class="filter-form mb-15">
        <Card>
          <Form :inline="true">
            <FormItem label="车位编号：">
              <Input placeholder="请输入车位编号"/>
            </FormItem>
            <FormItem label="状态：">
              <Select>
                <Option value="1">全部</Option>
              </Select>
            </FormItem>
            <FormItem label="车主手机号：">
              <Input />
            </FormItem>
            <FormItem label="车主姓名：">
              <Input />
            </FormItem>
            <FormItem label="车位类型：">
              <Select>
                <Option value="1">全部</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary">搜索</Button>
              <Button>重置</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
      <Row :gutter="16">
        <Col span="6">
          <Card>
            <div class="ztree" id="tree"></div>
          </Card>
        </Col>
        <Col span="18">
          <Card>
            <div class="clearfix mb-15">
              <div class="pull-left">
                <p>
                  总计车位：<span class="text-info">999</span>个；
                  已出售：<span class="text-info">500</span>个；
                  已出租：<span class="text-info">50</span>个；
                  闲置：<span class="text-info">5</span>个；
                </p>
              </div>
              <div class="pull-right">
                <Button @click="batchModal=true;batchModalTitle='车位批量导入'">车位批量导入</Button>
                <Button @click="batchModal=true;batchModalTitle='车位批量更新'">车位批量更新</Button>
                <Button type="error">删除</Button>
              </div>
            </div>
            <Table :columns="carportColumn" :data="carportLists"></Table>
            <div class="pagination">
              <Page :total="40" show-sizer show-elevator></Page>
            </div>
          </Card>
        </Col>
      </Row>
      <!--车位登记-->
      <Modal title="车位登记" v-model="checkInModal" width="600">
        <Form :label-width="100">
          <FormItem label="车位编号：" >
            <Input value="001" disabled style="width:200px;"/>
          </FormItem>
          <FormItem label="车位类型：">
            <Select style="width:200px;">
              <Option value="1">1.8L（含以下）</Option>
            </Select>
          </FormItem>
          <FormItem label="车位状态：">
            <Row :gutter="8">
              <Col span="6">
                <Select>
                  <Option value="1">---请选择---</Option>
                </Select>
              </Col>
              <Col span="16">
                <FormItem label="出租日期：">
                  <DatePicker type="daterange"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="关联资源：">
            <Input style="width:200px;"/>
          </FormItem>
          <FormItem label="车主姓名 ：">
            <Input style="width:200px;"/>
          </FormItem>
          <FormItem label="车主手机号：">
            <Input style="width:200px;" />
          </FormItem>
          <FormItem label="车牌号码：">
            <Input style="width:200px;"/>
          </FormItem>
          <FormItem label="计费日期：">
            <DatePicker type="daterange"></DatePicker>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="error" @click="checkInModal=false">取消</Button>
          <Button>继续添加</Button>
          <Button type="primary" @click="checkInModal=false">确定</Button>
        </div>
      </Modal>
      <!--批量弹窗-->
      <Modal :title="batchModalTitle" v-model="batchModal">
        <Form label-position="top" v-if="batchModalTitle==='车位批量更新'">
          <FormItem label="1.批量导出车位信息">
            <Button style="margin-left: 20px;" type="primary">导出</Button>
          </FormItem>
          <FormItem label="2.批量更新后重新导入">
            <div style="margin-left: 20px;">
              <FormItem label="选择文件：">
                <input type="file">
                <Button type="primary">导入</Button>
              </FormItem>
            </div>
          </FormItem>
        </Form>
        <Form label-position="top" v-if="batchModalTitle==='车位批量导入'">
          <FormItem label="1.下载车位管理模板">
            <Button style="margin-left: 20px;" type="primary">下载</Button>
          </FormItem>
          <FormItem label="2.批量更新后重新导入">
            <div style="margin-left: 20px;">
              <FormItem label="选择文件：">
                <input type="file">
                <Button type="primary">导入</Button>
              </FormItem>
            </div>
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "carport",
      data(){
          return{
            checkInModal:false, //车位登记弹窗
            batchModal:false, //批量弹窗操作
            batchModalTitle:'车位批量更新',
            carportColumn:[
              {type:'selection',width:50,align:'center'},
              {title:'小区名称',width:130,align:'center',key:'estate'},
              {title:'车位编号',width:130,align:'center',key:'carportId'},
              {title:'车位类型',width:130,align:'center',key:'carportType'},
              {title:'所属区域',width:130,align:'center',key:'district'},
              {title:'关联房屋',width:130,align:'center',key:'house'},
              {title:'车主手机号',width:130,align:'center',key:'tel'},
              {title:'车主姓名',width:130,align:'center',key:'customName'},
              {title:'计费日期',width:130,align:'center',key:'startFee'},
              {title:'状态',width:130,align:'center',key:'status'},
              {title:'租赁期限',width:130,align:'center',key:'leaseTerm'},
              {title:'车牌号码',width:130,align:'center',key:'carId'},
              {title:'操作',width:130,fixed:'right',align:'center',render:(h,params)=>{
                  if(params.row.status==='闲置'){
                    return h('Button',{
                      props:{
                        type:'primary',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                          this.checkInModal=true;
                        }
                      }
                    },'登记')
                  }else{
                    return h('div',[
                      h('Button',{
                        props:{
                          type:'primary',
                          size:'small'
                        },
                        style:{
                          marginRight:'10px'
                        }
                      },'编辑'),
                      h('Button',{
                        props:{
                          type:'error',
                          size:'small'
                        }
                      },'注销')
                    ])
                  }
                }},
            ],
            carportLists:[
              {
                estate:'未来城',
                carportId:'181534',
                carportType:'不知道',
                district:'成华区',
                house:'2栋四单元101',
                tel:'18112341234',
                customName:'李二狗',
                startFee:'2018-01-10',
                status:'闲置',
                leaseTerm:'',
                carId:''
              }
            ],
          }
      },
      methods:{
        setTree(){
          let tree=null;
          let setting={
            check:{
              enable:true
            }
          };
          let zNodes=[
            {name:'JCK_未来城',open:true,children:[
                {name:'1栋',children:[
                    {name:'1单元',children:[
                        {name:'1101'},
                        {name:'1102'},
                      ]}
                  ]},
                {
                  name:'2栋',children:[
                    {name:'1单元',children:[
                        {name:'2101'},
                        {name:'2102'},
                      ]}
                  ]
                }
              ]}
          ];

          tree=$.fn.zTree.init($('#tree'),setting,zNodes);
        }
      },
      mounted(){
        this.setTree();
      }
    }
</script>

<style scoped>

</style>
