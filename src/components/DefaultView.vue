<template>
  <div class='default-view'>
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'DefaultView',
  data () {
    return {
      message: '工事中のテンポラリ表示'
    }
  },
  methods: {

  },
  created () {
    console.log('defaultView created')
  }
}
</script>

<style>

</style>
