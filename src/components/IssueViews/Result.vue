<template>
  <div class="result">
    <NonConformityItem
      :itemdata="itemdata"
      :disabled="disabled"
      @enter="enter"
      @reject="reject"
      @accept="accept"
      @cancel="cancel"
      @attach="attach"
      @contentChanged="contentChanged">
    </NonConformityItem>
  </div>
</template>

<script>
import NonConformityItem from './NonConformityItem'
export default {
  name: 'Result',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null,
    disabled: false
  },
  methods: {
    enter (itemdata) {
      console.log('Result.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('Result.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('Result.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('Result.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('Result.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('Result.attach')
      this.$emit('attach', itemdata)
    }
  }
}
</script>
