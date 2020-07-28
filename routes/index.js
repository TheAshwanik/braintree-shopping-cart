var express = require('express');
var router = express.Router();
var braintree = require('braintree');
require('dotenv').config()

var env = process.env.BRAINTREE_ENVIRONMENT;
var mID = process.env.BRAINTREE_MERCHANT_ID;
var pbKey = process.env.BRAINTREE_PUBLIC_KEY;
var pvtKey = process.env.BRAINTREE_PRIVATE_KEY;

console.log("***************Starting Braintree connection*************");
console.log("Environment--"+ env);
console.log("merchantId--"+ mID);
console.log("Public Key--"+ pbKey);
console.log("Pvt Key--"+ pvtKey);


var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: mID,
    publicKey: pbKey,
    privateKey: pvtKey
});

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next) {
  console.log("Starting");
  //console.log(req.session);
  var productId = products && products[0].id;
  var custid = null;
  var mycustomer = {
      firstName: "Jen",
      lastName: "Smith",
      company: "Braintree",
      email: "jen@example.com",
      phone: "312.555.1234",
      fax: "614.555.5678",
      website: "www.example.com",
      id:req.sessionID
  } 
  //console.log(mycustomer);
  gateway.customer.find(mycustomer.id, function(err, foundcustomer){
    if (typeof foundcustomer == 'undefined'){
       gateway.customer.create(mycustomer, function (err, result) {
          console.log(result.success);
          console.log(result.customer.id);
          mycustomer = result.customer;
          req.session.mycustomer = result.customer;
        });
    }else{
        mycustomer = foundcustomer;
        console.log(mycustomer.id);
        req.session.mycustomer = foundcustomer;
    }
   });
  //console.log(req.session);
  res.render('index',{title: 'My Retail Shop', products: products, mycustomerid: mycustomer.id });
});

router.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

router.post('/add/:id', function(req, res, next) {
  //console.log("adding product");

  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  
  //console.log(req.params);
  //console.log(req.query);

  //console.log(req.session);
  //console.log("----------"+ req.body.mycustomerid);


  cart.add(product[0], productId);
  req.session.mycustomerid = req.body.mycustomerid;
  req.session.cart = cart;
  res.redirect('/');
  //inline();
});

router.post('/cart', function(req, res, next) {
  console.log("Inside Cart now");
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  
  //console.log("params--->"+ req.params);
  //console.log("Query---->"+req.query);
  //console.log("Body---->"+req.body.mycustomer.id);
  //console.log(req.session.mycustomerid);
  
  var cart = new Cart(req.session.cart);
  
  gateway.customer.find(req.session.mycustomerid, function(err, customer) {
    //console.log(customer);
    if (typeof customer.paymentMethods[0] == 'undefined'){
       res.render('cart', { title: 'My Web Shop',products: cart.getItems(),totalPrice: cart.totalPrice,cust: customer });
    }else{
       res.render('tokencart', { title: 'My Web Shop',products: cart.getItems(),totalPrice: cart.totalPrice, cust: customer });
    }
  });

});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.post('/process', function(req, res) {
  console.log("inside process now");
  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);
  //console.log(req.session.mycustomerid);
  
  var nonce = req.body.payment_method_nonce;
  var token = req.body.token;
  
  gateway.paymentMethod.create({
    customerId: req.session.mycustomerid,
    paymentMethodNonce: nonce
  }, function (err, result) {
    if (result.success) {
      //console.log("result is -------");
      //console.log(result); 
      var token = result.paymentMethod.token;
      //console.log("token is");
      //console.log(token);

      gateway.transaction.sale({
            paymentMethodToken: token ,
            amount: req.body.amount,
            recurring: false
          }, function (err, result) {
            res.render('success', {result: result});
      });
    }
  });
});


router.post('/paybyvault', function(req, res) {
  console.log("inside paybyvault now");

  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);
  //console.log(req.session.mycustomerid);
  
  var token ;

  gateway.customer.find(req.session.mycustomerid, function(err, customer) {
    if (!customer.id){
        console.log("customer not found -- token is--------------------------------" + token);
        
    }else{
        token = customer.paymentMethods[0].token;
        console.log("customer found -- token is--------------------------------" + token);
    }
  });


  gateway.transaction.sale({
        paymentMethodToken: token,
        amount: req.body.amount,
        recurring: false,
        customerId: req.session.mycustomerid
      }, function (err, result) {
        //console.log("Payment Success" + result);
        res.render('success', {result: result});
  });
});

router.post('/success', function(req, res) {
  console.log("Payment Success");
  res.send(req.result);
});

router.post('/subscribe', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  var plan = req.body.plan;

  gateway.customer.create({
    paymentMethodNonce: nonce
  }, function (err, result) {
    if (result.success) {
      var token = result.customer.paymentMethods[0].token;

      gateway.transaction.sale({
        paymentMethodToken: token,
        amount: req.body.amount,
        recurring: true
      }, function (err, result) {
        res.render('/index', {result: result});
      });
    }
  });


});

module.exports = router;
