describe('Clothing Shop Homepage', function() {

  var productList = element.all(by.repeater('product in productsCtrl.products'));
  var orderedItemList = element.all(by.repeater('item in productsCtrl.orderedItems'));

  beforeEach(function() {
    browser.get('index.html');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Awesome Clothing');
  });

  describe('shop front', function() {

    it('displays products', function() {
      expect(productList.count()).toEqual(13);
    });

    it('displays product details', function() {
      expect(productList.get(0).element(by.css('.product-name')).getText()).toEqual('Almond Toe Court Shoes, Patent Black');
      expect(productList.get(2).element(by.css('.product-category')).getText()).toEqual('Men\'s Footwear');
      expect(productList.get(6).element(by.css('.product-price')).getText()).toEqual('£30.00');
      expect(productList.get(12).element(by.css('.product-stock')).getText()).toEqual('5 in stock');
    });

    describe('updates stock quantity', function() {

      it('when product is ordered', function() {
        expect(productList.get(0).element(by.binding('product.quantity')).getText()).toEqual('5');
        productList.get(0).element(by.css('.add-btn')).click();
        expect(productList.get(0).element(by.binding('product.quantity')).getText()).toEqual('4');
      });

      it('when product is removed from basket', function() {
        productList.get(0).element(by.css('.add-btn')).click();
        expect(productList.get(0).element(by.binding('product.quantity')).getText()).toEqual('4');
        orderedItemList.get(0).element(by.css('.decrease-btn')).click();
        expect(productList.get(0).element(by.binding('product.quantity')).getText()).toEqual('5');
      });
    });
  });

  describe('shopping cart', function() {

    beforeEach(function() {
      productList.get(0).element(by.css('.add-btn')).click();
    });

    it('single product can be added', function() {
      expect(element(by.css('.ordered-products')).getText()).toContain('Almond Toe Court Shoes, Patent Black');
    });

    it('multiple products can be added', function() {
      productList.get(0).element(by.css('.add-btn')).click();
      expect(element(by.css('.ordered-products')).getText()).toContain('Quantity: - 2 +');
    });

    it('quantity can be increased', function() {
      orderedItemList.get(0).element(by.css('.increase-btn')).click();
      expect(element(by.css('.ordered-products')).getText()).toContain('Quantity: - 2 +');
    });

    it('single product can be removed', function() {
      orderedItemList.get(0).element(by.css('.decrease-btn')).click();
      expect(element(by.css('.shopping-cart-container')).getText()).toNotContain('Almond Toe Court Shoes, Patent Black');
    });

    it('one of multiple products can be removed', function() {
      productList.get(0).element(by.css('.add-btn')).click();
      productList.get(0).element(by.css('.add-btn')).click();
      orderedItemList.get(0).element(by.css('.decrease-btn')).click();
      expect(element(by.css('.ordered-products')).getText()).toContain('Quantity: - 2 +');
    });
  });

  describe('price calculation', function() {

    it('correctly totals item prices', function() {
      productList.get(0).element(by.css('.add-btn')).click();
      productList.get(5).element(by.css('.add-btn')).click();
      expect(element(by.binding('productsCtrl.total.toFixed(2)')).getText()).toEqual('266.00');
    });
  });

  describe('out of stock products', function() {

    it('cannot be ordered', function() {
      expect(productList.get(4).element(by.css('.add-btn')).getAttribute('disabled')).toBe('true');
    });
  })
});
