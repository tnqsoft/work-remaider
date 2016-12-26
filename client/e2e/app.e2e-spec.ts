import { WorkRemaiderClientPage } from './app.po';

describe('work-remaider-client App', function() {
  let page: WorkRemaiderClientPage;

  beforeEach(() => {
    page = new WorkRemaiderClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
