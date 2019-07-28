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
  template: `<line-chart :chart-data="signalData" :options="chartOptions"/>`,
  components: { LineChart },
  props: {
    last: {
      type: Number,
      default: 5
    }
  },
  computed: {
    signalData () {
      const { signals } = this
      const labels = signals.map((signal) => {
        const ts = moment(signal.timestamp)
        return ts.format('d/MMM HH:mm:ss')
      })
      const data = signals.map((signal) => Number(signal.value))
      return {
        labels,
        datasets: [
          {
            label: 'Sensor 1',
            backgroundColor: '#f87979',
            data
          }
        ]
      }
    }
  },
  data: () => ({
    signals: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  methods: {
    async update () {
      const uri = `./signal?$limit=${this.last}`
      const request = fetch(uri).then((res) => res.json()).catch((err) => {
        console.error({ err })
        throw new Error('could not get data')
      })
      const response = await request
      this.signals = response.data.docs.slice(0).reverse()
      setTimeout(() => {
        this.update()
      }, 5000)
    }
  },
  mounted () {
    this.update()
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
        <signal-chart style="max-width: 80vw; width: 80%; height: 35em;" :last="8"/>
      </div>
    </div>`
})
