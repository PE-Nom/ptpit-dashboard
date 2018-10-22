<template>
  <div class="issues-list">
    <div class="message-field">
      {{message}}
    </div>
    <div class="header-field">
      <div class="table-row header">
        <div class="productfilter">
          <b-form-select class="product-filter-form"
            v-model="product"
            :options="productOptions"
            @change="filterByProduct">
          </b-form-select>
        </div>
        <div class="operation">
          <div class="filter" >
            <input name="query" class="flex-inner-item" v-model="searchQuery" placeholder="フィルタ文字列">
          </div>
          <div class="new-issue">
            <img :src="icon_new_issue" class="flex-inner-item" width='30px' height='30px' @click="createIssue"/>
          </div>
          <div class="refresh-list">
            <img :src="icon_refresh_list" class="flex-inner-item" width='25px' height='25px' @click="refreshList"/>
          </div>
          <div class="spacer">
          </div>
        </div>
        <div class="wrapper attributes header">
          <div v-for="(val, idx) in columns" v-bind:key=idx @click="sortBy(val)" :class="[{ active: sortKey == val }, val]">
            {{ val }}
            <span class="arrow" :class="sortOrders[val] > 0 ? 'asc' : 'dsc'"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="data-field">
      <div v-for="(entry,idx) in issueslist" v-bind:key=idx @click="editIssue(entry)">
        <div class="table-row data">
          <div class="wrapper attributes data">
            <div v-for="(val, idx) in columns" v-bind:key=idx :class="[val]">
              <span>
                {{entry[val]}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import naim from '../../models/naim.js'
import iconNew from '../../assets/new.png'
import iconRefresh from '../../assets/refresh.png'

export default {
  name: 'IssuesList',
  props: {
    reloadrequest: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    reloadrequest (newVal, oldVal) {
      console.log('detect reloadRequest at ProductsList.vue')
      this.refreshList()
    }
  },
  data () {
    let sortOrders = {}
    let columns = [
      'id',
      '製品名',
      '件名',
      '登録日',
      '期日',
      'ステータス',
      '担当者'
    ]
    columns.forEach(function (key) {
      sortOrders[key] = 1
    })

    return {
      icon_new_issue: iconNew,
      icon_refresh_list: iconRefresh,
      columns: columns,
      issues: [], // 不適合のトラッカーでフィルタ済み
      filteredIssues: [], // 製品番号でフィルタした指摘一覧
      searchQuery: '',
      sortKey: 'キー',
      sortOrders: sortOrders,
      message: '不適合管理　不適合一覧',
      product: '',
      productOptions: [{value: '', text: ''}]
    }
  },
  computed: {
    issueslist () {
      console.log('### issues computed property in IssuestList.vue ####')
      let ret = []
      this.filteredIssues.forEach(issue => {
        let assignedName = issue.assigned_to ? issue.assigned_to.name : ''
        let dueDate = issue.due_date ? issue.due_date : '未定義'
        let rec = {
          'id': issue.id,
          '製品名': issue.project.name,
          '件名': issue.subject,
          '登録日': issue.created_on,
          '期日': dueDate,
          'ステータス': issue.status.name,
          '担当者': assignedName
        }
        // let obj = JSON.parse(rec)
        let obj = Object.assign(rec, { issue: issue })
        ret.push(obj)
      })
      let filterKey = this.searchQuery && this.searchQuery.toLowerCase()
      if (filterKey) {
        // console.log('filterData by filterKey changed');
        ret = ret.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      let sortKey = this.sortKey
      let order = this.sortOrders[sortKey] || 1
      if (sortKey) {
        // console.log('filterData by sortKey changed');
        ret = ret.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return ret
    }
  },
  methods: {
    sortBy (key) {
      console.log('sortBy : key=' + key)
      console.log(this.sortOrders)
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    filterByProduct () {
      this.$nextTick(function () {
        let productName = ''
        this.productOptions.forEach(option => {
          if (option.value === this.product) {
            productName = option.text
          }
        })
        if (this.product === -1) {
          this.filteredIssues = this.issues.slice(0)
        } else {
          this.filteredIssues = this.issues.filter(issue => {
            return issue.project.name === productName
          })
        }
      })
    },
    editIssue (entry) {
      console.log('editIssue')
      let issue = {
        issue: entry.issue,
        currentProduct: this.product
      }
      this.$emit('editIssue', issue)
    },
    createIssue () {
      console.log('createIssue')
      let issue = {
        issue: {
          id: -1,
          subject: '新規登録の件名',
          project: {name: '新規登録時の製品名'},
          description: '新規登録の説明'
        },
        currentProduct: -1
      }
      this.$emit('editIssue', issue)
    },
    async refreshList () {
      console.log('refreshList')
      await naim.retrieveIssues(naim.getTrackerIdByName('不適合'))
      this.issues = naim.getIssues()
      this.filterByProduct()
    },
    setProductOptions () {
      console.log('setProductOptions')
      let availableProjects = naim.getAvailableProjects()
      console.log(availableProjects)
      this.productOptions = []
      this.productOptions.push({value: -1, text: '製品フィルタ'})
      for (let project of availableProjects) {
        let option = {
          value: project.id,
          text: project.name
        }
        this.productOptions.push(option)
      }
      this.product = this.productOptions[0].value
    }
  },
  created () {
    console.log('IssuesList created')
    this.setProductOptions()
    this.issues = naim.getIssues()
    this.filteredIssues = this.issues.slice(0)
  },
  mounted () {
    console.log('IssuesList mounted')
  },
  destroy () {
    console.log('IssuesList destroy')
  }
}
</script>

<style scoped>
  .issues-list{
    padding-left: 6px;
    padding-right: 6px;
    height: 400px;
    box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
  }
  /* path indicator */
  .message-field {
    line-height: 50px;
    text-align: left;
  }
  /* list header */
  .header-field {
    height: 150px;
  }
  .table-row {
    border-bottom: 1px solid #e0e0e0;
    border-collapse: collapse;
  }
  .table-row.header {
    height: 100%;
    width: 100%;
    padding-left: 6px;
    padding-right: 6px;
    background-color: rgb(229, 255, 219);
  }
  .productfilter {
    height: 30%;
    padding-top: 6px;
    padding-left: 6px;
    display: -webkit-flex;
    display: flex;
  }
  .product-filter-form {
    width: 20vw;
    float: left;
  }
  .operation {
    height: 35%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  .filter {
    padding-top: 6px;
    padding-left: 6px;
    flex-grow: 2;
  }
  .new-issue {
    padding-top: 6px;
    padding-left: 6px;
    flex-grow: 1;
  }
  .refresh-list {
    padding-top: 6px;
    padding-left: 6px;
    flex-grow: 1;
  }
  .spacer {
    padding-top: 6px;
    padding-left: 6px;
    flex-grow: 20;
  }
  .flex-inner-item {
    float: left;
  }
  .wrapper {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
  }
  /* growable wrappers */
  .attributes {
    flex-grow: 0;
    -webkit-flex-grow: 0;
  }
  .wrapper.attributes.header {
    height: 35%;
    margin-left: 0px;
    margin-right: 0px;
    padding-top: 1.5vh;
    font-weight: bold;
  }
  /* list data */
  .data-field {
    height: 200px;
    overflow-y: auto;
  }
  .table-row.data {
    height: 50px;
    width: 100%;
    padding-left: 6px;
    padding-right: 6px;
  }
  .wrapper.attributes.data {
    height: 100%;
    margin-left: 0px;
    margin-right: 0px;
    padding-top: 6px;
  }

  /* item in list */
  .id {
    width: 5vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .製品名 {
    width: 10vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .件名 {
    width: 30vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .登録日 {
    width: 15vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .期日 {
    width: 15vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .ステータス {
    width: 10vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .担当者 {
    width: 15vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  /*
   * General good-look styles
   */
  div.active {
    color: rgb(55, 11, 177);
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.0;
  }
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
  }
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }
  .sorter .arrow {
    opacity: 1;
  }
  div.active .arrow {
    opacity: 1;
  }
  div.active .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid rgb(55, 11, 177);
  }
  div.active .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgb(55, 11, 177);
  }
</style>
