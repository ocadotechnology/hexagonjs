
import {
  progressVisualizationBar, ProgressVisualizationBar, VisualizationBarSizes,
} from 'hexagon-js';
import { div } from 'utils/selection';

const randNum = max => Math.round(Math.random() * max);
const rand = max => (e) => {
  e.progress(randNum(max));
};

export default () => {
  const selectionWithMax = div();
  const selectionErrored = div();
  const selectionWithoutMax = div();
  const selectionWithContent = div();
  const selectionWithLabels = div();
  const selectionSmall = div();

  const mocks = [
    [new ProgressVisualizationBar(selectionWithMax.node(), {
      progress: 5,
      buffer: 2,
      max: 20,
      bufferLabel: 'Label of buffer',
      progressLabel: 'Label of Progress',
      balanceLabel: 'Label of balance',
      content: 'Long Content',
      withPercent: true,
      withMax: true,
      size: VisualizationBarSizes.SMALL,
      title: 'With maximum value',
    }), rand(20)],
    [new ProgressVisualizationBar(selectionErrored.node(), {
      title: 'With maximum value', buffer: 5, progress: 10, max: 20, withPercent: true,
    }), el => el.valid(!el.valid())],
    [new ProgressVisualizationBar(selectionWithoutMax.node(), {
      title: 'Without maximum value', buffer: 2, progress: 5, withPercent: true, withMax: false,
    }), rand(20)],
    [new ProgressVisualizationBar(selectionWithContent.node(), {
      title: 'With content', buffer: 2, progress: 5, withPercent: true, content: 'Hello world!',
    }), rand(20)],
    [new ProgressVisualizationBar(selectionWithLabels.node(), {
      title: 'With labels content',
      buffer: 2,
      progress: 5,
      max: 100,
      withPercent: true,
      content: 'Hello world!',
      progressLabel: 'Progress',
      bufferLabel: 'Buffer Long Text!',
      balanceLabel: 'Balance',
    }), rand(1000)],
    [new ProgressVisualizationBar(selectionSmall.node(), {
      size: VisualizationBarSizes.SMALL,
      title: 'Small progress bar',
      buffer: 2,
      progress: 5,
      max: 100,
      withPercent: true,
      content: 'Hello world!',
      progressLabel: 'Progress',
      bufferLabel: 'Buffer Long Text!',
      balanceLabel: 'Balance',
    }), rand(100)],
  ];

  setInterval(() => {
    mocks.forEach(([el, cb]) => cb(el));
  }, 1000);

  return [
    progressVisualizationBar({
      progress: 18,
      buffer: 2,
      max: 20,
      content: 'Long Content',
      withPercent: true,
      withMax: true,
      title: 'With maximum value',
    }),
    progressVisualizationBar({
      title: 'With disabled state',
      buffer: 2,
      value: 1,
      max: 20,
      disabled: true,
      content: 'Hello world!',
    }),
    progressVisualizationBar({
      title: 'With small label',
      buffer: 2,
      progress: 1,
      max: 20,
      content: 'Hello world!',
      withPercent: true,
      progressLabel: 'Long label with lot of words',
      bufferLabel: 'The same long-text label',
      balanceLabel: 'Here is balance label text',
    }),
    selectionErrored.node(),
    selectionWithMax.node(),
    selectionWithoutMax.node(),
    selectionWithContent.node(),
    selectionWithLabels.node(),
    selectionSmall.node(),
  ];
};
