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

    const setupStepper = (stepTitles) => {
      const stepper = new Stepper(fixture, stepTitles);

      const numberDivs = stepper.selection.selectAll('.hx-stepper-number');
      const progressBeforeDivs = stepper.selection.selectAll('.hx-stepper-progress-before');
      const progressAfterDivs = stepper.selection.selectAll('.hx-stepper-progress-after');
      const titleDivs = stepper.selection.selectAll('.hx-stepper-title');

      const steps = numberDivs.map((numberDiv, i) => ({
        number: i + 1,
        numberDiv: hx.select(numberDiv),
        progressBeforeDiv: hx.select(progressBeforeDivs.node(i)),
        progressAfterDiv: hx.select(progressAfterDivs.node(i)),
        titleDiv: hx.select(titleDivs.node(i)),
      }));

      return { stepper, steps };
    };

    const assertStepsWithAppliedClasses = (steps, expected) => {
      const doAssert = (selection, classToMatch, stepNos = []) => steps
        .filter(s => selection(s).classed(classToMatch)).map(s => s.number).should.eql(stepNos);

      doAssert(s => s.numberDiv, 'hx-stepper-number-selected', expected.numberSelected);
      doAssert(s => s.numberDiv, 'hx-stepper-number-complete', expected.numberComplete);
      doAssert(s => s.numberDiv, 'hx-stepper-number-error', expected.numberError);
      doAssert(s => s.progressBeforeDiv, 'hx-stepper-progress-complete', expected.progressBeforeComplete);
      doAssert(s => s.progressBeforeDiv, 'hx-stepper-progress-incomplete', expected.progressBeforeIncomplete);
      doAssert(s => s.progressAfterDiv, 'hx-stepper-progress-complete', expected.progressAfterComplete);
      doAssert(s => s.progressAfterDiv, 'hx-stepper-progress-incomplete', expected.progressAfterIncomplete);
      doAssert(s => s.titleDiv, 'hx-stepper-title-error', expected.titleError);
      doAssert(s => s.titleDiv, 'hx-stepper-title-hidden', expected.titleHidden);
    };

    const Errors = {
      tooFewSteps: 'Stepper: Expected at least two steps to display',
    };

    const Warnings = {
      noPrevStep: 'Stepper: There is no previous step',
      noNextStep: 'Stepper: There is no next step',
    };

    describe('when given no steps', () => {
      it('throws an error', () => {
        (() => setupStepper([])).should.throw(Errors.tooFewSteps);
      });
    });

    describe('when given one step', () => {
      it('throws an error', () => {
        (() => setupStepper(['Step 1'])).should.throw(Errors.tooFewSteps);
      });
    });

    describe('when given two steps', () => {
      let stepper;
      let steps;

      beforeEach(() => {
        ({ stepper, steps } = setupStepper(['Step 1', 'Step 2']));
      });

      it('the first step selected', () => {
        stepper.selectedStep().should.equal(1);
      });

      it('the correct classes are applied', () => {
        assertStepsWithAppliedClasses(steps, {
          numberSelected: [1],
          progressBeforeIncomplete: [2],
          progressAfterIncomplete: [1],
        });
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

      describe('then the nextStep() method is called twice', () => {
        beforeEach(() => {
          stepper.nextStep().nextStep();
        });

        it('the second step is selected', () => {
          stepper.selectedStep().should.equal(2);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with(Warnings.noNextStep);
        });
      });

      describe('then the step error flag is set', () => {
        beforeEach(() => {
          stepper.showError(true);
        });

        it('the correct classes are applied to show the error state', () => {
          assertStepsWithAppliedClasses(steps, {
            numberError: [1],
            progressBeforeIncomplete: [2],
            progressAfterIncomplete: [1],
            titleError: [1],
          });
        });

        describe('then the nextStep() method is called', () => {
          beforeEach(() => {
            stepper.nextStep();
          });

          it('the second step is selected', () => {
            stepper.selectedStep().should.equal(2);
          });

          it('the step error flag is cleared', () => {
            stepper.showError().should.equal(false);
          });

          it('the correct classes are applied', () => {
            assertStepsWithAppliedClasses(steps, {
              numberComplete: [1],
              numberSelected: [2],
              progressBeforeComplete: [2],
              progressAfterComplete: [1],
            });
          });
        });
      });

      describe('then the step titles are set to be hidden', () => {
        beforeEach(() => {
          stepper.showTitles(false);
        });

        it('the correct classes are applied to hide the titles', () => {
          assertStepsWithAppliedClasses(steps, {
            numberSelected: [1],
            progressBeforeIncomplete: [2],
            progressAfterIncomplete: [1],
            titleHidden: [1, 2],
          });
        });
      });
    });
  });
};
