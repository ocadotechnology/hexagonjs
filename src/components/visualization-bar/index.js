import { select, div } from 'utils/selection';
import { mergeDefined, defined } from 'utils/utils';
import { BarTypes, BarParts, generateGroup } from './lib';

/**
 * 
 */
export class VisualizationBar {
    constructor(selector, options) {
        this.percents = {
            [BarTypes.PROGRESS]: 0,
            [BarTypes.BUFFER]: 0,
            [BarTypes.BALANCE]: 100
        }

        this.options = mergeDefined({
            value: 0,
            secondary: false,
            max: undefined,
            buffer: 0,
            valid: true,
            content: '',
            disabled: false,
            withPercent: false,
            progressLabel: '',
            bufferLabel: '',
            balanceLabel: ''
        }, options);

        this.selection = select(selector)
            .classed('hx-visualization-bar', true)
            .classed('hx-visualization-bar-secondary', this.options.secondary);

        this.header = div('hx-visualization-bar-header');
        this.titleElement = div('hx-header-small');
        this.countElement = div('hx-header-small');

        this.body = div('hx-visualization-bar-body hx-animate');
        this.fillWrapper = div('hx-visualization-bar-fill-wrapper');
        this.labelWrapper = div('hx-visualization-bar-label-wrapper');
        this.mainElements = {
            [BarTypes.PROGRESS]: generateGroup(BarTypes[BarTypes.PROGRESS]),
            [BarTypes.BUFFER]: generateGroup(BarTypes[BarTypes.BUFFER]),
            [BarTypes.BALANCE]: generateGroup(BarTypes[BarTypes.BALANCE])
        };

        this.progressElementsMap = this.mainElements[BarTypes.PROGRESS];
        this.bufferElementsMap = this.mainElements[BarTypes.BUFFER];
        this.balanceElementsMap = this.mainElements[BarTypes.BALANCE];

        this.contentElement = div('hx-visualization-bar-content');

        this.selection.add(this.header);
        this.header.add(div('hx-visualization-bar-title').add(this.titleElement));
        this.header.add(div('hx-visualization-bar-count').add(this.countElement));
        this.selection.add(this.body);
        this.body.add(this.fillWrapper).add(this.labelWrapper);

        this.initFill();
        this.initLabels();

        this.selection.add(this.contentElement);
        this.selection.api('visualization-bar', this).api(this);

        this.title(this.options.title);
        this.progress(this.options.value);
        this.buffer(this.options.buffer);
        this.content(this.options.content);
        this.disabled(this.options.disabled);
        this.valid(this.options.valid);

        this.updateLabel(BarTypes.PROGRESS, this.options.progressLabel);
        this.updateLabel(BarTypes.BUFFER, this.options.bufferLabel);
        this.updateLabel(BarTypes.BALANCE, this.options.balanceLabel);
    }

    /**
       * Setter of title property
       * @param {string} value
       */
    title(value) {
        this.titleElement.text(value);
    }

    /**
       * Setter of progress property
       * @param {number} value
       */
    progress(value) {
        this.options.value = value;
        this.progressElementsMap.get(BarParts.PROGRESS).text(value || '');
        this.checkBuffer(value);
        this.update();
    }

    /**
       * Setter of buffer property
       * @param {number} value
       */
    buffer(value) {
        this.options.buffer = value;
        this.bufferElementsMap.get(BarParts.PROGRESS).text(value || '');
        this.update();
    }

    /**
       * Get/Set max
       * @param {number} value
       */
    max(value) {
        if (defined(value)) {
            this.options.max = value;
            this.progress(this.options.value);
            this.buffer(this.options.buffer);
        }
        return this.options.max ? this.options.max : this.options.value + this.options.buffer;
    }

    /**
       * Setter of content property
       * @param {string} value
       */
    content(value) {
        if (defined(value)) {
            this.contentElement.text(value);
            return value;
        } else {
            throw new Error('You should pass value to set property!');
        }
    }

    /**
       * Setter of invalid property
       * @param {boolean} value
       */
    invalid(value) {
        if (defined(value)) {
            return this.valid(!value);
        } else {
            throw new Error('You should pass value to set property!');
        }
    }

    /**
       * Get/Set of valid property
       * @param {boolean} value
       */
    valid(value) {
        if (defined(value)) {
            this.options.valid = Boolean(value);
            this.selection.classed('error', !this.options.valid);
        }
        return this.options.valid;
    }

    /**
       * Get/Set of disabled property
       * @param {boolean} value
       */
    disabled(value) {
        if (defined(value)) {
            this.options.disabled = Boolean(value);
            this.selection.classed('disabled', this.options.disabled);
        }
        return this.options.disabled;
    }

    disable() {
        this.disabled(true);
    }

    enable() {
        this.disabled(false);
    }

    error() {
        this.invalid(true);
    }

