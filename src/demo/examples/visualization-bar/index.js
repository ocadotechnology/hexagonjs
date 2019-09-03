
import { visualizationBar, VisualizationBar } from 'hexagon-js';
import { div } from 'utils/selection';

export default () => {
  const selectionWithMax = div();
  const selectionWithoutMax = div();
  const selectionWithContent = div();

  const arrWithMock = [
    new VisualizationBar(selectionWithMax.node(), {
      title: 'With maximum value', buffer: 2, value: 5, max: 20,
    }),
    new VisualizationBar(selectionWithoutMax.node(), {
      title: 'Without maximum value', buffer: 2, value: 5, withPercent: true,
    }),
    new VisualizationBar(selectionWithContent.node(), {
      title: 'With content', buffer: 2, value: 5, withPercent: true, content: 'Hello world!',
    }),
  ];

  setInterval(() => {
    arrWithMock.forEach(e => e.progress(Math.round(Math.random() * 20)));
  }, 1000);

  return [
    visualizationBar({
      title: 'With maximum value static', buffer: 2, value: 1, max: 20,
    }),
    visualizationBar({
      title: 'With disabled state', buffer: 2, value: 1, max: 20, disabled: true, content: 'Hello world!',
    }),
    selectionWithMax.node(),
    selectionWithoutMax.node(),
    selectionWithContent.node(),
  ];
};
