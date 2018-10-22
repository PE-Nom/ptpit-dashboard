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
      <div class ="detail-field">
        <div class="details">
          <div class="status-display-field">
            登録 => 原因分析 => 是正処置 => 効果確認 => 水平展開 => 完了
          </div>
          <div class="content-field">
            <!-- 不適合内容 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.nonconformity variant="info">不適合内容</b-btn>
              </b-card-header>
              <b-collapse id="nonconformity" visible accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="nonconformity-field">
                    <NonConformity
                      :itemdata="itemdata[0]"
                      :disabled="stateNonconformity"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </NonConformity>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- 修正処置 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.correct variant="info">修正処置</b-btn>
              </b-card-header>
              <b-collapse id="correct" accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="correct-field">
                    <Correct
                      :itemdata="itemdata[1]"
                      :disabled="stateCorrect"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </Correct>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- 不適合原因 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.cause variant="info">不適合原因</b-btn>
              </b-card-header>
              <b-collapse id="cause" accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="cause-field">
                    <Cause
                      :itemdata="itemdata[2]"
                      :disabled="stateCause"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </Cause>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- 是正処置 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.countermeasure variant="info">是正処置</b-btn>
              </b-card-header>
              <b-collapse id="countermeasure" accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="countermeasure-field">
                    <CounterMeasure
                      :itemdata="itemdata[3]"
                      :disabled="stateCounterMeasure"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </CounterMeasure>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- 効果確認 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.result variant="info">効果確認</b-btn>
              </b-card-header>
              <b-collapse id="result" accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="result-field">
                    <Result
                      :itemdata="itemdata[4]"
                      :disabled="stateResult"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </Result>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- 水平展開 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.rollout variant="info">水平展開</b-btn>
              </b-card-header>
              <b-collapse id="rollout" accordion="nonconformity-items" role="tabpanel">
                <b-card-body>
                  <div class="rollout-field">
                    <RollOut
                      :itemdata="itemdata[5]"
                      :disabled="stateRollOut"
                      @enter="enter"
                      @reject="reject"
                      @accept="accept"
                      @cancel="cancel"
                      @attach="attach"
                      @contentChanged="contentChanged">
                    </RollOut>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import naim from '../../models/naim.js'
import util from '../../models/util.js'
import NonConformity from './NonConformity'
import Correct from './Correct.vue'
import Cause from './Cause.vue'
import CounterMeasure from './CounterMeasure.vue'
import Result from './Result.vue'
import RollOut from './RollOut.vue'

