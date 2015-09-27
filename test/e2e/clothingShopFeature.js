describe('Clothing Shop Homepage', function() {

  var productList = element.all(by.repeater('product in products'));

  beforeEach(function() {
    browser.get('index.html');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Awesome Clothing');
  });

  it('displays products', function() {
    expect(productList.count()).toEqual(13);
  });

  it('displays product details', function() {
    expect(productList.get(0).element(by.css('.product-name')).getText()).toEqual('Almond Toe Court Shoes, Patent Black');
    expect(productList.get(2).element(by.css('.product-category')).getText()).toEqual('Men\'s Footwear');
    expect(productList.get(6).element(by.css('.product-price')).getText()).toEqual('£30.00');
    expect(productList.get(12).element(by.css('.product-stock')).getText()).toEqual('5 in stock');
  });

  describe('shopping cart', function() {
    it('single product can be added to it', function() {
      productList.get(0).element(by.css('.add-btn')).click();
      expect(element(by.css('.ordered-products')).getText()).toContain('Almond Toe Court Shoes, Patent Black');
    });

    it('multiple products can be added to it', function() {
      productList.get(0).element(by.css('.add-btn')).click();
      productList.get(0).element(by.css('.add-btn')).click();
      expect(element(by.css('.ordered-products')).getText()).toContain('Almond Toe Court Shoes, Patent Black x 2');
    });
  });
});
