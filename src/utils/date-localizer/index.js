import {
  EventEmitter,
} from 'utils/event-emitter';

import {
  preferences,
} from 'utils/preferences';

import {
  userFacingText,
} from 'utils/user-facing-text';

import {
  zeroPad,
} from 'utils/format';

import {
  randomId,
  range,
} from 'utils/utils';

import logger from 'utils/logger';

userFacingText({
  'date-localizer': {
    today: 'Today',
  },
});

function isNumeric(stringOrNumber) {
  return !Number.isNaN(Number(stringOrNumber));
}

class PreferencesHandler extends EventEmitter {
  constructor() {
    super();
    this._ = {
      uniqueId: randomId(),
    };
    preferences.on('localechange', `hx.date-time-localizer${this._.uniqueId}`, () => {
      if (!this._.instanceLocale) {
        this.emit('localechange', {
          cause: 'api',
          value: preferences.locale(),
        });
      }
    });
    preferences.on('timezonechange', `hx.date-time-localizer${this._.uniqueId}`, () => {
      if (!this._.instanceTimezone) {
        this.emit('timezonechange', {
          cause: 'api',
          value: preferences.timezone(),
        });
      }
    });
  }

  locale(locale) {
    if (arguments.length) {
      if ((locale == null) || preferences.isLocaleSupported(locale)) {
        this._.instanceLocale = !!locale;
        this._.locale = locale;
        this.emit('localechange', {
          cause: 'api',
          value: locale || preferences.locale(),
        });
      } else {
        logger.warn(`${locale} is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon`);
      }
      return this;
    }
    return this._.locale || preferences.locale();
  }

  timezone(timezone) {
    if (arguments.length) {
      if ((timezone == null) || preferences.isTimezoneSupported(timezone)) {
        this._.instanceTimezone = !!timezone;
        this._.timezone = timezone;
        this.emit('timezonechange', {
          cause: 'api',
          value: timezone || preferences.timezone(),
        });
      } else {
        logger.warn(`${timezone} is not a valid timezone`);
      }
      return this;
    }
    return this._.timezone || preferences.timezone();
  }
}

/* eslint-disable class-methods-use-this */
class DateTimeLocalizer extends PreferencesHandler {
  // get the display order for the date so dates can be displayed correctly when localised
  dateOrder() {
    return ['DD', 'MM', 'YYYY'];
  }

  // get the day the week starts on, 0 for sunday, 1 for monday etc.
  weekStart() {
    return 1;
  }

  // localise the days of the week and return as array of 2 char days ('Su', 'Mo' etc.)
  weekDays() {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }

  // localise 'today' text
  todayText() {
    return userFacingText('date-localizer', 'today');
  }

  // localise the day of the month and optionally zero pad (01, 02)
  day(day, pad) {
    if (pad) {
      return zeroPad(day);
    }
    return day;
  }

  // localise the month in the format of mmm (Jan, Feb etc.) or 01, 02 etc.
  month(month, short) {
    if (short) {
      return zeroPad(month + 1);
    }
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
  }

