<template>
  <div class="rollout">
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
  name: 'RollOut',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null,
    disabled: false
  },
  methods: {
    enter (itemdata) {
      console.log('RollOut.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('RollOut.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('RollOut.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('RollOut.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('RollOut.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('RollOut.attach')
      this.$emit('attach', itemdata)
    }
  }

}
</script>
