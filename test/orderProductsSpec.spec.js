describe('factory: OrderProducts', function() {
  beforeEach(module('ClothingShop'));

  beforeEach(inject(function(OrderProducts) {
    orderProducts = OrderProducts;
  }));

  describe('addItem', function() {
    it('can add a single product', function() {
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 } )).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 1 , "price" : 99.00 }]);
    });

    it('can add multiple products', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 } );
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 4 } )).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 2, "price" : 99.00 }]);
    });
  });

  describe('removeItem', function() {
    it('can remove a product', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 } );
      expect(orderProducts.removeItem( { "name" : "Almond Toe Court Shoes, Patent Black", "quantity" : 1 } )).toEqual([]);
    });
  });

  describe('calculateTotal', function() {
    it('sums an order', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 } );
      expect(orderProducts.calculateTotal()).toEqual(99.00);
    })
  })
});
