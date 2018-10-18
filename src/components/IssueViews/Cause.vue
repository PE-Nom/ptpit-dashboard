<template>
  <div class="cause">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
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
    itemdata: null
  }
}
</script>
