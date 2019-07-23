import {
  select,
  div,
  i,
  span,
} from 'utils/selection';

import {
  merge,
  randomId,
} from 'utils/utils';


function calculateMessageDuration(title = '', body = '', { minMessageDuration, maxMessageDuration }) {
  const length = title.length + body.length;
  const readingDuration = length * 50;
  return Math.min(Math.max(readingDuration, minMessageDuration), maxMessageDuration);
}

class Alert {
  constructor(id, closeAction, options) {
    this.id = id;
    this.closeAction = closeAction;
    this.options = options;

    if (this.options.duration) {
      this.activeTimeout = window.setTimeout(
        () => this.close(),
        this.options.duration,
      );
    }
  }

  render() {
    const {
      title,
      body,
      type,
      duration,
    } = this.options;

    const titleSpan = span('hx-alert-title').text(`${title} `);
    const bodySpan = span('hx-alert-body').text(body);

    const closeDiv = !duration
      ? div('hx-alert-close')
        .add(i('hx-alert-icon fas fa-times'))
        .on('click', () => this.close())
      : undefined;

    const sel = div('hx-alert hx-flag-alert');

    sel.classed(`hx-alert-${type}`, type);

    return sel
      .add(div('hx-alert-content')
        .add(titleSpan)
        .add(bodySpan))
      .add(closeDiv);
  }

  close() {
    window.clearTimeout(this.activeTimeout);
    this.closeAction(this.id);
    return this;
  }
}

class AlertManager {
  constructor(selector = 'body', options = {}) {
    this.options = merge({
      animationInDuration: 200,
      animationOutDuration: 200,
      maxMessageDuration: 7000,
      minMessageDuration: 2000,
    }, options);

    this._ = {
      container: undefined,
      currentId: 0,
      alerts: [],
    };

    this.selection = select(selector);
  }

  message({
    title,
    body,
    type = 'default',
    duration,
  }) {
    const types = ['default', 'success'];
    if (type && !types.includes(type)) {
      throw new Error(`NotificationManager:message - Invalid message type provided: ${type}.\nAccepted types: [${types.join(', ')}]`);
    }
    return this.addAlert({
      title,
      body,
      duration: duration || calculateMessageDuration(title, body, this.options),
      type,
    });
  }

  alert({
    title,
    body,
    type = 'default',
  }) {
    const types = ['default', 'success', 'warning', 'danger'];
    if (type && !types.includes(type)) {
      throw new Error(`NotificationManager:alert - Invalid alert type provided: ${type}.\nAccepted types: [${types.join(', ')}]`);
    }
    return this.addAlert({
      title,
      body,
      duration: undefined,
      type,
    });
  }

  render() {
    const alertMgr = this;
    const container = alertMgr.createOrGetContainer();

    container.view('.hx-alert')
      .enter(function enter(thisAlert) {
        const nSel = thisAlert.render();

        this.prepend(nSel);

        nSel
          .style('opacity', 0)
          .style('height', 0)
          .style('padding-top', 0)
          .style('padding-bottom', 0)
          .morph()
          .with('fadein', alertMgr.options.animationInDuration)
          .and('expandv', alertMgr.options.animationInDuration)
          .then(() => nSel
            .style('padding-top', undefined)
            .style('padding-bottom', undefined)
            .style('height', undefined)
            .style('opactity', undefined))
          .go();

        return nSel.node();
      })
      .exit(function exit() {
        this.style('opacity', '1')
          .morph()
          .with('collapsev', alertMgr.options.animationOutDuration)
          .and('fadeout', alertMgr.options.animationOutDuration)
          .then(() => this.remove())
          .go();
      })
      .apply(alertMgr._.alerts, d => d.id);
    return alertMgr;
  }

  addAlert(options = {}) {
    const nextId = `alert-${randomId()}`;
    const alertToAdd = new Alert(nextId, id => this.closeAlert(id), options);
    this._.alerts.unshift(alertToAdd);
    this.render();
    return alertToAdd;
  }

  closeAlert(idToClose) {
    const alertToClose = this._.alerts.find(({ id }) => id === idToClose);
    const index = this._.alerts.indexOf(alertToClose);
    if (index >= 0) {
      this._.alerts.splice(index, 1);
    }
    this.render();
  }

  createOrGetContainer() {
    const { container } = this._;
    if (!container) {
      this._.container = this.selection.append(div('hx-alert-container'));
    }
    return this._.container;
  }
}

const inbuiltAlertManager = new AlertManager();

function message(options) {
  return inbuiltAlertManager.message(options);
}

function alert(options) {
  return inbuiltAlertManager.alert(options);
}

export {
  Alert,
  AlertManager,
  message,
  alert,
  inbuiltAlertManager,
  calculateMessageDuration,
};
