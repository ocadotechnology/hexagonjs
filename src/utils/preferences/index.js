import { userFacingText } from 'utils/user-facing-text';
import { EventEmitter } from 'utils/event-emitter';
import { isString, merge } from 'utils/utils';
import { zeroPad } from 'utils/format';
import { ModalBase as Modal } from 'components/modal';
import { notifyNegative, notifyPositive } from 'components/notify';
import logger from 'utils/logger';
import { Autocomplete } from 'components/autocomplete';
import { badge } from 'components/badge';
import {
  select,
  detached,
  div,
  span,
} from 'utils/selection';


import { defaultTimezoneList, defaultLocaleObjects, defaultLocaleList } from './data';
import { RFC5456LocaleList, RFC5456LocaleObjects } from './RFC5456Locales';
import IANATimezoneList from './IANATimezoneList';

const { moment } = window;

userFacingText({
  preferences: {
    locale: 'Locale',
    preferences: 'Preferences',
    preferencesSaved: 'Preferences Saved',
    save: 'Save',
    timezone: 'Timezone',
  },
});

const localStorageKey = 'hx_preferences';

const LocalStoragePreferencesStore = {
  save(prefs, cb) {
    localStorage.setItem(localStorageKey, prefs);
    return cb();
  },
  load(cb) {
    return cb(undefined, localStorage.getItem(localStorageKey));
  },
};

function defaultTimezoneLookup(offset) {
  const modifier = offset > 0 ? '-' : '+';
  const absOffset = Math.abs(offset);
  const minutes = absOffset % 60;
  const hours = (absOffset - minutes) / 60;
  return `UTC${modifier}${zeroPad(hours)}:${zeroPad(minutes)}`;
}

function getLocaleObject(locale, localeObjects) {
  return localeObjects.find(l => l.full.toLowerCase() === locale.toLowerCase()
    || l.value.toLowerCase() === locale.toLowerCase());
}

function validateLocales(locales, localeObjects) {
  return locales.filter(loc => !getLocaleObject(loc, localeObjects));
}

function validateTimezones(timezones, timezoneList) {
  return timezones.filter(timezone => !timezoneList
    .find(tz => tz.toLowerCase() === timezone.toLowerCase()));
}

function defaultTZOffsetLookup(timezone) {
  const stampParts = timezone.replace('UTC', '').replace('+', '').replace('-0', '-').split(':')
    .map(Number);
  return stampParts[0] + (stampParts[0] >= 0 ? stampParts[1] / 60 : -(stampParts[1] / 60));
}

function IntlTZOffsetLookup(timeZone, dateMs) {
  const utcFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const tzFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const dateForDiff = new Date(dateMs || Date.now());

  const [
    { value: tzDay },,
    { value: tzMonth },,
    { value: tzYear },,
    { value: tzHour },,
    { value: tzMinute },
  ] = tzFormatter.formatToParts(dateForDiff);

  const [
    { value: utcDay },,
    { value: utcMonth },,
    { value: utcYear },,
    { value: utcHour },,
    { value: utcMinute },
  ] = utcFormatter.formatToParts(dateForDiff);

  const utcMs = Date.UTC(utcYear, utcMonth, utcDay, utcHour, utcMinute);
  const tzMs = Date.UTC(tzYear, tzMonth, tzDay, tzHour, tzMinute);

  const hourMs = 1000 * 60 * 60;

  const diff = (tzMs - utcMs) / hourMs;
  return diff;
}

class Preferences extends EventEmitter {
  constructor() {
    super();
    this.setup();
  }

