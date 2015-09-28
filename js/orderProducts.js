clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];

  factory.addItem = function(product) {
    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].name === product.name) {
        orderedItems[i].quantity ++;
        return orderedItems;
      }
    }
    orderedItems.push( { "name" : product.name, "quantity" : 1, "price" : product.price } );
    return orderedItems;
  };

  factory.removeItem = function(item) {
    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].name === item.name) {
        orderedItems[i].quantity --;
        if (orderedItems[i].quantity === 0) {
          orderedItems.splice(i, 1);
        }
        return orderedItems;
      }
    }
  };

  factory.calculateTotal = function() {
    var basketTotal = 0;
    angular.forEach(orderedItems, function(item) {
      basketTotal += item.price * item.quantity;
    });
    return basketTotal;
  }

  return factory;
});
