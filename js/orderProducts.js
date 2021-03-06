clothingShop.factory('OrderProducts', function() {

  var factory = {};
  var orderedItems = [];
  var fiveOffVoucherApplied = false;
  var tenOffVoucherApplied = false;
  var fifteenOffVoucherApplied = false;
  var footwearInBasket = false;
  var validVoucherCodes = ['AWESOME5OFF', 'AWESOME10OFF', 'AWESOME15SHOE'];

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
      orderedItems.push( { "name" : product.name, "category" : product.category, "quantity" : 1, "price" : product.price } );
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

  factory.calculateSubtotal = function() {
    var basketTotal = 0;
    angular.forEach(orderedItems, function(item) {
      basketTotal += item.price * item.quantity;
    });
    return basketTotal;
  };

  factory.isVoucherValid = function(voucherCode) {
    return (validVoucherCodes.indexOf(voucherCode) > -1)
  };

  factory.applyVoucher = function(voucherCode) {
    if (voucherCode === 'AWESOME5OFF') {
      fiveOffVoucherApplied = true;
      tenOffVoucherApplied = false;
      fifteenOffVoucherApplied = false;
    }
    else if (voucherCode === 'AWESOME10OFF') {
      tenOffVoucherApplied = true;
      fiveOffVoucherApplied = false;
      fifteenOffVoucherApplied = false;
    }
    else if ((voucherCode === 'AWESOME15SHOE')) {
      fifteenOffVoucherApplied = true;
      tenOffVoucherApplied = false;
      fiveOffVoucherApplied = false;
    }
  };

  factory.getVoucherMessage = function() {
    if (fiveOffVoucherApplied && factory.calculateSubtotal() > 5) {
      return 'Voucher applied: £5 off';
    }
    else if (tenOffVoucherApplied && factory.calculateSubtotal() > 50) {
      return 'Voucher applied: £10 off orders over £50'
    }
    else if (fifteenOffVoucherApplied && factory.calculateSubtotal() > 15 && footwearInBasket) {
      return 'Voucher applied: £15 off orders over £75 which contain items from our footwear range'
    }
  };

  function isFootwearOrdered() {
    footwearInBasket = false;
    for (var i = 0; i < orderedItems.length; i++) {
      if (orderedItems[i].category === "Women's Footwear" || orderedItems[i].category === "Men's Footwear") {
        footwearInBasket = true;
      }
    }
  }

  factory.calculateTotal = function() {
    grandTotal = factory.calculateSubtotal();
    isFootwearOrdered();
    if (fiveOffVoucherApplied && grandTotal > 5) {
      grandTotal -= 5;
    }
    if(tenOffVoucherApplied && grandTotal > 50) {
      grandTotal -= 10;
    }
    if(fifteenOffVoucherApplied && footwearInBasket && grandTotal > 75) {
      grandTotal -= 15;
    }
    return grandTotal;
  };

  factory.isOutOfStock = function(item, productsList) {
    var itemPosition = findItem(item, productsList);
    return (productsList[itemPosition].quantity < 1);
  }

  return factory;
});
