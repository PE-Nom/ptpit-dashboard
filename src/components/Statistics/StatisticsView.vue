<template>
  <div class="statistics">
    <div class="page-title">
      <h3>不適合 統計分析</h3>
    </div>
    <div class="chart pie">
      <PieChart :data="pieChartData" :options="pieChartOptions" :style="styleForPieChart"></PieChart>
    </div>
    <div class="chart bar">
      <BarChart :data="barChartData" :options="barChartOptions" :styles="styleForBarChart"></BarChart>
    </div>
  </div>
</template>

<script>
import naim from '../../models/naim.js'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'

export default {
  name: 'Statistics',
  components: {
    PieChart,
    BarChart
  },
  data () {
    // グラフ描画用データ
    let pieChartData = {
      // ラベル
      labels: ['天領', '薩摩', '長州', '土佐'],
      // データ詳細
      datasets: [{
        label: '藩と人口',
        data: [13740000, 9072000, 7150000, 6148000],
        backgroundColor: [
          'rgba(255, 100, 130, 0.2)',
          'rgba(100, 130, 255, 0.2)',
          'rgba(130, 255, 100, 0.2)',
          'rgba(230, 210, 85, 0.2)'
        ]
      }]
    }
    // グラフオプション
    let options = {
      title: {
        display: true,
        text: '藩と人口'
      }
    }
    // Style
    let styleForBarChart = {
      'position': 'absolute',
      'width': '80%',
      'height': '80%',
      'top': 0,
      'bottom': 0,
      'left': 0,
      'right': 0,
      'margin': 'auto',
      'padding': '6px'
    }
    let styleForPieChart = {
      'position': 'absolute',
      'width': '80%',
      'height': '80%',
      // 'top': 'auto',
      // 'bottom': 'auto',
      'top': 0,
      'bottom': 0,
      'left': 0,
      'right': 0,
      'margin': 'auto',
      'padding': '6px'
    }
    // Back Ground Colors
    let bgColors = [
      'rgba(255, 100, 130, 0.2)',
      'rgba(100, 130, 255, 0.2)',
      'rgba(130, 255, 100, 0.2)',
      'rgba(230, 210, 85, 0.2)',
      'rgba(210,  85, 210, 0.2)',
      'rgba( 85, 210, 230, 0.2)'
    ]
    return {
      pieChartData: pieChartData,
      pieChartOptions: options,
      barChartData: pieChartData,
      barChartOptions: options,
      styleForBarChart: styleForBarChart,
      styleForPieChart: styleForPieChart,
      bgColors: bgColors
    }
  },
  methods: {
    setBarChartData () {
      console.log('StatisticsView.setBarChartData')
      let availableProjects = naim.getAvailableProjects()
      console.log(availableProjects)
      let title = '製品別ー不適合件数'
      // 製品番号の取得
      let labels = []
      for (let product of availableProjects) {
        labels.push(product.name)
      }
      console.log(labels)
      // 製品番号別の不適合件数の取得
      let data = []
      let backgroundColor = []
      let issues = naim.getIssues()
      for (let i in labels) {
        let productIssues = issues.filter(issue => {
          return issue.project.name === labels[i]
        })
        data.push(productIssues.length)
        backgroundColor.push(this.bgColors[i % this.bgColors.length])
      }
      console.log(data)
      console.log(backgroundColor)
      let chartData = {
        labels: labels,
        datasets: [{
          label: '指摘件数',
          data: data,
          backgroundColor: backgroundColor
        }]
      }
      let chartOptions = {
        title: {
          display: true,
          position: 'bottom',
          fontSize: 18,
          fontStyle: 'bold',
          text: title
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10
            }
          }]
        }
      }
      this.barChartData = chartData
      this.barChartOptions = chartOptions
    },
    setPieChartData () {
      console.log('StatisticsView.setPieCharData')
      let title = '不適合ステータス割合'
      // 製品番号の取得
      let labels = []
      let statusStrings = [
        '登録',
        '原因分析',
        '是正処置',
        '効果確認',
        '水平展開',
        '完了'
      ]
      let issues = naim.getIssues()
      console.log(issues)
      let data = []
      let backgroundColor = []
      for (let i in statusStrings) {
        let statusIssues = issues.filter(issue => {
          return issue.status.name === statusStrings[i]
        })
        data.push(statusIssues.length)
        backgroundColor.push(this.bgColors[i % this.bgColors.length])
        labels.push(statusStrings[i])
      }
      console.log(data)
      console.log(backgroundColor)
      let chartData = {
        labels: labels,
        datasets: [{
          label: '指摘件数',
          data: data,
          backgroundColor: backgroundColor
        }]
      }
      let chartOptions = {
        title: {
          display: true,
          position: 'bottom',
          fontSize: 18,
          fontStyle: 'bold',
          text: title
        }
      }
      this.pieChartData = chartData
      this.pieChartOptions = chartOptions
    }
  },
  created () {
    console.log('StatisticsView created')
    this.setBarChartData()
    this.setPieChartData()
  }
}
</script>

<style>
.statistics {
  margin-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  height: 850px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);

  display: grid;
  grid-template-rows: 40px 380px 380px;
  grid-template-columns: 50vw 50vw;
  grid-template-areas:
    "title-area title-area"
    "barchart-area piechart-area"
    "barchart-area piechart-area";
}
.chart {
  position: relative;
  width: 90%;
  height: 90%;
  margin: auto;
}
.page-title {
  grid-area: title-area;
  line-height: 40px;
  text-align: left;
}
.pie {
  grid-area: piechart-area;
}
.bar {
  grid-area: barchart-area;
}
</style>
