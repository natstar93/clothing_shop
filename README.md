
Clothing Shop
=================

![](/images/awesome-shop.png)

## Task:

Develop a responsive website for a clothing retailer. The page displays all available products and the shopping basket to which they can be added.

1. As a User I can add a product to my shopping cart
2. As a User I can remove a product from my shopping cart
3. As a User I can view the total price for the products in my shopping cart
4. As a User I can apply a voucher to my shopping cart
5. As a User I can view the total price for the products in my shopping cart with discounts applied
6. As a User I am alerted when I apply an invalid voucher to my shopping cart
7. As a User I am unable to add Out of Stock products to the shopping cart

### Discount vouchers
AWESOME5OFF - £5 off your order<br>
AWESOME10OFF - £10 off orders over £50<br>
AWESOME15SHOE - £15 off orders over £75 which contain at least one footwear item

## Tools:

Testing: Karma, Protractor<br>
Application Code: Javascript (AngularJS), HTML & CSS<br>

## How To Run:

1. Clone this repo (git clone https://github.com/natstar93/clothing_shop)
2. In terminal, go to the root of the folder and type the following commands into terminal
  1. npm install
  2. bower install
  3. npm start
3. Navigate to localhost:8000 in your browser of choice

### Run Tests

**Protractor Feature Tests**
1. After the above, type **npm start** into terminal
2. Open a new terminal window (leave the initial window running) and type
**protractor test/e2e/conf.js**

**Karma Unit Tests**
Type **karma start test/karma.conf.js** into terminal

## File Structure:
