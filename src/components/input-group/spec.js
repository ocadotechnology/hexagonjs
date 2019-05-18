import { Selection } from 'utils/selection';

import { inputGroup } from 'components/input-group';

export default () => {
  describe('input-group', () => {
    it('should a detached div with the correct class', () => {
      inputGroup().should.be.an.instanceof(Selection);
      inputGroup().class().should.equal('hx-input-group');
    });
  });
};
