import chai from 'chai';

import {
  preferences,
  Preferences,
  defaultTimezoneLookup,
  localStorageKey,
} from 'utils/preferences';
import { userFacingText } from 'utils/user-facing-text';
import logger from 'utils/logger';
import { notifyDefaultTimeout } from 'components/notify';
import installFakeTimers from 'test/utils/fake-time';

import { defaultLocaleObjects } from './data';
import { RFC5456LocaleList, RFC5456LocaleObjects } from './RFC5456Locales';
import IANATimezoneList from './IANATimezoneList';


export default () => {
  const should = chai.should();
  describe('hx-preferences', () => {
    const modalAnimationDuration = 500;
    const defaultNotificationTimeout = notifyDefaultTimeout();
    let clock;
    const chaiSandbox = chai.spy.sandbox();

    beforeEach(() => {
      notifyDefaultTimeout(0);
      clock = installFakeTimers();
      localStorage.setItem(localStorageKey, undefined);
      chaiSandbox.on(logger, 'warn', () => {});
      chaiSandbox.on(logger, 'deprecated', () => {});
    });

    afterEach(() => {
      notifyDefaultTimeout(defaultNotificationTimeout);
      clock.restore();
      chaiSandbox.restore();
      preferences.setup();
    });

    it('should have user facing text defined', () => {
      userFacingText('preferences', 'locale').should.equal('Locale');
      userFacingText('preferences', 'preferences').should.equal('Preferences');
      userFacingText('preferences', 'preferencesSaved').should.equal('Preferences Saved');
      userFacingText('preferences', 'save').should.equal('Save');
      userFacingText('preferences', 'timezone').should.equal('Timezone');
    });

    describe('api', () => {
      it('supportedLocales: setter/getter', () => {
        const list = ['uz', 'vi', 'cy'];
        preferences.supportedLocales(list).should.equal(preferences);
        preferences.supportedLocales().should.equal(list);
      });

      describe('locale', () => {
        it('should not be possible to explicitly clear the locale', () => {
          // sanity check
          should.exist(preferences.locale());
          preferences.locale(undefined);
          should.exist(preferences.locale());
        });

        it('setter/getter', () => {
          preferences.locale('vi').should.equal(preferences);
          preferences.locale().should.equal('vi');
        });

        it('setter/getter with alternative casing', () => {
          preferences.locale('en-GB').should.equal(preferences);
          preferences.locale().should.equal('en-GB');
        });

        it('setter/getter should correct the casing', () => {
          preferences.locale('en-gb').should.equal(preferences);
          preferences.locale().should.equal('en-GB');
        });

        it('dont emit when setting to the same value', () => {
          preferences.locale('en-GB');
          let called = false;
          preferences.on('localechange', () => {
            called = true;
          });
          preferences.locale('en-GB');
          called.should.equal(false);
        });

        it('emit when setting to new value', () => {
          preferences.locale('en-GB');
          let called = false;
          preferences.on('localechange', () => {
            called = true;
          });
          preferences.locale('en-us');
          called.should.equal(true);
        });

        it('setter/getter for non supported value', () => {
          preferences.locale('vi').should.equal(preferences);
          preferences.locale('lemon').should.equal(preferences);
          preferences.locale().should.equal('vi');
          logger.warn.should.have.been.called();
        });
      });

      describe('timezone', () => {
        afterEach(() => preferences.timezone('UTC+00:00'));

        it('setter/getter', () => {
          preferences.timezone('UTC+01:00').should.equal(preferences);
          preferences.timezone().should.equal('UTC+01:00');
        });

        it('dont emit when setting to the same value', () => {
          preferences.timezone('UTC+00:00');
          let called = false;
          preferences.on('timezonechange', () => {
            called = true;
          });
          preferences.timezone('UTC+00:00');
          called.should.equal(false);
        });

        it('emit when setting to new value', () => {
          preferences.timezone('UTC+00:00');
          let called = false;
          preferences.on('timezonechange', () => {
            called = true;
          });
          preferences.timezone('UTC+01:00');
          called.should.equal(true);
        });

        it('should not allow the use of unsupported timezones', () => {
          preferences.timezone('America').should.equal(preferences);
          logger.warn.should.have.been.called();
        });
      });

      describe('defaultTimezoneLookup', () => it('should get the correct string timezone', () => {
        defaultTimezoneLookup(1).should.equal('UTC-00:01');
        defaultTimezoneLookup(2).should.equal('UTC-00:02');
        defaultTimezoneLookup(0).should.equal('UTC+00:00');
        defaultTimezoneLookup(-1).should.equal('UTC+00:01');
        defaultTimezoneLookup(-2).should.equal('UTC+00:02');
        defaultTimezoneLookup(10).should.equal('UTC-00:10');
        defaultTimezoneLookup(-100).should.equal('UTC+01:40');
      }));

      describe('when showing the modal', () => {
        let modalPreferences;
        beforeEach(() => {
          modalPreferences = new Preferences();
          modalPreferences.setup();
          modalPreferences.show();
          clock.tick(modalAnimationDuration);
          chaiSandbox.on(modalPreferences, 'timezone');
          chaiSandbox.on(modalPreferences, 'locale');
        });

        afterEach(() => {
          modalPreferences._.modal.hide();
        });

        it('has the locale that matches locale()', () => {
          const currentLocaleText = defaultLocaleObjects.find(
            ({ value }) => modalPreferences.locale() === value,
          ).full;
          document.querySelector('.hx-preferences-locale').value.should.equal(currentLocaleText);
        });

        it('has the timezone that matches the timezone()', () => {
          document.querySelector('.hx-preferences-timezone').value.should.equal(modalPreferences.timezone());
        });

        it('calls locale and timezone with the correct value', () => {
          document.querySelector('.hx-preferences-locale').value = 'English';
          document.querySelector('.hx-preferences-timezone').value = 'UTC+01:00';
          document.querySelector('.hx-preferences-save').click();
          modalPreferences.locale.should.have.been.called.with('English');
          modalPreferences.timezone.should.have.been.called.with('UTC+01:00');
        });
      });

      describe('when showing the modal after setting the locale and timezone', () => {
        let modalPreferences;
        beforeEach(() => {
          modalPreferences = new Preferences();
          modalPreferences.setup();
          modalPreferences.locale('fr');
          modalPreferences.timezone('UTC+01:00');
          modalPreferences.show();
          clock.tick(modalAnimationDuration);
        });

        afterEach(() => {
          modalPreferences._.modal.hide();
        });

        it('has the correct locale', () => {
          document.querySelector('.hx-preferences-locale').value.should.equal('French');
        });

        it('has the correct timeZone', () => {
          document.querySelector('.hx-preferences-timezone').value.should.equal('UTC+01:00');
        });
      });
    });

    // PhantomJS doesn't support `Intl` and the polyfill doesn't support timezones...
    if (navigator.userAgent.indexOf('PhantomJS') === -1) {
      describe('featureFlag API', () => {
        let customPreferences;

        beforeEach(() => {
          customPreferences = new Preferences();
        });

        describe('when initialising without `intl`', () => {
          const origIntl = Intl;
          beforeEach(() => {
            delete window.Intl;
            customPreferences.setup({
              featureFlags: {
                useIntlFormat: true,
              },
            });
          });

          afterEach(() => {
            /* eslint-disable-next-line */
            window && (window.Intl = origIntl);
            customPreferences.setup();
          });

          it('logs a warning', () => {
            logger.warn.should.have.been.called();
          });

          it('useIntl is set to false', () => {
            customPreferences._.useIntl = false;
          });
        });

        describe('when using v2 API', () => {
          beforeEach(() => {
            customPreferences.setup({
              featureFlags: {
                useIntlFormat: true,
              },
            });
          });

          it('saves to local storage', (done) => {
            customPreferences.locale('ar');
            customPreferences.timezone('America/New_York');
            customPreferences.save((err) => {
              should.not.exist(err);
              localStorage.getItem(localStorageKey).should.equal(JSON.stringify({
                locale: 'ar',
                timezone: 'America/New_York',
              }));
              done();
            });
          });

          it('loads from local storage', (done) => {
            localStorage.setItem(localStorageKey, JSON.stringify({
              locale: 'bg',
              timezone: 'Europe/Sofia',
            }));
            customPreferences.load((err) => {
              should.not.exist(err);
              customPreferences.locale().should.equal('bg');
              customPreferences.timezone().should.equal('Europe/Sofia');
              done();
            });
          });

          it('supportedLocales: default', () => {
            customPreferences.supportedLocales().should.eql(RFC5456LocaleList);
          });

          it('supportedLocales: setter/getter', () => {
            const list = ['uz', 'vi', 'cy'];
            customPreferences.supportedLocales(list).should.equal(customPreferences);
            customPreferences.supportedLocales().should.equal(list);
          });

          it('supportedTimezones: default', () => {
            customPreferences.supportedTimezones().should.equal(IANATimezoneList);
          });

          it('supportedTimezones: setter/getter', () => {
            const list = ['uz', 'vi', 'cy'];
            customPreferences.supportedTimezones(list).should.equal(customPreferences);
            customPreferences.supportedTimezones().should.equal(list);
          });

          describe('locale', () => {
            it('should not be possible to explicitly clear the locale', () => {
              // sanity check
              should.exist(customPreferences.locale());
              customPreferences.locale(undefined);
              should.exist(customPreferences.locale());
            });

            it('setter/getter', () => {
              customPreferences.locale('vi').should.equal(customPreferences);
              customPreferences.locale().should.equal('vi');
              logger.warn.should.not.have.been.called();
            });

            it('setter/getter with correct casing', () => {
              customPreferences.locale('en-GB').should.equal(customPreferences);
              customPreferences.locale().should.equal('en-GB');
              logger.warn.should.not.have.been.called();
            });

            it('setter/getter should correct the casing', () => {
              customPreferences.locale('en-gb').should.equal(customPreferences);
              customPreferences.locale().should.equal('en-GB');
              logger.warn.should.not.have.been.called();
            });

            it('dont emit when setting to the same value', () => {
              customPreferences.locale('en-GB');
              let called = false;
              customPreferences.on('localechange', () => {
                called = true;
              });
              customPreferences.locale('en-GB');
              called.should.equal(false);
              logger.warn.should.not.have.been.called();
            });

            it('emit when setting to new value', () => {
              customPreferences.locale('en-GB');
              let called = false;
              customPreferences.on('localechange', () => {
                called = true;
              });
              customPreferences.locale('en-us');
              called.should.equal(true);
              logger.warn.should.not.have.been.called();
            });

            it('setter/getter for non supported value', () => {
              customPreferences.locale('vi').should.equal(customPreferences);
              customPreferences.locale('lemon').should.equal(customPreferences);
              customPreferences.locale().should.equal('vi');
              logger.warn.should.have.been.called();
            });
          });

          describe('timezone', () => {
            afterEach(() => customPreferences.timezone('UTC'));

            it('setter/getter', () => {
              customPreferences.timezone('Europe/London').should.equal(customPreferences);
              customPreferences.timezone().should.equal('Europe/London');
              logger.warn.should.not.have.been.called();
            });

            it('dont emit when setting to the same value', () => {
              customPreferences.timezone('Europe/London');
              let called = false;
              customPreferences.on('timezonechange', () => {
                called = true;
              });
              customPreferences.timezone('Europe/London');
              called.should.equal(false);
              logger.warn.should.not.have.been.called();
            });

            it('emit when setting to new value', () => {
              customPreferences.timezone('Europe/London');
              let called = false;
              customPreferences.on('timezonechange', () => {
                called = true;
              });
              customPreferences.timezone('Europe/Paris');
              called.should.equal(true);
              logger.warn.should.not.have.been.called();
            });

            it('should not allow the use of unsupported timezones', () => {
              customPreferences.timezone('America').should.equal(customPreferences);
              logger.warn.should.have.been.called();
            });
          });

          describe('when showing the modal', () => {
            let modalPreferences;
            beforeEach(() => {
              modalPreferences = new Preferences();
              modalPreferences.setup({
                featureFlags: {
                  useIntlFormat: true,
                },
              });
              modalPreferences.show();
              clock.tick(modalAnimationDuration);
              chaiSandbox.on(modalPreferences, 'timezone');
              chaiSandbox.on(modalPreferences, 'locale');
            });

            afterEach(() => {
              modalPreferences._.modal.hide();
            });

            it('has the locale that matches locale()', () => {
              const currentLocaleText = RFC5456LocaleObjects.find(
                ({ value }) => modalPreferences.locale() === value,
              ).full;
              document.querySelector('.hx-preferences-locale').value.should.equal(currentLocaleText);
            });

            it('has the timezone that matches the timezone()', () => {
              document.querySelector('.hx-preferences-timezone').value.should.equal(modalPreferences.timezone());
            });

            it('calls locale and timezone with the correct value', () => {
              document.querySelector('.hx-preferences-locale').value = 'English';
              document.querySelector('.hx-preferences-timezone').value = 'America/Los_Angeles';
              document.querySelector('.hx-preferences-save').click();
              modalPreferences.locale.should.have.been.called.with('English');
              modalPreferences.timezone.should.have.been.called.with('America/Los_Angeles');
            });
          });

          describe('when showing the modal after setting the locale and timezone', () => {
            let modalPreferences;
            beforeEach(() => {
              modalPreferences = new Preferences();
              modalPreferences.setup({
                featureFlags: {
                  useIntlFormat: true,
                },
              });
              modalPreferences.locale('fr');
              modalPreferences.timezone('Europe/Paris');
              modalPreferences.show();
              clock.tick(modalAnimationDuration);
            });

            afterEach(() => {
              modalPreferences._.modal.hide();
            });

            it('has the correct locale', () => {
              document.querySelector('.hx-preferences-locale').value.should.equal('French');
            });

            it('has the correct timeZone', () => {
              document.querySelector('.hx-preferences-timezone').value.should.equal('Europe/Paris');
            });
          });
        });
      });
    }
  });
};