  fullMonth(month) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
  }

  // localise the full year in the format of yyyy
  year(year) {
    return year;
  }

  // localise a date object to return a date string of dd/mm/yyyy (or localised format)
  date(date, useInbuilt) {
    if (useInbuilt) {
      return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
    }
    return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  // localise a date object to return a time string of hh:mm or hh:mm:ss (or localised format)
  time(date, showSeconds) {
    let timeString;
    const dateToUse = preferences.applyTimezoneOffset(date, this.timezone());
    timeString = `${dateToUse.getHours()}:${zeroPad(dateToUse.getMinutes())}`;
    if (showSeconds) {
      timeString += `:${zeroPad(dateToUse.getSeconds())}`;
    }
    return timeString;
  }

  // check if a time is a valid time (time as array of [hh, mm, ss])
  checkTime(time) {
    return isNumeric(time[0]) && isNumeric(time[1]) && isNumeric(time[2]);
  }

  // convert a localised date string back to a date object (unlocalise)
  stringToDate(dateString, useInbuilt) {
    let day;
    let i;
    let len;
    let month;
    let order;
    let part;
    let w;
    let year;

    let daysValid;
    let monthsValid;
    let yearsValid;

    let split;
    if (useInbuilt) {
      order = ['YYYY', 'MM', 'DD'];
      split = dateString.split('-');
    } else {
      order = this.dateOrder();
      split = dateString.split('/');
    }
    const allValid = split.length === 3 && !split.some(e => e === '' || e === '0');
    if (allValid) {
      for (i = 0, len = order.length; i < len; i += 1) {
        w = order[i];
        part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            day = Number(split[i]);
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            month = Number(split[i]);
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            year = Number(split[i]);
            if (year.toString().length === 2) {
              year += 2000;
            }
            break;
          default:
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return new Date(Date.UTC(year, month - 1, day));
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  }
}

class IntlDateTimeLocalizer extends PreferencesHandler {
  constructor() {
    super();
    this.on('localechange', () => this.setupFormatters());
    this.on('timezonechange', () => this.setupFormatters());
    this.setupFormatters();
  }

  setupFormatters() {
    const locale = this.locale();
    const timeZone = this.timezone();

    const weekDay = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      weekday: 'narrow',
    });

    const month = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      month: 'short',
    });

    const fullMonth = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      month: 'long',
    });

    const year = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      year: 'numeric',
    });

    const date = new Intl.DateTimeFormat(locale, {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const gbDate = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const time = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const timeWithSeconds = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const dateOrderYear = '2019';
    const dateOrderMonth = '05';
    const dateOrderDay = '08';

    function getDateOrder(dateString) {
      const yearIndex = dateString.indexOf(dateOrderYear);
      const monthIndex = dateString.indexOf(dateOrderMonth);
      const dayIndex = dateString.indexOf(dateOrderDay);
      let result = [];
      for (let i = 0; i < dateString.length; i += 1) {
        switch (i) {
          case yearIndex:
            result.push('YYYY');
            break;
          case monthIndex:
            result.push('MM');
            break;
          case dayIndex:
            result.push('DD');
            break;
          default:
        }
      }
      if (result.length === 0) {
        result = ['DD', 'MM', 'YYYY'];
      }
      return result;
    }

    const dateOrder = getDateOrder(date
      .format(new Date(Date.UTC(dateOrderYear, dateOrderMonth - 1, dateOrderDay, 12))));

    // 2019-05-19 is a Sunday
    const weekDays = range(7).map((_, i) => weekDay
      .format(new Date(Date.UTC(2019, 4, 19 + this.weekStart() + i, 12))));

    const months = range(12).map((_, i) => month.format(new Date(Date.UTC(2019, i, 1))));
    const fullMonths = range(12).map((_, i) => fullMonth.format(new Date(Date.UTC(2019, i, 1))));
    this._.formatters = {
      year,
      date,
      time,
      timeWithSeconds,
      gbDate,
    };
    this._.constants = {
      weekDays,
      months,
      fullMonths,
      dateOrder,
    };
    return this;
  }

  // get the display order for the date so dates can be displayed correctly when localised
  dateOrder() {
    return this._.constants.dateOrder;
  }

  // get the day the week starts on, 0 for sunday, 1 for monday etc.
  weekStart() {
    return 1;
  }

  // localise the days of the week and return as array of 2 char days ('Su', 'Mo' etc.)
  weekDays() {
    return this._.constants.weekDays;
  }

  // localise 'today' text
  todayText() {
    return userFacingText('date-localizer', 'today');
  }

  // localise the day of the month and optionally zero pad (01, 02)
  day(day, pad) {
    if (pad) {
      return zeroPad(day);
    }
    return day;
  }

  // localise the month in the format of mmm (Jan, Feb etc.) or 01, 02 etc.
  month(month, numeric) {
    if (numeric) {
      return zeroPad(month + 1);
    }
    return this._.constants.months[month];
  }

  fullMonth(month) {
    return this._.constants.fullMonths[month];
  }

  // localise the full year in the format of yyyy
  year(year) {
    return this._.formatters.year.format(new Date(Date.UTC(year, 0, 1, 12)));
  }

  date(date, useInbuilt) {
    if (useInbuilt) {
      const [
        { value: day },,
        { value: month },,
        { value: year },
      ] = this._.formatters.gbDate.formatToParts(date);
      return `${year}-${month}-${day}`;
    }
    return this._.formatters.date.format(date);
  }

  // localise a date object to return a time string of hh:mm or hh:mm:ss (or localised format)
  time(date, showSeconds) {
    if (showSeconds) {
      return this._.formatters.timeWithSeconds.format(date);
    }
    return this._.formatters.time.format(date);
  }

  checkTime(time) {
    return isNumeric(time[0]) && isNumeric(time[1]) && isNumeric(time[2]);
  }

  // convert a localised date string back to a date object (unlocalise)
  stringToDate(dateString, useInbuilt) {
    let daysValid;
    let monthsValid;
    let yearsValid;
    let year;
    let month;
    let day;
    let order;
    let split;
    if (useInbuilt) {
      order = ['YYYY', 'MM', 'DD'];
      split = dateString.split('-');
    } else {
      order = this.dateOrder();
      split = dateString.split('/');
    }
    const allValid = split.length === 3 && !split.some(e => e === '' || e === '0');
    if (allValid) {
      for (let i = 0, len = order.length; i < len; i += 1) {
        const w = order[i];
        const part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            day = Number(split[i]);
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            month = Number(split[i]);
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            year = Number(split[i]);
            if (year.toString().length === 2) {
              year += 2000;
            }
            break;
          default:
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return new Date(Date.UTC(year, month - 1, day));
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  }
}

class DateTimeLocalizerMoment extends PreferencesHandler {
  dateOrder() {
    const date = moment({
      year: 2003,
      month: 11,
      day: 22,
    }).locale(this.locale());
    const dateCheck = date.format('L');
    const yearIndex = dateCheck.indexOf(date.format('YYYY'));
    const monthIndex = dateCheck.indexOf(date.format('MM'));
    const dayIndex = dateCheck.indexOf(date.format('DD'));
    let result = [];
    for (let i = 0; i < dateCheck.length; i += 1) {
      switch (i) {
        case yearIndex:
          result.push('YYYY');
          break;
        case monthIndex:
          result.push('MM');
          break;
        case dayIndex:
          result.push('DD');
          break;
        default:
      }
    }
    if (result.length === 0) {
      result = ['DD', 'MM', 'YYYY'];
    }
    return result;
  }

  weekStart() {
    return moment().locale(this.locale()).weekday(0).toDate()
      .getDay();
  }

  weekDays() {
    const dayDate = moment().weekday(0);
    dayDate.locale(this.locale());
    const dayNames = [dayDate.format('dd')];
    for (let i = 0; i < 6; i += 1) {
      dayNames.push(dayDate.add(1, 'd').format('dd'));
    }
    return dayNames;
  }

  todayText() {
    const today = moment({
      hour: 12,
      minute: 0,
      second: 0,
    }).locale(this.locale());
    const tomorrow = today.clone().add(1, 'day');
    const todayArr = today.calendar().split('').reverse();
    const tomorrowArr = tomorrow.calendar().split('').reverse();
    let i;
    for (i = 0; i < todayArr.length; i += 1) {
      if (todayArr[i] !== tomorrowArr[i]) {
        break;
      }
    }
    todayArr.splice(0, i);
    return todayArr.reverse().join('');
  }

  day(day, pad) {
    return moment({
      day,
      month: 0,
    }).locale(this.locale()).format(pad ? 'DD' : 'D');
  }

  month(month, short) {
    return moment({
      month,
    }).locale(this.locale()).format(short ? 'MM' : 'MMM');
  }

  fullMonth(month) {
    return moment({
      month,
    }).locale(this.locale()).format('MMMM');
  }

  year(year) {
    return moment({
      year,
    }).locale(this.locale()).format('YYYY');
  }

  decade(start, end) {
    return `${this.year(start)} - ${this.year(end)}`;
  }

  date(date) {
    return moment(date).locale(this.locale()).format('L');
  }

  time(date, showSeconds) {
    const dateToUse = preferences.applyTimezoneOffset(date, this.timezone());
    const format = showSeconds ? 'H:mm:ss' : 'H:mm';
    return moment(dateToUse).locale(this.locale()).format(format);
  }

  checkTime(time) {
    return moment({
      hours: time[0],
      minutes: time[1],
      seconds: time[2],
    }).locale(this.locale()).isValid();
  }

  stringToDate(dateString) {
    let daysValid;
    let monthsValid;
    let yearsValid;
    let fmt = '';
    const order = this.dateOrder();
    const split = dateString.split('/');
    const allValid = split.length === 3 && !split.some(e => e === '' || e === '0');
    if (allValid) {
      for (let i = 0, len = order.length; i < len; i += 1) {
        const w = order[i];
        const part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            fmt += 'DD';
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            fmt += 'MM';
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            fmt += 'YYYY';
            break;
          default:
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return moment(dateString, fmt, this.locale()).toDate();
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  }
}

// XXX: [2.0.0] this doesn't need to be a function
function dateTimeLocalizer() {
  if (typeof moment !== 'undefined' && moment !== null) {
    return new DateTimeLocalizerMoment();
  }
  return new DateTimeLocalizer();
}

export {
  dateTimeLocalizer,
  DateTimeLocalizer,
  IntlDateTimeLocalizer,
  DateTimeLocalizerMoment,
};
