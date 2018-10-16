<template>
  <div class="issues">
    <IssuesList :reloadrequest="reloadcount" @editIssue='editIssue' @createIssue='createIssue'></IssuesList>
  </div>
</template>

<script>
import IssuesList from './IssuesList.vue'

export default {
  name: 'issues',
  components: {
    IssuesList: IssuesList
  },
  data () {
    return {
      issues: null,
      reloadcount: 0
    }
  },
  methods: {
    editIssue (issue) {
      console.log('IssuesView.editIssue')
      console.log(issue)
    },
    createIssue () {
      console.log('IssuesView.createIssue')
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
