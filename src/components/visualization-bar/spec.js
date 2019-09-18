import chai from 'chai';
import { div, select, Selection } from 'utils/selection';
import { VisualizationBar, visualizationBar } from 'components/visualization-bar';

export default () => {
  chai.should();

  describe('visualization-bar', () => {
    const fixture = div('hx-test-visualization-bar');

    const chaiSandbox = chai.spy.sandbox();

    before(() => {
      select('body').add(fixture);
    });

    afterEach(() => {
      fixture.clear();
      chaiSandbox.restore();
    });

    after(() => {
      fixture.remove();
    });

    const testSegments = [
      {
        id: 1,
        label: 'Label',
        count: 100,
        type: 'danger',
      },
      {
        id: 2,
        label: 'Label',
        count: 300,
      },
    ];

    const testTitle = 'Title';
    const testBreakdown = 'Breakdown';

    describe('when given all the standard options', () => {
      let testVisualizationBar;
      let testVisualizationBarDiv;

      beforeEach(() => {
        testVisualizationBarDiv = fixture.append(div());
        testVisualizationBar = new VisualizationBar(testVisualizationBarDiv, {
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
        });
      });

      it('passes the options to StatusBar', () => {
        testVisualizationBar._.bar.options.should.eql({
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
          compact: false,
          disabled: false,
        });
      });

      it('has the correct methods', () => {
        Object.keys(testVisualizationBar).sort().should.eql([
          'selection',
          'options',
          '_',
          'segments',
          'title',
          'breakdown',
        ].sort());
      });
    });

    it('throws when called with no segments', () => {
      function fn() {
        new VisualizationBar(div());
      }
      fn.should.throw('VisualizationBar: Expected at least one segment to display');
    });

    describe('visualizationBar', () => {
      let testVisualizationBarDiv;

      beforeEach(() => {
        testVisualizationBarDiv = visualizationBar({
          segments: testSegments,
          title: testTitle,
          breakdown: testBreakdown,
        });
      });

      it('returns a selection', () => {
        testVisualizationBarDiv.should.be.an.instanceof(Selection);
      });

      it('has the visualization-bar api', () => {
        testVisualizationBarDiv.api('visualization-bar').should.be.an.instanceof(VisualizationBar);
      });
    });
  });
};
