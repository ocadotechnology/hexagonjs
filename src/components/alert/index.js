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

import logger from 'utils/logger';

const defaultCalculateMessageDurationOptions = {
  minMessageDuration: 2000,
  maxMessageDuration: 7000,
};
function calculateMessageDuration(
  title = '',
  body = '',
  {
    minMessageDuration = 2000,
    maxMessageDuration = 7000,
  } = defaultCalculateMessageDurationOptions,
) {
  const length = title.length + body.length;
  const readingDuration = length * 50;
  return Math.min(Math.max(readingDuration, minMessageDuration), maxMessageDuration);
}

class Alert {
  constructor(id, closeAction, options = {}) {
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

    const titleSpan = title
      ? span('hx-alert-title').text(`${title} `)
      : undefined;

    const bodySpan = body
      ? span('hx-alert-body').text(body)
      : undefined;

    const closeDiv = !duration
      ? div('hx-alert-close')
        .add(i('hx-alert-icon fas fa-times'))
        .on('click', () => this.close())
      : undefined;

    return div('hx-alert')
      .classed(`hx-alert-${type}`, type)
      .add(div('hx-alert-content')
        .add(titleSpan)
        .add(bodySpan))
      .add(closeDiv);
  }

  close() {
    window.clearTimeout(this.activeTimeout);
    delete this.activeTimeout;
    this.closeAction(this.id);
    return this;
  }
}

class AlertManager {
  constructor(selector = 'body', options = {}) {
    this.options = merge({
      animationInDuration: 200,
      animationOutDuration: 200,
    }, defaultCalculateMessageDurationOptions, options);

    this._ = {
      container: undefined,
      currentId: 0,
      alerts: [],
    };

    this.selection = select(selector);
  }

  message(options) {
    if (!options) {
      throw new Error('AlertManager::message - No options were provided. An object with title or body should be provided');
    }

    const {
      title,
      body,
      type,
      duration,
    } = options;

    const types = ['success'];
    if (type && !types.includes(type)) {
      throw new Error(`AlertManager::message - Invalid message type provided: '${type}'.\nAccepted types: ['${types.join('\', \'')}']`);
    }
    return this.addAlert({
      title,
      body,
      duration: duration || calculateMessageDuration(title, body, this.options),
      type,
    });
  }

  alert(options) {
    if (!options) {
      throw new Error('AlertManager::alert - No options were provided. An object with title or body should be provided');
    }

    const {
      title,
      body,
      type,
      duration,
    } = options;

    const types = ['success', 'warning', 'danger'];
    if (type && !types.includes(type)) {
      throw new Error(`AlertManager::alert - Invalid alert type provided: '${type}'.\nAccepted types: ['${types.join('\', \'')}']`);
    }
    if (duration) {
      logger.warn('AlertManager::alert called with "duration" but can only be closed by user interaction. Ignoring passed in duration');
    }
    return this.addAlert({
      title,
      body,
      duration: undefined,
      type,
    });
  }

  render() {
    const container = this.createOrGetContainer();

    container.api('_alerts-view')
      .apply(this._.alerts, d => d.id);

    return this;
  }

  addAlert(options) {
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
      this.render();
    }
  }

  createOrGetContainer() {
    const alertMgr = this;
    const { container } = alertMgr._;

    if (!container) {
      const newContainer = alertMgr.selection.append(div('hx-alert-container'));
      const view = newContainer.view('.hx-alert')
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
              .style('opacity', undefined))
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
        });

      newContainer.api('_alerts-view', view);
      alertMgr._.container = newContainer;
    }
    return alertMgr._.container;
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
