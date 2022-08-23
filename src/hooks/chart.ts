import { computed } from 'vue';
import { EChartsOption, zrUtil } from 'echarts';
import { useAppStore } from '@/store';

interface optionsFn {
  (isDark: boolean, defaultOption: EChartsOption, merge?: any): EChartsOption;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultChartOption = (isDark: boolean) => {
  return <EChartsOption>{
    grid: {
      top: 50,
      left: 16,
      bottom: 32,
      right: 16,
      containLabel: true,
    },
    tooltip: { trigger: 'axis' },
    legend: { show: true },
    toolbox: {
      show: false,
      feature: {
        // dataZoom: { yAxisIndex: 'none' },
        // dataView: { readOnly: false },
        // magicType: { type: ['line', 'bar'] },
        // restore: {},
        saveAsImage: {
          title: 'Save as picture',
        },
      },
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false, lineStyle: { color: '#eee', type: 'solid', width: 1 } },
    },
    yAxis: {
      type: 'value',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: true, lineStyle: { color: '#eee', type: 'solid', width: 1 } },
    },
    series: [],
  };
};

export function useChartOption(sourceOption: optionsFn) {
  const appStore = useAppStore();
  const isDark = computed(() => appStore.theme === 'dark');
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  return computed<EChartsOption>(() => {
    return sourceOption(isDark.value, defaultChartOption(isDark.value), zrUtil.merge);
  });
}
export { zrUtil };

export default useChartOption;
