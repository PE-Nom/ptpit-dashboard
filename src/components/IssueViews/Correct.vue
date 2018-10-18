<template>
  <div class="correct">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
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
    itemdata: null
  }
}
</script>
