// 引入vue
import Vue from "vue";

// 引入弹窗
import MessageBox from "./MessageBox";

// 使用闭包
export let messageBox = (function () {
  // 设置默认值
  let defaults = {
    title: "",
    content: "",
    cancel: "",
    ok: "",
    handleCancel: null,
    handleOk: null
  };

  // Vue.extend创建一个子类
  let MyComponet = Vue.extend(MessageBox);

  // 配置参数
  return (opts) => {
    for (let attr in opts) {
      defaults[attr] = opts[attr];
    }

    let vm = new MyComponet({
      el: document.createElement("div"),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok,
      },
      methods: {
        handleCancel() {
          defaults.handleCancel && defaults.handleCancel.call(this);
          document.body.removeChild(vm.$el);
        },

        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el);
        }
      }
    });

    document.body.appendChild(vm.$el);

  }
}())
