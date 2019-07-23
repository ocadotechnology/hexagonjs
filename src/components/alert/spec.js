import {
  div,
  select,
} from 'utils/selection';

import {
  AlertManager,
  Alert,
  calculateMessageDuration,
  inbuiltAlertManager,
  message,
  alert,
} from 'components/alert';

// import emit from 'test/utils/fake-event';
import installFakeTimers from 'test/utils/fake-time';

export default () => {
  describe('alert', () => {
    let clock;
    const fixture = div('hx-test-alert');

    before(() => {
      select('body').append(fixture);
    });

    beforeEach(() => {
      clock = installFakeTimers();
      fixture.clear();
    });

    after(() => {
      clock.restore();
      fixture.remove();
    });

    describe('AlertManager', () => {
      let alertManager;
      beforeEach(() => {
        alertManager = new AlertManager(fixture);
      });

      it('sets the correct default options', () => {
        alertManager.options.should.eql({
          animationInDuration: 200,
          animationOutDuration: 200,
          maxMessageDuration: 7000,
          minMessageDuration: 2000,
        });
      });
    });

    describe('Alert', () => {

    });

    describe('calculateMessageDuration', () => {

    });

    describe('inbuiltAlertManager', () => {

    });
  });
};
