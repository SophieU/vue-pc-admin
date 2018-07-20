<template>
  <div>
    <template v-for="(item,index) in menuList">
      <div style="text-align:center;" :key="index">
        <Dropdown transfer placement="right-start">
          <Button style="width:70px;margin-left:-5px;padding:10px 0;" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu slot="list" style="width:200px;">
            <template v-for="(child,i) in item.children">
              <DropdownItem :name="child.name" :key="i">
                <Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
    export default {
        name: "sidebarMenuCollapse",
      props:{
          menuList:{
            type:Array
          },
          iconColor: {
            type: String,
            default: 'white'
          },
          menuTheme: {
            type: String,
            default: 'darck'
          }
      },
      methods:{
          itemTitle(item){
            return item.title;
          }
      }
    }
</script>

<style scoped>

</style>
