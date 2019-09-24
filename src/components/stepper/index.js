import { select, div } from 'utils/selection';
import logger from 'utils/logger';
import { mergeDefined } from 'utils/utils';

class Stepper {
  constructor(selector, options) {
    this.selection = select(selector);

    this.options = mergeDefined({
      steps: [],
      selectedStep: 1,
      showTitles: true,
    }, options);

    this.steps(this.options.steps);
    this.selectedStep(this.options.selectedStep);
    this.showTitles(this.options.showTitles);
  }

  steps(steps) {
    if (arguments.length) {
      if (steps.length < 2) {
        throw new Error('Stepper: Expected at least two steps to display');
      }
      this.options.steps = steps;
      this.render();
      return this;
    }
    return this.options.steps;
  }

  selectedStep(selectedStep) {
    if (arguments.length) {
      if (selectedStep !== this.selectedStep()) {
        if (selectedStep < 1 || selectedStep > this.steps().length) {
          throw new Error('Stepper: Step number out of range');
        }
        this.options.selectedStep = selectedStep;
        this.render();
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
  }

  nextStep() {
    if (this.selectedStep() < this.steps().length) {
      this.selectedStep(this.selectedStep() + 1);
    } else {
      logger.warn('Stepper: There is no next step');
    }
  }

  render() {
    this.selection.text('HELLO');
  }
}

export {
  Stepper,
};
