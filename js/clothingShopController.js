clothingShop.controller('ClothingShopProductsController', ['$scope', '$http', 'DataService', 'OrderProducts',
  function($scope, $http, DataService, OrderProducts) {
    var self = this;

    self.orderedItems = [];
    self.products = [];
    self.subtotal = 0;
    self.total = 0;
    this.voucherValid = true;

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

    this.isNoMoreStock = function(item) {
      return orderProducts.isOutOfStock(item, self.products);
    }

    this.applyVoucher = function() {
      this.voucherValid = orderProducts.applyVoucher(this.voucherCode);
      self.total = orderProducts.calculateTotal();
      this.voucherCode = '';
    }

    function populateLists(returnedLists) {
      self.orderedItems = returnedLists['o'];
      self.products = returnedLists['p'];
      self.subtotal = orderProducts.calculateSubtotal();
      self.total = orderProducts.calculateTotal();
    }
}]);
