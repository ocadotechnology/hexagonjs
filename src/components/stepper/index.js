import { div, select, } from 'utils/selection';
import logger from 'utils/logger';
import { mergeDefined } from 'utils/utils';

class Stepper {
  constructor(selector, titles, options) {
    this.selection = select(selector).classed('hx-stepper', true);

    this._ = {
      titles: [],
      selectedStep: -1,
      showError: false,
    };

    this.options = mergeDefined({
      showTitles: true,
    }, options);

    this.titles(titles);
  }

  titles(titles) {
    if (arguments.length) {
      if (titles.length < 2) {
        throw new Error('Stepper: Expected at least two steps to display');
      }
      this._.titles = titles;
      this._.selectedStep = 1;
      this.render();
      return this;
    }
    return this._.titles;
  }

  selectedStep() {
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
      this._.selectedStep -= 1;
      this._.showError = false;
      this.render();
    } else {
      logger.warn('Stepper: There is no previous step');
    }
    return this;
  }

  nextStep() {
    if (this.selectedStep() < this.titles().length) {
      this._.selectedStep += 1;
      this._.showError = false;
      this.render();
    } else {
      logger.warn('Stepper: There is no next step');
    }
    return this;
  }

  showError(showError) {
    if (arguments.length) {
      if (this._.showError !== showError) {
        this._.showError = showError;
        this.render();
      }
      return this;
    }
    return this._.showError;
  }

  render() {
    const numSteps = this.titles().length;
    const selectedStep = this.selectedStep();
    const showError = this.showError();
    const showTitles = this.showTitles();

    this.selection.set(
      this.titles().map((title, index) => {
        const stepNo = index + 1;
        return div()
          .classed('hx-stepper-step', true)
          .add(div()
            .classed('hx-stepper-progress-row', true)
            .add(div()
              .classed('hx-stepper-progress-spacer', stepNo === 1)
              .classed('hx-stepper-progress-incomplete', stepNo > 1 && stepNo > selectedStep)
              .classed('hx-stepper-progress-complete', stepNo > 1 && stepNo <= selectedStep))
            .add(div()
              .classed('hx-stepper-number-default', stepNo > selectedStep)
              .classed('hx-stepper-number-selected', stepNo === selectedStep && !showError)
              .classed('hx-stepper-number-error', stepNo === selectedStep && showError)
              .classed('hx-stepper-number-complete', stepNo < selectedStep)
              .text((stepNo < selectedStep) ? 'X' : stepNo))
            .add(div()
              .classed('hx-stepper-progress-spacer', stepNo === numSteps)
              .classed('hx-stepper-progress-incomplete', stepNo < numSteps && stepNo >= selectedStep)
              .classed('hx-stepper-progress-complete', stepNo < numSteps && stepNo < selectedStep)))
          .add(div()
            .classed('hx-stepper-title-normal', showTitles && !(stepNo === selectedStep && showError))
            .classed('hx-stepper-title-hidden', !showTitles)
            .classed('hx-stepper-title-error', stepNo === selectedStep && showTitles && showError)
            .text(title));
      }),
    );
  }
}

export {
  Stepper,
};
