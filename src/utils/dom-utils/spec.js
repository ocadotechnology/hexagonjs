import chai from 'chai';

import { select, div, Selection } from 'utils/selection';

import { actionRenderer, actionRenderWrapper } from 'utils/dom-utils';

export default () => {
  describe('dom-utils', () => {
    const should = chai.should();
    const chaiSandbox = chai.spy.sandbox();

    const fixture = div('hx-test-dom-utils');

    before(() => {
      select('body').add(fixture);
    });

    beforeEach(() => {
      fixture.clear();
    });

    afterEach(() => {
      chaiSandbox.restore();
    });

    after(() => {
      fixture.remove();
    });

    describe('actionRenderer', () => {
      it('throws when called without an onClick', () => {
        function fn() {
          actionRenderer({});
        }
        fn.should.throw('Action items require an onClick function or url');
      });

      describe('when called with a link', () => {
        let thisAction;

        beforeEach(() => {
          thisAction = actionRenderer({
            text: 'Something',
            onClick: '#example.com',
          });
        });

        it('returns a selection', () => {
          thisAction.should.be.an.instanceOf(Selection);
        });

        it('sets the text', () => {
          thisAction.text().should.equal('Something');
        });

        it('returns a hyperlink', () => {
          thisAction.node().nodeName.should.equal('A');
        });

        it('sets the href', () => {
          thisAction.attr('href').should.equal('#example.com');
        });
      });

      describe('when called with a function', () => {
        let thisAction;
        const spy = chai.spy();

        beforeEach(() => {
          thisAction = actionRenderer({
            text: 'Something',
            onClick: spy,
          });
        });

        it('returns a selection', () => {
          thisAction.should.be.an.instanceOf(Selection);
        });

        it('sets the text', () => {
          thisAction.text().should.equal('Something');
        });

        it('returns a hyperlink', () => {
          thisAction.node().nodeName.should.equal('DIV');
        });

        describe('and clicking', () => {
          beforeEach(() => {
            thisAction.node().click();
          });

          it('calls the spy', () => {
            spy.should.have.been.called();
          });
        });
      });

      describe('when disabled', () => {
        describe('when called with a link', () => {
          let thisAction;

          beforeEach(() => {
            thisAction = actionRenderer({
              text: 'Something',
              onClick: '#example.com',
              disabled: true,
            });
          });

          it('returns a selection', () => {
            thisAction.should.be.an.instanceOf(Selection);
          });

          it('sets the text', () => {
            thisAction.text().should.equal('Something');
          });

          it('returns a hyperlink', () => {
            thisAction.node().nodeName.should.equal('A');
          });

          it('does not set the href', () => {
            should.not.exist(thisAction.attr('href'));
          });
        });

        describe('when called with a function', () => {
          let thisAction;
          const spy = chai.spy();

          beforeEach(() => {
            thisAction = actionRenderer({
              text: 'Something',
              onClick: spy,
              disabled: true,
            });
          });

          it('returns a selection', () => {
            thisAction.should.be.an.instanceOf(Selection);
          });

          it('sets the text', () => {
            thisAction.text().should.equal('Something');
          });

          it('returns a hyperlink', () => {
            thisAction.node().nodeName.should.equal('DIV');
          });

          describe('and clicking', () => {
            beforeEach(() => {
              thisAction.node().click();
            });

            it('calls the spy', () => {
              spy.should.not.have.been.called();
            });
          });
        });
      });
    });

    describe('actionRenderWrapper', () => {
      let thisElem;
      let thisAction;
      beforeEach(() => {
        thisElem = div('bob');
        fixture.add(thisElem);
        thisAction = actionRenderWrapper(thisElem, { text: 'Something', onClick: '#bob' });
      });

      it('inserts the selection into the fixture', () => {
        fixture.contains(thisAction.node()).should.equal(true);
      });

      it('removes the original selection', () => {
        fixture.contains(thisElem.node()).should.equal(false);
      });

      it('sets the class correctly', () => {
        thisAction.class().should.equal('bob');
      });
    });
  });
};
