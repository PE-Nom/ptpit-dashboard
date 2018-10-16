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
      {{issueId}}<br>
      {{issueSubject}}<br>
      {{issueProduct}}<br>
      {{issueDescription}}<br>
    </div>
  </div>
</template>

<script>
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
      issueProduct: '',
      issueDescription: ''
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
    setIssueDuty () {
      this.issueDuty = true
    },
    resetIssueDuty () {
      this.issueDuty = false
    },
    setData () {
      console.log('IssueEdit.setData')
      if (this.issue) {
        this.issueId = this.issue.id
        this.issueSubject = this.issue.subject
        this.issueProduct = this.issue.project.name
        this.issueDescription = this.issue.description
      }
    }
  },
  created () {
    console.log('IssueEdit created')
  },
  mounted () {
    console.log('IssueEdit mounted')
    this.setData()
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
