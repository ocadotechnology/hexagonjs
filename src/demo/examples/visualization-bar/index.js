
import { visualizationBar, VisualizationBar, VisualizationBarSizes } from 'hexagon-js';
import { div } from 'utils/selection';

const rand = max => e => e.progress(Math.round(Math.random() * max));

export default () => {
  const selectionWithMax = div();
  const selectionErrored = div();
  const selectionWithoutMax = div();
  const selectionWithContent = div();
  const selectionWithLabels = div();
  const selectionSmall = div();

  const mocks = [
    // [new VisualizationBar(selectionWithMax.node(), {
    //   title: 'With maximum value', buffer: 2, value: 5, max: 20,
    // }), rand(20)],
    // [new VisualizationBar(selectionErrored.node(), {
    //   title: 'With maximum value', buffer: 5, value: 10, max: 20, withPercent: true,
    // }), el => el.valid(!el.valid())],
    // [new VisualizationBar(selectionWithoutMax.node(), {
    //   title: 'Without maximum value', buffer: 2, value: 5, withPercent: true,
    // }), rand(20)],
    // [new VisualizationBar(selectionWithContent.node(), {
    //   title: 'With content', buffer: 2, value: 5, withPercent: true, content: 'Hello world!',
    // }), rand(20)],
    // [new VisualizationBar(selectionWithLabels.node(), {
    //   title: 'With labels content',
    //   buffer: 2,
    //   value: 5,
    //   max: 100,
    //   withPercent: true,
    //   content: 'Hello world!',
    //   progressLabel: 'Progress',
    //   bufferLabel: 'Buffer Long Text!',
    //   balanceLabel: 'Balance',
    // }), rand(20)],
    [new VisualizationBar(selectionSmall.node(), {
      size: VisualizationBarSizes.SMALL,
      title: 'Small progress bar',
      buffer: 2,
      value: 5,
      max: 100,
      withPercent: true,
      content: 'Hello world!',
      progressLabel: 'Progress',
      bufferLabel: 'Buffer Long Text!',
      balanceLabel: 'Balance',
    }), rand(20)],
  ];

  setInterval(() => {
    mocks.forEach(([el, cb]) => cb(el));
  }, 1000);

  return [
    // visualizationBar({
    //   title: 'With maximum value static', buffer: 2, value: 1, max: 20,
    // }),
    // visualizationBar({
    //   title: 'With disabled state',
    //   buffer: 2,
    //   value: 1,
    //   max: 20,
    //   disabled: true,
    //   content: 'Hello world!',
    // }),
    // visualizationBar({
    //   title: 'With small label',
    //   buffer: 2,
    //   value: 1,
    //   max: 20,
    //   content: 'Hello world!',
    //   withPercent: true,
    //   progressLabel: 'Long label with lot of words',
    //   bufferLabel: 'The same long-text label',
    //   balanceLabel: 'Here is balance label text',
    // }),
    // selectionErrored.node(),
    // selectionWithMax.node(),
    // selectionWithoutMax.node(),
    // selectionWithContent.node(),
    // selectionWithLabels.node(),
    selectionSmall.node(),
  ];
};