export default {
  name: 'IssueEdit',
  components: {
    NonConformity: NonConformity,
    Correct: Correct,
    Cause: Cause,
    CounterMeasure: CounterMeasure,
    Result: Result,
    RollOut: RollOut
  },
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
    let issDetailItems = [
      {name: '不適合内容', statusName: '不適合内容ステータス', conditions: {currentState: '登録', nextState: '原因分析'}},
      {name: '修正処置', statusName: '修正処置ステータス', conditions: {currentState: '登録', nextState: '原因分析'}},
      {name: '不適合原因', statusName: '不適合原因ステータス', conditions: {currentState: '原因分析', nextState: '是正処置'}},
      {name: '是正処置', statusName: '是正処置ステータス', conditions: {currentState: '是正処置', nextState: '効果確認'}},
      {name: '効果確認', statusName: '効果確認ステータス', conditions: {currentState: '効果確認', nextState: '水平展開'}},
      {name: '水平展開', statusName: '水平展開ステータス', conditions: {currentState: '水平展開', nextState: '完了'}}
    ]
    let issDetailInfoStatusValue = {
      '入力待ち': 0,
      '承認待ち': 1,
      '完了': 2
    }
    return {
      issStatus: '',
      issueDuty: false,
      issueId: '',
      issueSubject: '',
      product: '',
      productOptions: [{value: '', text: ''}],
      customer: '',
      issDetailItems: issDetailItems,
      issDetailInfoStatusValue: issDetailInfoStatusValue,
      issDetail: null,
      itemdata: [],
      attachmentFiles: []
    }
  },
  methods: {
    findItemIndex (itemdata) {
      let idx = this.itemdata.findIndex(item => {
        return item.name === itemdata.name
      })
      console.log(idx)
      return idx
    },
    // 確定
    enter (itemdata) {
      console.log('IssuEdit.enter')
      console.log(itemdata)
      let idx = this.findItemIndex(itemdata)
      // 入力待ち -> 承認待ち に遷移させる
      this.itemdata[idx].state = this.issDetailInfoStatusValue['承認待ち']
      this.setIssueDuty()
    },
    // 差戻し
    reject (itemdata) {
      console.log('IssuEdit.reject')
      console.log(itemdata)
      let idx = this.findItemIndex(itemdata)
      // 承認待ち -> 入力待ち に遷移させる
      this.itemdata[idx].state = this.issDetailInfoStatusValue['入力待ち']
      this.setIssueDuty()
    },
    // 承認
    accept (itemdata) {
      console.log('IssuEdit.accept')
      console.log(itemdata)
      let idx = this.findItemIndex(itemdata)
      // 承認待ち -> 完了 に遷移させる
      this.itemdata[idx].state = this.issDetailInfoStatusValue['完了']
      // ステータスを進める
      this.issStatus = this.issDetailItems[idx].conditions.nextState
      this.itemdata.forEach(item => {
        item.currentState = this.issStatus
      })
      this.setIssueDuty()
    },
    // 取り消し
    cancel (itemdata) {
      console.log('IssuEdit.cancel')
      console.log(itemdata)
      let idx = this.findItemIndex(itemdata)
      // 完了 -> 入力待ち に遷移させる
      this.itemdata[idx].state = this.issDetailInfoStatusValue['入力待ち']
      // ステータスを戻す
      this.issStatus = this.issDetailItems[idx].conditions.currentState
      this.itemdata.forEach(item => {
        item.currentState = this.issStatus
      })
      this.setIssueDuty()
    },
    // 記述内容の編集
    contentChanged (itemdata) {
      console.log('IssuEdit.contentChanged')
      console.log(itemdata)
      let idx = this.findItemIndex(itemdata)
      // 編集内容を反映
      this.itemdata[idx].content = itemdata.content
      this.setIssueDuty()
    },
    // 添付ファイル追加
    attach (attachment) {
      console.log('IssuEdit.attach')
      console.log(attachment)
      let idx = this.findItemIndex(attachment)
      let item = {
        filename: attachment.file.name,
        filesize: parseInt(attachment.file.size / 1000) + 'kbyte',
        description: attachment.description,
        content_type: attachment.file.type,
        content_url: '',
        id: '***',
        attachment: attachment
      }
      this.attachmentFiles.push(item)
      this.itemdata[idx].attachments.push(item)
      this.setIssueDuty()
    },
    createInfo () {
      console.log('createInfo')
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
    setIssDetail () {
      console.log('setIssDetail')
      console.log(this.issDetail)
      this.issStatus = this.issDetail.status.name
      if (this.issDetail) {
        // 添付ファイルリスト
        let issueAttachments = []
        this.issDetail.attachments.forEach(el => {
          let item = {
            filename: el.filename,
            filesize: parseInt(el.filesize / 1000) + 'kbyte',
            description: el.description,
            content_type: el.content_type,
            content_url: el.content_url,
            id: el.id,
            attachment: null
          }
          issueAttachments.push(item)
        })
        // Detail オブジェクトの生成
        this.itemdata = []
        this.attachmentFiles = []
        this.issDetailItems.forEach(item => {
          let customFieldForName = util.getCustomFieldByName(this.issDetail.custom_fields, item.name)
          let customFieldForStatus = util.getCustomFieldByName(this.issDetail.custom_fields, item.statusName)
          // 添付ファイルを検索し、ファイル名に項目名を含む添付ファイルを抽出する。
          let itemAttachments = issueAttachments.filter(attachment => {
            return attachment.filename.indexOf(item.name) !== -1
          })
          let itemdata = {
            id: this.issDetail.id,
            name: customFieldForName.name,
            state: this.issDetailInfoStatusValue[customFieldForStatus.value],
            content: customFieldForName.value,
            attachments: itemAttachments,
            conditions: item.conditions,
            currentState: this.issStatus
          }
          console.log(itemdata)
          this.itemdata.push(itemdata)
        })
      }
    },
    async setData () {
      console.log('IssueEdit.setData')
      if (this.issue) {
        console.log(this.issue)
        let customer = ''
        if (this.issue.issue.id !== -1) {
          let prj = naim.getProject(this.issue.issue.project.id)
          // console.log(prj)
          customer = util.getProjectCustomFieldValue(prj, '顧客情報')
          this.issDetail = await naim.getIssueDetail(this.issue.issue.id)
          this.setIssDetail()
          console.log(this.issDetail)
        } else {
          customer = '未定'
          this.issDetail = null
          this.initializeProps()
        }
        this.issueId = this.issue.issue.id
        this.issueSubject = this.issue.issue.subject
        this.customer = customer
        this.setProductOptions()
        this.resetIssueDuty()
      }
    },
    initializeProps () {
      this.itemdata = []
      for (let i = 0; i < this.issDetailItems.length; i++) {
        let itemdata = {
          id: '***',
          name: this.issDetailItems[i].name,
          state: 0,
          content: '詳細を記述する欄',
          attachments: [
            {
              filename: '',
              filesize: '',
              description: '',
              content_type: '',
              content_url: '',
              id: '',
              attachment: null
            }
          ],
          conditions: {
            previousState: '',
            currentState: '',
            nextState: ''
          },
          currentState: 'none'
        }
        this.itemdata.push(Object.assign({}, itemdata))
      }
    }
  },
  created () {
    console.log('IssueEdit created')
    this.initializeProps()
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
  height: 570px;
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
  grid-template-rows: 200px 150px;
  grid-template-columns: 35vw 65vw;
  grid-template-areas:
    "item detail"
    "item detail";
}
.item-field {
  grid-area: item;
  padding-top: 6px;
}
.items {
 display: grid;
  width: 30vw;
  margin-right: auto;
  margin-left: 10px;
  grid-template-rows: 50px 50px 50px 50px;
  grid-template-columns: 10vw 20vw;
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
/*
 * 個別の入力事項
 */
.detail-field {
  grid-area: detail;
  padding-top: 6px;
}
.details {
  display: grid;
  padding-top: 6px;
  grid-template-rows: 50px 420px;
  grid-template-columns: 30vw 30vw;
  grid-template-areas:
   "status-display-area status-display-area"
    "detail-edit-area detail-edit-area";
}
.status-display-field {
  line-height: 50px;
  grid-area: status-display-area;
  text-align: left;
  padding-left: 6px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
}
.content-field {
  grid-area: detail-edit-area;
  text-align: left;
  padding-top: 6px;
  padding-left: 6px;
  overflow: auto;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);
}
</style>
