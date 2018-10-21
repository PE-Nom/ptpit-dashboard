<template>
  <div class="countermeasure">
    <NonConformityItem
      :itemdata="itemdata"
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
  name: 'CounterMeasure',
  components: {
    NonConformityItem: NonConformityItem
  },
  props: {
    itemdata: null
  },
  methods: {
    enter (itemdata) {
      console.log('CounterMeasure.enter')
      this.$emit('enter', itemdata)
    },
    reject (itemdata) {
      console.log('CounterMeasure.reject')
      this.$emit('reject', itemdata)
    },
    accept (itemdata) {
      console.log('CounterMeasure.accept')
      this.$emit('accept', itemdata)
    },
    cancel (itemdata) {
      console.log('CounterMeasure.cancel')
      this.$emit('cancel', itemdata)
    },
    contentChanged (itemdata) {
      console.log('CounterMeasure.contentChanged')
      this.$emit('contentChanged', itemdata)
    },
    attach (itemdata) {
      console.log('CounterMeasure.attach')
      this.$emit('attach', itemdata)
    }
  }
}
</script>
