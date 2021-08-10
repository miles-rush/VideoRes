<template>
  <div>
    <a-row>
      <img class="gif" src="../../assets/pkq.gif" @click="caidan()"/>
    </a-row>
    <a-row class="inner">
      <a-form>
        <a-form-item>
          <a-input placeholder="请输入学号" v-model="loginForm.username"
            ><a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
          /></a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            placeholder="请输入邮箱"
            type="email"
            v-model="loginForm.email"
            ><a-icon
              slot="prefix"
              type="mail"
              style="color: rgba(0, 0, 0, 0.25)"
          /></a-input>
        </a-form-item>

        <a-form-item>
          <a-input-password
            placeholder="请输入信息化门户密码"
            v-model="loginForm.password"
            ><a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
          /></a-input-password>
        </a-form-item>

        <a-form-item class="btns">
          <a-button
            type="primary"
            class="btns_marign left"
            @click="login"
            :loading="loginLoading"
            >挂载</a-button
          >
          <a-button
            type="primary"
            class="btns_marign"
            @click="resetLoginForm()"
            :loading="resetLoading"
            >重置</a-button
          >
          <a-button type="primary" @click="show()">说明</a-button>
        </a-form-item>
      </a-form>
      <p style="text-align:center" @click="sm()">Make By KRG | 免责声明</p>
    </a-row>

    <a-modal
      v-model="spSee"
      title="使用说明"
      @ok="spOk()"
      @cancel="exit()"
      ok-text="确定"
      cancel-text="关闭"
    >
      <div style="text-align: center"></div>
      <p>账号为学号，密码为信息化门户的密码!</p>
      <p style="color:red">挂载前请自行填写打卡一次!!!</p>
      <p>挂载后，后台每日10.进行每日一报，结果将截图发送到设置的邮箱！</p>
      <p>
        第一次挂载时会有试运行结果发送到设置的邮箱！成功即表明加入任务，失败请检查密码后重试！
      </p>
      <p>退出挂载，输入正确的账户信息后，使用重置按钮！</p>
      <p>
        信息化门户地址(网上办事大厅):<a
          target="_blank"
          href="http://auth.zjut.edu.cn/zfca/retakeusername.do"
          >跳转</a
        >
      </p>
      <p>友链(移动端):校外人员通行码(Fake)申请:<a target="_blank" href="https://miles-rush.github.io/inner/guide.html">跳转</a></p>
      <p>友链(移动端):校内学生通行码(Fake)申请:<a target="_blank" href="http://129.211.173.86/finance_proj/html/wcc/index.html">跳转</a></p>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        email: "",
      },
      spSee: true,
      loginLoading: false,
      resetLoading: false,
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f0f2f5");

      if (!this._isMobile()) {
      
      this.$router.push({
        path: "load",
      });
    }
  },
  methods: {
    async resetLoginForm() {
      this.resetLoading = true;
      const result = await this.$http.post(
        "http://webproxy2.jxhonline.com:20270/aff/clock/out",
        this.loginForm
      );
      if (result.data === "success") {
        this.$message.success("重置成功,今后请自行打卡QAQ!");
      } else {
        this.$message.error("重置失败,请检查账户信息!");
      }
      this.resetLoading = false;
    },
    spOk() {
      this.spSee = false;
    },
    exit() {
      this.spSee = false;
    },
    show() {
      this.spSee = true;
    },
    async login() {
      this.loginLoading = true;
      const result = await this.$http.post(
        "http://webproxy2.jxhonline.com:20270/aff/clock/register",
        this.loginForm
      );
      if (result.data === "success") {
        this.$message.success("挂载成功,请到邮箱接收试运行结果!");
      } else {
        this.$message.error("挂载失败,请检查密码是否正确!");
      }
      this.loginLoading = false;
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    caidan() {
      this.$message.success('别摸我，好痒！！!');
    },
    sm() {
      this.$message.info('交流学习使用,请勿用在不当途径！');
    }
  },
};
</script>


<style lang="less" scoped>
.inner {
  margin-top: 100px;
}

.gif {
  width: 120px;
  position: absolute;
  left: 35%;
  margin-top: 10px;
  //   top: -30%;
}

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #f0f2f5;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}

.btns_marign {
  margin-right: 60px;
}

.all {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}

.left {
  margin-left: 23px;
}
</style>