describe('factory: OrderProducts', function() {
  beforeEach(module('ClothingShop'));

  beforeEach(inject(function(OrderProducts) {
    orderProducts = OrderProducts;
    mockProductList = [{ "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }];
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
      expect(orderProducts.calculateTotal()).toEqual(99.00);
    })
  })
});
