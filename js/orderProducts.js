clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];
  //var availableProducts = [];

  factory.addItem = function(product, productsList) {
   var firstOfProduct = true;
    for (var i = 0; i < productsList.length; i++) {
      if (productsList[i].name === product.name) {
        productsList[i].quantity--;
      }
    }

    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].name === product.name) {
        firstOfProduct = false;
        orderedItems[i].quantity ++;
      }
    }
    if (firstOfProduct) {
      orderedItems.push( { "name" : product.name, "quantity" : 1, "price" : product.price } );
    }
    return {'o' : orderedItems,
            'p' : productsList};
  };

  factory.removeItem = function(item, productsList) {
    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].name === item.name) {
        orderedItems[i].quantity --;
        if (orderedItems[i].quantity === 0) {
          orderedItems.splice(i, 1);
        }
      }
    }
    for (var i = 0; i < productsList.length; i++) {
      if (productsList[i].name === item.name) {
        productsList[i].quantity++;
      }
    }
    return {'o' : orderedItems,
            'p' : productsList};
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
