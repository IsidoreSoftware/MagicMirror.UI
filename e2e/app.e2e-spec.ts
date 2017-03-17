import { IsidoreMagicMirrorPage } from './app.po';

describe('isidore-magic-mirror App', () => {
  let page: IsidoreMagicMirrorPage;

  beforeEach(() => {
    page = new IsidoreMagicMirrorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
