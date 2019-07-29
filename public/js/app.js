const { Line, mixins: VueChartJsMixins } = VueChartJs
const { reactiveProp } = VueChartJsMixins
const LineChart = {
  extends: Line,
  props: [ 'options' ],
  mixins: [ reactiveProp ],
  mounted () {
    const { chartData: data, options } = this
    this.renderChart(data, options)
  }
}
const SignalChart = {
  template: `<line-chart :chart-data="signalChartData" :options="chartOptions"/>`,
  components: { LineChart },
  props: {
    last: {
      type: Number,
      default: 5
    }
  },
  computed: {},
  data: () => ({
    signalChartData: {
      labels: [],
      datasets: []
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  methods: {
    async fetchData () {
      const uri = `./signal?$limit=${this.last}`
      const request = fetch(uri).then((res) => res.json()).catch((err) => {
        console.error({ err })
        setTimeout(() => {
          this.fetchData()
        }, 5000)
        throw new Error('Não foi possível receber dados, vai tentar novamente em 5 segundos')
      })
      const response = await request
      const signals = response.data.docs.slice(0).reverse()
      await this.updateData(signals)
      setTimeout(() => {
        this.fetchData()
      }, 5000)
    },
    async updateData (signals) {
      const labels = signals.map((signal) => {
        const ts = moment(signal.timestamp)
        return ts.format('D/MMM HH:mm:ss')
      })
      const data = signals.map((signal) => Number(signal.value))
      const newSignalChartData = {
        labels,
        datasets: [
          {
            label: 'Sensor 1',
            backgroundColor: '#f87979',
            data
          }
        ]
      }
      this.signalChartData = newSignalChartData
    }
  },
  mounted () {
    this.fetchData()
  }
}
const app = new Vue({
  el: '#app',
  components: { SignalChart },
  template: `
    <div>
      <p>
        Hey, it's working
      </p>
      <div style="max-height: 20em;">
        <signal-chart style="max-width: 100vw; min-width: 16em; min-height: 8em; width: 100%; height: 40em;" :last="8"/>
      </div>
    </div>`
})
