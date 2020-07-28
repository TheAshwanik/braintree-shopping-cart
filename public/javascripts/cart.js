$('document').ready(function() {
    var clientToken = null;

      $.ajax({
        type: 'get',
        async: false,
        url: '/client_token',
        data: {option : {}},
        success: function(response) {
            console.log("Data sent!");
            clientToken = response;
            //braintree.setup(clientToken, "dropin", {
            //container: "payment-form"
            //});
            braintree.setup(clientToken, "dropin", {
            container: "payment-form",
            paypal: {
                singleUse: false,
                enableShippingAddress: true,
                flow: 'vault'
            }
            });


        }
    });
  
    //alert(clientToken);

});

