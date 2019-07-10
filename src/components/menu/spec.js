import { div } from 'utils/selection';

import { MenuBase as Menu } from 'components/menu';

export default () => {
  describe('menu', () => describe('api', () => {
    it('should use the items passed in', () => {
      const menu = new Menu(div(), { items: [1, 2, 3] });
      menu.items().should.eql([1, 2, 3]);
    });

    it('should use the disabled flag', () => {
      const menu = new Menu(div(), { disabled: true });
      menu.disabled().should.equal(true);
    });
  }));
};
