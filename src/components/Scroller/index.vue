<template>
  <div class="wrapper" ref="wrapper">
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script>
// 引入better-scroll滑动库
import BScroll from "better-scroll";

export default {
  // 添加name方便调试
  name: "Scroller",

  // 父子通信
  props: {
    handleToScroll: {
      type: Function,
      default: () => {}
    },
    handleToTouchEnd: {
      type: Function,
      default: () => {}
    }
  },

  // 在mounted生命周期函数中new BScroll
  mounted() {
    let scroll = new BScroll(this.$refs.wrapper, {
      // 配置tap
      tap: true,
      probeType: 1
    });

    this.scroll = scroll;

    // 把方法回调出去
    scroll.on("scroll", (pos) => {
      this.handleToScroll(pos);
    });

    // 把方法回调出去
    scroll.on("touchEnd", (pos) => {
      this.handleToTouchEnd(pos);
    })
  },

  methods: {
    // 点击A-Z跳转的
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  }
}
</script>

<style scoped>
.wrapper {height: 100%;}
</style>