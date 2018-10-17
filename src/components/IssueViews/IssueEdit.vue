<template>
  <div class="issue-edit">
    <div class="operation-field">
      <b-button v-if="(issue && issue.issue.id === -1)"
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
    <div class="edit-field">
      <div class="item-field">
        <div class="items">
          <!-- 指摘番号 -->
          <label class="grid-item item-label issue-id-label">指摘番号</label>
          <input type="text"
            class="grid-item item-form issue-id-form"
            v-model="issueId"
            disabled >
          <!-- 製品名 -->
          <label class="grid-item item-label issue-name-label">製品名</label>
            <b-form-select
              class="grid-item item-form issue-name-form"
              v-model="product"
              :options="productOptions"
              :disabled="issue && issue.issue.id !== -1"
              @change="productChanged">
            </b-form-select>
          <!-- 指摘件名 -->
          <label class="grid-item item-label issue-subject-label">指摘件名</label>
          <input type="text"
            class="grid-item item-form issue-subject-form"
            placeholder="指摘件名"
            v-model="issueSubject"
            @change="issueSubjectChanged">
          <!-- 顧客情報 -->
          <label for="inputDescription" class="grid-item item-label issue-customer-label">顧客情報</label>
          <input type="text"
            class="grid-item item-form issue-customer-form"
            v-model="customer"
            disabled>
        </div>
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
    issue (newVal, oldVal) {
      console.log('detect issue selecting at IssueEdit.vue')
      this.setData()
    }
  },
  data () {
    return {
      issueDuty: false,
      issueId: '',
      issueSubject: '',
      product: '',
      productOptions: [{value: '', text: ''}],
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
    productChanged () {
      this.$nextTick(function () {
        this.productOptions.forEach(option => {
          if (option.value === this.product) {
            console.log('selected product is ' + option.value)
          }
        })
        if (this.product !== -1) {
          let prj = naim.getProject(this.product)
          // console.log(res)
          let customer = util.getProjectCustomFieldValue(prj, '顧客情報')
          this.customer = customer
        } else {
          this.customer = '未定'
        }
        this.setIssueDuty()
      })
    },
    setIssueDuty () {
      this.issueDuty = true
    },
    resetIssueDuty () {
      this.issueDuty = false
    },
    setProductOptions () {
      console.log('setProductOptions')
      let availableProjects = naim.getAvailableProjects()
      console.log(availableProjects)
      this.productOptions = []
      this.productOptions.push({value: -1, text: '製品番号'})
      for (let project of availableProjects) {
        let option = {
          value: project.id,
          text: project.name
        }
        this.productOptions.push(option)
      }
      if (this.issue && this.issue.issue.id !== -1) {
        this.product = this.issue.issue.project.id
      } else {
        this.product = this.productOptions[0].value
      }
    },
    setData () {
      console.log('IssueEdit.setData')
      if (this.issue) {
        console.log(this.issue)
        let customer = '未定'
        if (this.issue.issue.id !== -1) {
          let prj = naim.getProject(this.issue.issue.project.id)
          console.log(prj)
          customer = util.getProjectCustomFieldValue(prj, '顧客情報')
        }
        this.issueId = this.issue.issue.id
        this.issueSubject = this.issue.issue.subject
        this.customer = customer
        this.setProductOptions()
        this.resetIssueDuty()
      }
    }
  },
  created () {
    console.log('IssueEdit created')
    this.setData()
  },
  mounted () {
    console.log('IssueEdit mounted')
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
  grid-template-columns: 30vw 70vw
}
.item-field {
  padding-top: 6px;
}
.items {
 display: grid;
  width: 30vw;
  margin-right: auto;
  margin-right: 10px;
  grid-template-rows: 50px 50px 50px;
  grid-template-columns: 8vw 22vw;
  grid-template-areas:
    "item-id-label item-id-content"
    "item-name-label item-name-content"
    "item-subject-label item-subject-content"
    "item-customer-label item-customer-content";
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
.issue-id-label {
  grid-area: item-id-label;
}
.issue-id-form {
  grid-area: item-id-content;
}
.issue-subject-label {
  grid-area: item-subject-label;
}
.issue-subject-form {
  grid-area: item-subject-content;
}
.issue-name-label {
  grid-area: item-name-label;
}
.issue-name-form {
  grid-area: item-name-content;
}
.issue-customer-label {
  grid-area: item-customer-label;
}
.issue-customer-form {
  grid-area: item-customer-content;
}
</style>
