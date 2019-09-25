import { select, div } from 'utils/selection';
import logger from 'utils/logger';
import { mergeDefined } from 'utils/utils';

class Stepper {
  constructor(selector, titles, options) {
    this._ = {
      steps: [],
      selectedStep: -1,
      selection: select(selector),
    };

    this.options = mergeDefined({
      showTitles: true,
    }, options);

    this.titles(titles);
    this.showTitles(this.options.showTitles);
  }

  _getStep(stepNo) {
    if (stepNo < 1 || stepNo > this.titles().length) {
      throw new Error('Stepper: Step number out of range');
    }
    return this._.steps[stepNo - 1];
  }

  titles(titles) {
    if (arguments.length) {
      if (titles.length < 2) {
        throw new Error('Stepper: Expected at least two steps to display');
      }
      this._.steps = titles.map(t => ({
        title: t,
        state: 'default',
      }));
      this.selectedStep(1);
      this.render();
      return this;
    }
    return this._.steps.map(step => step.title);
  }

  state(stepNo, state) {
    if (arguments.length >= 2) {
      this._getStep(stepNo).state = state;
      this.render();
      return this;
    }
    return this._getStep(stepNo).state;
  }

  selectedStep(selectedStep) {
    if (arguments.length) {
      if (selectedStep !== this.selectedStep()) {
        this._getStep(selectedStep);
        this._.selectedStep = selectedStep;
        this.render();
      }
      return this;
    }
    return this._.selectedStep;
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
    if (this.selectedStep() < this.titles().length) {
      this.selectedStep(this.selectedStep() + 1);
    } else {
      logger.warn('Stepper: There is no next step');
    }
  }

  render() {
    this._.selection.text(JSON.stringify(this));
  }
}

export {
  Stepper,
};
