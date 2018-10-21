<template>
  <div class="nonconformity-item-view">
    <div class="nc-item-header">
      <div class="nc-item-content">
        <label for="item-content" class="control-label">{{itemdata.name}}</label>
      </div>
      <div class="nc-item-operation-reject">
        <b-button v-if="itemdata.state===1"
          class="nc-item-button"
          variant="success"
          :disabled="disabled"
          @click='reject'>
          差戻
        </b-button>
      </div>
      <div class="nc-item-operation">
        <b-button v-if="itemdata.state===0"
          class="nc-item-button"
          variant="success"
          :disabled="disabled"
          @click='enter'>
          確定
        </b-button>
        <b-button v-else-if="itemdata.state===1"
          class="nc-item-button"
          variant="success"
          :disabled="disabled"
          @click='accept'>
          承認
        </b-button>
        <b-button v-else-if="itemdata.state===2"
          class="nc-item-button"
          variant="success"
          :disabled="disabled"
          @click='cancel'>
          取消
        </b-button>
      </div>
      <div class="nc-item-state">
        <b-button
          class="nc-item-button"
          :disabled="disabled"
          variant='info'>
          {{stateName}}
        </b-button>
      </div>
    </div>
    <div class="nc-item-content">
      <textarea
        class="form-control"
        rows="3"
        id="item-content"
        v-model="itemdata.content"
        :disabled="disabled"
        @change="contentChanged"></textarea>
    </div>
    <div class="nc-item-attachments-header">
      <div class="nc-item-attachment-title">
        <label for="item-attach" class="control-label">添付ファイル</label>
      </div>
      <div class="nc-item-attachment-operation">
        <b-button
          class="nc-item-button attachment"
          id="item-attach"
          variant="success"
          :disabled="disabled"
          @click='attach'>
          添付
        </b-button>
      </div>
    </div>
    <div class="nc-item-attachments">
      <div class="header-field">
        <div class="table-row header">
          <div class="wrapper attributes header">
            <div v-for="(val, idx) in attachmentsInfoColumns" v-bind:key=idx :class="[val]">
              {{ val }}
            </div>
          </div>
        </div>
      </div>
      <div class="data-field">
        <div v-for="(entry,idx) in itemdata.attachments" v-bind:key=idx>
          <div class="table-row data">
            <div class="wrapper attributes data">
              <div v-for="(val, idx) in attachmentsInfoColumns" v-bind:key=idx :class="[val]">
                <span>
                  {{entry[val]}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NonConformityItem',
  props: {
    itemdata: {
      name: {
        type: String,
        default: ''
      },
      state: {
        type: Number,
        default: 0
      },
      content: {
        type: String,
        default: ''
      },
      attachments: [
        {
          filename: {
            type: String,
            default: ''
          },
          filesize: {
            type: String,
            default: ''
          },
          description: {
            type: String,
            default: ''
          },
          content_type: {
            type: String,
            default: ''
          },
          content_url: {
            type: String,
            default: ''
          },
          id: {
            type: Number,
            default: 0
          }
        }
      ]
    },
    disabled: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data () {
    let attachmentsInfoColumns = ['id', 'filename', 'description']
    return {
      attachmentsInfoColumns: attachmentsInfoColumns
    }
  },
  computed: {
    stateName () {
      if (this.itemdata.state === 0) {
        return '入力待ち'
      } else if (this.itemdata.state === 1) {
        return '承認待ち'
      } else if (this.itemdata.state === 2) {
        return '完了'
      }
    }
  },
  methods: {
    enter () {
      console.log('NonConformitytem.enter')
      this.$emit('enter', this.itemdata)
    },
    accept () {
      console.log('NonConformitytem.accept')
      this.$emit('accept', this.itemdata)
    },
    reject () {
      console.log('NonConformitytem.reject')
      this.$emit('reject', this.itemdata)
    },
    cancel () {
      console.log('NonConformitytem.cancel')
      this.$emit('cancel', this.itemdata)
    },
    contentChanged () {
      console.log('NonConformitytem.contentChanged')
      this.$emit('contentChanged', this.itemdata)
    },
    attach () {
      console.log('NonConformitytem.attach')
      this.$emit('attach', this.itemdata)
    }
  },
  created () {
    console.log('NonConformitytem.created')
  },
  mounted () {
    console.log('NonConformitytem.mounted')
  }
}
</script>

<style scoped>
.nc-item-header {
  padding-top: 6px;
  padding-bottom: 6px;
  width: 100%;
  display: grid;
  grid-template-rows: 20px 20px;
  grid-template-columns: 40% 20% 20% 20%;
  grid-template-areas:
    "content reject operation state"
    "content reject operation state";
}
.nc-item-content {
  grid-area: content;
}
.nc-item-operation-reject {
  grid-area: reject;
}
.nc-item-operation {
  grid-area: operation;
}
.nc-item-state {
  grid-area: state;
}
.nc-item-attachments-header {
  padding-top: 6px;
  padding-bottom: 6px;
  width: 100%;
  display: grid;
  grid-template-rows: 20px 20px;
  grid-template-columns: 80% 20%;
  grid-template-areas:
    "attachment-title attachment-operation"
    "attachment-title attachment-operation";
}
.nc-item-attachment-title {
  grid-area: attachment-title;
}
.nc-item-attachment-operation {
  grid-area: attachment-operation;
}
.nc-item-button {
  width: 90%;
  margin-left: auto;
  margin-right: 2px;
}
/*
 * 添付ファイルリスト
 */
.nc-item-button.attachment {
  color:rgb(255, 255, 255);
  background-color: rgb(0, 89, 255);
}
/* list header */
.table-row {
  border-bottom: 1px solid #e0e0e0;
  border-collapse: collapse;
}
.table-row.header {
  height: 100%;
  width: 100%;
  padding-left: 6px;
  padding-right: 6px;
  color:rgb(255, 255, 255);
  background-color: rgb(0, 89, 255);
}
.wrapper {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
}
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
  height: 90px;
  overflow-y: auto;
}
.table-row.data {
  height: 30px;
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

.id {
  width: 5vw;
}
.filename {
  width: 30vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.description {
  width: 30vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
