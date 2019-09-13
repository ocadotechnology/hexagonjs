import chai from 'chai';

import logger from 'utils/logger';
import { div, select } from 'utils/selection';
import { StatusBar } from 'components/status-bar';

export default () => {
  chai.should();

  describe('status-bar', () => {
    const fixture = div('hx-test-status-bar');

    const chaiSandbox = chai.spy.sandbox();

    before(() => {
      select('body').add(fixture);
    });

    beforeEach(() => {
      chaiSandbox.on(logger, 'warn', () => {});
    });

    afterEach(() => {
      fixture.clear();
      chaiSandbox.restore();
    });

    after(() => {
      fixture.remove();
    });

    const testSegments = [
      {
        id: 1,
        label: 'Label',
        count: 100,
        type: 'danger',
      },
      {
        id: 2,
        label: 'Label',
        count: 300,
      },
    ];

    const testTitle = 'Title';
    const testBreakdown = 'Breakdown';
    const testPlan = 1000;

    describe('when given all the standard options', () => {
      let testStatusBar;
      let testStatusBarDiv;

      beforeEach(() => {
        testStatusBarDiv = fixture.append(div());
        testStatusBar = new StatusBar(testStatusBarDiv, {
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
          plan: testPlan,
        });
      });

      it('adds the correct classes', () => {
        testStatusBarDiv.classed('hx-status-bar').should.equal(true);
      });

      it('creates two segments', () => {
        testStatusBarDiv.selectAll('.hx-status-bar-section').size().should.equal(2);
      });

      // PhantomJS doesn't support flex-grow style property.
      if (navigator.userAgent.toLowerCase().indexOf('phantom') === -1) {
        it('sets the segment size correctly', () => {
          testStatusBarDiv.selectAll('.hx-status-bar-section')
            .map(sel => sel.style('flex-grow')).should.eql(['25', '75']);
        });
      }

      it('sets the plan text correctly', () => {
        testStatusBarDiv.select('.hx-status-bar-plan').text().should.equal('1000');
      });

      it('has the correct methods', () => {
        Object.getOwnPropertyNames(testStatusBar).sort().should.eql([
          'selection',
          '_',
          'options',
          'segments',
          'title',
          'breakdown',
          'plan',
          'compact',
          'disabled',
        ].sort());
      });

      describe('and updating the segments', () => {
        const newSegments = [
          {
            id: 1,
            label: 'Label',
            count: 100,
            type: 'danger',
          },
          {
            id: 2,
            label: 'Label',
            count: 300,
            type: 'warning',
          },
          {
            id: 3,
            label: 'Label',
            count: 500,
          },
        ];

        beforeEach(() => {
          chaiSandbox.on(testStatusBar, 'render');
          testStatusBar.segments(newSegments);
        });

        it('calls render', () => {
          testStatusBar.render.should.have.been.called.exactly(1);
        });

        it('creates three segments', () => {
          testStatusBarDiv.selectAll('.hx-status-bar-section').size().should.equal(3);
        });

        // PhantomJS doesn't support flex-grow style property.
        if (navigator.userAgent.toLowerCase().indexOf('phantom') === -1) {
          it('sets the segment size correctly', () => {
            testStatusBarDiv.selectAll('.hx-status-bar-section')
              .map(sel => sel.style('flex-grow')).should.eql(['11', '33', '56']);
          });
        }

        it('returns the segments correctly', () => {
          testStatusBar.segments().should.equal(newSegments);
        });
      });
    });

    describe('when given all the standard options and compact', () => {
      let testStatusBarDiv;

      beforeEach(() => {
        testStatusBarDiv = fixture.append(div());
        return new StatusBar(testStatusBarDiv, {
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
          plan: testPlan,
          compact: true,
        });
      });

      it('adds the correct classes', () => {
        testStatusBarDiv.classed('hx-status-bar hx-status-bar-compact').should.equal(true);
      });
    });

    describe('when given all the standard options and disabled', () => {
      let testStatusBarDiv;

      beforeEach(() => {
        testStatusBarDiv = fixture.append(div());
        return new StatusBar(testStatusBarDiv, {
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
          plan: testPlan,
          disabled: true,
        });
      });

      it('adds the correct classes', () => {
        testStatusBarDiv.classed('hx-status-bar hx-status-bar-disabled').should.equal(true);
      });
    });

    describe('when given all the standard options and compact ant disabled', () => {
      let testStatusBarDiv;

      beforeEach(() => {
        testStatusBarDiv = fixture.append(div());
        return new StatusBar(testStatusBarDiv, {
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
          plan: testPlan,
          compact: true,
          disabled: true,
        });
      });

      it('adds the correct classes', () => {
        testStatusBarDiv.classed('hx-status-bar hx-status-bar-compact hx-status-bar-disabled').should.equal(true);
      });
    });

    describe('when given an invalid segment type', () => {
      const invalidSegment = [
        {
          id: 1,
          label: 'Wrong',
          count: 100,
          type: 'bob',
        },
      ];

      beforeEach(() => new StatusBar(div(), {
        segments: invalidSegment,
      }));

      it('logs a warning', () => {
        logger.warn.should.have.been.called.with('StatusBar: invalid segment type provided "bob", expected one of [default, light, medium, dark, danger, warning, done, in-progress, todo]');
      });
    });

    describe('when given segments with no id', () => {
      const invalidSegment = [
        {
          label: 'Wrong',
          count: 100,
          type: 'bob',
        },
      ];

      it('throws an error', () => {
        function fn() {
          return new StatusBar(div(), {
            segments: invalidSegment,
          });
        }

        fn.should.throw('StatusBar: an "id" is required for each segment');
      });
    });

    describe('when given segments with no count', () => {
      const invalidSegment = [
        {
          id: 1,
          label: 'Wrong',
          type: 'bob',
        },
      ];

      it('throws an error', () => {
        function fn() {
          return new StatusBar(div(), {
            segments: invalidSegment,
          });
        }

        fn.should.throw('StatusBar: a count must be defined for each segment');
      });
    });
  });
};
