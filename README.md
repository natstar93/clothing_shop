
Clothing Shop
=================

[View app on Heroku](https://awesome-clothing.herokuapp.com)

![](/images/awesome-shop.png)

## Task

Develop a responsive website for a clothing retailer. The page displays all available products and the shopping basket to which they can be added.

###User stories

1. As a User I can add a product to my shopping cart
2. As a User I can remove a product from my shopping cart
3. As a User I can view the total price for the products in my shopping cart
4. As a User I can apply a voucher to my shopping cart
5. As a User I can view the total price for the products in my shopping cart with discounts applied
6. As a User I am alerted when I apply an invalid voucher to my shopping cart
7. As a User I am unable to add Out of Stock products to the shopping cart

###Discount vouchers

Apply vouchers to your order by typing one of the following codes into the Voucher Code box and pressing the Submit Voucher button.

AWESOME5OFF - £5 off your order<br>
AWESOME10OFF - £10 off orders over £50<br>
AWESOME15SHOE - £15 off orders over £75 which contain at least one footwear item

###Assumptions

* Users can only apply one voucher to their order at a time. If a new voucher is applied successfully, the previous voucher is removed.
* Users can see all products, including those which are currently out of stock. They cannot order or increase the desired quantity of an out of stock product.

##Tools

Testing: Karma, Protractor<br>
Application Code: Javascript, HTML & CSS<br>
Frameworks: AngularJS, Bootstrap

##How To Run

###Serve locally

1. Ensure you have npm and bower installed
2. Clone this repo (git clone https://github.com/natstar93/clothing_shop)
3. In terminal, go to the root of the folder and type the following commands into terminal
  1. npm install
  2. bower install
  3. npm start
4. Navigate to localhost:8000 in your browser of choice

###Run Tests

**Protractor Feature Tests**
 
1. Type **npm start** into terminal
2. Open a new terminal window (leave the initial window running) and type
**protractor test/e2e/conf.js**
 
**Karma Unit Tests**
 
Type **karma start test/karma.conf.js** into terminal

##File Structure:

        .
        ├── README.md
        ├── bower.json
        ├── css
        │   └── main.css
        ├── images
        ├── index.html
        ├── js
        │   ├── app.js
        │   ├── awesomeclothing.json
        │   ├── clothingShopController.js
        │   ├── dataService.js
        │   └── orderProducts.js
        ├── package.json
        └── test
            ├── clothingShopController.spec.js
            ├── dataServiceSpec.spec.js
            ├── e2e
            │   ├── clothingShopFeature.js
            │   └── conf.js
            ├── karma.conf.js
            └── orderProductsSpec.spec.js
            
##Future Improvements

* Pin shopping basket to top of window, so that when a user scrolls down the basket is still visible.
* Refactor payment and voucher logic into a separate service.
* Enhance mobile experience by hiding the shopping basket on small devices. This would be achieved by implementing a single column layout with a side menu (basket) that would be shown by tapping a basket icon in the header area.
* Replace bootstrap buttons with custom button images.

[View app on Heroku](https://awesome-clothing.herokuapp.com)
