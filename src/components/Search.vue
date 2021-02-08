<template>
  <div class="bg" :style="{ background: 'f0f2f5' }">
    <a-layout>
      <a-layout-content class="top">
        <a-row>
          <a-steps class="step" :current="2">
            <a-step title="输入关键词" />
            <a-step title="搜索资源" />
            <a-step title="观看视频" />
          </a-steps>
        </a-row>
        <a-row type="flex" justify="space-around" :gutter="16">
          <!-- <a-col :span="6"></a-col> -->
          <a-col id="left" :offset="6" :span="12">
            <div >
              <a-input id="text" class="i" v-model="key" placeholder="请输入视频名称" />
              <a-button type="primary" @click="search()" :loading="loading"
                >搜索</a-button
              >
            </div>

            <a-table
              :columns="columns"
              :data-source="data"
              :rowKey="(record) => record.id"
              class="t"
              :pagination="myPagination"
            >
              <a slot="id" slot-scope="text">{{ text }}</a>
              <span slot="customTitle"><a-icon type="smile-o" /> ID</span>
              <span slot="from" slot-scope="from">
                <a-tag
                  :color="
                    from === '源1'
                      ? 'volcano'
                      : from === '源2'
                      ? 'geekblue'
                      : 'green'
                  "
                >
                  {{ from }}
                </a-tag>
              </span>
              <span slot="action" slot-scope="record">
                <a-button
                  type="primary"
                  shape="circle"
                  @click="goto(record.id)"
                >
                  <a-icon type="youtube" />
                </a-button>
                <a-divider type="vertical" />
              </span>
            </a-table>
          </a-col>

          <a-col id="right" :span="6"></a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <a-row>
          <a-col :span="6"></a-col>
          <a-col :span="12">
            所有资源均来自互联网<br />
            永远自由-不必定义<br />
            <a @click="showModel()">免责声明</a> ©2021 Created by
            <strong @dblclick="suprise()">KRG</strong>
          </a-col>
          <a-col :span="6"></a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>

    <a-modal
      v-model="modal"
      title="注意事项"
      @ok="handleOk()"
      ok-text="确认"
      cancel-text="关闭"
    >
      <div style="text-align: center"></div>
      <p>本站所有视频均来自外部引用，本站不存储不制作任何视频！</p>
      <p>如有侵权问题，请与源站联系，谢谢合作！</p>
      <p>使用中出现任何问题，请致邮:zhuoshumian@qq.com</p>
    </a-modal>

    <a-modal
      v-model="spSee"
      title="ヾ(≧▽≦*)o"
      @ok="spOk()"
      ok-text="确认"
      cancel-text="关闭"
    >
      <div style="text-align: center"></div>
      <p>摆脱得了儿女私情 摆脱不了de小心机!</p>
      <p>世界上美好的东西并不多 立秋傍晚从河对岸吹来的风 -aff</p>
      <p>₍₍ ◝(　ﾟ∀ ﾟ )◟⁾⁾不送</p>
    </a-modal>

    <div>
      <a-back-top />
      <strong style="color: rgba(64, 64, 64, 0.6)">.</strong>
      .
    </div>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "id",
    key: "id",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "id" },
  },
  {
    title: "类别",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "源",
    key: "from",
    dataIndex: "from",
    scopedSlots: { customRender: "from" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

// const data = [
//   {
//     key: "1",
//     id: "61345",
//     type: "动漫",
//     title: "New York No. 1 Lake Park",
//     from: "源1",
//   },
//   {
//     key: "2",
//     id: "56788",
//     type: "动漫",
//     title: "London No. 1 Lake Park",
//     from: "源2",
//   },
//   {
//     key: "3",
//     id: "21312",
//     type: "动漫",
//     title: "Sidney No. 1 Lake Park",
//     from: "源3",
//   },
// ];
export default {
  data() {
    return {
      key: "哆啦A梦",
      columns,
      data: null,
      loading: false,
      modal: false,
      myPagination: {
        defaultPageSize: 14,
      },
      spSee: false,
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f0f2f5");

    if (this._isMobile()) {
      this.fit();
      this.$router.push({
        path: "phone",
      });
    }
  },
  created() {
    this.search();
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    async search() {
      if (this.key === "") {
        this.$message.warning("搜索关键词不能为空!");
        return;
      }
      this.loading = true;
      let that = this;
      const result = await this.$http.get(
        "http://47.119.124.85:20263/aff/res/list/" + that.key
      );
      console.log(result);
      this.data = result.data.info;
      this.loading = false;
    },
    goto(id) {
      this.$router.push({
        path: "play",
        query: {
          name: "id",
          code: id,
        },
      });
    },
    showModel() {
      this.modal = true;
    },
    handleOk() {
      this.modal = false;
    },
    spOk() {
      this.spSee = false;
    },
    suprise() {
      this.spSee = true;
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    fit() {
      //document.getElementById('left').style.visibility = 'hidden'
      document.getElementById('right').style.visibility = 'hidden'
      document.getElementById('text').style.marginLeft = '0px'
      document.getElementById('text').style.width = '105px'
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  margin-top: 1px;
}

.i {
  width: 250px;
  margin: 10px;
  margin-left: 120px;
}

.bg {
  background: "#f0f2f5";
  background-size: 100% 100%;
}

.s {
  left: 50%;
  margin-top: 15px;
}

.step {
  margin-top: 20px;
  margin-left: 2px;
}

.t {
  margin-top: 8px;
  z-index: 99999;
}
</style>