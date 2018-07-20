<style lang="scss" scoped>
  @import '../main.scss';
</style>
<template>
    <div class="tags-outer-scroll-con"  ref="scrollCon">
      <div class="close-all-tag-on">
        <Dropdown transfer >
          <Button size="small" type="primary">
            标签选项
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="clearAll">关闭所有</DropdownItem>
            <DropdownItem name="clearOthers">关闭其他</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="tags-inner-scroll-body" ref="scrollBody">
        <transition-group name="taglist-moving-animation">
          <Tag type="dot" closable
            v-for="(item,index) in pagaTagsList"
               ref="tagsPageOpend"
               :key="item.name"
               :name="item.name"
               :closable="item.name==='home_index'?false:true"
               :color="item.name===currentPage?'blue':'default'"
          >{{item.title}}</Tag>
        </transition-group>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tags-page-opened",
      data:()=>{
          return{
            pagaTagsList:[
              {name:'home',title:'首页',path:'/'},
              {name:'test',title:'人员管理',path:'/test'},
            ],
            currentPage:'home'
          }
      }
    }
</script>


