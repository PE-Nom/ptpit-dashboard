<template>
  <div class="result">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
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
    itemdata: null
  }
}
</script>
