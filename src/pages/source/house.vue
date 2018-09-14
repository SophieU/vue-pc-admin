<style lang="scss">
  @import './source.scss';
</style>
<template>
  <div>
    <Card class="mb-15">
      <div class="filter-form">
        <Form :inline="true">
          <FormItem label="房屋名称：">
            <Input placeholder="房屋名称"/>
          </FormItem>
          <FormItem label="状态：" >
            <Select style="width: 200px;">
              <Option value="1">全部</Option>
              <Option value="1">未入住</Option>
              <Option value="1">已入住</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <div class="ztree" id="tree"></div>
        </Card>
      </Col>
      <Col span="18">
        <Card>
          <div class="clearfix mb-15">
            <div class="pull-right">
              <Button type="error">删除</Button>
              <Button @click="updateLots=true">房屋批量更新</Button>
              <Button @click="importLots=true">房屋批量导入</Button>
              <Button @click="addHouse=true" type="primary">新增房屋</Button>
            </div>
          </div>
          <Table :columns="houseColumn" :data="houseLists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </Card>
      </Col>
    </Row>

    <!--房屋批量更新-->
    <Modal
      v-model="updateLots"
      title="房屋批量更新"
    >
      <Form inline :label-width="80">
        <div class="modal-block">
          <p class="block-title">1.批量导出</p>
          <FormItem label="选择小区：" style="width: 100%;">
            <Row>
              <Col span="12">
                <Select  style="width: 180px;">
                  <Option value="">11小区</Option>
                </Select>
              </Col>
              <Col span="12">
                <Button type="primary">导出</Button>
              </Col>
            </Row>

          </FormItem>
        </div>
        <div  class="modal-block">
          <p class="block-title">2.批量更新</p>
          <FormItem label="选择小区：" style="width: 100%;">
            <Row>
              <Col span="12">
                <Select style="width: 180px;margin-bottom: 20px;">
                  <Option value="">11小区</Option>
                </Select>
              </Col>
            </Row>
            <div>
                <input type="file" style="width: 180px;margin-right:15px;"/>
                <Button type="primary">导入更新</Button>
            </div>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <!--房屋批量导入-->
    <Modal v-model="importLots" title="房屋批量导入">
      <Form :label-width="80">
        <FormItem label="选择小区：">
          <Select style="width:200px;">
            <Option value="">小区1</Option>
          </Select>
        </FormItem>
        <FormItem label="上传附件：">
          <input type="file" />
        </FormItem>
        <FormItem label="下载模板：">
          <a href="##" class="form-text">	状元府邸小区房屋批量导入模板</a>
        </FormItem>
      </Form>
    </Modal>
    <!--新增房屋-->
    <Modal title="新增房屋" v-model="addHouse" width="800">
      <Form :label-width="120">
        <Row>
          <Col span="9">
            <FormItem label="所属小区：">
              <Select readonly>
                <Option value="">JCK_未来城</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="单元：">
              <Input readonly value="1栋1单元"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="门牌号：">
              <Input />
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="建筑面积：">
              <Input />
            </FormItem>
          </Col>
          <Col span="3">
            <span class="form-text ml-15">平米</span>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="计费面积：">
              <Input />
            </FormItem>
          </Col>
          <Col span="3">
            <span class="form-text ml-15">平米</span>
          </Col>
          <Col span="9">
            <FormItem label="是否出售：">
              <Select>
                <Option value="0">已出售</Option>
                <Option value="1">未出售</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="出售时间：">
              <DatePicker type="date" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="是否交房：">
              <Select>
                <Option value="">是</Option>
                <Option value="">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="交房时间：">
              <DatePicker type="date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="是否装修：">
              <Select>
                <Option value="">是</Option>
                <Option value="">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="装修时间：">
              <DatePicker type="date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="是否出租：">
              <Select>
                <Option value="">是</Option>
                <Option value="">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="出租时间：">
              <DatePicker type="date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="是否空置：">
              <Select>
                <Option value="">是</Option>
                <Option value="">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9">
            <FormItem label="空置时间：">
              <DatePicker type="date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="9" offset="3">
            <FormItem label="备注：">
              <Input type="textarea" />
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "house",
      data(){
          return{
            updateLots:false, //批量更新弹窗
            importLots:false, //批量导入弹窗
            addHouse:false, //新增房屋弹窗
            houseColumn:[
              {type:'selection'},
              {title:'房屋名称',key:'houseName',align:'center'},
              {title:'房屋编号',key:'houseId',align:'center'},
              {title:'建筑面积',key:'houseArea',align:'center'},
              {title:'计算面积',key:'calcArea',align:'center'},
              {title:'状态',key:'status',align:'center'},
              {title:'操作',align:'center',render:(h,params)=>{
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
                  },'删除')
                ]);
                }},
            ],
            houseLists:[]
          }
      },
      methods:{
          setTree(){
            let tree=null;
            let setting={
              callback:{
                onClick:function(){
                  console.log('click one')
                }
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

