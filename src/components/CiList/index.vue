<template>
  <div class="cinema_body">
    <ul>
      <li v-for="item in cinemasList" :key="item.id">
        <div>
          <span>{{item.nm}}</span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div v-for="(num, key) in item.tag" v-if="num === 1 " :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
        </div>
        <div class="discount-label-text">
          <img class="discount-label-card" src="@/assets/card.png" alt="">
          {{item.promotion.cardPromotionTag}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // 设置name方便调试
  name: "CiList",
  data() {
    return {
      // 影院列表数据
      cinemasList: []
    }
  },

  // mounted生命周期获取数据,在渲染完之后获取
  mounted() {
    this.axios.get("/api/cinemaList?cityId=10").then((res) => {
      // 把请求的结果信息msg存储到变量中
      let msg = res.data.msg;
      
      // 判断这个请求是否成功
      if (msg === "ok") {
        // 请求成功则赋值给data中的影院列表数据
      this.cinemasList = res.data.data.cinemas;
      }
    })
  },
  // 定义过滤器 过滤折扣卡之类的
  filters: {
    // 格式化折扣卡标签,把每个标签的属性名传进来
    formatCard(key) {
      let card = [
        // 先设置每个标签对应的值
        {key : "allowRefund", value: "退"},
        {key : "endorse", value: "改签"},
        {key : "snack", value: "小吃"},
        {key : "sell", value: "折扣卡"}
        
      ]
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
    // 定义过滤器,更改颜色
    classCard(key) {
      let card = [
        // 先设置每个标签对应的值
        {key : "allowRefund", value: "bl"},
        {key : "endorse", value: "bl"},
        {key : "snack", value: "or"},
        {key : "sell", value: "or"}
        
      ]
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    }
  }
};
</script>

// scoped 局部样式 不会引起冲突
<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
  margin-bottom: 0;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.discount-label-text {
  font-size: 11px;
  color: #999;
}
.discount-label-card {
  display: inline-block;
  width: 15px;
  height: 14px;
  position: relative;
  top: 2px;
}
</style>