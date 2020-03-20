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

    const setupStepper = stepTitles => new Stepper(fixture, stepTitles);

    const assertStepsWithAppliedClasses = (stepTitles, expected) => {
      const stepper = setupStepper(stepTitles);

      const numberDivs = stepper.selection.selectAll('.hx-stepper-number');
      const progressBeforeDivs = stepper.selection.selectAll('.hx-stepper-progress-before');
      const progressAfterDivs = stepper.selection.selectAll('.hx-stepper-progress-after');
      const titleDivs = stepper.selection.selectAll('.hx-stepper-title');

      const steps = numberDivs.map((numberDiv, i) => ({
        stepNo: i + 1,
        numberDiv: select(numberDiv),
        progressBeforeDiv: select(progressBeforeDivs.node(i)),
        progressAfterDiv: select(progressAfterDivs.node(i)),
        titleDiv: select(titleDivs.node(i)),
      }));

      const doAssert = (selection, classToMatch, stepNos = [], appliedOn = '') => {
        const on = appliedOn.length ? `on "${appliedOn}" ` : '';
        const description = stepNos.length
          ? `class ${classToMatch} is applied ${on}for step ${stepNos.join(', ')}`
          : `class ${classToMatch} is not applied ${on}`;

        it(description, () => {
          steps.filter(s => selection(s)
            .classed(classToMatch))
            .map(s => s.stepNo)
            .should
            .eql(stepNos);
        });
      };

      doAssert(s => s.numberDiv, 'hx-stepper-number-selected', expected.numberSelected);
      doAssert(s => s.numberDiv, 'hx-stepper-number-complete', expected.numberComplete);
      doAssert(s => s.numberDiv, 'hx-stepper-number-error', expected.numberError);
      doAssert(s => s.progressBeforeDiv, 'hx-stepper-progress-complete', expected.progressBeforeComplete, 'progress before');
      doAssert(s => s.progressBeforeDiv, 'hx-stepper-progress-incomplete', expected.progressBeforeIncomplete, 'progress before');
      doAssert(s => s.progressAfterDiv, 'hx-stepper-progress-complete', expected.progressAfterComplete, 'progress after');
      doAssert(s => s.progressAfterDiv, 'hx-stepper-progress-incomplete', expected.progressAfterIncomplete, 'progress after');
      doAssert(s => s.titleDiv, 'hx-stepper-title-error', expected.titleError);
      doAssert(s => s.titleDiv, 'hx-stepper-title-hidden', expected.titleHidden);
    };

    const Errors = {
      tooFewSteps: 'Stepper: Expected at least two steps to display',
    };

    const Warnings = {
      noPrevStep: 'Stepper: There is no previous step',
      noNextStep: 'Stepper: There is no next step',
      invalidStep: (numSteps, selectedStep) => `Stepper: Provided expected a number between 1 and ${numSteps}. You provided: ${selectedStep}`,
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
      const stepTitles = ['Step 1', 'Step 2'];
      let stepper;

      beforeEach(() => {
        stepper = setupStepper(stepTitles);
      });

      it('the first step selected', () => {
        stepper.selectedStep().should.equal(1);
      });

      it('calling showTitles(...) with its current value is a no-op (for coverage)', () => {
        stepper.showTitles(stepper.showTitles()).showTitles().should.equal(true);
      });

      it('calling showError(...) with its current value is a no-op (for coverage)', () => {
        stepper.showError(stepper.showError()).showError().should.equal(false);
      });

      assertStepsWithAppliedClasses(stepTitles, {
        numberSelected: [1],
        progressBeforeIncomplete: [2],
        progressAfterIncomplete: [1],
      });

      describe('when setting the step to 3', () => {
        beforeEach(() => {
          stepper.selectedStep(3);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with(Warnings.invalidStep(stepTitles.length, 3));
        });
      });

      describe('when setting the step to 0', () => {
        beforeEach(() => {
          stepper.selectedStep(0);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with(Warnings.invalidStep(stepTitles.length, 0));
        });
      });

      describe('when setting the step to 1', () => {
        beforeEach(() => {
          stepper.selectedStep(1);
        });

        it('sets the step correctly', () => {
          stepper.selectedStep().should.equal(1);
        });
      });

      describe('when setting the step to 2', () => {
        beforeEach(() => {
          stepper.selectedStep(2);
        });

        it('sets the step correctly', () => {
          stepper.selectedStep().should.equal(2);
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

        it('the completed step is rendered with a check icon', () => {
          stepper.selection.selectAll('.hx-stepper-number-complete i.hx-icon-check')
            .nodes.length.should.equal(1);
        });

        it('the second step is selected', () => {
          stepper.selectedStep().should.equal(2);
        });

        it('logs a warning', () => {
          logger.warn.should.have.been.called.with(Warnings.noNextStep);
        });

        describe('then the step error flag is set', () => {
          beforeEach(() => {
            stepper.showError(true);
          });

          it('the step error flag is set', () => {
            stepper.showError().should.equal(true);
          });

          describe('then the prevStep() method is called', () => {
            beforeEach(() => {
              stepper.prevStep();
            });

            it('the first step is selected', () => {
              stepper.selectedStep().should.equal(1);
            });

            it('the step error flag is cleared', () => {
              stepper.showError().should.equal(false);
            });
          });
        });
      });

      describe('then the step error flag is set', () => {
        beforeEach(() => {
          stepper.showError(true);
        });

        assertStepsWithAppliedClasses(stepTitles, {
          numberError: [1],
          progressBeforeIncomplete: [2],
          progressAfterIncomplete: [1],
          titleError: [1],
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

          assertStepsWithAppliedClasses(stepTitles, {
            numberComplete: [1],
            numberSelected: [2],
            progressBeforeComplete: [2],
            progressAfterComplete: [1],
          });
        });
      });

      describe('then the step titles are set to be hidden', () => {
        beforeEach(() => {
          stepper.showTitles(false);
        });

        it('the titles are hidden', () => {
          stepper.showTitles().should.equal(false);
        });

        assertStepsWithAppliedClasses(stepTitles, {
          numberSelected: [1],
          progressBeforeIncomplete: [2],
          progressAfterIncomplete: [1],
          titleHidden: [1, 2],
        });
      });
    });
  });
};
