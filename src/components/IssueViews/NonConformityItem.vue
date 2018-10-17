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
          @click='reject'>
          差戻
        </b-button>
      </div>
      <div class="nc-item-operation">
        <b-button v-if="itemdata.state===0"
          class="nc-item-button"
          variant="success"
          @click='enter'>
          確定
        </b-button>
        <b-button v-else-if="itemdata.state===1"
          class="nc-item-button"
          variant="success"
          @click='accept'>
          承認
        </b-button>
        <b-button v-else-if="itemdata.state===2"
          class="nc-item-button"
          variant="success"
          @click='cancel'>
          取消
        </b-button>
      </div>
      <div class="nc-item-state">
        <b-button
          class="nc-item-button"
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
        @change="contentChanged"></textarea>
    </div>
    <div class="nc-item-attachments-header">
      <div class="nc-item-attachment-title">
        <label for="item-attach" class="control-label">添付ファイル</label>
      </div>
      <div class="nc-item-attachment-operation">
        <b-button
          class="nc-item-button"
          id="item-attach"
          variant="success"
          @click='attach'>
          添付
        </b-button>
      </div>
    </div>
    <div class="nc-item-attachments">
      <table class="attachments-info">
        <thead class="attachments-info-header">
          <tr class="attachments-info-tr head">
            <th class="attachments-info-th" v-for="(val, idx) in attachmentsInfoColumns" v-bind:key=idx :class="[val]">
              {{val}}
            </th>
          </tr>
        </thead>
        <tbody class="attachments-info-data">
          <tr class="attachments-info-tr data" v-for="(entry,idx) in itemdata.attachments" v-bind:key=idx>
            <td class="attachments-info-td" v-for="(val, idx) in attachmentsInfoColumns" v-bind:key=idx :class="[val]">
              <span>{{entry[val]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NonConformityItem',
  props: {
    itemdata: {
      name: '',
      state: 0,
      content: '',
      attachments: [
        {
          id: '',
          url: '',
          description: ''
        }
      ]
    }
  },
  data () {
    let attachmentsInfoColumns = ['id', 'url', 'description']
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
    },
    accept () {
      console.log('NonConformitytem.accept')
    },
    reject () {
      console.log('NonConformitytem.reject')
    },
    cancel () {
      console.log('NonConformitytem.cancel')
    },
    contentChanged () {
      console.log('NonConformitytem.contentChanged')
    },
    attach () {
      console.log('NonConformitytem.attach')
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
thead, tbody {
    display: block;
}
tbody {
    overflow-y: scroll;
    height: 100px;
}
.attachments-info-th {
  height: 40px;
  border: 1px solid #666
}
.attachments-info-td {
  height: 30px;
  border: 1px solid #666
}
.id {
  width: 50px;
}
.url {
  width: 450px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}
.description {
  width: 450px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}
</style>
