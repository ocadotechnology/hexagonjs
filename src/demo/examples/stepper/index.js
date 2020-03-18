import { button, div, Stepper } from 'hexagon-js';

export default () => {
  const stepperDiv = div();

  const stepper = new Stepper(stepperDiv, [
    'First step title',
    'Second step title',
    'Third step: This has a title that may wrap onto multiple lines',
    'Fourth step title',
  ]);

  return div('stepper-demo')
    .add(div()
      .add(button('hx-btn')
        .text('Set step to 2')
        .on('click', () => stepper.selectedStep(2)))
      .add(button('hx-btn')
        .text('Previous Step')
        .on('click', () => stepper.prevStep()))
      .add(button('hx-btn')
        .text('Next Step')
        .on('click', () => stepper.nextStep()))
      .add(button('hx-btn')
        .text('Toggle Error')
        .on('click', () => stepper.showError(!stepper.showError())))
      .add(button('hx-btn')
        .text('Toggle Titles')
        .on('click', () => stepper.showTitles(!stepper.showTitles()))))
    .add('br')
    .add(stepperDiv);
};
