<template>
  <div class="statistics">
    <div class="chart pie">
      <h3>円グラフを描画する</h3>
      <PieChart :data="pieChartData" :options="options"></PieChart>
    </div>
    <div class="chart bar">
      <h3>棒グラフを描画する</h3>
      <BarChart :data="pieChartData" :options="options"></BarChart>
    </div>
  </div>
</template>

<script>
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
    return {
      pieChartData: pieChartData,
      options: options
    }
  }
}
</script>

<style>
.statistics {
  margin-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  height: 980px;
  box-shadow: 2px 2px 10px rgba(63, 63, 63, 0.2);

  display: grid;
  grid-template-rows: 400px 580px;
  grid-template-columns: 50vw 50vw;
  grid-template-areas:
    "barchart-area piechart-area"
    "barchart-area piechart-area";
}
.chart {
  width: 80%;
  height: 80%;
  margin: auto
}
.pie {
  grid-area: piechart-area;
}
.bar {
  grid-area: barchart-area;
}
</style>
