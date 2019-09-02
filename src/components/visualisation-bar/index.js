import { select, div, span, h } from 'utils/selection';
import { mergeDefined } from 'utils/utils';

const wrapper = 'wrapper',
    fill = 'fill',
    label = 'label',
    progress = 'progress',
    labelText = 'label-text',
    labelPc = 'label-percents';

const elementsGroup = title => new Map([
    [wrapper, div(`hx-visualisation-bar-${title} hx-visualisation-bar-p-wrapper`)],
    [fill, div(`hx-visualisation-bar-fill hx-visualisation-bar-${title}-fill`)],
    [progress, span(`hx-visualisation-bar-${title}-info hx-visualisation-bar-${title}-progress-info`)],
    [label, div(`hx-visualisation-bar-label hx-visualisation-bar-${title}-label`)],
    [labelPc, span('hx-visualisation-bar-label-percent')],
    [labelText, span('hx-visualisation-bar-label-text')],

])

/**
 * 
 */
export class VisualisationBar {
    constructor(selector, options) {
        this.__progress = 0;
        this.__buffer = 0;

        this.options = mergeDefined({
            value: 0,
            max: undefined,
            buffer: 0,
            valid: true,
            content: '',
            mock: false,
            disabled: false,
            withPercent: false
        }, options);

        this.selection = select(selector).classed('hx-visualisation-bar', true);
        this.header = div('hx-visualisation-bar-header');
        this.titleElement = h(3);
        this.countElement = h(3);

        this.body = div('hx-visualisation-bar-body hx-animate');
        this.fillWrapper = div('hx-visualisation-bar-fill-wrapper');
        this.labelWrapper = div('hx-visualisation-bar-label-wrapper');
        this.progressElementsMap = elementsGroup('progress');
        this.bufferElementsMap = elementsGroup('buffer');
        this.balanceElementsMap = elementsGroup('balance');

        this.contentElement = div('hx-visualisation-bar-content');

        this.selection.add(this.header);
        this.header.add(div('hx-visualisation-bar-title').add(this.titleElement));
        this.header.add(div('hx-visualisation-bar-count').add(this.countElement));
        this.selection.add(this.body);
        this.body.add(this.fillWrapper).add(this.labelWrapper);

        this.initFill();
        this.initLabels();

        this.selection.add(this.contentElement);
        this.selection.api('visualisation-bar', this).api(this);
        this.title = this.options.title;
        this.progress = this.options.value;
        this.buffer = this.options.buffer;
        this.content = this.options.content;
        this.disabled = this.options.disabled;
        this.valid = this.options.valid;

        if (this.options.mock && this.options.valid && !this.options.disabled) {
            setInterval(() => {
                this.progress = Math.round(Math.random() * 20);
            }, 1000);
        }
    }

    set title(value) {
        this.titleElement.text(value);
    }

    set progress(value) {
        this.options.value = value;
        this.progressElementsMap.get(progress).text(value || '');
        this.checkBuffer(value);
        this.update();
    }

    set buffer(value) {
        this.options.buffer = value;
        this.bufferElementsMap.get(progress).text(value || '');
        this.update();
    }

    set max(value) {
        this.options.max = value;
        this.progress = this.options.value;
        this.buffer = this.options.buffer;
    }

    get max() {
        return this.options.max ? this.options.max : this.options.value + this.options.buffer;
    }

    set content(value) {
        this.contentElement.text(value);
    }

    set invalid(value) {
        this.valid = !value;
    }

    set valid(value) {
        this.options.valid = Boolean(value);
        this.selection.classed('error', !this.options.valid);
    }

    get valid() {
        return this.options.valid;
    }

    set disabled(value) {
        this.options.disabled = Boolean(value);
        this.selection.classed('disabled', this.options.disabled);
    }

    get disabled() {
        return this.options.disabled;
    }

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
    }

    error() {
        this.invalid = true;
    }

    initFill() {
        this.fillWrapper.add(
            this.progressElementsMap.get(wrapper).add(
                this.progressElementsMap.get(fill).add(this.progressElementsMap.get(progress))
            )
        );
        this.fillWrapper.add(
            this.bufferElementsMap.get(wrapper).add(
                this.bufferElementsMap.get(fill).add(this.bufferElementsMap.get(progress))
            )
        );
        this.fillWrapper.add(
            this.balanceElementsMap.get(wrapper).add(
                this.balanceElementsMap.get(fill).add(this.balanceElementsMap.get(progress))
            )
        );
    }

    initLabels() {
        this.labelWrapper.add(
            this.progressElementsMap.get(label)
                .add(this.progressElementsMap.get(labelPc).add(this.progressElementsMap.get(labelText)))
        ).add(
            this.bufferElementsMap.get(label)
                .add(this.bufferElementsMap.get(labelPc).add(this.bufferElementsMap.get(labelText)))
        ).add(
            this.balanceElementsMap.get(label)
                .add(this.balanceElementsMap.get(labelPc).add(this.balanceElementsMap.get(labelText)))
        );
    }

    checkBuffer() {
        const { buffer, value, max = this.options.value + this.options.buffer } = this.options;
        const sum = buffer + value;
        if (max && (sum > max)) {
            this.buffer = max - value;
        }
    }

    update() {
        const { value: progress, buffer, max } = this.options;
        this.__progress = Math.round((progress * 100) / this.max);
        this.__buffer = Math.round((buffer * 100) / this.max);
        this.__balance = max ? Math.round(100 - this.__buffer - this.__progress) : 0;
        this.updateProgressFill();
        this.updateBufferFill();
        this.updateBalanceFill()
        this.updateProgressLabel();
        this.updateBufferLabel();
        this.updateBalanceLabel();
        this.updateCount();
    }

    updateProgressFill() {
        this.progressElementsMap.get(wrapper).style('width', `${this.__progress}%`);
        this.progressElementsMap.get(label).style('width', `${this.__progress}%`);
        this.body.classed('without-progress', this.__progress === 0);
    }

    updateBufferFill() {
        this.bufferElementsMap.get(wrapper).style('width', `${this.__buffer}%`);
        this.bufferElementsMap.get(label).style('width', `${this.__buffer}%`);
        this.body.classed('without-buffer', this.__buffer === 0);
    }

    updateBalanceFill() {
        const { value, buffer, max } = this.options;
        this.balanceElementsMap.get(wrapper).style('width', `${this.__balance ? this.__balance : 0}%`);
        this.balanceElementsMap.get(progress).text((this.__balance ? max - value - buffer : '') || '');
        this.balanceElementsMap.get(label).style('width', `${this.__balance}%`);
        this.balanceElementsMap.get(fill).classed('inversed-text-color', true);
        this.body.classed('without-balance', this.__balance === 0);
    }

    updateProgressLabel() {
        if (this.options.withPercent) {
            this.progressElementsMap.get(labelPc).text(this.__progress ? `(${this.__progress}%)` : '')
        }
    }

    updateBufferLabel() {
        if (this.options.withPercent) {
            this.bufferElementsMap.get(labelPc).text(this.__buffer ? `(${this.__buffer}%)` : '')
        }
    }

    updateBalanceLabel() {
        if (this.options.withPercent) {
            this.balanceElementsMap.get(labelPc).text(this.__balance ? `(${this.__balance}%)` : '')
        }
    }

    updateCount() {
        this.countElement.text(`${this.options.value}/${this.options.max || '-'}`);
    }
}


export const visualisationBar = (options) => {
    const selection = div();
    new VisualisationBar(selection.node(), options);
    return selection;
}