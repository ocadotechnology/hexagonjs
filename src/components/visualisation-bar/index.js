import { select, div, span, h } from 'utils/selection';
import { mergeDefined } from 'utils/utils';

const wrapper = 'wrapper',
    fill = 'fill',
    label = 'label',
    progress = 'progress';

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
            content: '',
            mock: false
        }, options);

        this.selection = select(selector).classed('hx-visualisation-bar', true);
        this.header = div('hx-visualisation-bar-header');
        this.titleElement = h(3);
        this.countElement = h(3);

        this.body = div('hx-visualisation-bar-body hx-animate');
        this.progressElementsMap = new Map([
            [wrapper, div('hx-visualisation-bar-progress hx-visualisation-bar-p-wrapper')],
            [fill, div('hx-visualisation-bar-fill hx-visualisation-bar-progress-fill')],
            [progress, span('hx-visualisation-bar-progress-info hx-visualisation-bar-fill-progress-info')],
            [label, div('hx-visualisation-bar-label hx-visualisation-bar-progress-label')]
        ]);

        this.bufferElementsMap = new Map([
            [wrapper, div('hx-visualisation-bar-buffer hx-visualisation-bar-p-wrapper')],
            [fill, div('hx-visualisation-bar-fill hx-visualisation-bar-buffer-fill')],
            [progress, span('hx-visualisation-bar-buffer-info hx-visualisation-bar-fill-progress-info')],
            [label, div('hx-visualisation-bar-label hx-visualisation-bar-buffer-label')]
        ]);

        this.balanceElementsMap = new Map([
            [wrapper, div('hx-visualisation-bar-balance hx-visualisation-bar-p-wrapper')],
            [fill, div('hx-visualisation-bar-fill hx-visualisation-bar-balance-fill inversed-text-color')],
            [progress, span('hx-visualisation-bar-balance-info hx-visualisation-bar-fill-progress-info')],
            [label, div('hx-visualisation-bar-label hx-visualisation-bar-balance-label')]
        ]);

        this.contentElement = div('hx-visualisation-bar-content');


        this.selection.add(this.header);
        this.header.add(div('hx-visualisation-bar-title').add(this.titleElement));
        this.header.add(div('hx-visualisation-bar-count').add(this.countElement));
        this.selection.add(this.body);
        this.body.add(
            this.progressElementsMap.get(wrapper).add(
                this.progressElementsMap.get(fill).add(this.progressElementsMap.get(progress))
            ).add(this.progressElementsMap.get(label))
        );
        this.body.add(
            this.bufferElementsMap.get(wrapper).add(
                this.bufferElementsMap.get(fill).add(this.bufferElementsMap.get(progress))
            ).add(this.bufferElementsMap.get(label))
        );
        this.body.add(
            this.balanceElementsMap.get(wrapper).add(
                this.balanceElementsMap.get(fill).add(this.balanceElementsMap.get(progress))
            ).add(this.balanceElementsMap.get(label))
        );
        this.selection.add(this.contentElement);
        this.selection.api('visualisation-bar', this).api(this);

        this.title = this.options.title;
        this.progress = this.options.value;
        this.buffer = this.options.buffer;

        if (this.options.mock) {
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
        this.updateProgressFill(value);
        this.updateBufferFill(this.options.buffer);
        this.checkBuffer(value);
        this.adaptBalance();
        this.updateCount();
    }

    set buffer(value) {
        this.options.buffer = value;
        this.bufferElementsMap.get(progress).text(value || '');
        this.updateBufferFill(value);
        this.updateProgressFill(this.options.progress);
        this.adaptBalance();
        this.updateCount();
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
        this.content.text(value);
    }

    checkBuffer() {
        const { buffer, value, max = this.options.value + this.options.buffer } = this.options;
        const sum = buffer + value;
        if (max && (sum > max)) {
            this.buffer = max - value;
        }
    }

    updateProgressFill(value) {
        this.__progress = (value * 100) / this.max;
        this.progressElementsMap.get(wrapper).style('width', `${this.__progress}%`);
    }

    updateBufferFill(value) {
        this.__buffer = (value * 100) / this.max;
        this.bufferElementsMap.get(wrapper).style('width', `${this.__buffer}%`);
    }

    updateCount() {
        this.countElement.text(`${this.options.value}/${this.options.max || '-'}`);
    }

    adaptBalance() {
        const { value, buffer, max } = this.options;
        const balance = 100 - this.__buffer - this.__progress;
        this.balanceElementsMap.get(wrapper).style('width', `${balance ? balance : 0}%`);
        this.balanceElementsMap.get(progress).text((balance ? max - value - buffer : '') || '');
    }
}


export const visualisationBar = (options) => {
    const selection = div();
    new VisualisationBar(selection.node(), options);
    return selection;
}