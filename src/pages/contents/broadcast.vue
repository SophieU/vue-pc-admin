<style scoped lang="scss">
  @import './contents.scss';
</style>
<template>
    <div>
      <Card>
        <div class="form-filter">
          <Form :mode="formFilter" inline>
            <FormItem prop="小区名称">
              <Select placeholder="选择小区" v-model="formFilter.village"  style="width:150px">
                <Option value="beijing">JK 未来城</Option>
                <Option value="shanghai">力宝大夏</Option>
                <Option value="shenzhen">南城都汇</Option>
              </Select>
            </FormItem>
            <FormItem prop="公告标题">
              <Input type="text" style="width:200px" v-model="formFilter.noticeName" placeholder="公告名称">
              </Input>
            </FormItem>
            <FormItem prop="发布时间">
              <DatePicker v-model="formFilter.dateTime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择时间范围" style="width: 270px"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary">搜索</Button>
              <Button style="margin-left: 8px">重置</Button>
            </FormItem>

          </Form>
        </div>
      </Card>
      <Card style="margin-top:10px;">
        <div class="table-actions" style="overflow:hidden;margin-bottom: 20px;">
          <div style="float:right;">
            <Button type="primary">发布</Button>
            <Button  type="primary">推送到App</Button>
            <Button type="error">删除</Button>
          </div>
        </div>
        <Table border ref="selection" :columns="noticeTableColumn" :data="noticeTable"></Table>
        <div class="pagination">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "broadcast",
      data(){
          return {
            test:true,
            formFilter:{
              noticeName:'',
              village:'',
              dateTime:'',
            },
            noticeTableColumn:[
              {
                type:'selection',
                width:60,
                align:'center'
              },{
                title:'公告标题',
                key:'title',
                ellipsis:true,
              },{
                title:'发布时间',
                key:'dateTime',
                width:180,
                align:'center',
              },{
                title:'是否已推送',
                key:'push',
                width:100,
                align:'center',
                render:(h,params)=>{
                  const row = params.row; //当前行
                  const checked = row.push;
                  return h('span',{},checked?'是':'否')
                }
              },{
                title:'是否置顶',
                key:'top',
                width:100,
                align:'center',
                render:(h,params)=>{
                  const row = params.row;
                  return h('i-switch',{
                    props:{
                      value:row.top
                    }
                  },[
                    h('span',{
                        slot:'open'
                    },'是'),
                    h('span',{
                        slot:'close'
                    },'否')
                  ])
                }
              },{
                title:'是否有效',
                key:'enable',
                width:100,
                align:'center',
                render:(h,params)=>{
                  let row = params.row;
                  return h('i-switch',{
                    value:row.enable,
                    props:{
                      size:'large'
                    }
                  },[
                    h('span',{
                      slot:'open'
                    },'有效'),
                    h('span',{
                      slot:'close'
                    },'无效')
                  ])
                }
              },{
                title:'操作',
                key:'action',
                width:160,
                align:'center',
                render:(h,params)=>{
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'small',
                        ghost:true,
                      },
                      style: {
                        marginRight: '10px'
                      },
                      on:{
                        click:()=>{
                          console.log('编辑此项'+params.index)
                        }
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        type:'error',
                        size:'small',
                        ghost:true,
                      },

                    },'删除')
                  ])
                }
              }
            ],
            noticeTable:[
              {
                title:'今天下雨了没有？？',
                dateTime:'2016-10-11 17:10',
                push:false,
                top:true,
                enable:true,
              },{
                title:'今天吃饭了没有？？',
                dateTime:'2016-10-11 17:10',
                push:false,
                top:true,
                enable:true,
              },{
                title:'今天喝水了没有？？',
                dateTime:'2016-10-11 17:10',
                push:false,
                top:true,
                enable:true,
              },{
                title:'今天下冰雹了没有？？',
                dateTime:'2016-10-11 17:10',
                push:false,
                top:true,
                enable:true,
              },

            ]
          }
      },
      methods:{
        changePage(){
          console.log('change-page')
        }
      }
    }
</script>


