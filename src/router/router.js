/*
* router配置项：
* 分三类情况：
*   1、不在Main组件内展示，而作为单独页面的（如Login）
*   2、在Main组件内展示，但不在左侧菜单中显示
*   3、在Main组件中展示，也在左侧菜单中
* */
import Main from '@/pages/Main.vue'



// 1、不在Main组件内展示
export const loginRouter = {
  path :'/login',
  name:'login',
  meta:{
    title:'Login-登录'
  },
  component:()=>import('@/pages/login/Login.vue')
};
export const page404 ={
  path:'/*',
  name:'error-404',
  meta:{
    title:'404-页面不存在'
  },
  component:()=>import('@/pages/error-page/404.vue')
};
export const page500={
  path:'/500',
  name:'error-500',
  meta:{
    title:'500-服务端错误'
  },
  component:()=>import('@/pages/error-page/500.vue')
};

//2、作为Main组件的子页面但不是菜单显示的路由（otherRouter)
export const otherRouter={
  path:'/',
  name:'otherRouter',
  redirect:'/home',
  component:Main,
  children:[
    {path:'home',title:'首页',name:'home',component:()=>import('@/pages/home/Index.vue')},
  ]
};

//3、作为Main组件的子页面展示 并且在菜单中显示 （appRouter）
export const appRouter=[
  {
    path:'/content',
    icon:'home',
    name:'content',
    title:'内容管理',
    component:Main,
    children:[
      {path:'notice',icon:'speakerphone',title:'小区公告',name:'notice',component:()=>import('@/pages/contents/broadcast')},
      {path:'sos',icon:'flash',title:'报警管理',name:'sos',component:()=>import('@/pages/home/Index')},
      {path:'assembly',icon:'ios-home',title:'议事厅',name:'assembly',component:()=>import('@/pages/home/Index')},
      {path:'feedback',icon:'ribbon-a',title:'投诉表扬',name:'feedback',component:()=>import('@/pages/home/Index')},
    ]
  },{
    path:'/estate',
    icon:'ipad',
    title:'物业App管理',
    name:'app',
    children:[
      {path:'staff',icon:'person-stalker',title:'人员管理',name:'staff',component:()=>import('@/pages/components/HelloWorld.vue')},
      {path:'chat',icon:'chatbubbles',title:'群聊管理',name:'chat',component:()=>import('@/pages/components/HelloWorld.vue')},
      {path:'approve',icon:'compose',title:'审批管理',name:'approve',component:()=>import('@/pages/components/HelloWorld.vue')},
      {path:'holiday',icon:'coffee',title:'假期管理',name:'holiday',component:()=>import('@/pages/components/HelloWorld.vue')},
      {path:'database',icon:'soup-can',title:'数据导出',name:'database',component:()=>import('@/pages/components/HelloWorld.vue')},
    ]
  },{
    path:'/source',
    icon:'arrow-shrink',
    title:'资源管理',
    name:'source',
    component:Main,
    children:[
      {path:'staff',icon:'person-stalker',title:'业主管理',name:'staff',component:()=>import('@/pages/components/HelloWorld.vue')},
    ]
  }
];


//所有路由汇总
export const routers=[
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page404, //缺省配置放最后
];

