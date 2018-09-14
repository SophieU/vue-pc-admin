<template>
    <div>
      <Card class="mb-15">
        <Button type="primary">添加小区</Button>
        <Button type="primary">编辑小区</Button>
        <Button type="primary">删除小区</Button>
        <Button type="primary">角色管理</Button>
      </Card>
      <Row :gutter="16">
        <Col span="6">
          <Card>这是树形结构</Card>
        </Col>
        <Col span="18">
          <Card>
            <div class="clearfix mb-15">
              <div class="pull-right">
                <Button type="primary">添加账号</Button>
              </div>
            </div>
            <Table :columns="columns"></Table>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "organization-admin",
      data(){
          return{
            columns:[
              {title:'序号',type:'index'},
              {title:'账号',key:'account'},
              {title:'角色名称',key:'roleName'},
              {title:'联系人',key:'contactor'},
              {title:'管辖小区',key:'village'},
              {title:'操作'},
            ]
          }
      }
    }
</script>

<style scoped>

</style>
