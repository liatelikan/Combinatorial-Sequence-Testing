/* @provengo summon selenium */
/* @provengo summon eventcategory */

const s = new SeleniumSession('session');
const ec = EventCategory.create('PrestaShop');

const URL = 'http://localhost:8080';

const USER_TYPES = ["Guest", "Registered", "VIP"];
const PRODUCTS = [
    { name: "Hummingbird printed sweater", size: "M", qty: 1 }, 
    { name: "Hummingbird printed sweater", size: "L", qty: 1 }, 
    { name: "Hummingbird printed sweater", size: "S", qty: 4 }  
];
const COUNTRIES = ["France", "US"];
const CARRIERS = ["My carrier", "My cheap carrier"];
const PAYMENT_OPTIONS = ["Pay by Check", "Bank Wire"];

const shopXpaths = {
  homePage: {
    signInBtn: "//span[contains(text(),'Sign in')]",
    logo: "//div[@id='_desktop_logo']//a", 
    searchBox: "//input[@name='s']"
  },
  loginPage: {
    email: "//input[@name='email']",
    password: "//input[@name='password']",
    submit: "//button[@id='submit-login']"
  },
  productPage: {
    sizeSelect: "//select[@id='group_1']",
    qtyInput: "//input[@id='quantity_wanted']",
    addToCartBtn: "//button[@data-button-action='add-to-cart']"
  },
  cartModal: {
    proceedBtn: "//div[@class='cart-content-btn']//a[contains(@class,'btn-primary')]"
  },
  
  guestInfo: {
    genderMrLabel: "//label[@for='field-id_gender-1']",
    firstName: "//input[@id='field-firstname']",
    lastName: "//input[@id='field-lastname']",
    email: "//input[@id='field-email']",
    privacyCheckbox: "//input[@name='customer_privacy']",
    gdprCheckbox: "//input[@name='psgdpr']",
    continueBtn: "//button[@data-link-action='register-new-customer']"
  },

  addressForm: {
    address: "//input[@id='field-address1']",
    city: "//input[@id='field-city']",
    zip: "//input[@id='field-postcode']",
    country: "//select[@id='field-id_country']",
    state: "//select[@id='field-id_state']"
  },

  checkoutPage: {
    addressContinue: "//button[@name='confirm-addresses']",
    deliveryContinue: "//button[@name='confirmDeliveryOption']",
    payByCheck: "//input[@id='payment-option-1']",
    bankWire: "//input[@id='payment-option-2']",
    termsCheckbox: "//input[contains(@id,'conditions_to_approve')]",
    placeOrderBtn: "//div[@id='payment-confirmation']//button"
  },
  confirmation: {
    orderSuccess: "//h3[contains(text(),'Your order is confirmed')]"
  }
};