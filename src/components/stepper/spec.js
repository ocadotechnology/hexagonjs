import chai from 'chai';
import { Selection } from 'utils/selection';
import { div } from 'utils/selection';
import logger from 'utils/logger';

import { Stepper } from './index';

export default () => {
  describe('stepper', () => {
    const chaiSandbox = chai.spy.sandbox();

    beforeEach(() => {
      chaiSandbox.on(logger, 'warn', () => {});
    });

    afterEach(() => {
      chaiSandbox.restore();
    });

    function newStepper(_steps) {
      return new Stepper(div(), {
        steps: _steps,
      });
    }

    const Errors = {
      tooFewSteps: 'Stepper: Expected at least two steps to display',
      stepNumberOutOfRange: 'Stepper: Step number out of range',
    };

    const Warnings = {
      noPrevStep: 'Stepper: There is no previous step',
      noNextStep: 'Stepper: There is no next step',
    };

    describe('when given fewer than two steps', () => {
      it('throws an error for no steps', () => {
        (() => newStepper([])).should.throw(Errors.tooFewSteps);
      });

      it('throws an error for one step', () => {
        (() => newStepper(['Step 1'])).should.throw(Errors.tooFewSteps);
      });
    });

    describe('when given exactly two steps', () => {
      let stepper;
      beforeEach(() => {
        stepper = newStepper(['Step 1', 'Step 2']);
      });

      it('selected step number is initially 1', () => {
        stepper.selectedStep().should.equal(1);
      });

      describe('when the selected step is set to 0', () => {
        it('throws an error', () => {
          (() => stepper.selectedStep(0)).should.throw(Errors.stepNumberOutOfRange);
        });
      });

      describe('when the selected step is set to 2', () => {
        it('correctly updates the selectedStep property', () => {
          (() => stepper.selectedStep(2)).should.not.throw(Errors.stepNumberOutOfRange);
          stepper.selectedStep().should.equal(2);
        });
      });

      describe('when the selected step is set to 3', () => {
        it('throws an error', () => {
          (() => stepper.selectedStep(3)).should.throw(Errors.stepNumberOutOfRange);
        });
      });
    });

    describe('when given exactly four steps', () => {
      let stepper;
      beforeEach(() => {
        stepper = newStepper(['Step 1', 'Step 2', 'Step 3', 'Step 4']);
      });

      describe('when the first step is selected', () => {
        beforeEach(() => {
          stepper.selectedStep(1);
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
        });
      });

      describe('when the fourth step is selected', () => {
        beforeEach(() => {
          stepper.selectedStep(4);
        });

        describe('then the prevStep() method is called', () => {
          beforeEach(() => {
            stepper.prevStep();
          });

          it('the third step is selected', () => {
            stepper.selectedStep().should.equal(3);
          });
        });

        describe('then the nextStep() method is called', () => {
          beforeEach(() => {
            stepper.nextStep();
          });

          it('the fourth step is still selected', () => {
            stepper.selectedStep().should.equal(4);
          });

          it('logs a warning', () => {
            logger.warn.should.have.been.called.with(Warnings.noNextStep);
          });
        });
      });
    });
  });
};
