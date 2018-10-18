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
  props: {
    itemdata: {
      name: '',
      state: 0,
      content: '',
      attachments: [
        {
          filename: '',
          filesize: '',
          description: '',
          content_type: '',
          content_url: '',
          id: ''
        }
      ]
    }
  }
  /*
  data () {
    let itemdata = {
      name: '指摘内容',
      state: 0,
      content: 'ここに指摘の詳細を記述する。',
      attachments: [
        {
          filename: '',
          filesize: '',
          description: 'テストデータ（実際の画像なし）',
          content_type: '',
          content_url: 'https://test.com/1/4/attachment_image.jpg',
          id: 1
        },
        {
          filename: '',
          filesize: '',
          description: 'XXXXX_テストデータ（実際の画像なし）',
          content_type: '',
          content_url: 'https://test.com/2/41/attachment_image.jpg',
          id: 2
        },
        {
          filename: '',
          filesize: '',
          description: '5555_テストデータ（実際の画像なし）',
          content_type: '',
          content_url: 'https://test.com/2/55/5_attachment_image.jpg',
          id: 5
        },
        {
          filename: '',
          filesize: '',
          description: '212121_テストデータ（実際の画像なし）',
          content_type: '',
          content_url: 'https://test.com/2/21/5_21_attachment_image.jpg',
          id: 21
        }
      ]
    }
    return {
      // itemdata: itemdata
    }
  }
  */
}
</script>
