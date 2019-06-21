import chai from 'chai';
import { Selection } from 'utils/selection';
import logger from 'utils/logger';

import { errorPage, makeAction } from 'components/error-pages';

export default () => {
  describe('error-pages', () => {
    const title = 'Error Page Title';
    const message = 'Error Page Message';
    const multilineMessage = 'Error Page Message\nMultiline!';
    const buttons = [
      {
        text: 'Button 1',
        url: '#',
      },
      {
        text: 'Button 2',
        url: '#',
      },
    ];

    beforeEach(() => {
      chai.spy.on(logger, 'warn');
    });

    afterEach(() => {
      chai.spy.restore(logger, 'warn');
    });

    describe('when called with no arguments', () => {
      it('throws an error', () => {
        (function throwError() {
          return errorPage();
        }).should.throw('errorPage: Cannot create an error page with no title.');
      });
    });

    describe('when called with a title', () => {
      let sel;
      beforeEach(() => {
        sel = errorPage({
          title,
        });
      });

      it('adds the hx-feature flag classes', () => {
        sel.class().should.equal('hx-error-message hx-flag-button hx-flag-typography');
      });

      it('sets the title', () => {
        sel.select('.hx-error-message-heading').text().should.equal(title);
      });
    });

    describe('when called with a message', () => {
      let sel;
      beforeEach(() => {
        sel = errorPage({
          title,
          message,
        });
      });

      it('sets the body', () => {
        sel.select('.hx-error-message-body').text().should.equal(message);
      });
    });

    describe('when called with a multiline message', () => {
      let sel;
      let paragraphs;
      beforeEach(() => {
        sel = errorPage({
          title,
          message: multilineMessage,
        });

        paragraphs = sel.select('.hx-error-message-body').selectAll('p');
      });

      it('creates multiple paragraphs', () => {
        paragraphs.text().should.eql(multilineMessage.split('\n'));
      });
    });

    describe('when called with buttons', () => {
      let sel;
      let buttonsSel;
      beforeEach(() => {
        sel = errorPage({
          title,
          buttons,
        });

        buttonsSel = sel.selectAll('.hx-btn');
      });

      it('creates the buttons', () => {
        buttonsSel.text().should.eql(['Button 1', 'Button 2']);
      });
    });

    describe('makeAction', () => {
      describe('when called with only a text', () => {
        it('throws an error due to missing url/onClick', () => {
          const btn = { text: 'Error text' };
          (function throwError() {
            return makeAction(btn);
          }).should.throw(`errorPage: Button created with no 'onClick' or 'url': ${JSON.stringify(btn)}`);
        });
      });

      describe('when called with text and url', () => {
        let sel;

        const btn = {
          text: 'Text + URL',
          url: 'the-url',
        };

        beforeEach(() => {
          sel = makeAction(btn);
        });

        it('does not log a warning', () => {
          logger.warn.should.not.have.been.called();
        });

        it('creates a selection', () => {
          sel.should.be.an.instanceof(Selection);
        });

        it('returns a hyperlink', () => {
          sel.node().nodeName.should.equal('A');
        });

        it('sets the URL correctly', () => {
          sel.attr('href').should.equal(btn.url);
        });

        it('sets the text correctly', () => {
          sel.text().should.equal(btn.text);
        });

        it('sets the correct class', () => {
          sel.class().should.equal('hx-btn');
        });
      });

      describe('when called with text and onClick', () => {
        let sel;

        const onClick = chai.spy();

        const btn = {
          text: 'Text + URL',
          onClick,
        };

        beforeEach(() => {
          sel = makeAction(btn);
        });

        it('does not log a warning', () => {
          logger.warn.should.not.have.been.called();
        });

        it('creates a selection', () => {
          sel.should.be.an.instanceof(Selection);
        });

        it('returns a button', () => {
          sel.node().nodeName.should.equal('BUTTON');
        });

        it('sets the text correctly', () => {
          sel.text().should.equal(btn.text);
        });

        it('sets the correct class', () => {
          sel.class().should.equal('hx-btn');
        });

        describe('when clicking', () => {
          beforeEach(() => {
            sel.node().click();
          });

          it('calls the onclick', () => {
            onClick.should.have.been.called.exactly(1);
          });
        });
      });

      describe('when called with a buttonType', () => {
        let sel;

        const btn = {
          text: 'Text + URL',
          url: 'the-url',
          buttonType: 'primary',
        };

        beforeEach(() => {
          sel = makeAction(btn);
        });

        it('does not log a warning', () => {
          logger.warn.should.not.have.been.called();
        });

        it('creates a selection', () => {
          sel.should.be.an.instanceof(Selection);
        });

        it('returns a hyperlink', () => {
          sel.node().nodeName.should.equal('A');
        });

        it('sets the URL correctly', () => {
          sel.attr('href').should.equal(btn.url);
        });

        it('sets the text correctly', () => {
          sel.text().should.equal(btn.text);
        });

        it('sets the correct class', () => {
          sel.class().should.equal('hx-btn hx-primary');
        });
      });

      describe('when called with an invalid button type', () => {
        let sel;

        const btn = {
          text: 'Text + URL',
          url: 'the-url',
          buttonType: 'something',
        };

        beforeEach(() => {
          sel = makeAction(btn);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with('errorPage: Invalid button type selected \'something\'. Available types: [primary, secondary]');
        });

        it('creates a selection', () => {
          sel.should.be.an.instanceof(Selection);
        });

        it('returns a hyperlink', () => {
          sel.node().nodeName.should.equal('A');
        });

        it('sets the URL correctly', () => {
          sel.attr('href').should.equal(btn.url);
        });

        it('sets the text correctly', () => {
          sel.text().should.equal(btn.text);
        });

        it('sets the correct class', () => {
          sel.class().should.equal('hx-btn');
        });
      });
    });
  });
};
