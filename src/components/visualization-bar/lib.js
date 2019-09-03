import { div, span } from 'utils/selection';

let BarParts;
(function (BarParts) {
    BarParts[BarParts["WRAPPER"] = 0] = "wrapper";
    BarParts[BarParts["FILL"] = 1] = "fill";
    BarParts[BarParts["LABEL"] = 2] = "label";
    BarParts[BarParts["PROGRESS"] = 3] = "progress";
    BarParts[BarParts["LABEL_TEXT"] = 4] = "label_text";
    BarParts[BarParts["LABEL_PERCENT"] = 5] = "label_percent";
})(BarParts || (BarParts = {}));


let BarTypes;
(function (BarTypes) {
    BarTypes[BarTypes["PROGRESS"] = 0] = "progress";
    BarTypes[BarTypes["BUFFER"] = 1] = "buffer";
    BarTypes[BarTypes["BALANCE"] = 2] = "balance";
})(BarTypes || (BarTypes = {}));

const generateGroup = title => new Map([
    [BarParts.WRAPPER, div(`hx-visualization-bar-${title} hx-visualization-bar-p-wrapper`)],
    [BarParts.FILL, div(`hx-visualization-bar-fill hx-visualization-bar-${title}-fill`)],
    [BarParts.PROGRESS, span(`hx-visualization-bar-${title}-info hx-visualization-bar-${title}-progress-info`)],
    [BarParts.LABEL, div(`hx-visualization-bar-label hx-visualization-bar-${title}-label`)],
    [BarParts.LABEL_PERCENT, span('hx-visualization-bar-label-percent')],
    [BarParts.LABEL_TEXT, span('hx-visualization-bar-label-text')],
]);

export {
    BarTypes,
    BarParts,
    generateGroup
}