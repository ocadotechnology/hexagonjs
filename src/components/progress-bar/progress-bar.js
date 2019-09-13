import { mergeDefined } from 'utils/utils';
import { select } from 'utils/selection';

import { StatusBar, optionSetterGetter } from 'components/status-bar';

class ProgressBar {
  constructor(selector, options) {
    this.options = mergeDefined({
      title: undefined,
      breakdown: undefined,
      plan: 0,
      inProgress: 0,
      done: 0,
      hidePlan: false,
      compact: false,
      disabled: false,
    }, options);

    const {
      compact,
      disabled,
      title,
      breakdown,
    } = this.options;

    this.selection = select(selector)
      .classed('hx-progress-bar hx-flag-progress-bar', true)
      .api('progress-bar', this)
      .api(this);

    this.selection = select(selector);

    this._ = {};

    this._.segments = {
      done: {
        id: 'done',
        count: 0,
        type: 'done',
      },
      inProgress: {
        id: 'inProgress',
        count: 0,
        type: 'in-progress',
      },
      todo: {
        id: 'todo',
        count: 0,
        type: 'todo',
      },
    };

    this._.bar = new StatusBar(this.selection, {
      title,
      breakdown,
      compact,
      disabled,
    });

    this.title = optionSetterGetter('title', undefined, this._.bar).bind(this);
    this.breakdown = optionSetterGetter('breakdown', undefined, this._.bar).bind(this);
    this.disabled = optionSetterGetter('disabled', undefined, this._.bar).bind(this);
    this.compact = optionSetterGetter('compact', undefined, this._.bar).bind(this);

    this.render();
  }

  render() {
    const {
      bar,
      segments,
    } = this._;

    const {
      plan = 0,
      done = 0,
      inProgress = 0,
      disabled,
      hidePlan,
    } = this.options;

    const inProgressAndDone = done + inProgress;
    const todo = Math.max(0, plan - inProgressAndDone);

    if (hidePlan) {
      bar.options.plan = !disabled ? done : undefined;
    } else {
      bar.options.plan = !disabled ? `${done} / ${plan || '-'}` : undefined;
    }

    segments.done.count = done;
    segments.inProgress.count = inProgress;
    segments.todo.count = todo;

    bar.segments([
      segments.done,
      segments.inProgress,
      segments.todo,
    ].filter(({ count }) => count));
  }

  hidePlan(hide) {
    if (arguments.length) {
      this.options.hidePlan = hide;
      this.render();
    }
    return this.options.hidePlan;
  }

  done(count) {
    if (arguments.length) {
      this.options.done = count;
      this.render();
    }
    return this.options.done;
  }

  inProgress(count) {
    if (arguments.length) {
      this.options.inProgress = count;
      this.render();
    }
    return this.options.inProgress;
  }

  plan(count) {
    if (arguments.length) {
      this.options.plan = count;
      this.render();
    }
    return this.options.plan;
  }
}

export {
  ProgressBar,
};
