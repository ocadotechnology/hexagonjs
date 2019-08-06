import chai from 'chai';

import {
  div,
  select,
} from 'utils/selection';

import { range } from 'utils/utils';

import {
  AlertManager,
  Alert,
  calculateMessageDuration,
  inbuiltAlertManager,
  message,
  alert,
} from 'components/alert';

import logger from 'utils/logger';

// import emit from 'test/utils/fake-event';
import installFakeTimers from 'test/utils/fake-time';

const should = chai.should();

export default () => {
  describe('alert', () => {
    let clock;
    const fixture = div('hx-test-alert');
    const chaiSandbox = chai.spy.sandbox();

    before(() => {
      select('body').append(fixture);
      inbuiltAlertManager.selection = fixture;
    });

    beforeEach(() => {
      chaiSandbox.on(logger, 'warn', () => {});
      clock = installFakeTimers();
      fixture.clear();
    });

    afterEach(() => {
      chaiSandbox.restore();
    });

    after(() => {
      clock.restore();
      fixture.remove();
      inbuiltAlertManager.selection = select('body');
    });

    describe('AlertManager', () => {
      describe('when calling with no arguments', () => {
        let alertManager;
        beforeEach(() => {
          alertManager = new AlertManager();
        });

        it('uses body for the selection', () => {
          alertManager.selection.node().should.equal(select('body').node());
        });

        it('sets the correct default options', () => {
          alertManager.options.should.eql({
            animationInDuration: 200,
            animationOutDuration: 200,
            maxMessageDuration: 7000,
            minMessageDuration: 2000,
          });
        });
      });

      describe('when passing in a fixture', () => {
        let alertManager;

        beforeEach(() => {
          alertManager = new AlertManager(fixture);
        });

        it('sets the correct default options', () => {
          alertManager.options.should.eql({
            animationInDuration: 200,
            animationOutDuration: 200,
            maxMessageDuration: 7000,
            minMessageDuration: 2000,
          });
        });

        it('has the alert method', () => {
          should.exist(alertManager.alert);
        });

        it('has the message method', () => {
          should.exist(alertManager.message);
        });

        it('has the render method', () => {
          should.exist(alertManager.render);
        });

        describe('when adding an alert', () => {
          beforeEach(() => {
            chaiSandbox.on(alertManager, 'addAlert', () => {});
          });

          describe('via the alert method', () => {
            const title = 'Alert Title';
            const body = 'Alert Body';
            const duration = 123;
            const validType = 'success';
            const invalidType = 'invalid';

            describe('with no arguments', () => {
              it('throws an error', () => {
                function alertError() {
                  alertManager.alert();
                }
                alertError.should.throw('AlertManager::alert - No options were provided. An object with title or body should be provided');
              });
            });

            describe('with title and body', () => {
              beforeEach(() => {
                alertManager.alert({
                  title,
                  body,
                });
              });

              it('does not call logger.warn', () => {
                logger.warn.should.not.have.been.called();
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration: undefined,
                  type: undefined,
                });
              });
            });

            describe('with duration', () => {
              beforeEach(() => {
                alertManager.alert({
                  title,
                  body,
                  duration,
                });
              });

              it('calls logger.warn', () => {
                logger.warn.should.have.been.called.with('AlertManager::alert called with "duration" but can only be closed by user interaction. Ignoring passed in duration');
              });

              it('calls logger.warn once', () => {
                logger.warn.should.have.been.called.exactly(1);
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration: undefined,
                  type: undefined,
                });
              });
            });

            describe('with valid type', () => {
              beforeEach(() => {
                alertManager.alert({
                  title,
                  body,
                  type: validType,
                });
              });

              it('does not call logger.warn', () => {
                logger.warn.should.not.have.been.called();
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration: undefined,
                  type: validType,
                });
              });
            });

            describe('with invalid type', () => {
              it('throws an error', () => {
                function invalidAlert() {
                  alertManager.alert({
                    title,
                    body,
                    type: invalidType,
                  });
                }
                invalidAlert.should.throw('AlertManager::alert - Invalid alert type provided: \'invalid\'.\nAccepted types: [\'success\', \'warning\', \'danger\']');
              });
            });
          });

          describe('via the message method', () => {
            const title = 'Message Title';
            const body = 'Message Body';
            const duration = 123;
            const validType = 'success';
            const invalidType = 'danger';

            describe('with no arguments', () => {
              it('throws an error', () => {
                function alertError() {
                  alertManager.message();
                }
                alertError.should.throw('AlertManager::message - No options were provided. An object with title or body should be provided');
              });
            });

            describe('with title and body', () => {
              beforeEach(() => {
                alertManager.message({
                  title,
                  body,
                });
              });

              it('does not call logger.warn', () => {
                logger.warn.should.not.have.been.called();
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration: alertManager.options.minMessageDuration,
                  type: undefined,
                });
              });
            });

            describe('with duration', () => {
              beforeEach(() => {
                alertManager.message({
                  title,
                  body,
                  duration,
                });
              });

              it('does not call logger.warn', () => {
                logger.warn.should.not.have.been.called();
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration,
                  type: undefined,
                });
              });
            });

            describe('with valid type', () => {
              beforeEach(() => {
                alertManager.message({
                  title,
                  body,
                  type: validType,
                });
              });

              it('does not call logger.warn', () => {
                logger.warn.should.not.have.been.called();
              });

              it('calls addAlert with the correct things', () => {
                alertManager.addAlert.should.have.been.called.with({
                  title,
                  body,
                  duration: alertManager.options.minMessageDuration,
                  type: validType,
                });
              });
            });

            describe('with invalid type', () => {
              it('throws an error', () => {
                function invalidMessage() {
                  alertManager.message({
                    title,
                    body,
                    type: invalidType,
                  });
                }
                invalidMessage.should.throw('AlertManager::message - Invalid message type provided: \'danger\'.\nAccepted types: [\'success\']');
              });
            });
          });
        });

        describe('when calling addAlert', () => {
          let addedAlert;
          beforeEach(() => {
            chaiSandbox.on(alertManager, 'render', () => {});
            chaiSandbox.on(alertManager, 'closeAlert', () => {});
            chaiSandbox.on(alertManager._.alerts, 'unshift', () => {});
            addedAlert = alertManager.addAlert();
          });

          it('calls render', () => {
            alertManager.render.should.have.been.called();
          });

          it('calls unshift', () => {
            alertManager._.alerts.unshift.should.have.been.called.with(addedAlert);
          });

          describe('and calling Alert::close', () => {
            beforeEach(() => {
              addedAlert.close();
            });

            it('calls closeAlert', () => {
              alertManager.closeAlert.should.have.been.called.with(addedAlert.id);
            });
          });
        });

        describe('when rendering', () => {
          function makeMockAlert(_, id) {
            const sel = div('hx-alert').text(`Alert ${id}`);
            const render = chai.spy(() => sel);
            return {
              id,
              render,
            };
          }
          beforeEach(() => {
            chaiSandbox.on(alertManager, 'render');
            alertManager._.alerts = range(5).map(makeMockAlert);
            alertManager.render();
            clock.tick(alertManager.options.animationInDuration);
            // Trigger the `.then` for the animation chain
            clock.tick(0);
          });

          it('renders all 5 alerts', () => {
            fixture.node().innerHTML.should.equal('<div class="hx-alert-container"><div class="hx-alert" style="">Alert 4</div><div class="hx-alert" style="">Alert 3</div><div class="hx-alert" style="">Alert 2</div><div class="hx-alert" style="">Alert 1</div><div class="hx-alert" style="">Alert 0</div></div>');
          });

          describe('and then closing alerts', () => {
            beforeEach(() => {
              alertManager.closeAlert(1);
              alertManager.closeAlert(3);
              clock.tick(alertManager.options.animationOutDuration);
              // Trigger the `.then` for the animation chain
              clock.tick(0);
            });

            it('calls render once for initial render and once for each removed alert', () => {
              alertManager.render.should.have.been.called.exactly(3);
            });

            it('removes the 1st and 3rd alert', () => {
              fixture.node().innerHTML.should.equal('<div class="hx-alert-container"><div class="hx-alert" style="">Alert 4</div><div class="hx-alert" style="">Alert 2</div><div class="hx-alert" style="">Alert 0</div></div>');
            });

            describe('and then closing already removed alerts', () => {
              beforeEach(() => {
                alertManager.closeAlert(1);
                alertManager.closeAlert(3);
              });

              it('does not make any additional calls to render', () => {
                alertManager.render.should.have.been.called.exactly(3);
              });
            });
          });
        });
      });

      describe('when passing in a fixture and options', () => {
        let alertManager;
        const options = {
          animationInDuration: 10,
          minMessageDuration: 40,
        };

        beforeEach(() => {
          alertManager = new AlertManager(fixture, options);
          chaiSandbox.on(alertManager, 'addAlert', () => {});
        });

        it('sets the correct default options', () => {
          alertManager.options.should.eql({
            animationInDuration: 10,
            animationOutDuration: 200,
            maxMessageDuration: 7000,
            minMessageDuration: 40,
          });
        });
      });
    });

    describe('Alert', () => {
      describe('when creating an alert with no options', () => {
        let thisAlert;
        const testId = 'test-1234';
        const closeAction = chai.spy();

        beforeEach(() => {
          closeAction.reset();
          thisAlert = new Alert(testId, closeAction);
        });

        it('sets the correct id', () => {
          thisAlert.id.should.equal(testId);
        });

        it('sets the correct closeAction', () => {
          thisAlert.closeAction.should.equal(closeAction);
        });

        it('creates an options object', () => {
          thisAlert.options.should.eql({});
        });

        it('does not create a timeout', () => {
          should.not.exist(thisAlert.activeTimeout);
        });

        describe('when calling the render method', () => {
          let thisAlertRendered;

          beforeEach(() => {
            thisAlertRendered = thisAlert.render();
          });

          it('sets the alert class', () => {
            thisAlertRendered.class().should.equal('hx-alert');
          });

          it('does not set any text', () => {
            thisAlertRendered.text().should.equal('');
          });

          it('creates a close icon', () => {
            thisAlertRendered.select('.hx-alert-close').empty().should.equal(false);
          });

          it('has the correct html', () => {
            thisAlertRendered.node().outerHTML.should.equal(
              '<div class="hx-alert"><div class="hx-alert-content"></div><div class="hx-alert-close"><i class="hx-alert-icon fas fa-times"></i></div></div>',
            );
          });

          describe('when clicking the close button', () => {
            beforeEach(() => {
              chaiSandbox.on(thisAlert, 'close', () => {});
              thisAlertRendered.select('.hx-alert-close').node().click();
            });

            it('calls the close method', () => {
              thisAlert.close.should.have.been.called();
            });
          });
        });

        describe('when calling the close method', () => {
          beforeEach(() => {
            thisAlert.close();
          });

          it('calls the close action with the correct ID', () => {
            closeAction.should.have.been.called.with(testId);
          });

          it('calls the close action once', () => {
            closeAction.should.have.been.called.exactly(1);
          });
        });
      });

      describe('when creating an alert with body, title, type and duration', () => {
        let thisAlert;
        const testId = 'test-5678';
        const closeAction = chai.spy();
        const options = {
          title: 'OMG',
          body: 'An unexpected Alert appeared',
          type: 'success',
          duration: 500,
        };

        beforeEach(() => {
          closeAction.reset();
          thisAlert = new Alert(testId, closeAction, options);
        });

        it('sets the correct id', () => {
          thisAlert.id.should.equal(testId);
        });

        it('sets the correct closeAction', () => {
          thisAlert.closeAction.should.equal(closeAction);
        });

        it('does not call the closeAction', () => {
          closeAction.should.not.have.been.called();
        });

        it('creates an options object', () => {
          thisAlert.options.should.eql(options);
        });

        it('creates a timeout', () => {
          should.exist(thisAlert.activeTimeout);
        });

        describe('when calling the render method', () => {
          let thisAlertRendered;

          beforeEach(() => {
            thisAlertRendered = thisAlert.render();
          });

          it('sets the alert class', () => {
            thisAlertRendered.class().should.equal('hx-alert hx-alert-success');
          });

          it('sets the title', () => {
            thisAlertRendered.select('.hx-alert-title').text().should.equal(`${options.title} `);
          });

          it('sets the body', () => {
            thisAlertRendered.select('.hx-alert-body').text().should.equal(options.body);
          });

          it('creates a close icon', () => {
            thisAlertRendered.select('.hx-alert-close').empty().should.equal(true);
          });

          it('has the correct html', () => {
            thisAlertRendered.node().outerHTML.should.equal(
              `<div class="hx-alert hx-alert-success"><div class="hx-alert-content"><span class="hx-alert-title">${options.title} </span><span class="hx-alert-body">${options.body}</span></div></div>`,
            );
          });
        });

        describe(`and waiting ${options.duration}ms`, () => {
          beforeEach(() => {
            clock.tick(501);
          });

          it('closes the alert', () => {
            closeAction.should.have.been.called.exactly(1);
          });

          it('calls the close action with the correct ID', () => {
            closeAction.should.have.been.called.with(testId);
          });

          it('clears the timeout', () => {
            should.not.exist(thisAlert.activeTimeout);
          });
        });

        describe('when calling the close method', () => {
          beforeEach(() => {
            thisAlert.close();
          });

          it('calls the close action with the correct ID', () => {
            closeAction.should.have.been.called.with(testId);
          });

          it('calls the close action once', () => {
            closeAction.should.have.been.called.exactly(1);
          });

          it('clears the timeout', () => {
            should.not.exist(thisAlert.activeTimeout);
          });
        });
      });
    });

    describe('calculateMessageDuration', () => {
      describe('when passing undefined', () => {
        it('returns minimum duration', () => {
          calculateMessageDuration(undefined, undefined, {}).should.equal(2000);
        });
      });

      describe('when using the default options', () => {
        it('returns minimum duration for short strings', () => {
          calculateMessageDuration('', 'A').should.equal(2000);
        });

        it('returns a sensible value for 20 word string', () => {
          calculateMessageDuration('This is the title.', 'This is the body of the string with twenty words. There are definitely twenty. No Really.').should.equal(5350);
        });

        it('returns 5000 for a 100 character string', () => {
          calculateMessageDuration('', range(100).map(() => 'A').join('')).should.equal(5000);
        });

        it('returns the max for a really long string', () => {
          calculateMessageDuration('', range(1000).map(() => 'A').join('')).should.equal(7000);
        });
      });

      describe('when using the passed in options', () => {
        const passedInOptions = {
          minMessageDuration: 1000,
          maxMessageDuration: 9000,
        };

        it('returns minimum duration for short strings', () => {
          calculateMessageDuration('', 'A', passedInOptions).should.equal(1000);
        });

        it('returns a sensible value for 20 word string', () => {
          calculateMessageDuration('This is the title.', 'This is the body of the string with twenty words. There are definitely twenty. No Really.', passedInOptions).should.equal(5350);
        });

        it('returns 5000 for a 100 character string', () => {
          calculateMessageDuration('', range(100).map(() => 'A').join(''), passedInOptions).should.equal(5000);
        });

        it('returns the max for a really long string', () => {
          calculateMessageDuration('', range(1000).map(() => 'A').join(''), passedInOptions).should.equal(9000);
        });
      });

      describe('when using the partial passed in options', () => {
        const passedInOptions = {
          maxMessageDuration: 9000,
        };

        it('returns minimum duration for short strings', () => {
          calculateMessageDuration('', 'A', passedInOptions).should.equal(2000);
        });

        it('returns a sensible value for 20 word string', () => {
          calculateMessageDuration('This is the title.', 'This is the body of the string with twenty words. There are definitely twenty. No Really.', passedInOptions).should.equal(5350);
        });

        it('returns 5000 for a 100 character string', () => {
          calculateMessageDuration('', range(100).map(() => 'A').join(''), passedInOptions).should.equal(5000);
        });

        it('returns the max for a really long string', () => {
          calculateMessageDuration('', range(1000).map(() => 'A').join(''), passedInOptions).should.equal(9000);
        });
      });
    });

    describe('inbuiltAlertManager', () => {
      beforeEach(() => {
        chaiSandbox.on(inbuiltAlertManager, 'alert', () => {});
        chaiSandbox.on(inbuiltAlertManager, 'message', () => {});
      });


      it('has the correct options', () => {
        inbuiltAlertManager.options.should.eql({
          animationInDuration: 200,
          animationOutDuration: 200,
          maxMessageDuration: 7000,
          minMessageDuration: 2000,
        });
      });

      describe('alert', () => {
        const optionsToPass = {
          abc: 123,
        };
        beforeEach(() => {
          alert(optionsToPass);
        });

        it('calls the inbuilt alert manager method', () => {
          inbuiltAlertManager.alert.should.have.been.called.with(optionsToPass);
        });
      });

      describe('message', () => {
        const optionsToPass = {
          abc: 123,
        };
        beforeEach(() => {
          message(optionsToPass);
        });

        it('calls the inbuilt alert manager method', () => {
          inbuiltAlertManager.message.should.have.been.called.with(optionsToPass);
        });
      });
    });
  });
};
