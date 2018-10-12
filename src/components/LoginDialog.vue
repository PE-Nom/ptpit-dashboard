<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">

            <div class="form-group">
            <input id="username" v-model="user.username" type="text" placeholder="Username">
            </div>

            <div class="form-group">
            <input id="password" v-model="user.password" type="password" placeholder="Password">
            </div>
            <p v-if=errorMessage class="message-field">{{errorMessage}}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click='login'>ログイン</button>
            <button class="modal-default-button" @click='cancel'>キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoginDialog',
  data: function () {
    return {
      user: {
        username: null,
        password: null
      },
      errorMessage: ''
    }
  },
  methods: {
    login: async function () {
      console.log('close @ loginDialog')
      console.log(this.user)
      this.$emit('loginClose', this.user)
    },
    cancel: function () {
      console.log('close @ loginDialog')
      this.$emit('cancelClose')
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
@import '../style/modal.css'
</style>
