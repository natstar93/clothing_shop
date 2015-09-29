describe('factory: OrderProducts', function() {
  beforeEach(module('ClothingShop'));

  beforeEach(inject(function(OrderProducts) {
    orderProducts = OrderProducts;
    mockProductList = [{ "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }];
    outOfStockProductList = [{ "name": "Flip Flops, Blue", "category": "Men's Footwear", "price": 19.00, "quantity": 0 }];
  }));

  describe('can update order list', function() {

    it('adds a single product', function() {
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList )['o']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 1 , "price" : 99.00 }]);
    });

    it('adds multiple products', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 4 }, mockProductList )['o']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 2, "price" : 99.00 }]);
    });

    it('removes a product', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      expect(orderProducts.removeItem( { "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 1 }, mockProductList )['o']).toEqual([]);
    });
  });

  describe('can update stock list', function() {

    it('reduces quantity of item when ordered', function() {
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "price": 99.00 }, mockProductList)['p']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price" : 99.00, "quantity" : 4 }]);
    });

    it('increases quantity of item when removed from basket', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "price": 99.00 }, mockProductList );
      expect(orderProducts.removeItem( { "name": "Almond Toe Court Shoes, Patent Black", "price": 99.00 }, mockProductList)['p']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price" : 99.00, "quantity" : 5 }]);
    });
  });

  describe('calculateTotal', function() {

    it('sums an order', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      expect(orderProducts.calculateSubtotal()).toEqual(99.00);
    });

    it('applies £5 off voucher', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      orderProducts.applyVoucher();
      expect(orderProducts.calculateTotal()).toEqual(94.00);
    });

    it('does not apply £5 off voucher if no products ordered', function() {
      orderProducts.applyVoucher();
      expect(orderProducts.calculateTotal()).toEqual(0.00);
    });

    it('applies £5 off voucher later if no products ordered initially', function() {
      orderProducts.applyVoucher();
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      expect(orderProducts.calculateTotal()).toEqual(94.00);
    });
  });

  describe('out of stock products', function() {

    it('knows if item is out of stock', function() {
      expect(orderProducts.isOutOfStock({ "name": "Flip Flops, Blue", "category": "Men's Footwear", "price": 19.00, "quantity": 0 }, outOfStockProductList)).toBe(true);
    })
  })
});
