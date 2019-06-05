import { div } from 'utils/selection';
import { preferences } from 'utils/preferences';

import { TimePicker } from 'components/time-picker';

export default () => {
  describe('time-picker', () => {
    describe('api', () => {
      it('hour', () => {
        const tp = new TimePicker(div());
        tp.hour(5).should.equal(tp);
        tp.hour().should.equal(5);
      });

      it('minute', () => {
        const tp = new TimePicker(div());
        tp.minute(5).should.equal(tp);
        tp.minute().should.equal(5);
      });

      it('second', () => {
        const tp = new TimePicker(div());
        tp.second(5).should.equal(tp);
        tp.second().should.equal(5);
      });

      it('date', () => {
        const tp = new TimePicker(div());
        const date = new Date();
        tp.date(date).should.equal(tp);
        tp.date().should.eql(date);
      });

      it('locale', () => {
        const tp = new TimePicker(div());
        tp.locale('en-GB').should.equal(tp);
        tp.locale().should.equal('en-GB');
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
          let intlTp;

          beforeEach(() => {
            preferences.locale('en-GB');
            preferences.timezone('Europe/London');
            intlTp = new TimePicker(div());
          });

          it('has the correct screen date', () => {
            intlTp.getScreenTime().should.equal('01:20');
          });

          it('has the correct date', () => {
            intlTp.date().should.eql(new Date(testDateMs));
          });
        });

        describe('when using en-US and America/Los_Angeles', () => {
          let intlTp;

          beforeEach(() => {
            preferences.locale('en');
            preferences.timezone('America/Los_Angeles');
            intlTp = new TimePicker(div());
          });

          it('has the correct screen date', () => {
            intlTp.getScreenTime().should.equal('17:20');
          });

          it('has the correct date', () => {
            intlTp.date().should.eql(new Date(testDateMs));
          });

          describe('then changing to Europe/London', () => {
            beforeEach(() => {
              preferences.timezone('Europe/London');
            });

            it('has the correct screen date', () => {
              intlTp.getScreenTime().should.equal('01:20');
            });

            it('has the correct date', () => {
              intlTp.date().should.eql(new Date(testDateMs));
            });
          });
        });

        describe('when using fr and Pacific/Auckland', () => {
          let intlTp;
          const nzTestDate = Date.UTC(2019, 4, 22, 20, 0);

          beforeEach(() => {
            preferences.locale('fr');
            preferences.timezone('Pacific/Auckland');
            intlTp = new TimePicker(div(), {
              date: new Date(nzTestDate),
            });
          });

          it('has the correct screen date', () => {
            intlTp.getScreenTime().should.equal('08:00');
          });

          it('has the correct date', () => {
            intlTp.date().should.eql(new Date(nzTestDate));
          });

          describe('then changing to Europe/London', () => {
            beforeEach(() => {
              preferences.timezone('Europe/London');
            });

            it('has the correct screen date', () => {
              intlTp.getScreenTime().should.equal('21:00');
            });

            it('has the correct date', () => {
              intlTp.date().should.eql(new Date(nzTestDate));
            });
          });
        });
      });
    }
  });
};
