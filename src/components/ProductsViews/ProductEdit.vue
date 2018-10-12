<template>
  <div class="product-edit">
    <div class="productname-field">
      製品：{{productName}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductEdit',
  props: {
    product: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    productName () {
      return this.product === null ? '****-****' : this.product.name
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.product-edit{
  margin-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  height: 400px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
  /*
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  border:rgba(63, 63, 63, 0.1) solid 1px;
  */
}
.productname-field {
  line-height: 50px;
  text-align: left;
}

</style>
