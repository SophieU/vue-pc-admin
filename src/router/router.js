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
    {path:'roleControl',title:'首页',name:'home',component:()=>import('@/pages/home/Index.vue')},
  ]
};
//3、作为Main组件的子页面展示 并且在菜单中显示 （appRouter）
export const appRouter=[
  {
    path:'/content',
    icon:'md-home',
    name:'content',
    title:'首页',
    component:Main,
    children:[
      {path:'home',title:'首页',name:'home',component:()=>import('@/pages/home/Index.vue')},
      {path:'/system/system/roleControl',title:'新建角色',name:'roleControl',component:()=>import('@/pages/system/role-admin')},
    ]
  },{
    path:'/systems',
    icon:'md-aperture',
    title:'系统管理',
    name:'systems',
    component:Main,
    children:[
          {path:'type',name:'type',title:'分类管理',component:()=>import('@/pages/main-components/parent-view.vue'),
            children:[
              {path:'repair',title:'报修分类',name:'repair',component:()=>import('@/pages/system/repair-type.vue')},
              {path:'serviceType',title:'服务分类',name:'serviceType',component:()=>import('@/pages/system/service-type.vue')},
              {path:'fault',title:'故障原因管理',name:'fault',component:()=>import('@/pages/system/fault-type.vue')},
              {path:'materials',title:'辅材分类',name:'materials',component:()=>import('@/pages/system/materials-type.vue')},
          ]},
      {path:'system',name:'system',title:'系统管理',component:()=>import('@/pages/main-components/parent-view.vue'),children:[
          {path:'role',title:'角色管理',name:'role',component:()=>import('@/pages/system/role-admin')},
          {path:'account',title:'账号管理',name:'account',component:()=>import('@/pages/system/account-admin.vue')},
          {path:'workingTime',title:'工作时间设置',name:'workingTime',component:()=>import('@/pages/system/working-time.vue')},
          {path:'tips',title:'温馨提示',name:'tips',component:()=>import('@/pages/home/Index.vue')},
        ]},
    ]
  },{
    path:'/service',
    icon:'logo-codepen',
    title:'服务网点管理',
    name:'service-address',
    component:Main,
    children:[
      {path:'address',icon:'md-locate',title:'服务网点管理',name:'address',component:()=>import('@/pages/home/Index.vue')},
      {path:'district',icon:'ios-compass',title:'区域设置',name:'district',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/materialsAdmin',
    title:'辅材管理',
    name:'materialsAdmin',
    component:Main,
    icon:'ios-construct',
    children:[
      {path:'storage',icon:'ios-cloud',title:'辅材库存管理',name:'storage',component:()=>import('@/pages/home/Index.vue')},
      {path:'collar',icon:'ios-clipboard',title:'员工领用汇总',name:'collar',component:()=>import('@/pages/home/Index.vue')},
      {path:'output',icon:'md-log-out',title:'辅材出库管理',name:'output',component:()=>import('@/pages/home/Index.vue')},
      {path:'import',icon:'md-log-in',title:'辅材入库管理',name:'import',component:()=>import('@/pages/home/Index.vue')},
      {path:'inventory',icon:'md-clipboard',title:'辅料盘点',name:'flow',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
  path:'/financial',
    title:'财务管理',
    name:'financial',
    component:Main,
    icon:'md-cash',
    children:[
      {path:'financial-total',icon:'md-contract',title:'财务概况',name:'financial-total',component:()=>import('@/pages/home/Index.vue')},
      {path:'materials-calc',icon:'ios-create',title:'辅材核算',name:'materials-calc',component:()=>import('@/pages/home/Index.vue')},
      {path:'income-detail',icon:'ios-easel',title:'盈收详情',name:'income-detail',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/staff',
    title:'人员管理',
    name:'staff',
    component:Main,
    icon:'logo-yen',
    children:[
      {path:'staff-admin',icon:'ios-people',title:'人员管理',name:'staff-admin',component:()=>import('@/pages/home/Index.vue')},

    ]
  },{
  path:'/visit',
    title:'回访管理',
    name:'visit',
    component:Main,
    children:[
      {path:'visit-admin',icon:'ios-call',title:'回访管理',name:'visit-admin',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/information',
    title:'消息管理',
    name:'information',
    component:Main,
    children:[
      {path:'approve',icon:'md-notifications',title:'消息管理',name:'flow',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/order',
    title:'工单管理',
    name:'order',
    component:Main,
    icon:'ios-briefcase',
    children:[
      {path:'order-filter',icon:'ios-briefcase',title:'工单查询',name:'order-filter',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/statistic',
    title:'统计报表',
    name:'statistic',
    component:Main,
    icon:'md-analytics',
    children:[
      {path:'materials-sta',icon:'ios-analytics',title:'辅材使用统计',name:'materials-sta',component:()=>import('@/pages/home/Index.vue')},
      {path:'statistic-chart',icon:'md-analytics',title:'统计报表',name:'statistic-chart',component:()=>import('@/pages/home/Index.vue')},
    ]
  },
];
//所有路由汇总
export const routers=[
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page404, //缺省配置放最后
];

