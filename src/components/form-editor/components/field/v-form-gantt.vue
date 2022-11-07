<template>
  <div ref="gantt" class="u-gantt">
    <div class="u-gantt-head">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll u-gantt---left">
            <table>
              <thead>
                <tr class="u-gantt-rows">
                  <td v-for="(item, index) in labelList" :key="index" :style="{ width: item.width + 'px' }">
                    <div class="u-gantt-cell">{{ item.label }}</div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll u-gantt---right">
            <table>
              <thead>
                <tr class="u-gantt-bars">
                  <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                    <div class="u-gantt-cell">
                      <div :title="getIndexDate(dayIndex)">{{ headDateFromt(getIndexDate(dayIndex)) }}</div>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <!-- 内区域 tbody -->
    <div class="u-gantt-warp" style="height: calc(100% - 50px)">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll u-gantt---left">
            <table>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" class="u-gantt-rows" @click="$emit('onItemClick', item, $event)">
                  <td v-for="({ value, width }, i) in labelList" :key="i" :style="{ width: width + 'px' }">
                    <div class="u-gantt-cell">{{ item[value] }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll u-gantt---right">
            <table>
              <tbody>
                <tr v-for="(item, rowIndex) in list" :key="rowIndex" class="u-gantt-bars">
                  <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                    <div class="u-gantt-cell">
                      <template v-if="getIndexDate(dayIndex) === getStringDate(item.startDate)">
                        <!-- 渲染条目 bar 条形图 -->
                        <div class="u-gantt-bar" :title="item.title + '\n' + item.startDate + '~' + item.endDate" :style="getBarStyle(item, dayIndex)">
                          <div class="u-gantt-bar__title" @click="$emit('onItemClick', item, $event)">{{ item.title }}</div>
                        </div>
                        <!-- 世纪开始 -->
                        <div v-if="getActualStyle(item, dayIndex)" class="u-gantt-actual" :style="getActualStyle(item, dayIndex)">
                          <div class="u-gantt-actual__title">{{ item.title }}</div>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <!-- 下部滚动条 -->
    <div class="u-gantt-scroll">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll" @scroll="scrollLeft">
            <div style="height: 0">
              <table>
                <thead>
                  <tr class="u-gantt-rows">
                    <td v-for="(item, index) in labelList" :key="index" :style="{ width: item.width + 'px' }">
                      <div class="u-gantt-cell">{{ item.label }}</div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll" @scroll="scrollRight">
            <div style="height: 0">
              <table>
                <thead>
                  <tr class="u-gantt-bars">
                    <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                      <div class="u-gantt-cell">
                        <div :title="getIndexDate(dayIndex)">{{ headDateFromt(getIndexDate(dayIndex)) }}</div>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import utilDom from '@/utils/dom';
  import utilDate from '@/utils/date';
  import { deepClone, RecordStringAny } from '@/utils/index';

  const shaonq = {
    dom: utilDom,
    date: utilDate,
  };

  const demo = {
    title: '1.2222注塑模具设计制造方案评估报告',
    endDate: '2020-10-22',
    startDate: '2020-10-3',
    actualEndDate: '2020-10-27',
    actualStartDate: '2020-10-7',
    dateList: [
      { endDate: '2020-10-11', startDate: '2020-10-2' },
      { endDate: '2020-10-10', startDate: '2020-10-6' },
      { endDate: '2020-10-16', startDate: '2020-10-6' },
    ],
  };

  function setDateRange(othis: any): { minDate: string; maxDate: string; rangeDay: number } | undefined {
    if (!(othis && othis.list)) return undefined;
    const { date } = shaonq;
    const list = deepClone<RecordStringAny[]>(othis.list).map(({ startDate, endDate }) => [
      othis.getDateNumber(startDate, true),
      othis.getDateNumber(endDate, true),
    ]) as [number, number][];
    const minDate = date.addDays(
      -1,
      date.formatDate(
        Math.min.apply(
          null,
          list.map((a) => a[0])
        )
      )
    ) as string;
    const maxDate = date.addDays(
      1,
      date.formatDate(
        Math.max.apply(
          null,
          list.map((a) => a[1])
        )
      )
    ) as string;
    return { minDate, maxDate, rangeDay: othis.getDateDiff(maxDate, minDate) };
  }
  function getDateRange(othis: any) {
    return othis.dateRange as { minDate: string; maxDate: string; rangeDay: number };
  }
  function getGanttEl(othis: any) {
    return othis.$refs.gantt as HTMLElement;
  }
  const dayPX = { width: 33, height: 33 };

  export default {
    props: {
      field: Object,
      path: String,
      list: {
        type: Array,
        default() {
          return [...Array(7)].map(() => demo);
        },
      },
      skin: {
        type: String,
        default: '',
      },
      labelList: {
        type: Array,
        default: () => {
          return [
            {
              label: '任务名称',
              value: 'title',
              width: 150,
            },
            {
              label: '开始时间',
              value: 'startDate',
              width: 90,
            },
            {
              label: '结束时间',
              value: 'endDate',
              width: 90,
            },
            // actualStartDate actualEndDate
          ];
        },
      },
    },
    emits: ['onItemClick'],
    data() {
      return {
        sideWidth: 360,
      };
    },
    computed: {
      // 计算时间
      dateRange() {
        return setDateRange(this);
      },
      /**
       * 周期最小为30天
       */
      dateRangeDay(): number {
        if (!this.dateRange) return 30;
        const dateRange = getDateRange(this);
        return dateRange.rangeDay > 30 ? dateRange.rangeDay : 30;
      },
    },
    $refs: {
      gantt: HTMLElement, // 写法1 - 推荐
    },
    mounted() {
      const { dom } = shaonq;
      const $gantt = getGanttEl(this);
      // 计算实际的高度
      if ($gantt) {
        const a = dom.el('.u-gantt-head', $gantt);
        const b = dom.el('.u-gantt-scroll', $gantt);
        const c = dom.el('.u-gantt-warp', $gantt);
        if (a && b && c) {
          const offsetHeight = a.offsetHeight + b.offsetHeight;
          c.style.height = `${$gantt.offsetHeight - offsetHeight}px`;
        }
      }
    },
    methods: {
      getDateNumber(day: string | number, isNow = false) {
        let time;
        try {
          time = shaonq.date.toDate(day);
        } catch (e) {
          //
        }
        if (!time) {
          time = isNow ? new Date() : 0;
        }
        return +time;
      },
      getDateDiff(endDate: string | number, startDate: string | number) {
        const { date } = shaonq;
        endDate = this.getStringDate(endDate);
        startDate = this.getStringDate(startDate);
        // offset 1 day
        return (date.toDate(endDate).getTime() - date.toDate(startDate).getTime()) / (24 * 3600 * 1000) + 1;
      },
      getIndexDate(index: number): string {
        const dateRange = getDateRange(this);
        return shaonq.date.addDays(index, this.getStringDate(dateRange.minDate));
      },
      getStringDate(date: any): string {
        if (!date) {
          return '';
        }
        if (typeof date !== 'string') {
          return shaonq.date.formatDate(date);
        }
        return shaonq.date.formatDate(shaonq.date.toDate(date));
      },
      getDateWeekClass(date: string) {
        const sat = shaonq.date.satOfWeek(date);
        const sun = shaonq.date.sunOfWeek(date);
        return {
          'is-week': date === sat || date === sun,
        };
      },
      headDateFromt(date: string) {
        const day = +date.slice(-2);
        return day;
      },
      // 计划开始时间
      getBarStyle(item: { startDate: number; endDate: string }, dayIndex: number) {
        if (this.getDateNumber(item.startDate) && this.getDateNumber(item.endDate)) {
          const diffday = this.getDateDiff(item.endDate, item.startDate);
          return {
            width: `${dayPX.width * (diffday < 0 ? 0 : diffday)}px`,
            height: `${dayPX.height}px`,
            left: `${dayPX.width * dayIndex}px`,
          };
        }
        return false;
      },
      getActualStyle(item: { actualStartDate: string; actualEndDate: string }) {
        const actualStartDate = this.getDateNumber(item.actualStartDate);
        const actualEndDate = this.getDateNumber(item.actualEndDate, true);
        if (actualStartDate) {
          const diffDate = this.getDateDiff(actualEndDate, actualStartDate);
          const dateRange = getDateRange(this);
          const diffMin = this.getDateDiff(actualStartDate, dateRange.minDate);
          if (diffDate > 0) {
            return {
              width: `${dayPX.width * diffDate}px`,
              height: `${dayPX.height}px`,
              left: `${dayPX.width * diffMin}px`,
            };
          }
        }
        return false;
      },
      // 滚动条
      scrollLeft(ev: Event) {
        if (!('target' in ev)) return;
        const left = (ev.target as HTMLElement).scrollLeft;
        shaonq.dom.els('.u-gantt---left', getGanttEl(this)).forEach((el: Element) => {
          el.scrollLeft = left;
        });
      },
      scrollRight(ev: Event) {
        if (!('target' in ev)) return;
        const left = (ev.target as HTMLElement).scrollLeft;
        shaonq.dom.els('.u-gantt---right', getGanttEl(this)).forEach((el: Element) => {
          el.scrollLeft = left;
        });
      },
    },
  };
</script>

<style lang="less">
  .u-flex,
  .u-tabs {
    display: flex;
    align-items: center;
  }
  .u-flex__item {
    flex: 1;
  }
  .u-flex__item.is-clamp {
    min-width: 0;
  }
  .u-flex__item.is-clamp > * {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .u-flex--start {
    align-items: flex-start;
  }
  .u-gantt {
    min-height: 175px;
    height: 100%;
    position: relative;
    border: 1px solid #f1f3f5;
  }
  .u-gantt ul,
  .u-gantt li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .u-gantt table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
  .u-gantt thead {
    background-color: #f4f4f4;
  }
  .u-gantt thead .is-week {
    color: #ff4e20;
  }
  .u-gantt tbody .is-week {
    background-color: #eabe380d;
  }
  .u-gantt th,
  .u-gantt td {
    border: 1px solid #f1f3f5;
    font-size: 13px;
  }
  .u-gantt .u-gantt-rows td {
    text-align: left;
  }
  .u-gantt .u-gantt-bars td {
    width: 30px;
  }
  .u-gantt-cell {
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  .u-gantt-warp {
    height: 100%;
  }
  .u-gantt__scroll {
    position: relative;
    overflow: hidden;
  }
  .u-gantt-bar,
  .u-gantt-actual {
    position: absolute;
    box-sizing: border-box;
    text-align: left;
    background-clip: content-box;
    user-select: none;
  }
  .u-gantt-bar__title,
  .u-gantt-actual__title {
    position: relative;
    height: 20px;
    line-height: 16px;
    font-size: 12px;
    margin: 7px 5px 0;
    padding: 0 5px;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #4795efd4;
    border: 1px solid rgba(71, 149, 239, 0.91);
  }
  .u-gantt-bar__title {
    color: #fff;
  }
  .u-gantt-actual__title {
    margin: 7px 6px 0;
    background-color: #ffdcd2;
    color: #7a7a7a;
  }
  .u-gantt .u-gantt-bars .u-gantt-cell {
    text-align: center;
    cursor: default;
    user-select: none;
  }
  .u-gantt .u-gantt-head,
  .u-gantt .u-gantt-warp {
    overflow-y: scroll;
  }
  .u-gantt .u-gantt-scroll .u-gantt__scroll {
    overflow-x: scroll;
  }
  .u-gantt .u-gantt-rows td:first-child,
  .u-gantt .u-gantt-bars td:first-child {
    border-left: 0px;
  }
  .test-gantt thead td {
    border-color: #f79898;
    background: #f79898;
    color: #fff;
  }
</style>
