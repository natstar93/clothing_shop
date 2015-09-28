clothingShop.controller('ClothingShopProductsController', ['$scope', '$http', 'DataService', 'OrderProducts',
  function($scope, $http, DataService, OrderProducts) {
    var self = this;

    self.orderedItems = [];
    self.products = [];
    self.total = 0;

    var orderProducts = OrderProducts;
    var dataService = DataService;

    getDataService();

    function getDataService() {
      dataService.getData().then(function(response) {
        self.products = response.data;
      });
    }

    this.addItem = function(product) {
      self.orderedItems = orderProducts.addItem(product);
      self.total = orderProducts.calculateTotal();
    }

    this.decreaseItem = function(product) {
      self.orderedItems = orderProducts.removeItem(product);
    }
}]);
