import { EventEmitter } from 'utils/event-emitter';
import { mergeDefined, randomId } from 'utils/utils';
import { div, detached, select } from 'utils/selection';

const errors = {
  missingTitle: 'Modal: options.title - A title is required when creating a Modal',
  missingBody: 'Modal: options.renderBody/renderFooter - A body or footer renderer is required when creating a Modal',
  noCloseButton: 'Modal: options.onClose was passed in but no close button is visible for this type of modal',
};

const config = {
  attachToSelector: 'body',
  backdropAnimationDuration: 200,
};

class Modal extends EventEmitter {
  constructor(modalSettings, options = {}) {
    super();

    this.options = mergeDefined({
      title: '',
      isOpen: true,
      animate: true,
      onClose: undefined,
      renderBody: undefined,
      renderFooter: undefined,
    }, options);

    const {
      isOpen,
      onClose,
      title: titleOption,
      renderBody,
      renderFooter,
    } = this.options;

    const {
      showClose = false,
      type = 'center',
      extraClass,
      modalAnimateFn,
    } = modalSettings;

    if (onClose && !showClose) {
      throw new Error(errors.noCloseButton);
    }

    if (!titleOption) {
      throw new Error(errors.missingTitle);
    }

    if (!(renderBody || renderFooter)) {
      throw new Error(errors.missingBody);
    }

    const parent = select(config.attachToSelector);

    const modal = div('hx-modal hx-flag-modal hx-flag-button')
      .classed(`hx-modal-${type}`, true)
      .classed(`hx-modal-${extraClass}`, extraClass);

    const backdrop = div('hx-modal-backdrop');
    const container = div('hx-modal-container');
    const content = div('hx-modal-content');
    const header = div('hx-modal-header');
    const bodyContainer = div('hx-modal-body-container');
    const body = div('hx-modal-body');
    const footer = div('hx-modal-footer');
    const title = detached('h1').class('hx-modal-title');

    const closeBtn = showClose
      ? div('hx-modal-close')
        .add(detached('i').class('hx-icon hx-icon-close'))
        .on('click', 'hx-modal', () => this.close())
      : undefined;

    this._ = {
      parent,
      modal,
      content,
      backdrop,
      body,
      footer,
      title,
      eventId: `hx-modal-${randomId()}`,
      showClose,
      modalAnimateFn,
    };

    modal
      .add(backdrop)
      .add(container
        .add(content
          .add(header
            .add(title)
            .add(closeBtn))
          .add(bodyContainer
            .add(body)
            .add(footer))));

    if (isOpen) {
      this.isOpen(true);
    }
  }

  render() {
    const {
      body,
      footer,
      title,
    } = this._;

    const {
      title: titleText,
      renderBody,
      renderFooter,
    } = this.options;

    title.text(titleText);
    body.set(renderBody ? renderBody(this) : []);
    footer.set(renderFooter ? renderFooter(this) : []);
  }

  isOpen(isOpen, cb) {
    if (isOpen === this._.isOpen) {
      return this;
    }
    if (!arguments.length) {
      return this._.isOpen;
    }

    this._.isOpen = isOpen;
    const callback = cb || (() => undefined);

    const {
      modal,
      content,
      backdrop,
      parent,
      eventId,
      modalAnimateFn,
      showClose,
    } = this._;

    const {
      animate,
    } = this.options;

    parent.classed('hx-modal-open', isOpen);

    if (isOpen) {
      // Clears the focus so pressing 'enter' does not cause buttons to call modal.show()
      try {
        document.activeElement.blur();
      } catch (e) {
        // In some browsers document.activeElement is null instead of <body>
      }

      if (showClose) {
        parent.on('keydown', eventId, (e) => {
          const isEscape = (e.key && (e.key === 'Esc' || e.key === 'Escape')) || e.which === 27;
          if (isEscape) {
            this.close();
          }
        });
      }

      this.emit('showstart');
      this.emit('show');
      this.render();

      parent.add(modal);

      backdrop
        .style('opacity', 0)
        .morph()
        .with('fadein', config.backdropAnimationDuration)
        .go();

      const doneFn = () => {
        this.emit('showend');
        callback();
      };

      if (animate) {
        modalAnimateFn(content, doneFn, true);
      } else {
        doneFn();
      }
    } else {
      parent.off('keydown', eventId);
      this.emit('hidestart');
      this.emit('hide');

      backdrop
        .style('opacity', 1)
        .morph()
        .with('fadeout', config.backdropAnimationDuration)
        .go();

      const doneFn = () => {
        this.emit('hideend');
        modal.remove();
        callback();
      };

      if (animate) {
        modalAnimateFn(content, doneFn, false);
      } else {
        doneFn();
      }
    }

    return this;
  }

  show(cb) {
    return this.isOpen(true, cb);
  }

  hide(cb) {
    return this.isOpen(false, cb);
  }

  close(cb) {
    const { onClose } = this.options;
    return onClose ? onClose(this, cb) : this.hide(cb);
  }
}

function getModalAnimationFn(direction, duration, distance) {
  return (modal, callback, animateIn) => {
    if (animateIn) {
      modal
        .style('opacity', 0)
        .style(direction, `-${distance}px`)
        .morph()
        .and('fadein', duration)
        .andStyle(direction, '0px', duration)
        .then(() => {
          modal
            .style('opacity', undefined)
            .style(direction, undefined);

          callback();
        })
        .go();
    } else {
      modal
        .style('opacity', 1)
        .style(direction, '0px')
        .morph()
        .andStyle(direction, `-${distance}px`, duration)
        .and('fadeout', duration)
        .then(() => {
          modal
            .style('opacity', undefined)
            .style(direction, undefined);

          callback();
        })
        .go();
    }
  };
}

function modalCenter(options) {
  return new Modal({
    type: 'center',
    modalAnimateFn: getModalAnimationFn('top', 150, 100),
  }, options);
}

function modalFullScreen(options) {
  return new Modal({
    showClose: true,
    type: 'full-screen',
    modalAnimateFn: getModalAnimationFn('top', 300, 300),
  }, options);
}

function modalRight(options = {}) {
  const { wide, ...opts } = options;
  return new Modal({
    showClose: true,
    type: 'right',
    extraClass: wide ? 'right-wide' : undefined,
    modalAnimateFn: getModalAnimationFn('right', 300, 300),
  }, opts);
}

export {
  Modal,
  modalCenter,
  modalRight,
  modalFullScreen,
  config,
  getModalAnimationFn,
};
