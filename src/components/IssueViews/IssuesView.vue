<template>
  <div class="issues">
    <IssuesList :reloadrequest="reloadcount" @editIssue='editIssue' @createIssue='createIssue'></IssuesList>
    <IssueEdit :issue="issue" @reloadRequest='reload'></IssueEdit>
  </div>
</template>

<script>
import IssuesList from './IssuesList.vue'
import IssueEdit from './IssueEdit.vue'

export default {
  name: 'issues',
  components: {
    IssuesList: IssuesList,
    IssueEdit: IssueEdit
  },
  data () {
    return {
      issue: null,
      reloadcount: 0
    }
  },
  methods: {
    editIssue (issue) {
      console.log('IssuesView.editIssue')
      console.log(issue)
      this.issue = Object.assign({}, issue)
    },
    createIssue () {
      console.log('IssuesView.createIssue')
      let issue = {
        id: -1,
        subject: '新規登録の件名',
        project: {name: '新規登録時の製品名'},
        description: '新規登録の説明'
      }
      this.issue = issue
    },
    reload () {
      console.log('IssueEdit.reload')
      this.reloadCount++
    }
  }
}
</script>

<style>
.issues {
  margin-left: auto;
  margin-right: auto;
  margin-top: 6px;
  width: 98%;
  height: 850px;
}
</style>
