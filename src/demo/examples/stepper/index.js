import { div, button, Stepper } from 'hexagon-js';

export default () => {
  const s = div();

  const titles = [
    'Short title',
    'Much longer title',
    'A title that may reach the full width of step',
    'A-very-long-word-and-a a title that goes onto two lines might look like this',
  ];

  const stepper = new Stepper(s.append(div()), titles);

  s.add(button('hx-btn').text('Prev Step').on('click', () => stepper.prevStep()))
    .add(button('hx-btn').text('Next Step').on('click', () => stepper.nextStep()))
    .add(button('hx-btn').text('Toggle Error').on('click', () => stepper.showError(!stepper.showError())))
    .add(button('hx-btn').text('Toggle Titles').on('click', () => stepper.showTitles(!stepper.showTitles())));

  return s;
};
