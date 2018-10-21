<template>
  <div class="cause">
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
  name: 'Cause',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null,
    disabled: false
  },
  methods: {
    enter (itemdata) {
      console.log('Cause.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('Cause.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('Cause.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('Cause.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('Cause.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('Cause.attach')
      this.$emit('attach', itemdata)
    }
  }
}
</script>
