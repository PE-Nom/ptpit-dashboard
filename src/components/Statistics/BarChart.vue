<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  extends: Bar,
  props: ['data', 'options'],
  watch: {
    data (val) {
      this.renderChart(this.data, this.options)
    },
    options (val) {
      this.renderChart(this.data, this.options)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
