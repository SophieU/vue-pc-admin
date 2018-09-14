<style scoped lang="scss">
  @import './menu.scss';
</style>
<template>
  <div class="sidebarMenuCollapse">
    <template v-for="(item,index) in menuList">
      <div style="text-align:center;" :key="index">
        <Dropdown transfer placement="right-start" @on-click="handleClick">
          <Button class="menu-icon" style="width:70px;margin-left:-5px;padding:10px 0;" type="text">
            <Icon  :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu slot="list" style="width:200px;" >
            <template v-for="(child,i) in item.children" >
              <template v-if="!child.children">
                <DropdownItem :name="child.name" :key="i">
                  <Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                </DropdownItem>
              </template>
              <template v-else>
                <Dropdown  v-if="child.children" placement="right-start">
                  <DropdownItem>
                    <Icon :type="child.icon"></Icon>
                    <span style="padding-left:10px;">{{child.title}}</span>
                    <Icon type="ios-arrow-forward"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list">
                    <template v-for="(subChild,j) in child.children">
                      <DropdownItem :name="subChild.name" :key="j" >
                        <span style="padding-left:10px;">{{itemTitle(subChild)}}</span>
                      </DropdownItem>
                    </template>
                  </DropdownMenu>
                </Dropdown>
              </template>

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
          },
          handleClick(name){
            this.$emit('on-change',name);
          }
      }
    }
</script>


