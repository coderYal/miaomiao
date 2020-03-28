<template>
  <div id="main">
    <!-- 给父组件的自定义属性传入标题 -->
    <Header title="我的喵喵" />
    <Login />
    <TabBar />
  </div>
</template>

<script>
// 引入头部组件和底部组件
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
// 引入登录组件
import Login from '@/components/Login';

export default {
  // 给组件添加name方便调试
  name: "Mine",
  // 注册组件使用
  components: {
    Header,
    TabBar,
    Login
  }  
}
</script>

// scoped ---> 代表是局部的,不会引起冲突
<style scoped>
#footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;}
#footer ul{ display: flex; text-align: center; height:50px; align-items:center;}
#footer ul li{ flex:1; height:40px;}
#footer ul li.active{ color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul p{ font-size: 12px; line-height: 18px;}
</style>