<template>
  <div class="product-edit">
    <div class="operation-field">
      <b-button v-if="(product && product.id === -1)"
        class="control-button create"
        variant="success"
        v-bind:disabled="(!productDuty && !membershipDuty)"
        @click='createInfo'>
        登録
      </b-button>
      <b-button v-else
        class="control-button create"
        variant="success"
        v-bind:disabled="!product || (!productDuty && !membershipDuty)"
        @click='updateInfo'>
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
            :value="productIdentifier"
            v-bind:disabled="!(product && product.id === -1)"
            @input="productIdentifier = $event.target.value.toLowerCase().replace(' ','-')"
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
                    v-if="val===managerRoleName"
                    v-model="roleManager"
                    v-bind:value="entry"
                    @change="roleManagerChanged(entry)">
                  <!-- 報告者 -->
                  <input type="checkbox"
                    v-else-if="val===reporterRoleName"
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

const managerRoleName = '管理者'
const reporterRoleName = '報告者'
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
  },
  data () {
    let userInfoColumns = ['名前', managerRoleName, reporterRoleName]
    return {
      managerRoleName: managerRoleName,
      reporterRoleName: reporterRoleName,
      productName: '',
      productIdentifier: '',
      productDescription: '',
      customerOptions: [{value: '', text: ''}],
      productCustomer: '',
      members: null,
      originalMemberships: [],
      editedMemberships: [],
      users: null,
      userInfoColumns: userInfoColumns,
      userInfo: [],
      roleManager: [],
      roleReporter: [],
      productDuty: false,
      membershipDuty: false
    }
  },
  methods: {
    // 登録
    async createInfo () {
      console.log('createInfo')
      if (this.productDuty) {
        await this.createProductInfo()
        await this.createMembership()
      }
      this.$emit('reloadRequest')
    },
    async createProductInfo () {
      console.log('createProductInfo')
      let parent = naim.getParentProject()
      try {
        let query = {
          project: {
            name: this.product.name,
            identifier: this.product.identifier,
            description: this.product.description,
            is_public: false,
            tracker_ids: [naim.getTrackerId('不適合')],
            parent_id: parent.id,
            issue_custom_field_ids: [
              naim.getCustomFieldId('不適合内容'),
              naim.getCustomFieldId('修正処置'),
              naim.getCustomFieldId('不適合原因'),
              naim.getCustomFieldId('是正処置'),
              naim.getCustomFieldId('効果確認'),
              naim.getCustomFieldId('水平展開'),
              naim.getCustomFieldId('修正完了')
            ],
            project_custom_fields: this.product.custom_fields
          }
        }
        // console.log(this.product.custom_fields)
        let res = await naim.createProject(query)
        // custome_fields の顧客情報をセットするため、リードバックしてupdateする
        res = await naim.retrieveProject(res.data.project.id)
        res.data.project.custom_fields.forEach(field => {
          if (field.name === this.product.custom_fields[0].name) {
            field.value = this.product.custom_fields[0].value
          }
        })
        query = {
          project: {
            name: res.data.project.name,
            identifier: res.data.project.identifier,
            description: res.data.project.description,
            custom_fields: res.data.project.custom_fields
          }
        }
        await naim.updateProject(res.data.project.id, query)
        this.product.id = res.data.project.id
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    async createMembership () {
      console.log('createMenbership')
      await this.updateMembership()
    },
    // 更新
    async updateInfo () {
      if (this.productDuty) {
        await this.updateProductInfo()
      }
      if (this.membershipDuty) {
        await this.updateMembership()
      }
      this.$emit('reloadRequest')
    },
    async updateProductInfo () {
      console.log('updateProductInfo')
      try {
        let query = {
          project: {
            name: this.product.name,
            identifier: this.product.identifier,
            description: this.product.description,
            is_public: false,
            custom_fields: this.product.custom_fields
          }
        }
        await naim.updateProject(this.product.id, query)
      } catch (err) {
        console.log(err)
      }
    },
    async updateMembership () {
      console.log('updateMembership')
      // (1) 編集後のmembership 情報生成
      // roleManager をスキャンして
      // user 情報がある場合、menbershipオブジェクト({user_id,roles[roleId]}) を構築して
      // editedMemberships に push する
      this.editedMemberships = []
      this.roleManager.forEach(user => {
        let membership = {
          user_id: user.id, // user の id
          role_ids: [naim.getRoleId(managerRoleName)] // role の id の配列
        }
        this.editedMemberships.push(membership)
      })
      // console.log(this.editedMemberships)
      // console.log('======')
      // roleReporter をスキャンして
      // user情報がある場合、 editedMemberships をスキャンする
      // editedMemberships に同一のユーザー情報がすでにある場合、当該の membership の role_ids に roleReporterのidをpush する
      // editedMemberships に同一のユーザー情報が存在しない場合、membershipオブジェクト({user_id,roles[roleId]})を構築して editedMemberships に push する
      // console.log(this.roleReporter)
      this.roleReporter.forEach(user => {
        let alreadyExist = false
        this.editedMemberships.forEach(membership => {
          if (membership.user_id === user.id) {
            membership.role_ids.push(naim.getRoleId(reporterRoleName))
            alreadyExist = true
          }
        })
        if (!alreadyExist) {
          let membership = {
            user_id: user.id, // user の id
            role_ids: [naim.getRoleId(reporterRoleName)] // role の id の配列
          }
          this.editedMemberships.push(membership)
        }
      })
      // console.log(this.editedMemberships)
      // console.log('======')

      // (2) オリジナルとの差分をとる
      // edited に あって original にない --> post
      // edited に あって original にもある --> put
      // edited に なく orijinal にある --> delete
      // console.log('=== originalMembership :')
      // console.log(this.originalMemberships)
      // console.log('=== editedMembership :')
      // console.log(this.editedMemberships)
      let postMembership = []
      let putMembership = []
      let deleteMembership = []
      // search post, put membership
      this.editedMemberships.forEach(edited => {
        let alreadyExist = false
        for (let origin of this.originalMemberships) {
          // console.log('origin.user_id : ' + origin.user_id + ', edited.user_id : ' + edited.user_id)
          if (edited.user_id === origin.user_id) {
            // role の数が異なる
            if (edited.role_ids.length !== origin.role_ids.length) {
              edited = Object.assign(edited, {id: origin.id})
              putMembership.push(edited)
              // console.log('putMembership')
            } else {
              // role の値が異なる
              for (let i in edited.role_ids) {
                let roles = origin.role_ids.filter(roleId => {
                  return roleId === edited.role_ids[i]
                })
                if (roles.length === 0) {
                  edited = Object.assign(edited, {id: origin.id})
                  putMembership.push(edited)
                  // console.log('putMembership')
                  break
                }
              }
            }
            alreadyExist = true
            break
          }
        }
        if (!alreadyExist) {
          // console.log('postMembership')
          postMembership.push(edited)
        }
      })
      // search delete membership
      this.originalMemberships.forEach(origin => {
        let alreadyExist = false
        this.editedMemberships.forEach(edited => {
          if (origin.user_id === edited.user_id) {
            alreadyExist = true
          }
        })
        if (!alreadyExist) {
          // console.log('deleteMembership')
          deleteMembership.push(origin)
        }
      })
      // console.log('### postMembersip')
      // console.log(postMembership)
      // console.log('### putMembership')
      // console.log(putMembership)
      // console.log('### deleteMembership')
      // console.log(deleteMembership)
      if (postMembership.length !== 0) {
        for (let membership of postMembership) {
          try {
            await naim.createMembership(this.product.id, {membership: membership})
          } catch (err) {
            console.log(err)
          }
        }
      }
      if (putMembership.length !== 0) {
        for (let membership of putMembership) {
          try {
            console.log(membership)
            await naim.deleteMembership(membership.id)
            await naim.createMembership(this.product.id, {membership: membership})
          } catch (err) {
            console.log(err)
          }
        }
      }
      if (deleteMembership.length !== 0) {
        for (let membership of deleteMembership) {
          try {
            await naim.deleteMembership(membership.id)
          } catch (err) {
            console.log(err)
          }
        }
      }
    },
    // 編集フラグのセット
    setProductDuty () {
      this.productDuty = true
    },
    resetProductDuty () {
      this.productDuty = false
    },
    setMembershipDuty () {
      this.membershipDuty = true
    },
    resetMembershipDuty () {
      this.membershipDuty = false
    },
    // 製品名の更新
    productNameChanged () {
      this.$nextTick(function () {
        console.log('productNameChanged : this.product.name : ' + this.product.name + ', productName : ' + this.productName)
        this.product.name = this.productName
        this.setProductDuty()
      })
    },
    // 製品番号の更新（登録時のみ）
    productIdentifierChanged () {
      this.$nextTick(function () {
        console.log('productIdentifierChanged : this.product.identifier : ' + this.product.identifier + ', productIdentifier : ' + this.productIdentifier)
        this.product.identifier = this.productIdentifier
        this.setProductDuty()
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
            this.setProductDuty()
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
        this.setProductDuty()
      })
    },
    // メンバーシップ（管理者権限）の更新
    roleManagerChanged (entry) {
      console.log('roleManagerChanged')
      this.setMembershipDuty()
    },
    // メンバーシップ（報告者権限）の更新
    roleReporterChanged (entry) {
      console.log('roleReporterChangd')
      this.setMembershipDuty()
    },
    setUserInfo () {
      // userInfo の表示オブジェクト生成
      console.log('setUserInfo')

      // 編集前のメンバーシップ情報を保持
      this.members = naim.getProjectMemberships(this.product.id)
      console.log(this.members)
      this.originalMemberships = []
      for (let member of this.members) {
        let roles = []
        member.roles.forEach(role => {
          roles.push(role.id)
        })
        let membership = {
          id: member.id, // membership の id
          user_id: member.user.id, // user の id
          role_ids: roles // role の id の配列
        }
        this.originalMemberships.push(membership)
      }
      console.log(this.originalMemberships)

      // ユーザー情報を構築
      this.users = naim.getUsers()
      console.log(this.users)
      let usersList = []
      let roleManager = []
      let roleReporter = []
      this.users.forEach(user => {
        let manager = false
        let reporter = false
        if (this.product.id === -1 && user.id === naim.getUserId()) {
          manager = true
          reporter = true
        } else {
          for (let membership of this.originalMemberships) {
            if (user.id === membership.user_id) {
              membership.role_ids.forEach(role => {
                let name = naim.getRoleName(role)
                if (name === managerRoleName) {
                  manager = true
                } else if (name === reporterRoleName) {
                  reporter = true
                }
              })
              break
            }
          }
        }
        let obj = {
          id: user.id,
          '名前': user.firstname + ' ' + user.lastname
        }
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
      this.resetMembershipDuty()
    },
    setProductInfo () {
      this.productName = this.product.name
      this.product.custom_fields.forEach(field => {
        if (field.name === '顧客情報') {
          this.productCustomer = field.value
        }
      })
      this.productDescription = this.product.description
      this.productIdentifier = this.product.identifier
      this.resetProductDuty()
    },
    setData () {
      if (this.product) {
        this.setProductInfo()
        this.setUserInfo()
      }
    }
  },
  created () {
    console.log('ProductEdit created')
    this.customerOptions = naim.getCustomeFileds('顧客情報')
    console.log(this.customerOptions)
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
