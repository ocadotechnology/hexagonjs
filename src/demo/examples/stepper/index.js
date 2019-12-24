import { button, div, Stepper } from 'hexagon-js';

export default () => {
  const stepper = new Stepper(div().node(), [
    'First step title',
    'Second step title',
    'Third step: This has a title that may wrap onto multiple lines',
    'Fourth step title',
  ]);

  return div('stepper-demo')
    .add(stepper.selection)
    .add(div()
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
        .on('click', () => stepper.showTitles(!stepper.showTitles())))
    );
};
