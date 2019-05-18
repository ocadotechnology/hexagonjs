import { div } from 'utils/selection';

import { Crumbtrail } from 'components/crumbtrail';

export default () => {
  describe('crumbtrail', () => it('items() should return the appropriate values', () => {
    const items = [
      'bob',
      'steve',
      'dave',
    ];

    const crumbtrail = new Crumbtrail(div(), {
      items,
    });

    crumbtrail.items().should.not.contain(0);
  }));
};
