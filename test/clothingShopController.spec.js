describe('ClothingShopProductsController', function() {
  beforeEach(module('ClothingShop'));

  var scope, ctrl, httpBackend;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    httpBackend = _$httpBackend_;
    httpBackend
      .when('GET', 'js/awesomeclothing.json')
      .respond({ "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 });
    scope = $rootScope.$new();
    ctrl = $controller('ClothingShopProductsController', {$scope: scope});
  }));

  it('creates products model', function() {
    expect(ctrl.products).toBeUndefined;
    httpBackend.flush();
    expect(ctrl.products).toEqual({ "name": "Almond Toe Court Shoes, Patent Black", "category": "Women's Footwear", "price": 99.00, "quantity": 5 });
  });
});
