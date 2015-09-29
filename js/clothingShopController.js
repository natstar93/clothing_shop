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
      var returnedLists = orderProducts.addItem(product, self.products);
      populateLists(returnedLists);
    }

    this.decreaseItem = function(product) {
      var returnedLists = orderProducts.removeItem(product, self.products);
      populateLists(returnedLists);
    }

    function populateLists(returnedLists) {
      self.orderedItems = returnedLists['o'];
      self.products = returnedLists['p'];
      self.total = orderProducts.calculateTotal();
    }
}]);
