import redmine from './redmine.js'
import util from './util.js'
import fileUploader from './fileUploader.js'

export default {

  projects: [],
  memberships: [],
  availablePrjs: [],
  customFields: [],
  issues: [],
  issueDetail: null,
  issueStatuses: null,
  issuePriorities: null,
  trackers: null,
  users: null,
  activities: null,
  documentCategories: null,
  online: true,
  userId: null,

  async initialize (user) {
    console.log('initialize @ naim')
    redmine.configure(user)
    let resp
    try {
      resp = await fileUploader.pingToServer()
      console.log('naim.initialize @ return from fileUploader.pingtoServer')
      console.log(resp)
      // alert(resp.data.dateandtime)
      //
      await this.retrieveUsers(user.username)
      await this.retrieveTrackers()
      await this.retrieveCustomFields()
      await this.retrieveIssueStatuses()
      await this.retrieveIssuePriorities()
      //
      await this.retrieveProjects()
      await this.retrieveMembershipOfProjects()
      await this.retrieveIssues()
      //
      await this.retrieveTimeEntryActivities()
      await this.retrieveDocumentCategories()
    } catch (err) {
      alert(err)
    }
  },
  finalize () {
    this.clearProjects()
    this.clearIssues()
    this.clearCustomFileds()
    redmine.configure()
  },

  // ------------------
  // Users
  // ------------------
  async retrieveUsers (userName) {
    try {
      await redmine.users(res => {
        console.log('==== Users @ naim ====')
        // this.users = util.convertUsersObjs(res.data.users)
        this.users = res.data.users
        console.log(this.users)
        this.userId = this.getUserId(userName)
        console.log('getUserId : ' + userName + ' id : ' + this.userId)
      })
    } catch (err) {
      console.log('==== Users @ naim ====')
      console.log(err)
    }
  },
  getUsers () {
    // return util.convertUsersObjs(this.users)
    return this.users
  },
  getUserId (userName) {
    let id = null
    this.users.forEach(user => {
      if (user.login === userName) {
        console.log(user)
        id = user.id
      }
    })
    return id
  },
  // ------------------
  // Trackers
  // ------------------
  async retrieveTrackers () {
    try {
      await redmine.getTrackers(res => {
        console.log('==== trackers @ naim ====')
        this.trackers = res.data.trackers
        console.log(this.trackers)
      })
    } catch (err) {
      console.log('==== trackers @ naim ====')
      console.log(err)
    }
  },
  getTrackers () {
    return util.convertOptionObjs(this.trackers, 'name')
  },
  // ------------------
  // CustomField data
  // ------------------
  async retrieveCustomFields () {
    try {
      const customfileds = []
      if (redmine.isConfigured()) {
        await redmine.customFields({}, res => {
          console.log('==== CustomFields @ naim ====')
          res.data.custom_fields.forEach(element => {
            customfileds.push(element)
            // console.log(element)
          })
        })
      }
      // ここで customfields List を更新する。
      this.customFields = customfileds
      console.log(this.customFields)
    } catch (err) {
      throw err
    }
  },
  findCustomFieldId (fieldName) {
    let fieldId
    this.customFields.forEach(element => {
      if (element.name === fieldName) {
        fieldId = element.id
      }
    })
    return fieldId
  },
  getCustomeFileds (fieldName) {
    let customField = null
    this.customFields.forEach(element => {
      if (element.name === fieldName) {
        customField = util.convertOptions(element.possible_values)
      }
    })
    return customField
  },
  clearCustomFileds () {
    this.cunstomFields = []
  },

  // ------------------
  // Issue Status
  // ------------------
  async retrieveIssueStatuses () {
    try {
      await redmine.getIssueStatuses(res => {
        console.log('==== Issue Statuses @ naim ====')
        this.issueStatuses = res.data.issue_statuses
        console.log(this.issueStatuses)
      })
    } catch (err) {
      console.log('==== Issue Statuses @ naim ====')
      console.log(err)
    }
  },
  getIssueStatuses: function () {
    return util.convertOptionObjs(this.issueStatuses, 'name')
  },

  // ------------------
  // Issue Priority
  // ------------------
  retrieveIssuePriorities: async function () {
    try {
      await redmine.getIssuePriorities(res => {
        console.log('==== Issue Priorities @ naim ====')
        this.issuePriorities = res.data.issue_priorities
        console.log(this.issuePriorities)
      })
    } catch (err) {
      console.log('==== IssuePriorities @ naim ====')
      console.log(err)
    }
  },
  getIssuePriorities: function () {
    return util.convertOptionObjs(this.issuePriorities, 'name')
  },

  // ------------------
  // Projects data
  // ------------------
  async retrieveProjects () {
    try {
      // Project List
      const prjs = []
      this.projects = []
      if (redmine.isConfigured()) {
        await redmine.projects({}, res => {
          console.log('==== Retrieve Projects @ naim ====')
          res.data.projects.forEach(element => {
            prjs.push(element)
            // console.log(element)
          })
        })
      }
      // ここで Project List を更新する。
      this.projects = prjs
      console.log(this.projects)
    } catch (err) {
      alert(err)
      throw err
    }
  },
  getProjects () {
    console.log('getProjects')
    return this.projects
    // return util.convertOptionObjs(this.projects, 'name')
  },
  async retrieveMembershipOfProjects () {
    try {
      this.memberships = []
      let prjs = []
      for (let prj of this.projects) {
        await redmine.membershipOfProject(prj.id, res => {
          console.log('==== Membership of project @ naim ====')
          for (let membership of res.data.memberships) {
            this.memberships.push(membership)
            if (membership.user.id === this.userId && prj.parent !== undefined) {
              // console.log('find userId')
              let availablePrj = Object.assign({}, prj)
              Object.assign(availablePrj, {roles: membership.roles})
              prjs.push(availablePrj)
              // this.availablePrjs.push(availablePrj)
            }
          }
        })
      }
      console.log(this.memberships)
      this.availablePrjs = prjs
      // console.log(this.availablePrjs)
    } catch (err) {
      console.log('==== Membership of project @ naim ====')
      console.log(err)
    }
  },
  getAvailableProjects () {
    return this.availablePrjs
  },
  getProjectMemberships (id) {
    console.log('getProjectMemberships id : ' + id)
    let members = []
    this.memberships.forEach(membership => {
      // console.log(membership)
      if (membership.project.id === id) {
        members.push(membership)
      }
    })
    return members
  },

  createProject: async function (qstr) {
    try {
      await redmine.createProject(qstr, res => {
        // console.log('==== Create Project @ naim ====')
        // console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  updateProject: async function (prjId, qstr) {
    try {
      await redmine.updateProject(prjId, qstr, res => {
        // console.log('==== Update Project @ naim ====')
        // console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  deleteProject: async function (prjId) {
    try {
      await redmine.deleteProject(prjId, res => {
        // console.log('==== Delete Project @ naim ====')
        // console.log(res)
      })
    } catch (err) {
      throw err
    }
  },
  clearProjects () {
    this.projects = []
    this.availablePrjs = []
  },

  // ------------------
  // Ticket Custom Filed
  // ------------------

  // ------------------
  // Issue data
  // ------------------
  retrieveIssues: async function () {
    try {
      console.log('### retrieveIssues ###')
      // Issues List
      this.issues = []
      console.log(' call redmine.issues')
      if (redmine.isConfigured()) {
        await redmine.issues(res => {
          console.log('==== Issues @ naim ====')
          res.data.issues.forEach(el => {
            console.log(el)
            let assignedName = el.assigned_to ? el.assigned_to.name : ''
            let dueRatio = el.done_ratio ? el.done_ratio : '0'
            let dueDate = el.due_date ? el.due_date : '未定義'
            let rec = '{' +
              ' "' + util.columns[0] + '" : "#' + el.id + '"' +
              ',"' + util.columns[1] + '" : "' + el.tracker.name + '"' +
              ',"' + util.columns[2] + '" : "' + el.project.name + '"' +
              ',"' + util.columns[3] + '" : "' + el.subject + '"' +
              ',"' + util.columns[4] + '" : "' + el.priority.name + '"' +
              ',"' + util.columns[5] + '" : "' + el.status.name + '"' +
              ',"' + util.columns[6] + '" : "' + dueRatio + ' %"' +
              ',"' + util.columns[7] + '" : "' + el.author.name + '"' +
              ',"' + util.columns[8] + '" : "' + assignedName + '"' +
              ',"' + util.columns[9] + '" : "' + el.start_date + '"' +
              ',"' + util.columns[10] + '" : "' + dueDate + '"' +
              ',"' + util.columns[11] + '" : "' + el.updated_on + '"' +
            '}'
            let obj = JSON.parse(rec)
            this.issues.push(obj)
          })
        })
      }
      console.log(this.issues)
    } catch (err) {
      console.log('err @ retrieveIssues')
      console.log(err)
      alert(err)
      throw err
    }
  },
  getIssues: function () {
    return this.issues
  },

  // redmineに問い合わせ
  retrieveIssueDetail: async function (issId) {
    try {
      await redmine.getIssue(issId, res => {
        // console.log('==== Issue Detail @ naim ====')
        // console.log(res)
        let storageKey = 'issue-' + issId
        console.log('storageKey = ' + storageKey)
        this.issueDetail = res.data.issue
        localStorage.removeItem(storageKey)
        localStorage.setItem(storageKey, JSON.stringify(this.issueDetail))
        console.log(this.issueDetail)
        // return issueDetail
      })
    } catch (err) {
      console.log('==== Issue Detail @ naim ====')
      console.log(err)
    }
  },
  // localStorageを検索
  searchIssueDetail: function (issId) {
    let storageKey = 'issue-' + issId
    if (storageKey in localStorage) {
      this.issueDetail = JSON.parse(localStorage.getItem(storageKey))
    } else {
      this.issueDetail = null
    }
  },
  getIssueDetail: async function (issId) {
    await this.retrieveIssueDetail(issId)
    return this.issueDetail
  },

  createIssue: async function (qobj) {
    try {
      let ret = await redmine.createIssue(JSON.stringify(qobj), res => {
        console.log('==== Create Issue @ naim ====')
        console.log(res)
      })
      return ret
    } catch (err) {
      throw err
    }
  },
  updateIssue: async function (issId, qobj) {
    try {
      // console.log('updateIssue @ naim : ' + issId)
      // console.log(qstr)
      await redmine.updateIssue(issId, JSON.stringify(qobj), res => {
        console.log('==== Update Issue @ naim ====')
        console.log(res)
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  clearIssues: function () {
    this.issues = []
  },

  uploadFile: async function (file, mediaData, imageDescription) {
    console.log('uploadFile @ naim')
    let ret = null
    try {
      console.log(file)
      ret = await redmine.attachingFiles(file, res => {
        // console.log('==== uploadFiles @ naim ====')
        // console.log(res)
      })
      return ret
    } catch (err) {
      throw err
    }
  },

  // ------------------
  // Enumeration
  // ------------------
  retrieveTimeEntryActivities: async function () {
    try {
      await redmine.getTimeEntryActivities(res => {
        console.log('==== TimeEntryActivities @ naim ====')
        this.activities = util.convertOptionObjs(res.data.time_entry_activities, 'name')
        localStorage.removeItem('activities')
        localStorage.setItem('activities', JSON.stringify(this.activities))
        console.log(this.activities)
      })
    } catch (err) {
      console.log('==== TimeEntryActivities @ naim ====')
      console.log(err)
    }
  },
  getTimeEntryActivities: function () {
    return this.activities
  },
  retrieveDocumentCategories: async function () {
    try {
      await redmine.getDocumentCategories(res => {
        console.log('==== DocumentCategories @ naim ====')
        this.documentCategories = util.convertOptionObjs(res.data.document_categories, 'name')
        localStorage.removeItem('documentCategories')
        localStorage.setItem('documentCategories', JSON.stringify(this.documentCategories))
        console.log(this.documentCategories)
      })
    } catch (err) {
      console.log('==== DocumentCategories @ naim ====')
      console.log(err)
    }
  },
  getDocumentCategories: function () {
    return this.documentCategories
  }
}
