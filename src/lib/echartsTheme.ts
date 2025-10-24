import * as echarts from 'echarts'

// A minimal dark theme tuned for our charts (transparent background to let cards show through)
const darkTheme = {
  color: ['#6AFF67', '#FFD966', '#FF6C6C', '#58a6ff', '#c778dd', '#8b949e'],
  backgroundColor: 'transparent',
  textStyle: { color: '#e6edf3' },
  axisPointer: { lineStyle: { color: '#8b949e' }, crossStyle: { color: '#8b949e' } },
  legend: { textStyle: { color: '#e6edf3' } },
  categoryAxis: {
    axisLine: { lineStyle: { color: '#6e7681' } },
    axisTick: { lineStyle: { color: '#6e7681' } },
    axisLabel: { color: '#e6edf3' },
    splitLine: { lineStyle: { color: 'rgba(110,118,129,0.2)' } },
  },
  valueAxis: {
    axisLine: { lineStyle: { color: '#6e7681' } },
    axisTick: { lineStyle: { color: '#6e7681' } },
    axisLabel: { color: '#e6edf3' },
    splitLine: { lineStyle: { color: 'rgba(110,118,129,0.2)' } },
  },
  tooltip: {
    backgroundColor: 'rgba(36,41,47,0.92)',
    borderColor: '#30363d',
    textStyle: { color: '#e6edf3' },
  },
}

try {
  echarts.registerTheme('dark', darkTheme as any)
}
catch {}
