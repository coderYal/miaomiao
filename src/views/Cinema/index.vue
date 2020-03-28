<template>
  <div id="main">
    <!-- 给父组件的自定义属性传入标题 -->
    <Header title="喵喵影院" />
    <!-- 引入二级导航 -->
    <div id="content">
      <div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
      <!-- 使用影院列表的组件 -->
      <CiList />
    </div>
    <TabBar />
  </div>
</template>

<script>
// 引入头部组件和底部组件
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
// 引入影院城市列表组件
import CiList from '@/components/CiList';

export default {
  // 给组件添加name方便调试
  name: "Cinema",
  // 注册组件使用
  components: {
    Header,
    TabBar,
    CiList
  }  
}
</script>

// scoped ---> 代表是局部的,不会引起冲突
<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>