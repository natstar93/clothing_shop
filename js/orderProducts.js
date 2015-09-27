clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];

  factory.addItem = function(product) {
    orderedItems.push(product.name);
    return orderedItems;
  }
  return factory;
});
