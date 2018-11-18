<style scoped lang="scss">
  @import "./system.scss";
</style>
<template>
  <div class="working-time">
      <Row :gutter="15" >

        <!--左-->
        <Col :lg="12" :md="24" class="mb-15">
          <Card>
            <p slot="title">普通网点</p>
            <div slot="extra"  style=" margin-top: -5px;">
              <Button type="primary" @click="save" >保存</Button>
            </div>
            <Form>
              <Row :gutter="15" class="mb-15">
                <Col span="6" align="center" offset="6">开始时间</Col>
                <Col span="6"  align="center">结束时间</Col>
              </Row>
              <FormItem :key="index" v-for="(worktime,index) in general">
                <Row  :gutter="15" >
                  <Col span="6" align="right">{{worktime.name}}</Col>
                  <Col span="6"  align="center">
                    <TimePicker :confirm="true" format="HH:mm" v-model="worktime.beginTime"  type="time"></TimePicker>
                  </Col>
                  <Col span="6"  align="center">
                    <TimePicker :confirm="true" format="HH:mm" v-model="worktime.endTime"  type="time"></TimePicker>
                  </Col>
                  <Col span="6">
                    <Checkbox v-model="worktime.isWorkday" :true-value="'N'" :false-value="'Y'">非工作日</Checkbox>
                  </Col>
                </Row>
              </FormItem>
            </Form>
            <Divider />
            <div class="special-date">
              <div class="top-title ">
                <h4 class="title">特殊日期</h4>
                <div class="right-btn">
                  <Button  type="primary" icon="ios-add" @click="addNew('general')">添加</Button>
                </div>
              </div>
              <div class="special-content">
                <table class="table">
                  <thead>
                  <tr>
                    <th>名称</th>
                    <th>日期</th>
                    <th>选项</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(custom,index) in generalCustom" :key="index">
                    <td><Input disabled v-model="custom.name" size="small" style="width: 120px;"/></td>
                    <td>
                      <DatePicker disabled :editable="false" v-model="custom.dateRange" size="small" type="daterange" split-panels style="width: 200px;" ></DatePicker>
                    </td>
                    <td>
                      <Select disabled size="small" v-model="custom.isWorkday">
                        <Option value="Y">工作日</Option>
                        <Option value="N">非工作日</Option>
                      </Select>
                    </td>
                    <td>
                      <Button type="error" size="small" @click="deleteTime(custom.id)">删除</Button>
                    </td>
                    </tr>
                  <tr v-for="(newTime,index) in newGeneral">
                    <td><Input v-model="newTime.name" size="small" style="width: 120px;"/></td>
                    <td>
                      <DatePicker :editable="false" v-model="newTime.dateRange" size="small" type="daterange" split-panels style="width: 200px;" ></DatePicker>
                    </td>
                    <td>
                      <Select size="small" v-model="newTime.isWorkday">
                        <Option value="Y">工作日</Option>
                        <Option value="N">非工作日</Option>
                      </Select>
                    </td>
                    <td>
                      <Button :loading="loadingNew" type="primary" size="small" @click="saveNew('general')">保存</Button>
                      <Button size="small" @click="cancelAdd('general',index)">取消</Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>
<!--右-->
        <Col :lg="12" :md="24" class="mb-15">
          <Card>
            <p slot="title">备用网点</p>
            <div slot="extra"  style=" margin-top: -5px;">
              <Button @click="save($event,true)" type="primary" >保存</Button>
            </div>
            <Form>
              <Row :gutter="15" class="mb-15">
                <Col span="6" align="center" offset="6">开始时间</Col>
                <Col span="6"  align="center">结束时间</Col>
              </Row>
              <FormItem v-for="backtime in backup" :key="backtime.id">
                <Row :gutter="15">
                  <Col span="6" align="right">{{backtime.name}}</Col>
                  <Col span="6"  align="center">
                    <TimePicker :confirm="true" format="HH:mm" v-model="backtime.beginTime" type="time"></TimePicker>
                  </Col>
                  <Col span="6"  align="center">
                    <TimePicker :confirm="true" format="HH:mm" v-model="backtime.endTime" type="time"></TimePicker>
                  </Col>
                  <Col span="6">
                    <Checkbox v-model="backtime.isWorkday" :true-value="'N'" :false-value="'Y'">非工作日</Checkbox>
                  </Col>
                </Row>
              </FormItem>
            </Form>
            <Divider />
            <div class="special-date">
              <div class="top-title ">
                <h4 class="title">特殊日期</h4>
                <div class="right-btn">
                  <Button  type="primary" icon="ios-add" @click="addNew('custom')">添加</Button>
                </div>
              </div>
              <div class="special-content">
                <table class="table">
                  <thead>
                  <tr>
                    <th>名称</th>
                    <th>日期</th>
                    <th>选项</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                      <tr v-for="custom in backupCustom" :key="custom.id">
                        <td><Input disabled size="small" v-model="custom.name" style="width: 120px;"/></td>
                        <td>
                          <DatePicker disabled format="yyyy/MM/dd" v-model="custom.dateRange" size="small" type="daterange" split-panels style="width: 200px;" ></DatePicker>
                        </td>
                        <td>
                          <Select disabled v-model="custom.isWorkday" size="small">
                            <Option  value="Y">工作日</Option>
                            <Option value="N">非工作日</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click="deleteTime(custom.id)" type="error" size="small">删除</Button>
                        </td>
                      </tr>
                      <!--用于新增-->
                      <tr v-for="(newTime,index) in newCustom">
                        <td><Input v-model="newTime.name" size="small" style="width: 120px;"/></td>
                        <td>
                          <DatePicker :editable="false" v-model="newTime.dateRange" size="small" type="daterange" split-panels style="width: 200px;" ></DatePicker>
                        </td>
                        <td>
                          <Select size="small" v-model="newTime.isWorkday">
                            <Option value="Y">工作日</Option>
                            <Option value="N">非工作日</Option>
                          </Select>
                        </td>
                        <td>
                          <Button :loading="loadingNew" type="primary" size="small" @click="saveNew('backup')">保存</Button>
                          <Button size="small" @click="cancelAdd('backup',index)">取消</Button>
                        </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
  </div>
