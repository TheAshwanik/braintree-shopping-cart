# NodeJS Shopping Cart - NodeJS, Express, Express-Session, Express handlebars (hbs)

### Run locally on your machine
You need to have installed Node and NPM.

![NodeJS Shopping Cart](/data/nodejs-cart-1.png?raw=true "NodeJS Shopping Cart")

Clone this repository
``` shell
git clone https://github.com/TheAshwanik/braintree-shopping-cart.git
```

Install dependencies
``` shell
npm install
```

Start NodeJS server at http://localhost:3000
``` shell
npm start
```

For Nodemon usage
``` shell
nodemon ./bin/www
```

### Technologies
NodeJS, Express, Express-Session, Nodemon, hbs - Express.js view engine for handlebars.js

Credits to [gtsopour](https://github.com/gtsopour/nodejs-shopping-cart) for the cart demo. 

## I have included the demo of a vault payment. 
When someone proceeds to cart, a braintree customer is created using the session id, and it will present braintree integration with paypal or card to proceed. 
Once we do payment with card/paypal, it is saved as default payment method.
The next time(normally when user logs in some other day) user wants to purchase, it will directly use the token for the payment method for the logged in user (in our case its in the same session).
###customer object returned when we find with customer Id
``` json
Customer {
  id: 'yNmxYbVC7k5fK4xQmTS2tN4uJauI-rXJ',
  merchantId: 'hb8cv4vty6wy3mdh',
  firstName: 'Jen',
  lastName: 'Smith',
  company: 'Braintree',
  email: 'jen@example.com',
  phone: '312.555.1234',
  fax: '614.555.5678',
  website: 'www.example.com',
  createdAt: '2020-07-29T08:35:02Z',
  updatedAt: '2020-07-29T08:35:16Z',
  customFields: '',
  globalId: 'Y3VzdG9tZXJfeU5teFliVkM3azVmSzR4UW1UUzJ0TjR1SmF1SS1yWEo',
  graphQLId: 'Y3VzdG9tZXJfeU5teFliVkM3azVmSzR4UW1UUzJ0TjR1SmF1SS1yWEo',
  creditCards: [
    CreditCard {
      bin: '411111',
      cardType: 'Visa',
      cardholderName: null,
      commercial: 'Unknown',
      countryOfIssuance: 'Unknown',
      createdAt: '2020-07-29T08:35:16Z',
      customerId: 'yNmxYbVC7k5fK4xQmTS2tN4uJauI-rXJ',
      customerGlobalId: 'Y3VzdG9tZXJfeU5teFliVkM3azVmSzR4UW1UUzJ0TjR1SmF1SS1yWEo',
      customerLocation: 'US',
      debit: 'Unknown',
      default: true,
      durbinRegulated: 'Unknown',
      expirationMonth: '11',
      expirationYear: '2020',
      expired: false,
      globalId: 'cGF5bWVudG1ldGhvZF9jY19ieDhmaHR3',
      graphQLId: 'cGF5bWVudG1ldGhvZF9jY19ieDhmaHR3',
      healthcare: 'Unknown',
      imageUrl: 'https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox',
      issuingBank: 'Unknown',
      last4: '1111',
      payroll: 'Unknown',
      prepaid: 'Unknown',
      productId: 'Unknown',
      subscriptions: [],
      token: 'bx8fhtw',
      uniqueNumberIdentifier: '0b12b15dc996e5cde0ec22e9c07b494d',
      updatedAt: '2020-07-29T08:35:17Z',
      venmoSdk: false,
      verifications: [],
      isNetworkTokenized: false,
      maskedNumber: '411111******1111',
      expirationDate: '11/2020'
    }
  ],
  addresses: [],
  paymentMethods: [
    CreditCard {
      bin: '411111',
      cardType: 'Visa',
      cardholderName: null,
      commercial: 'Unknown',
      countryOfIssuance: 'Unknown',
      createdAt: '2020-07-29T08:35:16Z',
      customerId: 'yNmxYbVC7k5fK4xQmTS2tN4uJauI-rXJ',
      customerGlobalId: 'Y3VzdG9tZXJfeU5teFliVkM3azVmSzR4UW1UUzJ0TjR1SmF1SS1yWEo',
      customerLocation: 'US',
      debit: 'Unknown',
      default: true,
      durbinRegulated: 'Unknown',
      expirationMonth: '11',
      expirationYear: '2020',
      expired: false,
      globalId: 'cGF5bWVudG1ldGhvZF9jY19ieDhmaHR3',
      graphQLId: 'cGF5bWVudG1ldGhvZF9jY19ieDhmaHR3',
      healthcare: 'Unknown',
      imageUrl: 'https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox',
      issuingBank: 'Unknown',
      last4: '1111',
      payroll: 'Unknown',
      prepaid: 'Unknown',
      productId: 'Unknown',
      subscriptions: [],
      token: 'bx8fhtw',
      uniqueNumberIdentifier: '0b12b15dc996e5cde0ec22e9c07b494d',
      updatedAt: '2020-07-29T08:35:17Z',
      venmoSdk: false,
      verifications: [],
      isNetworkTokenized: false,
      maskedNumber: '411111******1111',
      expirationDate: '11/2020'
    }
  ]
}


```

I will add a demo video here sometime.