  setup(options = {}) {
    let overrides;
    if (options.featureFlags && options.featureFlags.useIntlFormat && (typeof Intl === 'undefined' || Intl === null)) {
      logger.warn('preferences', 'Intl is not supported in this browser, use a polyfill to enable this feature. Setting "options.featureFlags.useIntlFormat" to false');
      overrides = {
        featureFlags: {
          useIntlFormat: false,
        },
      };
    }

    const defaults = {
      backingStore: LocalStoragePreferencesStore,
      supportedLocales: [],
      supportedTimezones: [],
      timezone: undefined,
      locale: undefined,
      featureFlags: {
        useIntlFormat: false,
      },
    };

    this.options = merge(defaults, options, overrides);

    const useIntl = this.options.featureFlags.useIntlFormat;

    const timezoneListToUse = useIntl ? IANATimezoneList : defaultTimezoneList;
    const allLocaleObjects = useIntl ? RFC5456LocaleObjects : defaultLocaleObjects;
    const localeListToUse = useIntl ? RFC5456LocaleList : defaultLocaleList;

    const invalidLocales = validateLocales(this.options.supportedLocales, allLocaleObjects);

    const invalidTimezones = validateTimezones(this.options.supportedTimezones, timezoneListToUse);

    if (invalidLocales.length) {
      logger.warn('preferences.setup: supportedLocales', `The provided locale(s) are not supported: ${invalidLocales.join(', ')}`);
      this.options.supportedLocales = localeListToUse;
    }

    if (!this.options.supportedLocales.length) {
      this.options.supportedLocales = localeListToUse;
    }

    if (invalidTimezones.length) {
      logger.warn('preferences.setup: supportedTimezones', `The provided timezone(s) are not supported: ${invalidTimezones.join(', ')}`);
      this.options.supportedTimezones = timezoneListToUse;
    }

    if (!this.options.supportedTimezones.length) {
      this.options.supportedTimezones = timezoneListToUse;
    }

    const setupModal = (element, thisModal) => {
      const localeAutocompleteElement = detached('input').class('hx-preferences-locale');
      const localeValues = this.options.supportedLocales
        .map(loc => getLocaleObject(loc, allLocaleObjects));

      const locAutocomplete = new Autocomplete(
        localeAutocompleteElement.node(),
        localeValues,
        {
          renderer(acElem, datum) {
            return select(acElem)
              .add(div('hx-compact-group')
                .add(div('hx-section')
                  .add(span().text(datum.full)))
                .add(div('hx-section hx-fixed')
                  .add(badge({ inverse: true }).classed('hx-margin-left', true).text(datum.value))));
          },
          inputMap(item) {
            return item.full;
          },
          showOtherResults: true,
          mustMatch: true,
          value: getLocaleObject(this.locale(), allLocaleObjects),
        },
      );
      const localeSection = div().add(detached('label').text(userFacingText('preferences', 'locale'))).add(localeAutocompleteElement);

      const timezoneAutocompleteElement = detached('input').class('hx-preferences-timezone');
      const tzAutocomplete = new Autocomplete(
        timezoneAutocompleteElement.node(),
        this.options.supportedTimezones,
        {
          showOtherResults: true,
          mustMatch: true,
          value: this.timezone(),
        },
      );
      const timezoneSection = div().add(detached('label').text(userFacingText('preferences', 'timezone'))).add(timezoneAutocompleteElement);

      const saveButton = detached('button').class('hx-preferences-save hx-btn hx-positive')
        .add(detached('i').class('hx-icon hx-icon-check'))
        .add(detached('span').text(` ${userFacingText('preferences', 'save')}`))
        .on('click', () => {
          this.locale(locAutocomplete.value());
          this.timezone(tzAutocomplete.value());
          return this.save((err) => {
            if (err) {
              return notifyNegative(err);
            }
            notifyPositive(userFacingText('preferences', 'preferencesSaved'));
            return thisModal.hide();
          });
        });

      return select(element).append('div').class('hx-form').add(localeSection)
        .add(timezoneSection)
        .add(saveButton);
    };

    const modal = new Modal(userFacingText('preferences', 'preferences'), setupModal);
    this._ = {
      timezoneOffsetLookup: useIntl ? IntlTZOffsetLookup : defaultTZOffsetLookup,
      preferences: {},
      modal,
      localeListToUse,
      allLocaleObjects,
      timezoneListToUse,
      useIntl,
    };
    if (useIntl) {
      const { locale, timeZone } = new Intl.DateTimeFormat().resolvedOptions();
      this.locale(this.options.locale || locale);
      this.timezone(this.options.timezone || timeZone);
      return;
    }

    let defaultLocaleId = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (!(isString(defaultLocaleId) && getLocaleObject(defaultLocaleId, allLocaleObjects))) {
      defaultLocaleId = 'en';
    }
    this.locale(defaultLocaleId);

    const guessedMomentTimezone = moment && moment.tz && moment.tz.guess();
    if (guessedMomentTimezone != null) {
      this.supportedTimezones(moment.tz.names());
      this.timezoneOffsetLookup(
        (timezone, timestamp) => -(moment.tz.zone(timezone).offset(timestamp) / 60),
      );
      this.timezone(guessedMomentTimezone);
      return;
    }
    this.timezone(defaultTimezoneLookup((new Date()).getTimezoneOffset()));
  }

