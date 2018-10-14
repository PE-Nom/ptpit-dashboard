<template>
  <div class="product-edit">
    <div class="operation-field">
      <b-button v-if="(product && product.id === -1)"
        class="control-button create"
        variant="success"
        v-bind:disabled="!duty"
        @click='createProductInfo'>
        登録
      </b-button>
      <b-button v-else
        class="control-button create"
        variant="success"
        v-bind:disabled="!product || !duty"
        @click='updateProductInfo'>
        更新
      </b-button>
    </div>
    <div class="edit-field">
      <div class="item-field">
        <div class="items">
          <!-- 製品名称 -->
          <label class="grid-item item-label product-name-label">製品名称</label>
          <input type="text"
            class="grid-item item-form product-name-form"
            placeholder="製品名称"
            v-model="productName"
            @change="productNameChanged">
          <!-- 製品番号 -->
          <label class="grid-item item-label product-number-label">製品番号</label>
          <input type="text"
            class="grid-item item-form product-number-form"
            placeholder="製品番号"
            v-model="productIdentifier"
            v-bind:disabled="!(product && product.id === -1)"
            @change="productIdentifierChanged">
          <!-- 客先 -->
          <label class="grid-item item-label product-customer-label">客先</label>
          <b-form-select class="grid-item item-form product-customer-form"
            v-model="productCustomer"
            :options="customerOptions"
            @change="productCustomerChanged">
          </b-form-select>
          <!-- 製品説明 -->
          <label for="inputDescription" class="grid-item item-label product-desc-label">説明</label>
          <textarea class="grid-item item-form product-desc-form"
            rows="3"
            id="inputDescription"
            v-model="productDescription"
            @change="productDescriptionChanged">
          </textarea>
        </div>
      </div>
      <div class="userinfo-field">
        <div class="users">
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
                  <!-- 管理者 -->
                  <input type="checkbox"
                    v-if="val==='管理者'"
                    v-model="roleManager"
                    v-bind:value="entry"
                    @change="roleManagerChanged(entry)">
                  <!-- 報告者 -->
                  <input type="checkbox"
                    v-else-if="val==='報告者'"
                    v-model="roleReporter"
                    v-bind:value="entry"
                    @change="roleReporterChanged(entry)">
                  <span v-else>
                    {{entry[val]}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    return {
      productName: '',
      productIdentifier: '',
      productDescription: '',
      customerOptions: [{value: '', text: ''}],
      productCustomer: '',
      members: null,
      users: null,
      userInfoColumns: userInfoColumns,
      // userInfo: userInfo,
      userInfo: [],
      roleManager: [],
      roleReporter: [],
      duty: false
    }
  },
  methods: {
    createQueryString () {
      console.log('createQueryString')
      let qstr = {
        project: {
          name: this.product.name,
          identifier: this.product.ientifier,
          description: this.product.description,
          is_public: false,
          custom_fields: this.product.custom_fields
        }
      }
      return qstr
    },
    // 登録
    createProductInfo () {
      console.log('createProductInfo')
    },
    // 更新
    async updateProductInfo () {
      console.log('updateProductInfo')
      try {
        let query = this.createQueryString()
        await naim.updateProject(this.product.id, query)
        this.$emit('reloadRequest')
      } catch (err) {
        console.log(err)
      }
    },
    // 編集フラグのセット
    setDuty () {
      this.duty = true
    },
    resetDuty () {
      this.duty = false
    },
    // 製品名の更新
    productNameChanged () {
      this.$nextTick(function () {
        console.log('productNameChanged : this.product.name : ' + this.product.name + ', productName : ' + this.productName)
        this.product.name = this.productName
        this.setDuty()
      })
    },
    // 製品番号の更新（登録時のみ）
    productIdentifierChanged () {
      this.$nextTick(function () {
        console.log('productIdentifierChanged : this.product.identifier : ' + this.product.identifier + ', productIdentifier : ' + this.productIdentifier)
        this.product.identifier = this.productIdentifier
        this.setDuty()
      })
    },
    // 客先の更新
    productCustomerChanged () {
      this.$nextTick(function () {
        let before
        this.product.custom_fields.forEach(field => {
          if (field.name === '顧客情報') {
            before = field.value
            field.value = this.productCustomer
            this.setDuty()
          }
        })
        console.log('productCustomerChanged : before : ' + before + ', after : ' + this.productCustomer)
      })
    },
    // 製品説明の更新
    productDescriptionChanged () {
      this.$nextTick(function () {
        console.log('productDescriptionChanged : this.product.description : ' + this.product.description + ', productDescription : ' + this.productDescription)
        this.product.description = this.productDescription
        this.setDuty()
      })
    },
    // メンバーシップ（管理者権限）の更新
    roleManagerChanged (entry) {
      console.log('roleManagerChanged')
      console.log(entry)
      console.log(this.roleManager)
      this.setDuty()
    },
    // メンバーシップ（報告者権限）の更新
    roleReporterChanged (entry) {
      console.log('roleReporterChangd')
      console.log(entry)
      console.log(this.roleReporter)
      this.setDuty()
    },
    setUserInfo () {
      // userInfo の表示オブジェクト生成
      let usersList = []
      let roleManager = []
      let roleReporter = []
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
        ' "id" : "' + user.id + '"' +
        ',"名前" : "' + user.firstname + ' ' + user.lastname + '"' +
        ' }'
        let obj = JSON.parse(userinfo)
        if (manager) {
          roleManager.push(obj)
        }
        if (reporter) {
          roleReporter.push(obj)
        }
        usersList.push(obj)
      })
      this.roleManager = roleManager
      this.roleReporter = roleReporter
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
        this.resetDuty()
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
.control-button {
  float: left;
  margin-left: 1em;
}

.edit-field {
  padding-top: 6px;
  display: grid;
  grid-template-rows: 350px;
  grid-template-columns: 50vw 50vw
}
.item-field {
  padding-top: 6px;
}
.items {
  display: grid;
  width: 30vw;
  margin-left: auto;
  margin-right: 50px;
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
.users {
  width: 450px;
  margin-left: 50px;
  margin-right: auto;
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
