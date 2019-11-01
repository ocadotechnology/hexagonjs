import chai from 'chai';
import { div, select, Selection } from 'utils/selection';
import logger from 'utils/logger';

import emit from 'test/utils/fake-event';

import { tooltip } from 'components/tooltip';
import { config as dropdownConfig } from 'components/dropdown';

export default () => {
  describe('tooltip', () => {
    const chaiSandbox = chai.spy.sandbox();
    const fixture = div('hx-test-tooltip');
    const origAttachToSelector = dropdownConfig.attachToSelector;

    before(() => {
      select('body').add(fixture);
      dropdownConfig.attachToSelector = fixture;
    });

    beforeEach(() => {
      fixture.clear();
      chaiSandbox.on(logger, 'warn');
    });

    afterEach(() => {
      chaiSandbox.restore();
    });

    after(() => {
      dropdownConfig.attachToSelector = origAttachToSelector;
      fixture.remove();
    });

    describe('when given an icon and text', () => {
      let thisTooltip;
      const icon = 'fab fa-angellist';
      let thisIcon;
      beforeEach(() => {
        thisTooltip = tooltip({ icon, text: 'hello' });
        fixture.add(thisTooltip);
        thisIcon = thisTooltip.select('i');
      });

      it('adds the icon element on the span', () => {
        thisIcon.empty().should.equal(false);
      });

      it('sets the icon class correctly', () => {
        thisIcon.class().should.equal(icon);
      });
    });

    describe('when given a label and text', () => {
      let thisTooltip;
      const label = 'hello';
      beforeEach(() => {
        thisTooltip = tooltip({ label, text: 'hello' });
        fixture.add(thisTooltip);
      });

      it('sets the text on the span', () => {
        thisTooltip.text().should.equal(label);
      });
    });

    describe('when given just text', () => {
      let thisTooltip;
      const tooltipText = 'This is a sensible amount of text';
      beforeEach(() => {
        thisTooltip = tooltip({ text: tooltipText });
        fixture.add(thisTooltip);
      });

      it('does not log any warnings', () => {
        logger.warn.should.not.have.been.called();
      });

      it('returns a selection', () => {
        thisTooltip.should.be.an.instanceOf(Selection);
      });

      it('does not set text on the selection', () => {
        thisTooltip.text().should.equal('');
      });

      it('returns a span', () => {
        thisTooltip.node().nodeName.should.equal('SPAN');
      });

      describe('and hovering over selection', () => {
        let thisDropdown;

        beforeEach(() => {
          emit(thisTooltip.node(), 'mouseover');
          thisDropdown = fixture.select('.hx-dropdown');
        });

        it('opens the dropdown', () => {
          thisDropdown.empty().should.equal(false);
        });

        it('sets the dropdown text', () => {
          thisDropdown.text().should.equal(tooltipText);
        });

        describe('then hovering outside selection', () => {
          beforeEach(() => {
            emit(thisTooltip.node(), 'mouseout');
            thisDropdown = fixture.select('.hx-dropdown');
          });

          it('closes the dropdown', () => {
            thisDropdown.empty().should.equal(true);
          });
        });
      });
    });

    describe('when given an icon and label', () => {
      it('throws an error', () => {
        function fn() {
          tooltip({ icon: 'something', label: 'label', text: 'tooltip text' });
        }
        fn.should.throw('tooltip: You can only use an icon or a label when creating a tooltip');
      });
    });

    describe('when given nothing', () => {
      it('throws an error', () => {
        function fn() {
          tooltip();
        }
        fn.should.throw('tooltip: No text provided for the tooltip');
      });

      it('throws an error', () => {
        function fn() {
          tooltip({});
        }
        fn.should.throw('tooltip: No text provided for the tooltip');
      });
    });
  });
};
