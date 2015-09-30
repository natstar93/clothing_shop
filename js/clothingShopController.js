clothingShop.controller('ClothingShopProductsController', ['$scope', '$http', 'DataService', 'OrderProducts',
  function($scope, $http, DataService, OrderProducts) {
    var self = this;

    self.orderedItems = [];
    self.products = [];
    self.subtotal = 0;
    self.total = 0;
    self.voucherValid = true;

    var orderProducts = OrderProducts;
    var dataService = DataService;

    getDataService();

    function getDataService() {
      dataService.getData().then(function(response) {
        self.products = response.data;
      });
    }

    self.addItem = function(product) {
      var returnedLists = orderProducts.addItem(product, self.products);
      populateLists(returnedLists);
    }

    self.decreaseItem = function(product) {
      var returnedLists = orderProducts.removeItem(product, self.products);
      populateLists(returnedLists);
    }

    self.isNoMoreStock = function(item) {
      return orderProducts.isOutOfStock(item, self.products);
    }

    self.applyVoucher = function() {
      self.voucherValid = orderProducts.isVoucherValid(self.voucherCode);
      orderProducts.applyVoucher(self.voucherCode);
      self.total = orderProducts.calculateTotal();
      self.voucherCode = '';
    }

    self.currentDiscount = function() {
      return orderProducts.getVoucherMessage();
    }

    function populateLists(returnedLists) {
      self.orderedItems = returnedLists['o'];
      self.products = returnedLists['p'];
      self.subtotal = orderProducts.calculateSubtotal();
      self.total = orderProducts.calculateTotal();
    }
}]);