  timezone(timezone) {
    if (arguments.length > 0) {
      if (this.isTimezoneSupported(timezone)) {
        if (this.options.timezone !== timezone) {
          this.options.timezone = timezone;
          this.emit('timezonechange', timezone);
        }
      } else {
        logger.warn('preferences.timezone:', `${timezone} is not a valid timezone`);
      }
      return this;
    }
    return this.options.timezone;
  }

  locale(locale) {
    if (arguments.length > 0) {
      // check that the locale being set is supported
      if (this.isLocaleSupported(locale)) {
        const localeObject = getLocaleObject(locale, this._.allLocaleObjects);
        if (this.options.locale !== localeObject.value) {
          this.options.locale = localeObject.value;
          // moment doesn't look up the 'default' locale so we set it here
          // Moment issue: https://github.com/moment/moment/issues/2621
          if (typeof moment !== 'undefined' && moment !== null) {
            moment.locale(localeObject.value);
          }
          this.emit('localechange', localeObject.value);
        }
      } else {
        logger.warn('preferences.locale', `${locale} is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon`);
      }
      return this;
    }
    return this.options.locale;
  }

  isTimezoneSupported(timeZone) {
    return isString(timeZone)
      && this.options.supportedTimezones.find(tz => tz.toLowerCase() === timeZone.toLowerCase());
  }

  isLocaleSupported(locale) {
    return isString(locale)
      && this.options.supportedLocales.find(lc => lc.toLowerCase() === locale.toLowerCase());
  }

  getTimezoneOffset(date, timezoneOrOffset) {
    const numericOffset = Number(timezoneOrOffset);

    if (timezoneOrOffset && Number.isNaN(numericOffset)) {
      return this._.timezoneOffsetLookup(timezoneOrOffset, date.getTime());
    }
    if (!Number.isNaN(numericOffset)) {
      return numericOffset;
    }
    return this._.timezoneOffsetLookup(this.timezone(), date.getTime());
  }

  applyTimezoneOffset(date, timezoneOrOffset, inverse) {
    const offset = this.getTimezoneOffset(date, timezoneOrOffset);
    const timezoneOffsetMS = offset * 60 * 60 * 1000 * (inverse ? -1 : 1);
    const browserOffsetMS = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() + timezoneOffsetMS + browserOffsetMS);
  }


  // sets the backingStore to use - currently the only one available is localStorage
  // getting the backingStore should not be possible
  backingStore(backingStore) {
    if (backingStore != null) {
      this.options.backingStore = backingStore;
    }
    return this;
  }

  // saves the preferences
  save(cb) {
    let e;
    try {
      const { locale, timezone } = this.options;
      const prefs = { locale, timezone };
      return this.options.backingStore.save(JSON.stringify(prefs), err => (typeof cb === 'function' ? cb(err) : undefined));
    } catch (error) {
      e = error;
      return typeof cb === 'function' ? cb(e) : undefined;
    }
  }

  // loads the preferences
  load(cb) {
    let e;
    try {
      return this.options.backingStore.load((err, prefs) => {
        if (prefs != null) {
          const { locale, timezone } = JSON.parse(prefs);
          this.timezone(timezone);
          this.locale(locale);
        }
        return typeof cb === 'function' ? cb(err) : undefined;
      });
    } catch (error) {
      e = error;
      return typeof cb === 'function' ? cb(e) : undefined;
    }
  }

  // shows the standard preferences modal
  show() {
    this._.modal.show();
    return this;
  }

  timezoneOffsetLookup(value) {
    if (arguments.length > 0) {
      this._.timezoneOffsetLookup = value;
      return this;
    }
    return this._.timezoneOffsetLookup;
  }
}

function option(name) {
  return function optionSetterGetter(value) {
    if (arguments.length > 0) {
      this.options[name] = value;
      return this;
    }
    return this.options[name];
  };
}


// sets the locales this app supports
Preferences.prototype.supportedLocales = option('supportedLocales');
Preferences.prototype.supportedTimezones = option('supportedTimezones');

const preferences = new Preferences();

// XXX Deprecated: Remove this in favour of proper import reference
preferences.localStorageStore = LocalStoragePreferencesStore;

export {
  LocalStoragePreferencesStore,
  defaultTimezoneLookup,
  preferences,
  Preferences,
  localStorageKey,
};
