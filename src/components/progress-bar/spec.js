import chai from 'chai';

import { div, Selection } from 'utils/selection';

import { ProgressBar, progressBar } from 'components/progress-bar';
import { ProgressBar as ProgressBarV1 } from 'components/progress-bar/progress-bar.coffee';
import { ProgressBar as ProgressBarV2 } from 'components/progress-bar/progress-bar';

export default () => {
  const should = chai.should();

  describe('progress-bar', () => {
    describe('v1', () => {
      it('should create and class the progress bar correctly', () => {
        const pb = new ProgressBar(div());
        pb.selection.classed('hx-progress-bar').should.equal(true);
        pb.selection.selectAll('.hx-progress-bar-inner').size().should.equal(1);
        pb.progress.should.equal(0);
        /*
          This method is used rather than calculate the pixel width as .style('width')
          returns Npx not N%
        */
        pb.innerBars.attr('style').split(' ').join('').should.equal('width:0%;');
      });

      it('should set the progress correctly with value', () => {
        const pb = new ProgressBar(div());
        /*
          This method is used rather than calculate the pixel width as .style('width')
          returns Npx not N%
        */
        pb.innerBars.attr('style').split(' ').join('').should.equal('width:0%;');
        pb.value(0.79);
        pb.progress.should.equal(0.79);
        /*
          This method is used rather than calculate the pixel width as .style('width')
          returns Npx not N%
        */
        pb.innerBars.attr('style').split(' ').join('').should.equal('width:79%;');
      });

      it('should return the correct progress with value', () => {
        const pb = new ProgressBar(div());
        pb.value(0.5);
        pb.progress.should.equal(0.5);
        pb.value().should.equal(0.5);
        pb.value(1);
        pb.progress.should.equal(1);
        pb.value().should.equal(1);
      });

      it('should do nothing if a non-numeric value is passed in to value', () => {
        const pb = new ProgressBar(div());
        pb.value('bob');
        pb.progress.should.equal(0);
        pb.value(0.5);
        pb.progress.should.equal(0.5);
        pb.value('i0');
        pb.progress.should.equal(0.5);
      });

      it('should not apply negative values', () => {
        const pb = new ProgressBar(div());
        pb.value(-0.1);
        pb.progress.should.equal(0);
      });

      it('should not apply values over 1', () => {
        const pb = new ProgressBar(div());
        pb.value(2);
        pb.progress.should.equal(1);
      });
    });

    describe('ProgressBar', () => {
      describe('when called without the feature flag', () => {
        let testProgressBar;

        beforeEach(() => {
          testProgressBar = new ProgressBar(div());
        });

        it('does not returns a v2 progress bar', () => {
          testProgressBar.should.not.be.an.instanceof(ProgressBarV2);
        });

        it('returns a v1 progress bar', () => {
          testProgressBar.should.be.an.instanceof(ProgressBarV1);
        });
      });

      describe('when called with the feature flag', () => {
        let testProgressBar;

        beforeEach(() => {
          testProgressBar = new ProgressBar(div(), {
            featureFlags: {
              useUpdatedClass: true,
            },
          });
        });

        it('does not returns a v1 progress bar', () => {
          testProgressBar.should.not.be.an.instanceof(ProgressBarV1);
        });

        it('returns a v2 progress bar', () => {
          testProgressBar.should.be.an.instanceof(ProgressBarV2);
        });

        it('has the correct methods', () => {
          should.exist(testProgressBar.selection);
          should.exist(testProgressBar.options);
          should.exist(testProgressBar._);
          should.exist(testProgressBar.title);
          should.exist(testProgressBar.breakdown);
          should.exist(testProgressBar.disabled);
          should.exist(testProgressBar.compact);
          should.exist(testProgressBar.hidePlan);
          should.exist(testProgressBar.done);
          should.exist(testProgressBar.inProgress);
          should.exist(testProgressBar.plan);
        });
      });
    });

    describe('progressBar', () => {
      describe('when called with the feature flag', () => {
        let testProgressBarDiv;

        beforeEach(() => {
          testProgressBarDiv = progressBar({
            featureFlags: {
              useUpdatedClass: true,
            },
          });
        });

        it('returns a selection', () => {
          testProgressBarDiv.should.be.an.instanceof(Selection);
        });

        it('has the visualization-bar api', () => {
          testProgressBarDiv.api('progress-bar').should.be.an.instanceof(ProgressBarV2);
        });
      });

      describe('when called without the feature flag', () => {
        let testProgressBarDiv;

        beforeEach(() => {
          testProgressBarDiv = progressBar();
        });

        it('returns a selection', () => {
          testProgressBarDiv.should.be.an.instanceof(Selection);
        });

        it('has the visualization-bar api', () => {
          testProgressBarDiv.api('progress-bar').should.be.an.instanceof(ProgressBarV1);
        });
      });
    });
  });
};
