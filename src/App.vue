<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="success">
      <!--
      <div :is="currentMenu" :right="side === 'right' ? true: false" title=> -->
      <slide :right='false'>
        <a  @click='menuselected("issues")'>
          <i class="fa fa-fw fa-star-o"></i>
          <span>指摘一覧</span>
        </a>
        <a @click='menuselected("issues")'>
          <i class="fa fa-fw fa-bell-o"></i>
          <span>製品情報</span>
        </a>
        <a @click='menuselected("issues")'>
          <i class="fa fa-fw fa-envelope-o"></i>
          <span>顧客情報</span>
        </a>
        <a @click='menuselected("issues")'>
          <i class="fa fa-fw fa-comment-o"></i>
          <span>ユーザー管理</span>
        </a>
        <a @click='menuselected("issues")'>
          <i class="fa fa-fw fa-bar-chart-o"></i>
          <span>統計分析</span>
        </a>
      </slide>
      <b-navbar-brand class="title" to="/">ピットさん (version:{{version}})</b-navbar-brand>
      <!--
      <div class="title">Pit-SAN (version:)</div>
      -->
      <div class="login" v-if='user === null' @click='login'>ログイン</div>
      <div class="logout" v-else @click='logout'>ログアウト</div>
      </b-navbar>
    </div>
    <LoginDialog v-if="showLoginDialog" @cancelClose="cancelClose" @loginClose="loginClose">
      <h3 slot="header">ログイン</h3>
    </LoginDialog>
    <LogoutDialog v-if="showLogoutDialog" @cancelClose="cancelClose" @logoutClose="logoutClose">
      <h3 slot="header">ログアウト</h3>
    </LogoutDialog>
    <router-view/>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu' // import the CSS transitions you wish to use, in this case we are using `Slide`
import LoginDialog from '@/components/LoginDialog.vue'
import LogoutDialog from '@/components/LogoutDialog.vue'
import config from './config.js'

export default {
  name: 'App',
  components: {
    Slide,
    LoginDialog,
    LogoutDialog
  },
  data () {
    return {
      version: config.Versions,
      showLoginDialog: false,
      showLogoutDialog: false,
      user: null
    }
  },
  methods: {
    login () {
      this.showLoginDialog = true
    },
    logout () {
      this.showLogoutDialog = true
    },
    loginClose (user) {
      console.log('## login@App.vue')
      console.log(user)
      this.user = user
      this.showLoginDialog = false
      this.$router.push('/')
    },
    logoutClose () {
      console.log('## logout@App.vue')
      this.showLogoutDialog = false
      this.user = null
      this.$router.push('/')
    },
    cancelClose () {
      console.log('## cancelCloe@App.vue')
      this.showLoginDialog = false
      this.showLogoutDialog = false
    },
    menuselected (menu) {
      console.log('menuselected : ' + menu)
      this.$router.push(menu)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.bm-burger-button {
  position: relative;
  width: 36px;
  height: 30px;
  left: 0px;
  top: 0px;
  cursor: pointer;
  float: left;
}
.bm-burger-bars {
  background-color: #fff;
}
.bm-menu {
  left: 0px;
  right: auto;
}
.title {
  color: #fff;
  margin-left: 1em;
  margin-right: auto;
}
.login {
  color: #fff;
  margin-left: 1em;
  margin-right: 1em;
}
.logout {
  color: #fff;
  margin-left: 1em;
  margin-right: 1em;
}
</style>
