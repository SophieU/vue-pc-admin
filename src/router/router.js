/*
* router配置项：
* 分三类情况：
*   1、不在Main组件内展示，而作为单独页面的（如Login）
*   2、在Main组件内展示，但不在左侧菜单中显示
*   3、在Main组件中展示，也在左侧菜单中
* */
import Main from '@/pages/Main.vue'



// 1、不在Main组件内展示
export const defaultIndex = {
  path:'/',
  name:'default',
  meta:{
    title:'Login-登录'
  },
  component:()=>import('@/pages/login/Login.vue')
}
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
export const forbid={
  path:'/forbid',
  name:'forbid',
  meta:{
    title:'没有权限'
  },
  component:Main,
  children:[
    {path:'',title:'无权限',  name:'forbid',component:()=>import('@/pages/error-page/forbid.vue') }
  ]
}

//2、作为Main组件的子页面但不是菜单显示的路由（otherRouter)
/*export const otherRouter={
  path:'/',
  name:'otherRouter',
  redirect:'/home',
  component:Main,
  children:[
    {path:'/home',title:'首页',name:'home',component:()=>import('@/pages/home/Index')},
  ]
};*/
//3、作为Main组件的子页面展示 并且在菜单中显示 （appRouter）
export const appRouter=[
  {
    path:'/content',
    icon:'md-home',
    name:'content',
    title:'首页',
    component:Main,
    meta:{single:true},
    children:[
      {path:'home',meta:{},title:'首页',name:'home',component:()=>import('@/pages/home/Index.vue')},
    ]
  },{
    path:'/systems',
    icon:'md-aperture',
    title:'系统管理',
    name:'systems',
    component:Main,
    meta:{single:false},
    children:[
          {path:'type',meta:{},name:'type',title:'分类管理',component:()=>import('@/pages/main-components/parent-view.vue'),
            children:[
              {path:'repair',meta:{},title:'报修分类',name:'repair',component:()=>import('@/pages/system/repair-type.vue')},
              {path:'serviceType',meta:{},title:'服务分类',name:'serviceType',component:()=>import('@/pages/system/service-type.vue')},
              {path:'fault',meta:{},title:'故障原因管理',name:'fault',component:()=>import('@/pages/system/fault-type.vue')},
              {path:'materials',meta:{},title:'辅材分类',name:'materials',component:()=>import('@/pages/system/materials-type.vue')},

            ]},
          {path:'systemAdmin',meta:{},name:'systemAdmin',title:'系统管理',component:()=>import('@/pages/main-components/parent-view.vue'),
            children:[
              {path:'role',meta:{},title:'角色管理',name:'role',component:()=>import('@/pages/system/role-admin')},
              {path:'editRole',meta:{hideInMenu:true},title:'设置角色',name:'editRole',component:()=>import('@/pages/system/role-setting')},
              {path:'account',meta:{},title:'账号管理',name:'account',component:()=>import('@/pages/system/account-admin.vue')},
              {path:'workingTime',meta:{},title:'工作时间设置',name:'workingTime',component:()=>import('@/pages/system/working-time.vue')},
              {path:'tips',meta:{},title:'温馨提示',name:'tips',component:()=>import('@/pages/system/tips-admin.vue')},
            ]},

    ]
  },{
    path:'/service',
    icon:'logo-codepen',
    title:'网点管理',
    name:'service-address',
    component:Main,
    meta:{single:false},
    children:[
      {path:'address',meta:{},icon:'md-locate',title:'服务网点管理',name:'address',component:()=>import('@/pages/service/service-port.vue')},
      {path:'district',meta:{},icon:'ios-compass',title:'区域设置',name:'district',component:()=>import('@/pages/service/area-admin.vue')},

    ]
  },{
    path:'/materialsAdmin',
    title:'辅材管理',
    name:'materialsAdmin',
    component:Main,
    icon:'ios-construct',
    meta:{single:false},
    children:[
      {path:'storage',meta:{},title:'辅材库存管理',name:'storage',component:()=>import('@/pages/source/storage-admin.vue')},
      {path:'collar',meta:{},title:'员工领用汇总',name:'collar',component:()=>import('@/pages/source/draw-pool.vue')},
      {path:'output',title:'辅材出库管理',meta:{hideChild:true,},component:()=>import('@/pages/main-components/parent-view.vue'),
          children:[
            {path:'',meta:{},name:'output',component:()=>import('@/pages/source/import-admin.vue')},
            {path:'newOut',meta:{hideInMenu:true},title:'新建出库',name:'newOut',component:()=>import('@/pages/source/new-out')},
            {path:'outDetail',meta:{hideInMenu:true},title:'出库详情',name:'outDetail',component:()=>import('@/pages/source/storage-detail')},

          ]

      },
      {path:'import',title:'辅材入库管理',meta:{hideChild:true,},component:()=>import('@/pages/main-components/parent-view.vue'),
        children:[
          {path:'',meta:{},name:'import',component:()=>import('@/pages/source/import-admin.vue')},
          {path:'importNew',meta:{hideInMenu:true},title:'新建入库',name:'importNew',component:()=>import('@/pages/source/new-in.vue')},
          {path:'inDetail',meta:{hideInMenu:true},title:'入库详情',name:'inDetail',component:()=>import('@/pages/source/storage-detail')},
        ]},
      {path:'inventory',title:'辅料盘点',meta:{hideChild:true,},component:()=>import('@/pages/main-components/parent-view.vue'),
        children:[
          {path:'',meta:{},title:'辅料盘点',name:'inventory',component:()=>import('@/pages/source/inventory-admin.vue')},
          {path:'inventoryDetail',meta:{hideInMenu:true},title:'盘点详情',name:'inventoryDetail',component:()=>import('@/pages/source/inventory-detail')},
          {path:'inventoryNew',meta:{hideInMenu:true},title:'新建盘点',name:'inventoryNew',component:()=>import('@/pages/source/inventory-new')},
        ]
      },
    ]
  },{
  path:'/financial',
    title:'财务管理',
    name:'financial',
    component:Main,
    icon:'md-cash',
    meta:{single:false},
    children:[
      {path:'financial-total',meta:{},icon:'md-contract',title:'财务概况',name:'financial-total',component:()=>import('@/pages/finance/finance-view.vue')},
      {path:'materials-calc',meta:{},icon:'ios-create',title:'辅材核算',name:'materials-calc',component:()=>import('@/pages/finance/materials-calc.vue')},
      {path:'income-detail',meta:{},icon:'ios-easel',title:'盈收详情',name:'income-detail',component:()=>import('@/pages/finance/income-detail.vue')},
      {path:'settle-account',meta:{},icon:'ios-cog',title:'结算账户配置',name:'settle-account',component:()=>import('@/pages/finance/settle-account.vue')},
    ]
  },{
    path:'/staff',
    title:'人员管理',
    name:'staff',
    component:Main,
    icon:'logo-yen',
    meta:{single:true},
    children:[
      {path:'staff-admin',icon:'ios-people',meta:{},title:'人员管理',name:'staff-admin',component:()=>import('@/pages/staff/staff-admin.vue')},
      {path:'staffDetail',title:'员工详情',meta:{},component:()=>import('@/pages/staff/staff-detail'),
        children:[
          {path:'',name:'staffDetail',title:'基本信息',meta:{},component:()=>import('@/pages/staff/staff-component/staff-base')},
          {path:'staffServiceType',title:'服务类型',meta:{hideInMenu:true},name:'staffServiceType',component:()=>import('@/pages/staff/staff-component/staff-service')},
          {path:'staffAccountInfo',title:'账号信息',meta:{hideInMenu:true},name:'staffAccountInfo',component:()=>import('@/pages/staff/staff-component/staff-account')},
          {path:'staffOrderIncome',title:'工单收益',meta:{hideInMenu:true},name:'staffOrderIncome',component:()=>import('@/pages/staff/staff-component/staff-order-income')},
          {path:'staffOrderInfo',title:'工单信息',meta:{hideInMenu:true},name:'staffOrderInfo',component:()=>import('@/pages/staff/staff-component/staff-order-info')},

        ]
      },
    ]
  },{
  path:'/visit',
    title:'回访管理',
    name:'visit',
    component:Main,
    meta:{single:true},
    children:[
      {path:'visit-admin',meta:{},icon:'ios-call',title:'回访管理',name:'visit-admin',component:()=>import('@/pages/visite/return-visite.vue')},
    ]
  },{
    path:'/information',
    title:'消息管理',
    name:'information',
    component:Main,
    meta:{single:true},
    children:[
      {path:'approve',meta:{},icon:'md-notifications',title:'消息管理',name:'message_admin',component:()=>import('@/pages/message/message-admin.vue')},
    ]
  },{
    path:'/order',
    title:'工单管理',
    name:'order',
    component:Main,
    icon:'ios-briefcase',
    meta:{single:true},
    children:[
      {path:'order-filter',meta:{},name:'order_filter',icon:'ios-briefcase',title:'工单查询',component:()=>import('@/pages/order/order-search.vue')},
      {
        path:'order-detail',meta:{},title:"工单详情",component:()=>import('@/pages/order/order-detail'),
        children:[
          {path:'',meta:{},name:'orderDetail',title:'处理流程',component:()=>import('@/pages/order/order-com/order-flow')},
          {path:'fee-detail',meta:{hideInMenu:true},title:'收费明细',name:'feeDetail',component:()=>import('@/pages/order/order-com/fee-detail')},
          {path:'after-service',meta:{hideInMenu:true},title:'售后质保',name:'afterService',component:()=>import('@/pages/order/order-com/after-service')},
          {path:'order-income',meta:{hideInMenu:true},title:'工单收益',name:'orderDetailIncome',component:()=>import('@/pages/order/order-com/order-income')},
          {path:'visited-info',meta:{hideInMenu:true},title:'回访信息',name:'visitedInfo',component:()=>import('@/pages/order/order-com/visited-info')},
          {path:'order-prove',meta:{hideInMenu:true},title:'证据证明',name:'orderProve',component:()=>import('@/pages/order/order-com/order-prove')},
          {path:'order-control',meta:{hideInMenu:true},title:'订单操作',name:'orderControl',component:()=>import('@/pages/order/order-com/order-control')},
        ]
      }
    ]
  },{
    path:'/statistic',
    title:'统计报表',
    name:'statistic',
    component:Main,
    icon:'md-analytics',
    meta:{single:true},
    children:[
      // {path:'materials-sta',icon:'ios-analytics',title:'辅材使用统计',name:'materials_sta',component:()=>import('@/pages/statistical/materials-use.vue')},
      {path:'statistic-chart',meta:{hideInMenu:true},icon:'md-analytics',title:'统计报表',name:'statistic_chart',component:()=>import('@/pages/statistical/statistical-chart.vue')},
    ]
  },
];
//所有路由汇总
export const routers=[
  defaultIndex,
  loginRouter,
  // otherRouter,
  ...appRouter,
  forbid,
  page500,
  page404, //缺省配置放最后
];

