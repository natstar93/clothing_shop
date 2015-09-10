describe('Clothing Shop Homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Awesome Clothing');
  });

  it('displays products', function() {
    var productList = element.all(by.repeater('product in products'));
    expect(productList.count()).toEqual(13);
    expect(productList.get(0).getText()).toEqual('Almond Toe Court Shoes, Patent Black');
  });
});
