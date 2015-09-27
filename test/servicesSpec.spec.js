describe('service: OrderProducts', function() {
  beforeEach(module('ClothingShop'));

  beforeEach(inject(function(OrderProducts) {
    orderProducts = OrderProducts;
  }));

  describe('addItem', function() {
    it('can add a single product', function() {
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 } )).toEqual(['Almond Toe Court Shoes, Patent Black']);
    });
  });
});
