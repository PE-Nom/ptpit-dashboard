<template>
  <div class="issues">
    <IssuesList :reloadrequest="reloadcount" @editIssue='editIssue'></IssuesList>
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
