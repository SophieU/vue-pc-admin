<style lang="scss" scoped>
  @import '../main.scss';
</style>
<template>
    <div class="tags-outer-scroll-con"  ref="scrollCon" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
      <div class="close-all-tag-on">
        <Dropdown transfer >
          <Button size="small" type="primary">
            标签选项
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="clearAll">关闭所有</DropdownItem>
            <DropdownItem name="clearOthers">关闭其他</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="tags-inner-scroll-body" ref="scrollBody" :style="{left:tagBodyLeft+'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag type="dot"
            v-for="(item,index) in pageTagsList"
               ref="tagsPageOpened"
               :key="item.name"
               :name="item.name"
               :closable="item.name==='home'?false:true"
               :color="item.name===currentPage?'primary':'default'"
               @on-close="closePage"
               @click.native="linkTo(item)"
          >{{item.title}}</Tag>
        </transition-group>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tags-page-opened",
        data(){
            return{
              currentPage:this.$route.name,
              tagBodyLeft:0,
              tagsCount:1,
              refsTag:[],
            }
        },
      props:{
          pageTagsList:Array,
          beforePush: {
            type: Function,
            default: (item) => {
              return true;
            }
          }
      },
      computed:{
          tagsList(){
            return this.$store.state.app.pageOpenedList;
          },
          title(){
              return this.$store.state.app.currentTitle;
          }
      },
      methods:{
        moveToView(tag){
          if(tag.offsetLeft<-this.tagBodyLeft){
            //标签在可视区左侧
            this.tagBodyLeft=-tag.offsetLeft+10;
          }else if(tag.offsetLeft+10>-this.tagBodyLeft&& tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100){
            // 标签在可视区域
            this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
          }else{
            // 标签在可视区域右侧
            this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
          }
        },
        //关闭标签页,event,name为 iview Tag组件 on-close事件自动传入的参数
        closePage(event,name){
          let pageOpenedList = this.$store.state.app.pageOpenedList;
          let lastPageObj = pageOpenedList[0];
          if(this.currentPage===name){
            let len = pageOpenedList.length;
            for(let i=1;i<len;i++){
              if(pageOpenedList[i].name===name){
                if(i<(len-1)){
                  lastPageObj=pageOpenedList[i+1];
                }else{
                  lastPageObj = pageOpenedList[i-1];
                }
                break;
              }
            }
          }else{
            let tagWidth=event.target.parentNode.offsetWidth;
            this.tagBodyLeft=Math.min(this.tagBodyLeft+tagWidth,0);
          }
          this.$store.commit('removeTag',name);
          this.$store.commit('closePage',name);
          pageOpenedList = this.$store.state.app.pageOpenedList;
          localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
          if (this.currentPage === name) {
            this.linkTo(lastPageObj);
          }
        },
        //跳转到页面
        linkTo (item) {
          let routerObj = {};
          routerObj.name = item.name;
          if (item.argu) {
            routerObj.params = item.argu;
          }
          if (item.query) {
            routerObj.query = item.query;
          }
          if (this.beforePush(item)) {
            this.$router.push(routerObj);
          }
        },
        //鼠标滚轮事件
        handleScroll(e){
          let type=e.type;
          let delta=0;
          if(type==='DOMMouseScroll'||type==='mousewheel'){
            //计算滚动方向
            delta=(e.wheelDelta)?e.wheelDelta:-(e.detail||0)*40;
          }
          let left = 0;
          if(delta>0){
            left =  Math.min(0,this.tagBodyLeft+delta);

          }else{
            if(this.$refs.scrollCon.offsetWidth-100<this.$refs.scrollBody.offsetWidth){
              if(this.tagBodyLeft<-(this.$refs.scrollBody.offsetWidth-this.$refs.scrollCon.offsetWidth+100)){
                left = this.tagBodyLeft;
              }else{
                left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
              }
            }else{
              this.tagBodyLeft=0;
            }
          }
          this.tagBodyLeft=left;
        },
        handleTagsOption (type) {
          if (type === 'clearAll') {
            this.$store.commit('clearAllTags');
            this.$router.push({
              name: 'home_index'
            });
          } else {
            this.$store.commit('clearOtherTags', this);
          }
          this.tagBodyLeft = 0;
        },
      },
      mounted(){
        this.refsTag=this.$refs.tagsPageOpened;
        setTimeout(()=>{
          this.refsTag.forEach((item,index)=>{
            if(this.$route.name===item.name){
              let tag=this.refsTag[index].$el;
              this.moveToView(tag);
            }
          },1); //这里不设定时器就会有偏移bug
          this.tagsCount=this.tagsList.length;
        })
      },
      watch:{
          '$route'(to){
            this.currentPage=to.name;
            //this.$nextTick用于获取数据更新后的DOM结果
            this.$nextTick(()=>{
              this.refsTag.forEach((item,index)=>{
                if(to.name===item.name){
                  let tag=this.refsTag[index].$el;
                  this.moveToView(tag);
                }
              })
            });
            this.tagsCount=this.tagsList.length;
          }
      }
    }
</script>


