clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];

  factory.addItem = function(product, productsList) {
    removeFromStockList(product, productsList);
    addToOrder(product);
    return { 'o' : orderedItems,
             'p' : productsList };
  };

  function removeFromStockList(product, productsList) {
    var itemPosition = findItem(product, productsList);
    productsList[itemPosition].quantity--;
  };

  function addToOrder(product) {
    var itemPosition = findItem(product, orderedItems);
    if (itemPosition > -1) {
      orderedItems[itemPosition].quantity ++;
    }
    else {
      orderedItems.push( { "name" : product.name, "quantity" : 1, "price" : product.price } );
    }
  };

  factory.removeItem = function(item, productsList) {
    removeFromOrder(item);
    incremementStockList(item, productsList);

    return {'o' : orderedItems,
            'p' : productsList};
  };

  function removeFromOrder(item) {
    var itemPosition = findItem(item, orderedItems);
    orderedItems[itemPosition].quantity--;
    if (orderedItems[itemPosition].quantity === 0) {
      orderedItems.splice(itemPosition, 1);
    }
  };

  function findItem(item, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === item.name) {
        return i;
      }
    }
    return -1;
  }

  function incremementStockList(item, productsList) {
    var itemPosition = findItem(item, productsList);
    productsList[itemPosition].quantity++;
  };

  factory.calculateTotal = function() {
    var basketTotal = 0;
    angular.forEach(orderedItems, function(item) {
      basketTotal += item.price * item.quantity;
    });
    return basketTotal;
  };

  factory.isOutOfStock = function(item, productsList) {
    var itemPosition = findItem(item, productsList);
    return (productsList[itemPosition].quantity < 1);
  }

  return factory;
});
