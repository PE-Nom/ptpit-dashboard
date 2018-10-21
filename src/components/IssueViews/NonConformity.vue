<template>
  <div class="nonconformity">
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
  name: 'NonConformity',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null,
    disabled: false
  },
  methods: {
    enter (itemdata) {
      console.log('Nonconformity.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('Nonconformity.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('Nonconformity.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('Nonconformity.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('Nonconformity.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('Nonconformity.attach')
      this.$emit('attach', itemdata)
    }
  }
}
</script>
