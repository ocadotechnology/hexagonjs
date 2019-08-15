import chai from 'chai';

import installFakeTimers from 'test/utils/fake-time';
import emit from 'test/utils/fake-event';

import logger from 'utils/logger';

import { EventEmitter } from 'utils/event-emitter';
import { mergeDefined } from 'utils/utils';

import { div, select } from 'utils/selection';

import {
  Modal,
  modalCenter,
  modalFullScreen,
  modalRight,
  getModalAnimationFn,
  config as modalConfig,
} from 'components/modal/modal';

export default () => {
  describe('modal', () => {
    let clock;
    const chaiSandbox = chai.spy.sandbox();
    const fixture = div('hx-test-modal');

    const errors = {
      missingTitle: 'Modal: options.title - A title is required when creating a Modal',
      missingBody: 'Modal: options.renderBody/renderFooter - A body or footer renderer is required when creating a Modal',
      missingShowClose: 'Modal: options.onClose was passed in but no close button is visible for this type of modal',
    };

    const basicRenderBody = chai.spy(() => div('body').text('Body'));
    const basicRenderFooter = chai.spy(() => div('footer').text('Footer'));
    const basicTitle = 'Title';

    const basicBodyOptions = {
      title: basicTitle,
      renderBody: basicRenderBody,
      isOpen: false,
    };
    const basicFooterOptions = {
      title: basicTitle,
      renderFooter: basicRenderFooter,
      isOpen: false,
    };

    const defaultSettings = {
      type: 'center',
    };

    const origAttachToSelector = modalConfig.attachToSelector;

    before(() => {
      select('body').add(fixture);
      modalConfig.attachToSelector = fixture;
    });

    beforeEach(() => {
      clock = installFakeTimers();
      fixture.clear();
      chaiSandbox.on(logger, 'warn');
      basicRenderBody.reset();
      basicRenderFooter.reset();
    });

    afterEach(() => {
      clock.restore();
      chaiSandbox.restore();
    });

    after(() => {
      fixture.remove();
      modalConfig.attachToSelector = origAttachToSelector;
    });

    describe('Modal', () => {
      it('throws when called with no options', () => {
        function fn() {
          return new Modal(defaultSettings);
        }
        fn.should.throw(errors.missingTitle);
      });

      it('throws when called with title and no body/footer', () => {
        function fn() {
          return new Modal(defaultSettings, { title: basicBodyOptions.title });
        }
        fn.should.throw(errors.missingBody);
      });

      it('throws when trying to use onClose inside a modal with no close button', () => {
        function fn() {
          return new Modal({ showClose: false }, { onClose: () => {} });
        }
        fn.should.throw(errors.missingShowClose);
      });

      describe('when called with render body and title', () => {
        let thisModal;

        beforeEach(() => {
          thisModal = new Modal({}, basicBodyOptions);
        });

        it('extends EventEmitter', () => {
          thisModal.should.be.an.instanceOf(EventEmitter);
        });

        describe('show', () => {
          const spy = chai.spy();
          beforeEach(() => {
            chaiSandbox.on(thisModal, 'isOpen', () => {});
            thisModal.show();
            thisModal.show(spy);
          });

          it('calls isOpen(true)', () => {
            thisModal.isOpen.should.have.been.called.with(true);
          });

          it('calls isOpen(true, callback)', () => {
            thisModal.isOpen.should.have.been.called.with(true, spy);
          });

          it('calls isOpen twice', () => {
            thisModal.isOpen.should.have.been.called.exactly(2);
          });
        });

        describe('hide', () => {
          const spy = chai.spy();
          beforeEach(() => {
            chaiSandbox.on(thisModal, 'isOpen', () => {});
            thisModal.hide();
            thisModal.hide(spy);
          });

          it('calls isOpen(false)', () => {
            thisModal.isOpen.should.have.been.called.with(false);
          });

          it('calls isOpen(false, callback)', () => {
            thisModal.isOpen.should.have.been.called.with(false, spy);
          });

          it('calls isOpen twice', () => {
            thisModal.isOpen.should.have.been.called.exactly(2);
          });
        });
      });

      describe('when called with render footer and title', () => {
        let thisModal;

        beforeEach(() => {
          thisModal = new Modal({}, basicFooterOptions);
        });

        it('extends EventEmitter', () => {
          thisModal.should.be.an.instanceOf(EventEmitter);
        });

        describe('show', () => {
          const spy = chai.spy();
          beforeEach(() => {
            chaiSandbox.on(thisModal, 'isOpen', () => {});
            thisModal.show();
            thisModal.show(spy);
          });

          it('calls isOpen(true)', () => {
            thisModal.isOpen.should.have.been.called.with(true);
          });

          it('calls isOpen(true, callback)', () => {
            thisModal.isOpen.should.have.been.called.with(true, spy);
          });

          it('calls isOpen twice', () => {
            thisModal.isOpen.should.have.been.called.exactly(2);
          });
        });

        describe('hide', () => {
          const spy = chai.spy();
          beforeEach(() => {
            chaiSandbox.on(thisModal, 'isOpen', () => {});
            thisModal.hide();
            thisModal.hide(spy);
          });

          it('calls isOpen(false)', () => {
            thisModal.isOpen.should.have.been.called.with(false);
          });

          it('calls isOpen(false, callback)', () => {
            thisModal.isOpen.should.have.been.called.with(false, spy);
          });

          it('calls isOpen twice', () => {
            thisModal.isOpen.should.have.been.called.exactly(2);
          });
        });
      });

      describe('when opening a modal', () => {
        let thisModal;
        let eventSpy;
        let animateSpy;

        beforeEach(() => {
          eventSpy = chai.spy();
          animateSpy = chai.spy((content, cb) => cb());

          thisModal = new Modal({
            type: defaultSettings.type,
            modalAnimateFn: animateSpy,
          }, mergeDefined({}, basicBodyOptions));

          chaiSandbox.on(thisModal, 'render', () => {});
          thisModal.on(undefined, eventSpy);
          thisModal.show();
          clock.tick(modalConfig.backdropAnimationDuration);
          clock.tick(1000);
        });

        it('emits showstart', () => {
          eventSpy.should.have.been.called.with('showstart');
        });

        it('emits show', () => {
          eventSpy.should.have.been.called.with('show');
        });

        it('emits showend', () => {
          eventSpy.should.have.been.called.with('showend');
        });

        it('emits three times', () => {
          eventSpy.should.have.been.called.exactly(3);
        });

        it('calls render', () => {
          thisModal.render.should.have.been.called();
        });

        it('calls modalAnimateFn with the content selection', () => {
          animateSpy.should.have.been.called.with(thisModal._.content);
        });

        it('calls modalAnimateFn with animateIn true', () => {
          animateSpy.should.have.been.called.with(true);
        });

        it('calls modalAnimateFn once', () => {
          animateSpy.should.have.been.called.exactly(1);
        });

        describe('and calling isOpen()', () => {
          let isModalOpen;

          beforeEach(() => {
            isModalOpen = thisModal.isOpen();
          });

          it('has the correct is open value', () => {
            isModalOpen.should.equal(true);
          });
        });

        describe('then calling show again', () => {
          beforeEach(() => {
            thisModal.show();
          });

          it('does not emit additional events', () => {
            eventSpy.should.have.been.called.exactly(3);
          });

          it('does not call render again', () => {
            thisModal.render.should.have.been.called.exactly(1);
          });

          it('does not call the animate function again', () => {
            animateSpy.should.have.been.called.exactly(1);
          });

          describe('and calling isOpen()', () => {
            let isModalOpen;

            beforeEach(() => {
              isModalOpen = thisModal.isOpen();
            });

            it('has the correct is open value', () => {
              isModalOpen.should.equal(true);
            });
          });
        });
      });

      describe('when animate is false', () => {
        describe('and opening the modal', () => {
          let thisModal;
          let eventSpy;
          let animateSpy;

          beforeEach(() => {
            eventSpy = chai.spy();
            animateSpy = chai.spy((content, cb) => cb());

            thisModal = new Modal({
              type: defaultSettings.type,
              modalAnimateFn: animateSpy,
            }, mergeDefined({ animate: false }, basicBodyOptions));

            chaiSandbox.on(thisModal, 'render', () => {});
            thisModal.on(undefined, eventSpy);
            thisModal.show();
            clock.tick(modalConfig.backdropAnimationDuration);
            clock.tick(1000);
          });

          it('emits showstart', () => {
            eventSpy.should.have.been.called.with('showstart');
          });

          it('emits show', () => {
            eventSpy.should.have.been.called.with('show');
          });

          it('emits showend', () => {
            eventSpy.should.have.been.called.with('showend');
          });

          it('emits three times', () => {
            eventSpy.should.have.been.called.exactly(3);
          });

          it('does not call the animation function', () => {
            animateSpy.should.not.have.been.called();
          });
        });

        describe('and closing the modal', () => {
          let thisModal;
          let eventSpy;
          let animateSpy;

          beforeEach(() => {
            eventSpy = chai.spy();
            animateSpy = chai.spy((content, cb) => cb());

            thisModal = new Modal({
              type: defaultSettings.type,
              modalAnimateFn: animateSpy,
            }, mergeDefined({ animate: false, isOpen: true }, basicBodyOptions));

            chaiSandbox.on(thisModal, 'render', () => {});
            thisModal.on(undefined, eventSpy);
            thisModal.hide();
            clock.tick(modalConfig.backdropAnimationDuration);
            clock.tick(1000);
          });

          it('emits hidestart', () => {
            eventSpy.should.have.been.called.with('hidestart');
          });

          it('emits hide', () => {
            eventSpy.should.have.been.called.with('hide');
          });

          it('emits hideend', () => {
            eventSpy.should.have.been.called.with('hideend');
          });

          it('emits three times', () => {
            eventSpy.should.have.been.called.exactly(3);
          });

          it('does not call the animation function', () => {
            animateSpy.should.not.have.been.called();
          });
        });
      });

      describe('when closing an open modal with the API', () => {
        let thisModal;
        let eventSpy;
        let animateSpy;

        beforeEach(() => {
          eventSpy = chai.spy();
          animateSpy = chai.spy((content, cb) => cb());

          thisModal = new Modal({
            type: defaultSettings.type,
            modalAnimateFn: animateSpy,
          }, mergeDefined({}, basicBodyOptions, { isOpen: true }));

          animateSpy.reset();
          chaiSandbox.on(thisModal, 'render', () => {});
          thisModal.on(undefined, eventSpy);
          thisModal.hide();
          clock.tick(modalConfig.backdropAnimationDuration);
          clock.tick(1000);
        });

        it('emits hidestart', () => {
          eventSpy.should.have.been.called.with('hidestart');
        });

        it('emits hide', () => {
          eventSpy.should.have.been.called.with('hide');
        });

        it('emits hideend', () => {
          eventSpy.should.have.been.called.with('hideend');
        });

        it('emits three times', () => {
          eventSpy.should.have.been.called.exactly(3);
        });

        it('does not call render', () => {
          thisModal.render.should.not.have.been.called();
        });

        it('calls modalAnimateFn with the content selection', () => {
          animateSpy.should.have.been.called.with(thisModal._.content);
        });

        it('calls modalAnimateFn with animateIn false', () => {
          animateSpy.should.have.been.called.with(false);
        });

        it('calls modalAnimateFn once', () => {
          animateSpy.should.have.been.called.exactly(1);
        });

        describe('and calling isOpen()', () => {
          let isModalOpen;

          beforeEach(() => {
            isModalOpen = thisModal.isOpen();
          });

          it('has the correct is open value', () => {
            isModalOpen.should.equal(false);
          });
        });

        describe('then calling hide again', () => {
          beforeEach(() => {
            thisModal.hide();
          });

          it('does not emit additional events', () => {
            eventSpy.should.have.been.called.exactly(3);
          });

          it('does not call render', () => {
            thisModal.render.should.not.have.been.called();
          });

          it('does not call the animate function again', () => {
            animateSpy.should.have.been.called.exactly(1);
          });

          describe('and calling isOpen()', () => {
            let isModalOpen;

            beforeEach(() => {
              isModalOpen = thisModal.isOpen();
            });

            it('has the correct is open value', () => {
              isModalOpen.should.equal(false);
            });
          });
        });
      });

      describe('when closing an open modal with the close button', () => {
        let thisModal;

        beforeEach(() => {
          thisModal = new Modal({
            type: defaultSettings.type,
            modalAnimateFn: (content, cb) => cb(),
            showClose: true,
          }, mergeDefined({}, basicBodyOptions, { isOpen: true }));
          chaiSandbox.on(thisModal, 'close', () => {});
          thisModal._.modal.select('.hx-modal-close').node().click();
        });

        it('calls close', () => {
          thisModal.close.should.have.been.called();
        });
      });

      describe('when closing an open modal with the escape key', () => {
        describe('with the default action', () => {
          let thisModal;
          let attachSelector;

          beforeEach(() => {
            attachSelector = div();
            modalConfig.attachToSelector = attachSelector;
            thisModal = new Modal({
              type: defaultSettings.type,
              modalAnimateFn: (content, cb) => cb(),
              showClose: true,
            }, mergeDefined({}, basicBodyOptions, { isOpen: true }));
            chaiSandbox.on(thisModal, 'close', () => {});
          });

          afterEach(() => {
            modalConfig.attachToSelector = fixture;
          });

          describe('with e.key = Esc', () => {
            beforeEach(() => {
              emit(attachSelector.node(), 'keydown', { key: 'Esc' });
            });

            it('calls close', () => {
              thisModal.close.should.have.been.called();
            });
          });

          describe('with e.key = Escape', () => {
            beforeEach(() => {
              emit(attachSelector.node(), 'keydown', { key: 'Escape' });
            });

            it('calls close', () => {
              thisModal.close.should.have.been.called();
            });
          });

          describe('with e.which = 27', () => {
            beforeEach(() => {
              emit(attachSelector.node(), 'keydown', { which: 27 });
            });

            it('calls close', () => {
              thisModal.close.should.have.been.called();
            });
          });

          describe('with other keypress', () => {
            beforeEach(() => {
              emit(attachSelector.node(), 'keydown', { which: 1 });
            });

            it('does not call close', () => {
              thisModal.close.should.not.have.been.called();
            });
          });
        });
      });

      describe('when calling close()', () => {
        describe('with the default action', () => {
          let thisModal;

          beforeEach(() => {
            thisModal = new Modal({
              type: defaultSettings.type,
              modalAnimateFn: (content, cb) => cb(),
              showClose: true,
            }, mergeDefined({}, basicBodyOptions, { isOpen: true }));
            chaiSandbox.on(thisModal, 'hide');
            thisModal.close();
          });

          it('calls hide', () => {
            thisModal.hide.should.have.been.called();
          });
        });

        describe('with a custom action', () => {
          let thisModal;
          let onClose;

          beforeEach(() => {
            onClose = chai.spy();

            thisModal = new Modal({
              type: defaultSettings.type,
              modalAnimateFn: (content, cb) => cb(),
              showClose: true,
            }, mergeDefined({}, basicBodyOptions, { isOpen: true, onClose }));
            chaiSandbox.on(thisModal, 'hide');
            thisModal.close();
          });

          it('calls onClose', () => {
            onClose.should.have.been.called.with(thisModal);
          });

          it('does not call hide', () => {
            thisModal.hide.should.not.have.been.called();
          });
        });
      });

      describe('render', () => {
        describe('when rendering with only renderBody', () => {
          let thisModal;

          beforeEach(() => {
            thisModal = new Modal({}, basicBodyOptions);
            thisModal.render();
          });

          it('calls renderBody', () => {
            basicRenderBody.should.have.been.called.with(thisModal);
          });

          it('sets the body', () => {
            thisModal._.body.node().innerHTML.should.equal('<div class="body">Body</div>');
          });

          it('does not set the footer', () => {
            thisModal._.footer.node().innerHTML.should.equal('');
          });

          it('sets the title', () => {
            thisModal._.title.node().innerHTML.should.equal(basicTitle);
          });
        });

        describe('when rendering with only renderFooter', () => {
          let thisModal;

          beforeEach(() => {
            thisModal = new Modal({}, basicFooterOptions);
            thisModal.render();
          });

          it('calls renderFooter', () => {
            basicRenderFooter.should.have.been.called.with(thisModal);
          });

          it('sets the footer', () => {
            thisModal._.footer.node().innerHTML.should.equal('<div class="footer">Footer</div>');
          });

          it('does not set the body', () => {
            thisModal._.body.node().innerHTML.should.equal('');
          });

          it('sets the title', () => {
            thisModal._.title.node().innerHTML.should.equal(basicTitle);
          });
        });

        describe('when rendering with renderBody and renderFooter', () => {
          let thisModal;

          beforeEach(() => {
            thisModal = new Modal({}, mergeDefined({}, basicBodyOptions, basicFooterOptions));
            thisModal.render();
          });

          it('calls renderBody', () => {
            basicRenderBody.should.have.been.called.with(thisModal);
          });

          it('calls renderFooter', () => {
            basicRenderFooter.should.have.been.called.with(thisModal);
          });

          it('sets the body', () => {
            thisModal._.body.node().innerHTML.should.equal('<div class="body">Body</div>');
          });

          it('sets the footer', () => {
            thisModal._.footer.node().innerHTML.should.equal('<div class="footer">Footer</div>');
          });

          it('sets the title', () => {
            thisModal._.title.node().innerHTML.should.equal(basicTitle);
          });

          it('sets the correct modal html', () => {
            thisModal._.modal.node().outerHTML.should.equal('<div class="hx-modal hx-flag-modal hx-flag-button hx-modal-center"><div class="hx-modal-backdrop"></div><div class="hx-modal-container"><div class="hx-modal-content"><div class="hx-modal-header"><h1 class="hx-modal-title">Title</h1></div><div class="hx-modal-body-container"><div class="hx-modal-body"><div class="body">Body</div></div><div class="hx-modal-footer"><div class="footer">Footer</div></div></div></div></div></div>');
          });
        });
      });
    });

    describe('modalCenter', () => {
      let thisModal;
      beforeEach(() => {
        thisModal = modalCenter(basicBodyOptions);
      });

      it('has the correct options', () => {
        thisModal.options.should.eql(mergeDefined({}, basicBodyOptions, {
          isOpen: false,
          animate: true,
        }));
      });

      it('returns a Modal', () => {
        thisModal.should.be.an.instanceOf(Modal);
      });

      it('throws when called with no arguments', () => {
        function fn() {
          modalCenter();
        }
        fn.should.throw(errors.missingTitle);
      });
    });

    describe('modalFullScreen', () => {
      let thisModal;
      beforeEach(() => {
        thisModal = modalFullScreen(basicBodyOptions);
      });

      it('has the correct options', () => {
        thisModal.options.should.eql(mergeDefined({}, basicBodyOptions, {
          isOpen: false,
          animate: true,
        }));
      });

      it('returns a Modal', () => {
        thisModal.should.be.an.instanceOf(Modal);
      });

      it('throws when called with no arguments', () => {
        function fn() {
          modalFullScreen();
        }
        fn.should.throw(errors.missingTitle);
      });
    });

    describe('modalRight', () => {
      describe('standard width', () => {
        let thisModal;
        beforeEach(() => {
          thisModal = modalRight(basicBodyOptions);
        });

        it('has the correct options', () => {
          thisModal.options.should.eql(mergeDefined({}, basicBodyOptions, {
            isOpen: false,
            animate: true,
          }));
        });

        it('returns a Modal', () => {
          thisModal.should.be.an.instanceOf(Modal);
        });
      });

      describe('wider width', () => {
        let thisModal;
        beforeEach(() => {
          thisModal = modalRight(mergeDefined({}, basicBodyOptions, {
            wide: true,
          }));
        });

        it('has the correct options', () => {
          thisModal.options.should.eql(mergeDefined({}, basicBodyOptions, {
            isOpen: false,
            animate: true,
          }));
        });

        it('returns a Modal', () => {
          thisModal.should.be.an.instanceOf(Modal);
        });
      });


      it('throws when called with no arguments', () => {
        function fn() {
          modalRight();
        }
        fn.should.throw(errors.missingTitle);
      });
    });

    describe('getModalAnimationFn', () => {
      describe('when animating in', () => {
        let sel;
        let callbackSpy;
        let animateFn;
        const duration = 123;
        const distance = 456;

        beforeEach(() => {
          callbackSpy = chai.spy();
          sel = fixture.append(div());
          chaiSandbox.on(sel, 'style');
          animateFn = getModalAnimationFn('left', duration, distance);
          animateFn(sel, callbackSpy, true);
        });

        it('does not call the callback immediately', () => {
          callbackSpy.should.not.have.been.called();
        });

        it('calls the style method with opacity', () => {
          sel.style.should.have.been.called.with('opacity', 0);
        });

        it('calls the style method with left', () => {
          sel.style.should.have.been.called.with('left', `-${distance}px`);
        });

        it('calls style twice', () => {
          sel.style.should.have.been.called.exactly(2);
        });

        describe('and animating', () => {
          beforeEach(() => {
            clock.tick(duration);
            clock.tick(0);
          });

          it('calls the callback', () => {
            callbackSpy.should.have.been.called();
          });

          it('clears the opacity style', () => {
            sel.style.should.have.been.called.with('opacity', undefined);
          });

          it('clears the left style', () => {
            sel.style.should.have.been.called.with('left', undefined);
          });

          it('calls style four times', () => {
            sel.style.should.have.been.called.exactly(4);
          });
        });
      });
      describe('when animating out', () => {
        let sel;
        let callbackSpy;
        let animateFn;
        const duration = 456;
        const distance = 789;

        beforeEach(() => {
          callbackSpy = chai.spy();
          sel = fixture.append(div());
          chaiSandbox.on(sel, 'style');
          animateFn = getModalAnimationFn('right', duration, distance);
          animateFn(sel, callbackSpy, false);
        });

        it('does not call the callback immediately', () => {
          callbackSpy.should.not.have.been.called();
        });

        it('calls the style method with opacity', () => {
          sel.style.should.have.been.called.with('opacity', 1);
        });

        it('calls the style method with right', () => {
          sel.style.should.have.been.called.with('right', '0px');
        });

        it('calls style twice', () => {
          sel.style.should.have.been.called.exactly(2);
        });

        describe('and animating', () => {
          beforeEach(() => {
            clock.tick(duration);
            clock.tick(0);
          });

          it('calls the callback', () => {
            callbackSpy.should.have.been.called();
          });

          it('clears the opacity style', () => {
            sel.style.should.have.been.called.with('opacity', undefined);
          });

          it('clears the right style', () => {
            sel.style.should.have.been.called.with('right', undefined);
          });

          it('calls style four times', () => {
            sel.style.should.have.been.called.exactly(4);
          });
        });
      });
    });
  });
};
