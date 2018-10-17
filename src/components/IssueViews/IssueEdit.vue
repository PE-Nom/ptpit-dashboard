<template>
  <div class="issue-edit">
    <div class="operation-field">
      <b-button v-if="(issue && issue.id === -1)"
        class="control-button create"
        variant="success"
        v-bind:disabled="(!issueDuty)"
        @click='createInfo'>
        登録
      </b-button>
      <b-button v-else
        class="control-button update"
        variant="success"
        v-bind:disabled="!issue || !issueDuty"
        @click='updateInfo'>
        更新
      </b-button>
    </div>
    <div edit-field>
        <div class="items">
          <!-- 指摘番号 -->
          <label class="grid-item item-label product-name-label">指摘番号</label>
          <input type="text"
            class="grid-item item-form product-name-form"
            v-model="issueId"
            disabled >
          <!-- 指摘件名 -->
          <label class="grid-item item-label product-number-label">指摘件名</label>
          <input type="text"
            class="grid-item item-form product-number-form"
            placeholder="指摘件名"
            v-model="issueSubject"
            @change="issueSubjectChanged">
          <!-- 製品名 -->
          <label class="grid-item item-label product-customer-label">客先</label>
          <input type="text"
            v-model="issueProduct"
            disabled >
          <!-- 顧客情報 -->
          <label for="inputDescription" class="grid-item item-label product-desc-label">顧客情報</label>
          <input type="text"
            v-model="customer"
            disabled>
        </div>
    </div>
  </div>
</template>

<script>
import naim from '../../models/naim.js'
import util from '../../models/util.js'

export default {
  name: 'IssueEdit',
  props: {
    issue: {
      type: Object,
      required: true,
      default: null
    }
  },
  watch: {
    async issue (newVal, oldVal) {
      console.log('detect issue selecting at IssueEdit.vue')
      await this.setData()
    }
  },
  data () {
    return {
      issueDuty: false,
      issueId: '',
      issueSubject: '',
      issueProduct: '',
      customer: ''
    }
  },
  methods: {
    createInfo () {
      console.log('createInfo')
      this.$emit('reloadRequest')
    },
    updateInfo () {
      console.log('updateInfo')
    },
    issueSubjectChanged () {
      console.log('issueSubjectChanged')
      this.setIssueDuty()
    },
    setIssueDuty () {
      this.issueDuty = true
    },
    resetIssueDuty () {
      this.issueDuty = false
    },
    async setData () {
      console.log('IssueEdit.setData')
      if (this.issue) {
        let res = await naim.retrieveProject(this.issue.project.id)
        console.log(res)
        let customer = util.getProjectCustomFieldValue(res.data.project, '顧客情報')
        this.issueId = this.issue.id
        this.issueSubject = this.issue.subject
        this.issueProduct = this.issue.project.name
        this.customer = customer
      }
    }
  },
  created () {
    console.log('IssueEdit created')
  },
  async mounted () {
    console.log('IssueEdit mounted')
    await this.setData()
  }
}
</script>

<style scoped>
.issue-edit{
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
</style>
