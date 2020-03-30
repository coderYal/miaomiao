<template>
  <header id="header">
    <!-- 设置插槽用于放置详情页的图片 -->
    <slot></slot>
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  // 给组件添加name方便调试
  name: "Header",
  // 父子通信,让子组件传入标题
  props: {
    title: {
      type: String,
      default: "喵喵电影"
    }
  }
};
</script>

// scoped ---> 代表是局部的,不会引起冲突
<style scoped>
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  position: relative;
}
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
#header i {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -13px;
  font-size: 26px;
}
</style>