<template>
  <div class="messageBox">
    <h2>{{ title }}</h2>
    <p>{{content }}</p>
    <div>
      <!-- 绑定按下事件 -->
      <div @touchstart="handleCancel">{{ cancel }}</div>
      <div @touchstart="handleOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 设置name便于调试
  name: "MessageBox"
};
</script>

// scoped局部样式 不会冲突
<style scoped>
.messageBox {
  width: 200px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -60px 0 0 -100px;
}
.messageBox h2 {
  text-align: center;
  line-height: 40px;
  font-size: 18px;
}
.messageBox p {
  text-align: center;
  line-height: 40px;
}
.messageBox > div {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  border: 1px solid #ccc;
}
.messageBox > div div {
  flex: 1;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
}
.messageBox > div div:last-child {
  border: none;
}
</style>