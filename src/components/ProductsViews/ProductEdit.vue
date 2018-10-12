<template>
  <div class="product-edit">
    <div class="operation-field">
      更新ボタンを配置する。
    </div>
    <div class="edit-field">
      <div class="item-field">
          <label for="inputName" class="grid-item item-label product-name-label">製品名称</label>
          <input type="text" class="grid-item item-form product-name-form" id="inputName" placeholder="製品名称" v-model="productName">
          <label for="inputIdentifier" class="grid-item item-label product-number-label">製品番号</label>
          <input type="text" class="grid-item item-form product-number-form" id="inputIdentifier" placeholder="製品番号" v-model="productIdentifier">
          <label for="inputProjcetCutomer" class="grid-item item-label product-customer-label">客先</label>
          <b-form-select class="grid-item item-form product-customer-form" v-model="productCustomer" :options="customerOptions">
          </b-form-select>
          <label for="inputDescription" class="grid-item item-label product-desc-label">説明</label>
          <textarea class="grid-item item-form product-desc-form" rows="3" id="inputDescription" v-model="productDescription"></textarea>
      </div>
      <div class="user-field">
      </div>
    </div>
  </div>
</template>

<script>
import naim from '../../models/naim.js'

export default {
  name: 'ProductEdit',
  props: {
    product: {
      type: Object,
      required: true,
      default: null
    }
  },
  watch: {
    product (newVal, oldVal) {
      console.log('detect product selecting at ProductEdit.vue')
      this.setData()
    }
    // productName () {
    //   return this.product === null ? '****-****' : this.product.name
    // }
  },
  data () {
    return {
      productName: '',
      productIdentifier: '',
      productDescription: '',
      customerOptions: [{value: '', text: ''}],
      productCustomer: ''
    }
  },
  methods: {
    setData () {
      console.log('setData')
      console.log(this.product)
      if (this.product) {
        this.productName = this.product.name
        this.product.custom_fields.forEach(field => {
          if (field.name === '顧客情報') {
            this.productCustomer = field.value
          }
        })
        this.productDescription = this.product.description
        this.productIdentifier = this.product.identifier
      }
    }
  },
  created () {
    console.log('ProductEdit created')
    this.customerOptions = naim.getCustomeFileds('顧客情報')
  },
  mounted () {
    console.log('ProductEdit mounted')
    this.setData()
  }
}
</script>

<style scoped>
.product-edit{
  margin-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  height: 440px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
  /*
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  border:rgba(63, 63, 63, 0.1) solid 1px;
  */
}
.operation-field {
  padding-top: 6px;
  height: 50px;
}
.edit-field {
  padding-top: 6px;
  display: grid;
  grid-template-rows: 350px;
  grid-template-columns: 50vw 50vw
}
.item-field {
  padding-top: 6px;
  display: grid;
  grid-template-rows: 50px 50px 50px 150px;
  grid-template-columns: 10vw 20vw;
  grid-template-areas:
    "item-name-label item-name-content"
    "item-number-label item-number-content"
    "item-customer-label item-customer-content"
    "item-desc-label item-desc-content";
}
.grid-item {
  height: 80%;
  margin: 6px;
  padding: 6px;
}
.item-label {
  text-align: right;
}
.item-form {
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
}
.product-name-label {
  grid-area: item-name-label;
}
.product-name-form {
  grid-area: item-name-content;
}
.product-number-label {
  grid-area: item-number-label;
}
.product-number-form {
  grid-area: item-number-content;
}
.product-customer-label {
  grid-area: item-customer-label;
}
.product-customer-form {
  grid-area: item-customer-content;
  width: 19vw;
}
.product-desc-label {
  grid-area: item-desc-label;
}
.product-desc-form {
  grid-area: item-desc-content;
}
</style>
