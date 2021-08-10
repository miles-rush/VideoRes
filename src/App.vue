<template>
  <div id="app" style="all">
    <router-view />
    <a-modal
      v-model="spSee"
      title="提示"
      @ok="spOk()"
      @cancel="exit()"
      ok-text="继续访问"
      cancel-text="关闭"
    >
      <div style="text-align: center"></div>
      <p>未对手机端页面进行优化适配，为了获取最佳的浏览效果，请用PC设备访问!</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this._isMobile()) {
      this.spSee = true;
    } else {
    }
  },
  data() {
    return {
      spSee: false,
    };
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    spOk() {
      this.spSee = false;
    },
    exit() {
      window.opener = null;
      window.open("", "_self");
      window.close();
    },
  },
};
</script>

<style scoped lang="less">
.all {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}
</style>