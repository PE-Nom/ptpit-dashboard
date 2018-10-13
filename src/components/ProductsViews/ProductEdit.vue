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
      <div class="userinfo-field">
        <table class="user-info">
          <caption class="user-info-caption">関係者リスト</caption>
          <thead class="user-info-header">
            <tr class="user-info-tr head">
              <th class="user-info-th" v-for="(val, idx) in userInfoColumns" v-bind:key=idx :class="[val]">
                {{val}}
              </th>
            </tr>
          </thead>
          <tbody class="user-info-data">
            <tr class="user-info-tr data" v-for="(entry,idx) in userInfo" v-bind:key=idx>
              <td class="user-info-td" v-for="(val, idx) in userInfoColumns" v-bind:key=idx :class="[val]">
                {{entry[val]}}
              </td>
            </tr>
          </tbody>
        </table>
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
    let userInfoColumns = ['名前', '管理者', '報告者']
    let userInfo = [
      {'名前': '不適合管理　責任者1', '管理者': true, '報告者': true},
      {'名前': '不適合管理　責任者2', '管理者': true, '報告者': true},
      {'名前': '不適合管理　担当者1', '管理者': true, '報告者': true},
      {'名前': '不適合管理　担当者2', '管理者': true, '報告者': true}
    ]
    return {
      productName: '',
      productIdentifier: '',
      productDescription: '',
      customerOptions: [{value: '', text: ''}],
      productCustomer: '',
      members: null,
      users: null,
      userInfoColumns: userInfoColumns,
      userInfo: userInfo
    }
  },
  methods: {
    setUserInfo () {
      // userInfo の表示オブジェクト生成
      let usersList = []
      this.users.forEach(user => {
        let manager = false
        let reporter = false
        for (let member of this.members) {
          if (user.id === member.user.id) {
            member.roles.forEach(role => {
              if (role.name === '管理者') {
                manager = true
              } else if (role.name === '報告者') {
                reporter = true
              }
            })
            break
          }
        }
        let userinfo = '{' +
          ' "名前" : "' + user.firstname + ' ' + user.lastname + '"' +
          ',"管理者" : "' + manager + '"' +
          ',"報告者" : "' + reporter + '"' +
        ' }'
        let obj = JSON.parse(userinfo)
        usersList.push(obj)
      })
      this.userInfo = usersList
    },
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
        this.users = naim.getUsers()
        console.log(this.users)
        this.members = naim.getProjectMemberships(this.product.id)
        console.log(this.members)
        this.setUserInfo()
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
/*
 * ユーザー情報テーブル
 */
.userinfo-field {
  padding-top: 6px;
}
.user-info-caption {
  padding-top: 0px;
  padding-bottom: 6px;
  height: 30px;
  caption-side: top;
}
thead, tbody {
    display: block;
}
tbody {
    overflow-y: scroll;
    height: 280px;
}
.user-info-th {
  height: 40px;
  border: 1px solid #666
}
.user-info-td {
  height: 30px;
  border: 1px solid #666
}
.名前 {
  width: 300px;
}
.管理者, .報告者 {
  width: 60px;
}
</style>
