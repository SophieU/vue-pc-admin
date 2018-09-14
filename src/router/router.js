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
    {path:'addCalc',title:'添加计费公式',name:'addCalc',component:()=>import('@/pages/fee-manage/add-calc.vue')},
    {path:'publish-pk',title:'发布PK',name:'publishPK',component:()=>import('@/pages/contents/publish-pk.vue')},
  ]
};
//3、作为Main组件的子页面展示 并且在菜单中显示 （appRouter）
export const appRouter=[
  {
    path:'/content',
    icon:'md-clipboard',
    name:'content',
    title:'内容管理',
    component:Main,
    children:[
      {path:'notice',icon:'md-megaphone',title:'小区公告',name:'notice',component:()=>import('@/pages/contents/broadcast')},
      {path:'sos',icon:'ios-flash',title:'报警管理',name:'sos',component:()=>import('@/pages/contents/sos')},
      {path:'assembly',icon:'ios-home',title:'议事厅',name:'assembly',component:()=>import('@/pages/contents/chamber')},
      {path:'feedback',icon:'md-medal',title:'投诉表扬',name:'feedback',component:()=>import('@/pages/contents/praise')},
    ]
  },{
    path:'/estate',
    icon:'ios-appstore',
    title:'物业App管理',
    name:'app',
    component:Main,
    children:[
      {path:'staff',icon:'ios-people',title:'员工管理',name:'staff',component:()=>import('@/pages/app/staff.vue')},
      {path:'chat',icon:'ios-chatbubbles',title:'群聊管理',name:'chat',component:()=>import('@/pages/app/chat.vue')},
      {path:'check',name:'check',title:'审批管理',component:()=>import('@/pages/components/parent-view.vue'),children:[
          {path:'approve',icon:'ios-checkbox-outline',title:'流程管理',name:'flow',component:()=>import('@/pages/app/flow-admin.vue')},
          {path:'holiday',icon:'ios-boat',title:'假期管理',name:'holiday',component:()=>import('@/pages/app/holiday.vue')},
          {path:'balance',icon:'ios-boat',title:'余额管理',name:'balance',component:()=>import('@/pages/app/balance.vue')},
          {path:'database',icon:'ios-cloud-download',group:'审批管理',title:'数据导出',name:'datas',component:()=>import('@/pages/app/export-data.vue')},
        ]},

    ]
  },{
    path:'/source',
    icon:'md-aperture',
    title:'资源管理',
    name:'source',
    component:Main,
    children:[
      {path:'custom',icon:'ios-person',title:'业主管理',name:'custom',component:()=>import('@/pages/source/custom.vue')},
      {path:'house',icon:'ios-home',title:'房屋管理',name:'house',component:()=>import('@/pages/source/house.vue')},
      {path:'carport',icon:'md-car',title:'车位管理',name:'carport',component:()=>import('@/pages/source/carport.vue')},
    ]
  },{
    path:'/repair',
    title:'报事报修',
    name:'repair',
    component:Main,
    icon:'md-build',
    children:[
      {path:'category',icon:'ios-keypad',name:'category',title:'类目管理',component:()=>import('@/pages/components/parent-view.vue'),
        children:[
          {path:'first',icon:'md-keypad',title:'一级类目',name:'first',component:()=>import('@/pages/repair/category-first.vue')},
          {path:'second',icon:'md-keypad',title:'二级类目',name:'second',component:()=>import('@/pages/repair/category-second.vue')},
        ]
      },
      {path:'rest',name:'rest',icon:'md-cafe',title:'修工期设置',component:()=>import('@/pages/repair/rest.vue')},
      {path:'emergency',name:'emergency',icon:'ios-construct',title:'紧急报修',component:()=>import('@/pages/repair/emergency.vue')},
      {path:'order',name:'order',icon:'md-list',title:'报单管理',component:()=>import('@/pages/repair/order.vue')},
    ]
  },{
  path:'/fee',
    title:'收费管理',
    name:'fee',
    component:Main,
    icon:'md-cash',
    children:[
      {path:'pay-setting',name:'pay',icon:'md-pricetag',title:'支付设置',component:()=>import('@/pages/fee-manage/pay-setting.vue')},
      {path:'calc-fee',name:'calc',icon:'ios-calculator',title:'计费标准设置',component:()=>import('@/pages/fee-manage/calc-fee.vue')},
      {path:'estate-fee',name:'estateFee',icon:'ios-bookmarks-outline',title:'物业计费',component:()=>import('@/pages/fee-manage/estate-fee.vue')},
      {path:'due-search',name:'due',icon:'md-analytics',title:'应收查询',component:()=>import('@/pages/fee-manage/due-search.vue')},
      {path:'fact-search',name:'fact',icon:'ios-analytics',title:'实收查询',component:()=>import('@/pages/fee-manage/infact-search.vue')},
      {path:'return-search',name:'return',icon:'ios-leaf',title:'退费查询',component:()=>import('@/pages/fee-manage/return-search.vue')},
      {path:'charging-search',name:'charging',icon:'ios-notifications-outline',title:'催费查询',component:()=>import('@/pages/fee-manage/charging-search.vue')},
      {path:'bill',name:'bill',icon:'md-paper',title:'票据管理',component:()=>import('@/pages/components/parent-view.vue'),
        children:[
          {path:'distribute',name:'distribute',title:'票据分配',icon:'md-print',component:()=>import('@/pages/fee-manage/distribute-bill.vue')},
          {path:'searchBill',name:'searchBill',title:'票据查询',icon:'md-search',component:()=>import('@/pages/fee-manage/search-bill.vue')},
        ]
      },
    ]
  },{
    path:'/financial',
    title:'财务结算',
    name:'financial',
    component:Main,
    icon:'logo-yen',
    children:[
      {path:'financialRec',name:'financialRec',icon:'md-filing',title:'财务对账',component:()=>import('@/pages/financial/financial.vue')},
      {path:'billTotal',name:'billTotal',icon:'ios-funnel',title:'票据统计',component:()=>import('@/pages/financial/bill-total.vue')},
      {path:'reportQuery',name:'reportQuery',title:'报表查询',icon:'ios-easel',component:()=>import('@/pages/components/parent-view.vue'),
        children:[
          {path:'subjectDetail',name:'subjectDetail',icon:'ios-link',title:'科目明细',component:()=>import('@/pages/financial/subject-detail.vue')},
          {path:'subjectTotal',name:'subjectTotal',icon:'ios-podium',title:'科目汇总',component:()=>import('@/pages/financial/subject-total.vue')},
        ]
      },
    ]
  },{
  path:'/statistical',
    title:'统计查看',
    name:'statistical',
    component:Main,
    icon:'ios-flower',
    children:[
      {path:'repair-statistical',name:'repair-statistical',icon:'ios-hammer',title:'报事报修统计',component:()=>import('@/pages/statistical/repair-statistical.vue')},
    ]
  },{
    path:'/system',
    title:'系统管理',
    name:'system',
    component:Main,
    icon:'md-boat',
    children:[
      {path:'role-admin',name:'role-admin',icon:'ios-body',title:'角色管理',component:()=>import('@/pages/system/role-admin.vue')},
      {path:'organization-admin',name:'organization-admin',icon:'ios-color-filter',title:'组织管理',component:()=>import('@/pages/system/organization-admin.vue')},
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