    updateLabel(labelType, value) {
        if (!defined(BarTypes[labelType])) {
            throw new Error('You should choose one of types from BarTypes enum');
        }

        this.mainElements[labelType].get(BarParts.LABEL_TEXT).text(this.percents[labelType] ? value : '');
    }

    updateLabelPercent(labelType) {
        if (!defined(BarTypes[labelType])) {
            throw new Error('You should choose one of types from BarTypes enum');
        }

        if (this.options.withPercent) {
            this.mainElements[labelType].get(BarParts.LABEL_PERCENT)
                .text(this.percents[labelType] ? `(${this.percents[labelType]}%)` : '');
        }
    }

    initFill() {
        this.fillWrapper.add(
            this.progressElementsMap.get(BarParts.WRAPPER).add(
                this.progressElementsMap.get(BarParts.FILL)
                    .add(this.progressElementsMap.get(BarParts.PROGRESS)),
            )
        ).add(
            this.bufferElementsMap.get(BarParts.WRAPPER).add(
                this.bufferElementsMap.get(BarParts.FILL)
                    .add(this.bufferElementsMap.get(BarParts.PROGRESS)),
            )
        ).add(
            this.balanceElementsMap.get(BarParts.WRAPPER).add(
                this.balanceElementsMap.get(BarParts.FILL)
                    .add(this.balanceElementsMap.get(BarParts.PROGRESS)),
            )
        );
    }

    initLabels() {
        this.labelWrapper.add(
            this.progressElementsMap.get(BarParts.LABEL)
                .add(this.progressElementsMap.get(BarParts.LABEL_TEXT))
                .add(this.progressElementsMap.get(BarParts.LABEL_PERCENT))
        ).add(
            this.bufferElementsMap.get(BarParts.LABEL)
                .add(this.bufferElementsMap.get(BarParts.LABEL_TEXT))
                .add(this.bufferElementsMap.get(BarParts.LABEL_PERCENT))
        ).add(
            this.balanceElementsMap.get(BarParts.LABEL)
                .add(this.balanceElementsMap.get(BarParts.LABEL_TEXT))
                .add(this.balanceElementsMap.get(BarParts.LABEL_PERCENT))
        );
    }

    checkBuffer() {
        const { buffer, value, max = this.options.value + this.options.buffer } = this.options;
        const sum = buffer + value;
        if (max && (sum > max)) {
            this.buffer(max - value);
        }
    }

    update() {
        const { value, buffer, max } = this.options;
        this.percents[BarTypes.PROGRESS] = Math.round((value * 100) / this.max());
        this.percents[BarTypes.BUFFER] = Math.round((buffer * 100) / this.max());
        this.percents[BarTypes.BALANCE] = max ? Math.round(100 - this.percents[BarTypes.BUFFER] - this.percents[BarTypes.PROGRESS]) : 0;
        this.updateProgressFill();
        this.updateBufferFill();
        this.updateBalanceFill();
        this.updateLabelPercent(BarTypes.PROGRESS);
        this.updateLabelPercent(BarTypes.BUFFER);
        this.updateLabelPercent(BarTypes.BALANCE);
        this.updateCount();
    }

    updateProgressFill() {
        this.progressElementsMap.get(BarParts.WRAPPER).style('width', `${this.percents[BarTypes.PROGRESS]}%`);
        this.progressElementsMap.get(BarParts.LABEL).style('width', `${this.percents[BarTypes.PROGRESS]}%`);
        this.body.classed('hx-without-progress', this.percents[BarTypes.PROGRESS] === 0);
    }

    updateBufferFill() {
        this.bufferElementsMap.get(BarParts.WRAPPER).style('width', `${this.percents[BarTypes.BUFFER]}%`);
        this.bufferElementsMap.get(BarParts.LABEL).style('width', `${this.percents[BarTypes.BUFFER]}%`);
        this.body.classed('hx-without-buffer', this.percents[BarTypes.BUFFER] === 0);
    }

    updateBalanceFill() {
        const { value, buffer, max } = this.options;
        const balance = this.percents[BarTypes.BALANCE];
        this.balanceElementsMap.get(BarParts.WRAPPER).style('width', `${balance ? balance : 0}%`);
        this.balanceElementsMap.get(BarParts.PROGRESS).text((balance ? max - value - buffer : '') || '');
        this.balanceElementsMap.get(BarParts.LABEL).style('width', `${balance}%`);
        this.balanceElementsMap.get(BarParts.FILL).classed('inversed-text-color', true);
        this.body.classed('hx-without-balance', balance === 0);
    }

    updateCount() {
        this.countElement.text(`${this.options.value}/${this.options.max || '-'}`);
    }
}


export const visualizationBar = (options) => {
    const selection = div();
    new VisualizationBar(selection.node(), options);
    return selection;
};
