import { div, i, select } from 'utils/selection';
import logger from 'utils/logger';

class Stepper {
  constructor(selector, steps, options = {}) {
    this.selection = select(selector).classed('hx-stepper', true)
      .api('stepper', this)
      .api(this);

    this._ = {
      steps: [],
      suppressed: true,
      view: undefined,
    };

    this.options = options;

    this.steps(steps);
    this.selectedStep(options.selectedStep || 1);
    this.showTitles(options.showTitles || true);
    this.showError(options.showError || false);

    this._.suppressed = false;

    this.render();
  }

  steps(steps) {
    if (arguments.length) {
      if (steps.length < 2) {
        throw new Error('Stepper: Expected at least two steps to display');
      }
      this._.steps = steps;
      this.options.selectedStep = 1;
      this.render();
      return this;
    }
    return this._.steps;
  }

  selectedStep(selectedStep) {
    if (arguments.length) {
      const numSteps = this.steps().length;
      if (selectedStep && selectedStep > 0 && selectedStep <= numSteps) {
        this.options.selectedStep = selectedStep;
        this.options.showError = false;
        this.render();
      } else {
        logger.warn(`Stepper: Provided expected a number between 1 and ${numSteps}. You provided: ${selectedStep}`);
      }
      return this;
    }
    return this.options.selectedStep;
  }

  showTitles(showTitles) {
    if (arguments.length) {
      if (showTitles !== this.showTitles()) {
        this.options.showTitles = showTitles;
        this.render();
      }
      return this;
    }
    return this.options.showTitles;
  }

  prevStep() {
    if (this.selectedStep() > 1) {
      this.selectedStep(this.selectedStep() - 1);
    } else {
      logger.warn('Stepper: There is no previous step');
    }
    return this;
  }

  nextStep() {
    if (this.selectedStep() < this.steps().length) {
      this.selectedStep(this.selectedStep() + 1);
    } else {
      logger.warn('Stepper: There is no next step');
    }
    return this;
  }

  showError(showError) {
    if (arguments.length) {
      if (this.options.showError !== showError) {
        this.options.showError = showError;
        this.render();
      }
      return this;
    }
    return this.options.showError;
  }

  render() {
    if (this._.suppressed) {
      return this;
    }

    if (!this._.view) {
      this._.view = this.selection.view('.hx-stepper-step')
        .enter(function stepperEnter() {
          const enterSel = this;
          const stepNode = div('hx-stepper-step')
            .add(div('hx-stepper-progress-row')
              .add(div('hx-stepper-progress-before'))
              .add(div('hx-stepper-number'))
              .add(div('hx-stepper-progress-after')))
            .add(div('hx-stepper-title'));
          return enterSel.append(stepNode).node();
        })
        .update((step, node, nodeIndex) => {
          const stepNumber = nodeIndex + 1;
          const stepNode = select(node);
          const numSteps = this.steps().length;
          const selectedStep = this.selectedStep();
          const showError = this.showError();
          const showTitles = this.showTitles();

          const stepperNumber = stepNode.select('.hx-stepper-number')
            .classed('hx-stepper-number-selected', stepNumber === selectedStep && !showError)
            .classed('hx-stepper-number-error', stepNumber === selectedStep && showError)
            .classed('hx-stepper-number-complete', stepNumber < selectedStep);

          if (stepNumber < selectedStep) {
            stepperNumber.set([i('hx-icon hx-icon-check')]);
          } else {
            stepperNumber.text(stepNumber);
          }

          stepNode.select('.hx-stepper-progress-before')
            .classed('hx-stepper-progress-incomplete', stepNumber > 1 && stepNumber > selectedStep)
            .classed('hx-stepper-progress-complete', stepNumber > 1 && stepNumber <= selectedStep);

          stepNode.select('.hx-stepper-progress-after')
            .classed('hx-stepper-progress-incomplete', stepNumber < numSteps && stepNumber >= selectedStep)
            .classed('hx-stepper-progress-complete', stepNumber < numSteps && stepNumber < selectedStep);

          stepNode.select('.hx-stepper-title')
            .classed('hx-stepper-title-hidden', !showTitles)
            .classed('hx-stepper-title-error', stepNumber === selectedStep && showTitles && showError)
            .text(step);
        });
    }

    this._.view.apply(this.steps());

    return this;
  }
}

export {
  Stepper,
};
