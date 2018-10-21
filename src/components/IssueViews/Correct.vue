<template>
  <div class="correct">
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
  name: 'Correct',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null,
    disabled: false
  },
  methods: {
    enter (itemdata) {
      console.log('Correct.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('Correct.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('Correct.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('Correct.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('Correct.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('Correct.attach')
      this.$emit('attach', itemdata)
    }
  }
}
</script>
