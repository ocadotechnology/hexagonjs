import { div } from 'utils/selection';

import { VisualizationBar } from 'components/visualization-bar';

export default () => {
  describe('hx-visualization-bar', () => {
    it('should create and class the progress bar correctly', () => {
      const pb = new VisualizationBar(div());
      pb.selection.classed('hx-visualization-bar').should.equal(true);
      pb.selection.selectAll('.hx-progress-bar-inner').size().should.equal(1);
      pb.progress.should.equal(0);
      /*
        This method is used rather than calculate the pixel width as .style('width')
        returns Npx not N%
      */
      pb.innerBars.attr('style').split(' ').join('').should.equal('width:0%;');
    });
  });
};
