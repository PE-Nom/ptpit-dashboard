<template>
  <div class="nonconformity">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
  </div>
</template>

<script>
import NonConformityItem from './NonConformityItem'
export default {
  name: 'NonConformity',
  components: {
    NonConformityItem: NonConformityItem
  },
  data () {
    let itemdata = {
      name: '指摘内容',
      state: 0,
      content: 'ここに指摘の詳細を記述する。',
      attachments: [
        {
          id: 1,
          url: 'https://test.com/1/4/attachment_image.jpg',
          description: 'テストデータ（実際の画像なし）'
        }
      ]
    }
    return {
      itemdata: itemdata
    }
  }
}
</script>
