<template>
  <div class="result">
    <NonConformityItem :itemdata="itemdata"></NonConformityItem>
  </div>
</template>

<script>
import NonConformityItem from './NonConformityItem'
export default {
  name: 'Result',
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
      name: '効果確認',
      state: 0,
      content: 'ここに是正処置の効果確認結果を記述する。',
      attachments: [
        {
          id: 1,
          url: 'https://test.com/1/4/attachment_image.jpg',
          description: 'テストデータ（実際の画像なし）'
        },
        {
          id: 2,
          url: 'https://test.com/2/41/attachment_image.jpg',
          description: 'XXXXX_テストデータ（実際の画像なし）'
        },
        {
          id: 5,
          url: 'https://test.com/2/55/5_attachment_image.jpg',
          description: '5555_テストデータ（実際の画像なし）'
        },
        {
          id: 21,
          url: 'https://test.com/2/21/5_21_attachment_image.jpg',
          description: '212121_テストデータ（実際の画像なし）'
        }
      ]
    }
    return {
      itemdata: itemdata
    }
  }
  */
}
</script>