</template>

<script>
  import util from '../../libs/util';
    export default {
        name: "working-time",
      data(){
        return {
          backup:[],
          general:[],
          customTime:[],
          generalCustom:[],
          backupCustom:[],
          newGeneral:[],   //新增特殊日期（普通），用于过渡
          newCustom:[],
          loadingNew:false,
        }
      },
        methods:{

          getTime(){
            this.$http.get(`/repair/work/time/config/info`)
              .then(res=>{
                let data = res.data.data;
                data.map((item,index)=>{
                    if(item.isSlave==='Y'){
                      this.backup=item.configList;
                    }else{
                      this.general=item.configList;
                    }
                });

              })
          },
          save(e,isSlave){
            let params = null;
            if(isSlave){
              params={
                isSlave:'Y',
                configList:this.backup
              };
            }else{
              params={
                isSlave:'N',
                configList:this.general
              };
            }
            this.$http.post(`/repair/work/time/config/save`,{
              ...params
            })
              .then(res=>{
                if(res.data.code===0){
                  this.$Message.success('保存成功');
                  this.getTime();
                }else{
                  this.$Message.error(res.data.msg);
                }
              })
          },
          getCustom(){
            this.$http.get(`/repair/work/time/custom/config/info`)
              .then(res=>{
                if(res.data.code===0){
                 res.data.data.map(item=>{
                    if(item.isSlave==='Y'){
                      if(item.configList.length>0){
                        this.backupCustom = item.configList.map(time=>{
                          time.dateRange=[time.beginTime,time.endTime];
                          return time;
                        });
                      }else{
                        this.backupCustom=[];
                      }
                    }else{
                      if(item.configList.length>0){
                        this.generalCustom=item.configList.map(time=>{
                          time.dateRange=[time.beginTime,time.endTime];
                          return time;
                        })
                      }else{
                        this.generalCustom=[];
                      }

                    }
                    return item;
                  });
                }
              })
          },
          addNew(type){
            if(type==='general'){
              this.newGeneral.push({
                name:'',
                dateRange:[],
                isWorkday:'',
              })
            }else{
              this.newCustom.push({
                name:'',
                dateRange:[],
                isWorkday:'',
              })
            }

          },
          saveNew(type){
            let data = null;
            if(type==='general'){
             data = this.newGeneral[0];
             data.isSlave='N';
            }else{
              data = this.newCustom[0];
              data.isSlave='Y';
            }
          if(data.name.length<1){
              this.$Message.info('特殊日期名称不能为空');
              return false;
          }
           if(!data.dateRange[0]){
              this.$Message.info('请选择特殊日期范围');
              return false;
          }
          if(!data.isWorkday){
              this.$Message.info('请选择是否工作日');
              return false;
          }
            this.loadingNew=true;
            let param = {
              "name":data.name,
              "isSlave":data.isSlave,
              "beginTime":util.formateTime(data.dateRange[0]),
              "endTime":util.formateTime(data.dateRange[1]),
              "isWorkday":data.isWorkday
            };

            this.$http.post(`/repair/work/time/custom/config/save`,{
                ...param
              }).then(res=>{
                if(res.data.code===0){
                  this.$Message.success('保存成功');
                  this.newGeneral=[];
                  this.newCustom=[];
                  this.getCustom();
                }else{
                  this.$Message.error('保存失败'+res.data.msg);
                 /* this.newGeneral=[];
                  this.newCustom=[];*/
                }
                this.loadingNew=false;
            })
          },
          cancelAdd(type,index){
            if(type==='general'){
              this.newGeneral.splice(index,1);
            }else{
              this.newCustom.splice(index,1);
            }
          },
          deleteTime(id){
            let _this = this;
            this.$store.commit('setDeleteModal',{model:true,callback:function(){
                _this.$http.delete(`/repair/work/time/custom/config/delete?id=${id}`)
                  .then(res=>{
                    if(res.data.code===0){
                      _this.$Message.success('删除成功');
                      _this.$store.commit('setDeleteModal',{model:false});
                      _this.getCustom();
                    }else{
                      _this.$Message.error(res.data.msg);
                      _this.$store.commit('setDeleteModal',{model:false});
                    }
                  })
              }});

          }
        },
      created(){
          this.getTime();
          this.getCustom();
      }
    }
</script>


