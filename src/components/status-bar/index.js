import logger from 'utils/logger';

import { group, section } from 'components/layout';
import { div, select } from 'utils/selection';
import { mergeDefined, identity } from 'utils/utils';
import { userFacingText } from 'utils/user-facing-text';

const { toMultilineSelection } = userFacingText;

const segmentTypes = [
  'default',
  'light',
  'medium',
  'dark',
  'danger',
  'warning',
  'done',
  'in-progress',
  'todo',
];

function optionSetterGetter(name, fn = identity, statusBar, defaultVal) {
  return function inner(value) {
    if (arguments.length) {
      this.options[name] = value || defaultVal;
      fn();
      if (statusBar) {
        statusBar[name](value);
      } else {
        this.render();
      }
      return this;
    }
    return this.options[name];
  };
}

class StatusBar {
  constructor(selector, options = {}) {
    this.options = mergeDefined({
      segments: [],
      title: undefined,
      breakdown: undefined,
      plan: undefined,
      compact: false,
      disabled: false,
    }, options);

    this._ = {};

    this.segments = optionSetterGetter('segments', () => {
      this._.segmentTotal = this.options.segments.reduce((tot, { count }) => tot + count, 0);
    }, undefined, []).bind(this);

    this.title = optionSetterGetter('title').bind(this);
    this.breakdown = optionSetterGetter('breakdown').bind(this);
    this.plan = optionSetterGetter('plan').bind(this);
    this.compact = optionSetterGetter('compact').bind(this);
    this.disabled = optionSetterGetter('disabled').bind(this);

    this.selection = select(selector)
      .classed('hx-status-bar', true);

    this._.titleGroupSel = group({ compact: true }).classed('hx-status-bar-title-section', true);
    this._.titleSel = div('hx-status-bar-title');
    this._.planSel = div('hx-status-bar-plan');
    this._.segmentsSel = div('hx-status-bar-segments');
    this._.breakdownSel = div('hx-status-bar-breakdown');

    this.selection
      .add(this._.titleGroupSel
        .add(section().add(this._.titleSel))
        .add(section({ fixed: true }).add(this._.planSel)))
      .add(this._.segmentsSel)
      .add(this._.breakdownSel);

    this.createView();
    this.segments(this.options.segments, false);
  }

  render() {
    const {
      view,
      titleGroupSel,
      titleSel,
      planSel,
      breakdownSel,
      segmentsSel,
    } = this._;

    const {
      segments,
      title,
      breakdown,
      plan,
      compact,
      disabled,
    } = this.options;

    this.selection
      .classed('hx-status-bar-compact', compact)
      .classed('hx-status-bar-disabled', disabled);

    titleGroupSel.classed('hx-header-small', !compact);
    titleSel.text(title);
    planSel.text(plan);
    breakdownSel.set(breakdown ? toMultilineSelection(breakdown, 'p', true) : []);

    if (compact) {
      segmentsSel.insertAfter(planSel);
    } else {
      titleGroupSel.append(planSel);
    }

    view.apply(segments);
  }

  createView() {
    const self = this;
    this._.view = this._.segmentsSel.view('.hx-status-bar-section')
      .enter(function enterView() {
        const sel = div('hx-status-bar-section')
          .add(div('hx-status-bar-section-bar'))
          .add(div('hx-status-bar-section-text')
            .add(div('hx-status-bar-section-label'))
            .add(div('hx-status-bar-section-percent')));

        return this.append(sel).node();
      })
      .update(({
        id,
        count,
        type,
        label,
      }, e) => {
        if (!id) {
          throw new Error('StatusBar: an "id" is required for each segment');
        }

        if (typeof count === 'undefined') {
          throw new Error('StatusBar: a count must be defined for each segment');
        }

        const {
          segmentTotal,
        } = self._;

        const {
          compact,
        } = self.options;

        const percent = segmentTotal === 0
          ? 0
          : Math.round((count / segmentTotal) * 100);

        const sel = select(e);

        sel.style('flex-grow', percent || 1);

        const bar = sel.select('.hx-status-bar-section-bar')
          .class('hx-status-bar-section-bar')
          .text(compact ? undefined : count);

        if (type && segmentTypes.includes(type)) {
          bar.classed(`hx-status-bar-${type}`, true);
        }

        if (type && !segmentTypes.includes(type)) {
          logger.warn(`StatusBar: invalid segment type provided "${type}", expected one of [${segmentTypes.join(', ')}]`);
        }

        sel.select('.hx-status-bar-section-text')
          .classed('hx-status-bar-section-hidden', !label);

        sel.select('.hx-status-bar-section-label')
          .text(label);

        sel.select('.hx-status-bar-section-percent')
          .text(`(${percent}%)`);
      });
  }
}

export {
  StatusBar,
  optionSetterGetter,
};
