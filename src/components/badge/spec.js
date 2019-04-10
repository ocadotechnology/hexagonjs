import chai from 'chai';
import { Selection } from 'utils/selection';
import logger from 'utils/logger';

import { badge } from 'components/badge';

export default () => {
  describe('badge', () => {
    it('creates a selection', () => {
      badge().should.be.an.instanceof(Selection);
    });

    it('adds the hx-badge class', () => {
      badge().class().should.equal('hx-badge');
    });

    describe('when called with a type', () => {
      it('adds the type class', () => {
        badge({ type: 'success' }).class().should.equal('hx-badge hx-success');
        badge({ type: 'danger' }).class().should.equal('hx-badge hx-danger');
        badge({ type: 'warning' }).class().should.equal('hx-badge hx-warning');
      });
    });

    describe('when called with inverse', () => {
      it('adds the inverse class', () => {
        badge({ inverse: true }).class().should.equal('hx-badge hx-badge-inverse');
      });
    });

    describe('when called with an invalid type', () => {
      const origLoggerWarning = logger.warn;
      beforeEach(() => {
        logger.warn = chai.spy();
      });
      afterEach(() => {
        logger.warn = origLoggerWarning;
      });

      it('adds the type class', () => {
        logger.warn.should.not.have.been.called();
        badge({ type: 'something' }).class().should.equal('hx-badge');
        logger.warn.should.have.been.called.with(
          "badge: Badge was called with an invalid type: 'something'. Supported types: ['success', 'danger', 'warning']",
        );
      });
    });
  });
};
