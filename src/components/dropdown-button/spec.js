import chai from 'chai';
import { div, select } from 'utils/selection';
import logger from 'utils/logger';

import installFakeTimers from 'test/utils/fake-time';

import { dropdownButton } from 'components/dropdown-button';
import { config as dropdownConfig } from 'components/dropdown';

export default () => {
  describe('dropdown-button', () => {
    let clock;
    const chaiSandbox = chai.spy.sandbox();
    const fixture = div('hx-test-dropdown-button');
    const origAttachToSelector = dropdownConfig.attachToSelector;
    const dropdownAnimationDuration = 200;

    const basicItems = [
      {
        text: 'Text to display',
        onClick: '/url?query=123',
      },
    ];

    before(() => {
      select('body').add(fixture);
      dropdownConfig.attachToSelector = fixture;
    });

    beforeEach(() => {
      clock = installFakeTimers();
      fixture.clear();
      chaiSandbox.on(logger, 'warn');
    });

    afterEach(() => {
      clock.restore();
      chaiSandbox.restore();
    });

    after(() => {
      dropdownConfig.attachToSelector = origAttachToSelector;
      fixture.remove();
    });

    it('throws when called without items', () => {
      function fn() {
        dropdownButton({});
      }
      fn.should.throw('dropdownButton: Items are required when creating a dropdown button');
    });

    describe('when calling with valid options', () => {
      let thisButton;

      beforeEach(() => {
        thisButton = dropdownButton({
          text: 'Something',
          items: basicItems,
        });
        fixture.add(thisButton);
      });

      it('sets the text', () => {
        thisButton.text().should.equal('Something');
      });

      it('does not log any warnings', () => {
        logger.warn.should.not.have.been.called();
      });

      describe('when clicking the button', () => {
        let thisDropdown;

        beforeEach(() => {
          thisButton.node().click();
          clock.tick(dropdownAnimationDuration);
          thisDropdown = fixture.select('.hx-dropdown');
        });

        it('opens the dropdown', () => {
          thisDropdown.empty().should.equal(false);
        });

        it('sets the dropdown items', () => {
          thisDropdown.selectAll('.hx-menu-item').text().should.eql(['Text to display']);
        });
      });
    });

    describe('when calling without text', () => {
      let thisButton;

      beforeEach(() => {
        thisButton = dropdownButton({
          items: basicItems,
        });
        fixture.add(thisButton);
      });

      it('does not set the text', () => {
        thisButton.text().should.equal('');
      });

      it('does not log any warnings', () => {
        logger.warn.should.not.have.been.called();
      });
    });

    describe('when calling with invalid type', () => {
      let thisButton;

      beforeEach(() => {
        thisButton = dropdownButton({
          items: basicItems,
          type: 'invalid',
        });
        fixture.add(thisButton);
      });

      it('logs a warning', () => {
        logger.warn.should.have.been.called.with('dropdownButton: Called with an invalid type: \'invalid\'. Supported types: primary, secondary');
      });
    });

    describe('when calling with invalid size', () => {
      let thisButton;

      beforeEach(() => {
        thisButton = dropdownButton({
          items: basicItems,
          size: 'invalid',
        });
        fixture.add(thisButton);
      });

      it('logs a warning', () => {
        logger.warn.should.have.been.called.with('dropdownButton: Called with an invalid size: \'invalid\'. Supported sizes: small, micro');
      });
    });
  });
};
