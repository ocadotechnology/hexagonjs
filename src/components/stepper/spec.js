import chai from 'chai';
import { div, select } from 'utils/selection';
import logger from 'utils/logger';

import { Stepper } from './index';

export default () => {
  describe('stepper', () => {
    const fixture = div('hx-test-stepper');

    const chaiSandbox = chai.spy.sandbox();

    before(() => {
      select('body').add(fixture);
    });

    beforeEach(() => {
      chaiSandbox.on(logger, 'warn', () => {});
    });

    afterEach(() => {
      chaiSandbox.restore();
    });

    after(() => {
      fixture.remove();
    });

    function newStepper(stepTitles) {
      return new Stepper(fixture, stepTitles);
    }

    const Errors = {
      tooFewSteps: 'Stepper: Expected at least two steps to display',
    };

    const Warnings = {
      noPrevStep: 'Stepper: There is no previous step',
      noNextStep: 'Stepper: There is no next step',
    };

    describe('when given no steps', () => {
      it('throws an error', () => {
        (() => newStepper([])).should.throw(Errors.tooFewSteps);
      });
    });

    describe('when given one step', () => {
      it('throws an error', () => {
        (() => newStepper(['Step 1'])).should.throw(Errors.tooFewSteps);
      });
    });

    describe('when given two steps', () => {
      let stepper;
      beforeEach(() => {
        stepper = newStepper(['Step 1', 'Step 2']);
      });

      it('the first step selected', () => {
        stepper.selectedStep().should.equal(1);
      });

      describe('then the prevStep() method is called', () => {
        beforeEach(() => {
          stepper.prevStep();
        });

        it('the first step is still selected', () => {
          stepper.selectedStep().should.equal(1);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with(Warnings.noPrevStep);
        });
      });

      describe('then the nextStep() method is called', () => {
        beforeEach(() => {
          stepper.nextStep();
        });

        it('the second step is selected', () => {
          stepper.selectedStep().should.equal(2);
        });

        describe('then the nextStep() method is called again', () => {
          beforeEach(() => {
            stepper.nextStep();
          });

          it('the second step is still selected', () => {
            stepper.selectedStep().should.equal(2);
          });

          it('logs a warning', () => {
            logger.warn.should.have.been.called.with(Warnings.noNextStep);
          });
        });
      });
    });

    describe('when given three steps to test rendering', () => {
      let stepper;
      beforeEach(() => {
        stepper = newStepper(['Step 1', 'Step 2', 'Step 3']);
      });

      describe('then the nextStep() method is called', () => {
        beforeEach(() => {
          stepper.nextStep();
        });

        it('the first step is rendered as completed', () => {
          true.should.equal(false);
        });

        it('the second step is rendered as selected', () => {
          true.should.equal(false);
        });

        it('the third step is rendered as default', () => {
          true.should.equal(false);
        });

        describe('then the showError(true) method is called', () => {
          beforeEach(() => {
            stepper.showError();
          });

          it('the first step is rendered as completed', () => {
            true.should.equal(false);
          });

          it('the second step is rendered as an error', () => {
            true.should.equal(false);
          });

          it('the third step is rendered as default', () => {
            true.should.equal(false);
          });
        });
      });
    });
  });
};
