clothingShop.controller('ClothingShopProductsController', ['$scope', '$http', 'OrderProducts',
  function($scope, $http, OrderProducts) {
    var self = this;
    $http.get('js/awesomeclothing.json').success(function(data) {
      self.products = data;
    });

    self.orderedItems = [];

    var orderProducts = OrderProducts;

    this.addItem = function(product) {
      self.orderedItems = orderProducts.addItem(product);
    }
}]);
