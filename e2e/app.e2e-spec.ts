import { TaquinPage } from './app.po';

describe('taquin App', function() {
  let page: TaquinPage;

  beforeEach(() => {
    page = new TaquinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
