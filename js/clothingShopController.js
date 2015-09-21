clothingShop.controller('ClothingShopProductsController', ['$scope', '$http',
  function($scope, $http) {
    var self = this;
    $http.get('js/awesomeclothing.json').success(function(data) {
      self.products = data;
    });

    self.orderedItems = [];

    this.addItem = function(product) {
      console.log(product);
      self.orderedItems.push(product);
      console.log(self.orderedItems);
    }
}]);
