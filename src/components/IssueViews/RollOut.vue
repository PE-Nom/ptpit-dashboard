<template>
  <div class="rollout">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
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
    itemdata: null
  }
}
</script>
