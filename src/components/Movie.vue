<template>
  <div>
    <div
      v-if="buttonSee"
      style="position: fixed; top: 3px; right: 3px; z-index: 99999"
    >
      <a-button type="dashed" ghost @click="showDrawer">选集</a-button>
    </div>
    <a-drawer
      title="选集"
      width="150px"
      placement="right"
      ref="videoPlayer"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p v-for="(item, index) in index" :key="item">
        <a-button type="primary" ghost @click="change(index)">{{
          item
        }}</a-button>
      </p>
    </a-drawer>
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
    />

    <a-modal
      v-model="spSee"
      title="提示"
      @ok="spOk()"
      @cancel="exit()"
      ok-text="继续访问"
      cancel-text="关闭"
    >
      <div style="text-align: center"></div>
      <p>未对手机端页面进行适配，为了获取最佳的浏览效果，请用PC设备访问!</p>
      <p>
        部分手机浏览器会对播放器进行重写，覆盖页面元素，存在无法切换选集问题!
      </p>
      <p>需要切换选集需要在播放视频之前进行！</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "", // url地址
          },
        ],
        hls: true,
        poster:
          "https://pic1.zhimg.com/v2-9571eaf92da1c1593c6a33a4edf24629_r.jpg?source=1940ef5c", // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
      },
      id: null,
      video: null,
      visible: false,
      index: [],
      indexUrl: [],
      buttonSee: true,
      spSee: false,
    };
  },
  mounted() {
    if (this._isMobile()) {
      this.spSee = true;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    async getData() {
      this.id = this.$route.query.code;

      const result = await this.$http.get(
        "http://webproxy2.jxhonline.com:20270/aff/res/info/" + this.id
      );

      this.video = result.data.info[0].video;

      let arr = result.data.info[0].video;
      // 数据处理
      for (let i = 0; i < arr.length; i++) {
        let splitArr = arr[i].split("$");
        this.index.push(splitArr[0]);
        this.indexUrl.push(splitArr[1]);
      }
      let myPlayer = this.$refs.videoPlayer.player;
      myPlayer.src(this.indexUrl[0]);
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
      this.buttonSee = false;
    },
    onClose() {
      this.visible = false;
      this.buttonSee = true;
    },
    change(index) {
      // let myPlayer = this.$refs.videoPlayer.player;
      // myPlayer.src(this.indexUrl[index]);
      // console.log("切换" + this.indexUrl[index]);
      this.playerOptions["sources"][0]["src"] = this.indexUrl[index];
      this.onClose();
      this.success();
    },
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    // 暂停回调
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    success() {
      this.$message.success("切换成功!");
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

<style lang="less" scoped>
</style>