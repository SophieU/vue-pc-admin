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
              <Button>房屋批量更新</Button>
              <Button>房屋批量导入</Button>
              <Button type="primary">新增房屋</Button>
            </div>
          </div>
          <Table :columns="houseColumn" :data="houseLists"></Table>
          <div class="pagination">
            <Page :total="40" show-sizer show-elevator></Page>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "house",
      data(){
          return{
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

