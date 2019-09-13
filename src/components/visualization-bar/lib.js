import { div, span } from 'utils/selection';


export const VisualizationBarParts = (function () {
  const BarParts = {};
  BarParts[BarParts.WRAPPER = 0] = 'wrapper';
  BarParts[BarParts.FILL = 1] = 'fill';
  BarParts[BarParts.LABEL = 2] = 'label';
  BarParts[BarParts.PROGRESS = 3] = 'progress';
  BarParts[BarParts.LABEL_TEXT = 4] = 'label_text';
  BarParts[BarParts.LABEL_PERCENT = 5] = 'label_percent';
  return BarParts;
}({}));

export const VisualizationBarSizes = (function () {
  const BarSizes = {};
  BarSizes[BarSizes.SMALL = 0] = 'small-bar';
  BarSizes[BarSizes.STANDARD = 1] = 'standard-bar';
  return BarSizes;
}({}));

export const VisualizationBarSizesList = [
  VisualizationBarSizes.SMALL,
  VisualizationBarSizes.STANDARD,
];

export const VisualizationBarTypes = (function () {
  const BarTypes = {};
  BarTypes[BarTypes.PROGRESS = 0] = 0;
  BarTypes[BarTypes.BUFFER = 1] = 1;
  BarTypes[BarTypes.BALANCE = 2] = 2;
  return BarTypes;
}({}));

export const VisualizationBarTypesList = [
  VisualizationBarTypes.PROGRESS,
  VisualizationBarTypes.BUFFER,
  VisualizationBarTypes.BALANCE,
];

export const generateGroup = (title, color) => new Map([
  [VisualizationBarParts.WRAPPER, div(`hx-visualization-bar-${title} hx-visualization-bar-p-wrapper`)],
  [VisualizationBarParts.FILL, div(`hx-visualization-bar-fill hx-visualization-bar-${title}-fill hx-background-${color}`)],
  [VisualizationBarParts.PROGRESS, span(`hx-visualization-bar-${title}-info hx-visualization-bar-${title}-progress-info`)],
  [VisualizationBarParts.LABEL, div(`hx-visualization-bar-label hx-visualization-bar-${title}-label`)],
  [VisualizationBarParts.LABEL_PERCENT, div('hx-visualization-bar-label-percent')],
  [VisualizationBarParts.LABEL_TEXT, div('hx-visualization-bar-label-text')],
]);
