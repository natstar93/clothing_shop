describe('factory: OrderProducts', function() {
  beforeEach(module('ClothingShop'));

  beforeEach(inject(function(OrderProducts) {
    orderProducts = OrderProducts;
    mockProductList = [{ "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }];
    outOfStockProductList = [{ "name": "Flip Flops, Blue", "category": "Men's Footwear", "price": 19.00, "quantity": 0 }];
    underFiftyProductList = [{ "name": "Flip Flops, Red", "category": "Men's Footwear", "price": 19.00, "quantity": 6 }];
    overSeventyfiveProductList = [{ "name": "Gold Button Cardigan, Black", "category": "Women's Casualwear", "price": 167.00, "quantity": 6 }];
  }));

  describe('can update order list', function() {

    it('adds a single product', function() {
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList )['o']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "category" : "Women's Footwear", "quantity" : 1 , "price" : 99.00 }]);
    });

    it('adds multiple products', function() {
      orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
      expect(orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 4 }, mockProductList )['o']).toEqual([{ "name" : "Almond Toe Court Shoes, Patent Black", "category" : "Women's Footwear", "quantity" : 2, "price" : 99.00 }]);
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

    describe('£5 off voucher', function() {

      it('applies voucher', function() {
        orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
        orderProducts.applyVoucher('AWESOME5OFF');
        expect(orderProducts.calculateTotal()).toEqual(94.00);
      });

      it('does not apply if no products ordered', function() {
        orderProducts.applyVoucher('AWESOME5OFF');
        expect(orderProducts.calculateTotal()).toEqual(0.00);
      });

      it('does not apply if code entered incorrectly', function() {
        orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
        orderProducts.applyVoucher('WRONG');
        expect(orderProducts.calculateTotal()).toEqual(99.00);
      });

      it('applies voucher later if no products ordered initially', function() {
        orderProducts.applyVoucher('AWESOME5OFF');
        orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
        expect(orderProducts.calculateTotal()).toEqual(94.00);
      });
    });

    describe('£10 off voucher', function() {

      it('applies voucher if total over £50', function() {
        orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
        orderProducts.applyVoucher('AWESOME10OFF');
        expect(orderProducts.calculateTotal()).toEqual(89.00);
      });

      it('does not apply voucher if total £50 or less', function() {
        orderProducts.addItem( { "name": "Flip Flops, Red", "category": "Men's Footwear", "price": 19.00, "quantity": 6 }, underFiftyProductList );
        orderProducts.applyVoucher('AWESOME10OFF');
        expect(orderProducts.calculateTotal()).toEqual(19.00);
      });
    });

    describe('£15 off voucher', function() {

      it('applies voucher if total over £75 and >0 items of footwear ordered', function() {
        orderProducts.addItem( { "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 }, mockProductList );
        orderProducts.applyVoucher('AWESOME15SHOE');
        expect(orderProducts.calculateTotal()).toEqual(84.00);
      });

      it('does not apply voucher if footwear not ordered', function() {
        orderProducts.addItem( { "name": "Gold Button Cardigan, Black", "category": "Women's Casualwear", "price": 167.00, "quantity": 6 }, overSeventyfiveProductList );
        orderProducts.applyVoucher('AWESOME15SHOE');
        expect(orderProducts.calculateTotal()).toEqual(167.00);
      });
    })
  });

  describe('out of stock products', function() {

    it('knows if item is out of stock', function() {
      expect(orderProducts.isOutOfStock({ "name": "Flip Flops, Blue", "category": "Men's Footwear", "price": 19.00, "quantity": 0 }, outOfStockProductList)).toBe(true);
    })
  })
});
