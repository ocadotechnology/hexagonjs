
import { div } from 'utils/selection';
import { preferences } from 'utils/preferences';

import { DateTimePicker } from 'components/date-time-picker';

export default () => {
  describe('date-time-picker', () => {
    describe('return types:', () => {
      describe('should return this for getter setters with parameters:', () => {
        it('date', () => {
          const dp = new DateTimePicker(div());
          dp.date(new Date()).should.equal(dp);
        });
        it('day', () => {
          const dp = new DateTimePicker(div());
          dp.day(10).should.equal(dp);
        });
        it('hour', () => {
          const dp = new DateTimePicker(div());
          dp.hour(10).should.equal(dp);
        });
        it('minute', () => {
          const dp = new DateTimePicker(div());
          dp.minute(10).should.equal(dp);
        });
        it('month', () => {
          const dp = new DateTimePicker(div());
          dp.month(10).should.equal(dp);
        });
        it('second', () => {
          const dp = new DateTimePicker(div());
          dp.second(10).should.equal(dp);
        });
        it('year', () => {
          const dp = new DateTimePicker(div());
          dp.year(10).should.equal(dp);
        });
        it('locale', () => {
          const dp = new DateTimePicker(div());
          dp.locale('en-GB').should.equal(dp);
        });
        it('disabled', () => {
          const dp = new DateTimePicker(div());
          dp.disabled(true).should.equal(dp);
        });
      });

      describe('should return values for setter/getters without parameters:', () => {
      });
    });

    // PhantomJS doesn't support `Intl` and the polyfill doesn't support timezones...
    if (navigator.userAgent.indexOf('PhantomJS') === -1) {
      describe('localized timezones (preferences Intl API)', () => {
        const testDateMs = Date.UTC(2019, 4, 22, 0, 20);
        const origDateNow = Date.now;

        beforeEach(() => {
          Date.now = () => testDateMs;
          preferences.setup({
            featureFlags: {
              useIntlFormat: true,
            },
          });
        });

        afterEach(() => {
          Date.now = origDateNow;
          preferences.off();
          preferences.setup();
        });

        describe('when using en-GB and Europe/London', () => {
          let intlDtp;

          beforeEach(() => {
            preferences.locale('en-GB');
            preferences.timezone('Europe/London');
            intlDtp = new DateTimePicker(div());
          });

          it('has the correct screen date', () => {
            intlDtp.getScreenDate().should.equal('22/05/2019');
          });

          it('has the correct date', () => {
            intlDtp.date().should.eql(new Date(testDateMs));
          });
        });

        describe('when using en-US and America/Los_Angeles', () => {
          let intlDtp;

          beforeEach(() => {
            preferences.locale('en');
            preferences.timezone('America/Los_Angeles');
            intlDtp = new DateTimePicker(div());
          });

          it('has the correct screen date', () => {
            intlDtp.getScreenDate().should.equal('5/21/2019');
          });

          it('has the correct date', () => {
            intlDtp.date().should.eql(new Date(testDateMs));
          });

          describe('then changing to Europe/London', () => {
            beforeEach(() => {
              preferences.timezone('Europe/London');
            });

            it('has the correct screen date', () => {
              intlDtp.getScreenDate().should.equal('5/22/2019');
            });

            it('has the correct date', () => {
              intlDtp.date().should.eql(new Date(testDateMs));
            });
          });
        });

        describe('when using fr and Pacific/Auckland', () => {
          let intlDtp;
          const nzTestDate = Date.UTC(2019, 4, 22, 20, 0);

          beforeEach(() => {
            preferences.locale('fr');
            preferences.timezone('Pacific/Auckland');
            intlDtp = new DateTimePicker(div(), {
              date: new Date(nzTestDate),
            });
          });

          it('has the correct screen date', () => {
            intlDtp.getScreenDate().should.equal('23/05/2019');
          });

          it('has the correct date', () => {
            intlDtp.date().should.eql(new Date(nzTestDate));
          });

          describe('then changing to Europe/London', () => {
            beforeEach(() => {
              preferences.timezone('Europe/London');
            });

            it('has the correct screen date', () => {
              intlDtp.getScreenDate().should.equal('22/05/2019');
            });

            it('has the correct date', () => {
              intlDtp.date().should.eql(new Date(nzTestDate));
            });
          });
        });
      });
    }
  });
};
