window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-177219283-2');

var head = document.getElementsByTagName('head')[0];
var newScript = document.createElement("script");
newScript.src = 'https://js.stripe.com/v3';
head.appendChild(newScript);

var stripe;
newScript.onload = function () {
    stripe = Stripe('pk_live_4LdeNXQQ1sm3SECaJRr5lMg9000RQ4FXDa');
}

function checkout(evt) {
    var sku = evt.value;
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
        items: [{sku: sku, quantity: 1}],
        billingAddressCollection: 'required',
        successUrl: window.location.protocol + '//' + window.location.host + '/success',
        cancelUrl: window.location.protocol + '//' + window.location.host + '/canceled',
    })
    .then(function (result) {
        if (result.error) {
            // error, display the localized error message to your customer.
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
        }
    });
}
