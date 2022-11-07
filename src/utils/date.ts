/** format string : yyyy-MM-dd HH:mm:ss */
function formatDate(date: Date | string | number, f = 'yyyy-MM-dd') {
  if (!date) return '';
  if (typeof date !== 'object') date = new Date(date);
  const formatNumber = (n: number): string => String(n < 10 ? `0${n}` : n);
  const o: Record<string, number> = {};
  o.yyyy = date.getFullYear();
  o.MM = date.getMonth() + 1;
  o.dd = date.getDate();
  o.HH = date.getHours();
  o.mm = date.getMinutes();
  o.ss = date.getSeconds();
  return f.replace(/yyyy|MM|dd|HH|mm|ss/g, (k) => formatNumber(o[k]));
}

const ONE_DAY_TIME: number = 24 * 3600 * 1000;

export default {
  formatDate,
  toDate(date: Date | string | number) {
    if (typeof date === 'object') return date;
    return new Date(date);
  },
  getMonthDays(date: Date, month?: number | string) {
    const m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const n = date.getFullYear();
    if (typeof month === 'undefined') {
      month = date.getMonth();
    }
    if (n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0) && month === 1) {
      return 29;
    }
    return m[Number(month)];
  },
  addDays(day: number | string, date?: Date | string | number, f?: string) {
    let m = !date ? this.toDate(this.today()) : this.toDate(date);
    m = new Date(m.getTime() + Number(day) * ONE_DAY_TIME);
    return this.formatDate(new Date(m), f);
  },
  addMonths(month: string | number, date?: Date | string | number, f?: string) {
    const l = !date ? this.toDate(this.today()) : this.toDate(date);
    const n = l.getDate();
    const q = this.getMonthDays(l, l.getMonth() + Number(month));
    if (n > q) {
      l.setDate(q);
    }
    l.setMonth(l.getMonth() + Number(month));
    return this.formatDate(l, f);
  },
  addMonthsForStart(n: number, m: Date) {
    let l = arguments.length === 1 ? this.today() : m;
    l = this.addMonths(n, l);
    return this.firstDayOfMonth(l);
  },
  addMonthsForEnd(n: number, m?: Date) {
    let l = !m ? this.today() : m;
    l = this.addMonths(n, l);
    return this.addDays(-1, this.firstDayOfMonth(l));
  },
  addYears(m: number, n?: Date | string | number, f?: string) {
    const l = !n ? this.toDate(this.today()) : this.toDate(n);
    l.setFullYear(l.getFullYear() + m);
    return this.formatDate(l, f);
  },
  addYearsForStart(l: number, n?: Date) {
    let m = !n ? this.today() : n;
    m = this.addYears(l, m);
    return this.firstDayOfYear(m);
  },
  addYearsForEnd(l: number, n?: Date | string | number) {
    let m = !n ? this.today() : n;
    m = this.addYears(l, m);
    return this.firstDayOfYear(m);
  },
  sunOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - l.getDay() * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  monOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 1) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  tueOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 2) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  wedOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 3) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  turOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 4) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  friOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 5) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  satOfWeek(m?: Date | string | number, f?: string) {
    let l = !m ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l.getTime() - (l.getDay() - 6) * ONE_DAY_TIME);
    return this.formatDate(l, f);
  },
  firstDayOfMonth(m?: Date | string | number, f?: string) {
    const l = !m ? this.toDate(this.today()) : this.toDate(m);
    l.setDate(1);
    return this.formatDate(l, f);
  },
  lastDayOfMonth(l?: Date | string | number) {
    l = !l ? this.today() : l;
    l = this.addMonths(1, l);
    l = this.firstDayOfMonth(l);
    l = this.addDays(-1, l);
    return l;
  },
  firstDayOfYear(m?: Date | string | number, f?: string) {
    const l = !m ? this.toDate(this.today()) : this.toDate(m);
    l.setMonth(0);
    l.setDate(1);
    return this.formatDate(l, f);
  },
  lastDayOfYear(m?: Date | string | number, f?: string) {
    const l = !m ? this.toDate(this.today()) : this.toDate(m);
    l.setMonth(11);
    l.setDate(31);
    return this.formatDate(l, f);
  },
  today(l?: string) {
    return this.formatDate(new Date(), l);
  },
};
