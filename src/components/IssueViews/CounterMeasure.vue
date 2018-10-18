<template>
  <div class="countermeasure">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
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
  }
}
</script>
