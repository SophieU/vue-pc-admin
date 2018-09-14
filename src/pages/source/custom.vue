<style scoped lang="scss">
@import "./source.scss";
</style>
<!--业主管理-->
<template>
  <div>
    <div class="mb-15 filter-form">
      <Card>
        <Form :inline="true" >
          <FormItem label="业主姓名">
            <Input />
          </FormItem>
          <FormItem label="业主手机号">
            <Input />
          </FormItem>
          <FormItem label="迁入时间">
            <DatePicker type="daterange" style="width:200px;"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary">搜索</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      </Card>
    </div>

    <Row :gutter="16">
      <Col span="5" >
        <Card>
          <div class="ztree" id="customTree"></div>
        </Card>
      </Col>
      <Col span="19">
        <Card>
          <div class="clearfix mb-15">
            <div class="pull-right">
              <Button type="primary" @click="editModal=true">客户迁入</Button>
              <Button  type="primary" @click="customEnterModal=true">客户批量导入</Button>
              <Button type="primary" @click="customUpdateModal=true">客户批量更新</Button>
            </div>
          </div>
          <Table :columns="customColumn" :data="customLists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </Card>
      </Col>
    </Row>
    <!--客户批量导入-->
    <Modal v-model="customEnterModal" title="客户批量导入">
      <Form :label-width="120">
        <FormItem label="选择小区：">
          <Select style="width: 200px;">
            <Option value="1">小区一一</Option>
          </Select>
        </FormItem>
        <FormItem label="上传附件：">
          <input type="file" />
        </FormItem>
        <FormItem label="下载模板：">
          <a href="##" class="form-text">无锡惠山橡树湾二期小区-客户批量导入模板.xls</a>
        </FormItem>
      </Form>
    </Modal>
    <!--客户批量更新-->
    <Modal v-model="customUpdateModal" title="客户批量更新" width="600">
      <Form>
        <FormItem label="选择小区：">
          <Select style="width: 150px;">
            <Option value="1">JK 未来城</Option>
          </Select>
          <Button type="primary">导出</Button>
        </FormItem>
        <FormItem label="选择小区：">
          <Select style="width:150px;">
            <Option value="1">JK f未来城</Option>
          </Select>
          <input type="file" />
          <Button type="primary">导入更新</Button>
        </FormItem>
      </Form>
    </Modal>
    <!--编辑客户资料-->
    <Modal v-model="editModal" title="客户迁入" width="800">
      <Form :inline="true" :label-width="80">
        <Row :gutter="8">
          <Col span="12">
            <FormItem label="小区：">
              <Input readonly value="JK未来城-1栋1单元" style="width:200px;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="房屋：">
              <Input disabled value="1单元103" style="width:200px;"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="客户姓名：">
              <Input  style="width: 150px;margin-right: 10px;"/>
              <Checkbox>是否业主</Checkbox>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别：">
              <Select  style="width:200px;">
                <Option value="0">女</Option>
                <Option value="1">男</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
         <Row>
          <Col span="12">
            <FormItem label="联系电话：">
              <Input style="width:200px;" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="迁入日期：">
              <DatePicker  style="width:200px;"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="婚姻状况：">
              <Select  style="width:200px;">
                <Option value="0">未婚</Option>
                <Option value="1">已婚</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="文化程度：">
              <Select  style="width:200px;">
                <Option value="0">高中以下</Option>
                <Option value="1">高中</Option>
                <Option value="1">专科</Option>
                <Option value="1">本科</Option>
                <Option value="1">本科以上</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="客户地址：">
              <Input style="width:200px;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="银行类型：">
              <Input style="width:200px;"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="开户姓名：">
              <Input style="width:200px;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="银行账号：">
              <Input style="width:200px;"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="用户头像：">
              <div class="upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="upload-list-cover">
                    <Icon type="ios-eye-outline"></Icon>
                    <Icon type="ios-trash-outline" ></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注：">
              <Input  style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "custom",
      data(){
          return{
            customEnterModal:false, //客户批量导入弹窗
            customUpdateModal:false, //客户批量更新弹窗
            editModal:false, //客户迁入弹窗
            customColumn:[
              {title:'客户姓名',align:'center',key:'name'},
              {title:'是否业主',align:'center',key:'isCustom'},
              {title:'联系电话',align:'center',key:'tel'},
              {title:'迁入日期',align:'center',key:'enterDate'},
              {title:'是否绑定APP',align:'center',key:'bindApp'},
              {title:'操作',align:'center',
                render:(h,params)=>{
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
                    },'删除'),
                  ])
                }
              },
            ],
            customLists:[
              {
                name:'张启山',
                isCustom:'是',
                tel:'18112341234',
                enterDate:'2018-01-18',
                bindApp:'否'
              }
            ],
            uploadList:[],
            defaultList:[
              {
                'name': 'a42bdcc1178e62b4694c830f028db5c0',
                'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
              },
              {
                'name': 'bc7521e033abdd1e92222d733590f104',
                'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
              }
            ]
          }
      },
      methods:{
          customTree(){
            let customTree=null;
            let setting={
              callback:{
               onClick:function(event,treeId,treeNode){
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

            customTree=$.fn.zTree.init($('#customTree'),setting,zNodes);
          }
      },
      mounted(){
          this.customTree();
      }
    }
</script>


