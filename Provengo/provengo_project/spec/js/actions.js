    totalPrice = 0;
    multiplier = 1;
    size = '';
    count = false;
    carrier = 0;
    ec.refine('Start shopping').with(function(event){
        s.start('http://localhost:8080');
    });

    ec.refine('Login before vip').with(function(event){
        multiplier = 0.9 * multiplier;
        s.click("//a[contains(text(),'Sign in')]",200);
        s.writeText("//*[@id=\"field-email\"]", "bla@prestashop.com");                    
        s.writeText("//*[@id=\"field-password\"]", "bla@prestashop.com");
        s.click("//*[@id=\"submit-login\"]");
        s.click("//*[@id=\"_desktop_logo\"]/a/img");
    });

    ec.refine('Login before customer').with(function(event){
        s.click("//a[contains(text(),'Sign in')]",200);
        s.writeText("//*[@id=\"field-email\"]", "pub@prestashop.com");                    
        s.writeText("//*[@id=\"field-password\"]", "Aa322892431");
        s.click("//*[@id=\"submit-login\"]");
        s.click("//*[@id=\"_desktop_logo\"]/a/img");
    });

    ec.refine('Select product Hummingbird sweater').with(function(event){
        s.click("//a[contains(text(),'Hummingbird printed sweater')]",200);
    });

    ec.refine('Choose size S').with(function(event){
        totalPrice = 35.9;
        size = 'S';
        //default option is S
    })

    ec.refine('Choose size L').with(function(event){
        totalPrice = 35.9;
        size = 'L';
        s.click("//*[@id=\"group_1\"]");
        s.click("//*[@id=\"group_1\"]/option[3]");
    });

    ec.refine('Choose size M').with(function(event){
        totalPrice = 45.9;
        size = 'M';
        s.click("//*[@id=\"group_1\"]");
        s.click("//*[@id=\"group_1\"]/option[2]");
    });

    ec.refine('Choose quantity 1').with(function(event){
        //default option is 1
    })

    ec.refine('Choose quantity 4').with(function(event){
        count = true;
        s.click("//*[@id=\"add-to-cart-or-refresh\"]/div[2]/div/div[1]/div/span[3]/button[1]/i");
        s.click("//*[@id=\"add-to-cart-or-refresh\"]/div[2]/div/div[1]/div/span[3]/button[1]/i");
        s.click("//*[@id=\"add-to-cart-or-refresh\"]/div[2]/div/div[1]/div/span[3]/button[1]/i");
    });

    ec.refine('Add to cart').with(function(event){
        s.click("//*[@id=\"add-to-cart-or-refresh\"]/div[2]/div/div[2]/button",200);
        s.click("//*[@id=\"blockcart-modal\"]/div/div/div[2]/div/div[2]/div/div/a");
    });

    ec.refine('Checkout').with(function(event){
        s.click("//a[contains(text(),'Proceed to checkout')]",200);
    });

    ec.refine('Login after vip').with(function(event){
        multiplier = 0.9 * multiplier;
        s.click("//a[contains(text(),'Sign in')]",200);
        s.writeText("//*[@id=\"field-email\"]", "bla@prestashop.com");                    
        s.writeText("//*[@id=\"field-password\"]", "bla@prestashop.com");
        s.click("//*[@id=\"submit-login\"]");
        s.click("//*[@id=\"_desktop_cart\"]/div/div/a/span[1]");
    });

    ec.refine('Login after customer').with(function(event){
        s.click("//a[contains(text(),'Sign in')]",200);
        s.writeText("//*[@id=\"field-email\"]", "pub@prestashop.com");                    
        s.writeText("//*[@id=\"field-password\"]", "Aa322892431");
        s.click("//*[@id=\"submit-login\"]");
        s.click("//*[@id=\"_desktop_cart\"]/div/div/a/span[1]");
    });

    ec.refine('Choose country US').with(function(event){
        s.click("//*[@id=\"id_address_delivery-address-9\"]/header/label/span[1]/input | //*[@id=\"id_address_delivery-address-8\"]/header/label/div");
        s.click("//*[@id=\"checkout-addresses-step\"]/div/div/form/div[2]/button");
    });

    ec.refine('Choose country FR').with(function(event){
        multiplier = 1.2 * multiplier;
        //default option is FR
        s.click("//*[@id=\"checkout-addresses-step\"]/div/div/form/div[2]/button");
    });

    ec.refine('Choose carrier My carrier').with(function(event){
        carrier = 10;
        //default option is My carrier
        s.click("//*[@id=\"js-delivery\"]/button");
    });

    ec.refine('Choose carrier My carrier guest').with(function(event){
        carrier = 10;
        //default option is My carrier
        s.click("//*[@id=\"js-delivery\"]/button");
    });

    ec.refine('Choose carrier My cheap carrier guest').with(function(event){
        carrier = 5;
        s.click("//*[@id=\"js-delivery\"]/div/div[1]/div[2]/label/div");
        s.click("//*[@id=\"js-delivery\"]/button");
    });

    ec.refine('Choose carrier My cheap carrier').with(function(event){
        carrier = 3;
        s.click("//*[@id=\"js-delivery\"]/div/div[1]/div[1]/label/div");
        s.click("//*[@id=\"js-delivery\"]/button");
    });

    ec.refine('End shopping').with(function(event){
        if((size == 'S' && count) || size == 'L'){
            multiplier = multiplier * 0.7;
        }
        if(count){
            totalPrice = totalPrice * 4;
        }
        totalPrice = totalPrice * multiplier;
        totalPrice = totalPrice + carrier;
        s.assertText("//*[@id=\"js-checkout-summary\"]/div[2]/div/span[2]", "€" + totalPrice.toFixed(2));
        s.quit();
    });

    ec.refine('guest US').with(function(event){
        s.click("//a[contains(text(),'Proceed to checkout')]",200);
        s.click("//*[@id=\"customer-form\"]/div/div[1]/div[1]/label[1]/span");
        s.writeText("//*[@id=\"field-firstname\"]", "John");
        s.writeText("//*[@id=\"field-lastname\"]", "Doe");
        s.writeText("//*[@id=\"field-email\"]", "test@example.com");
        s.click("//*[@id=\"customer-form\"]/div/div[8]/div[1]/span/label");
        s.click("//*[@id=\"customer-form\"]/div/div[10]/div[1]/span/label/em");
        s.click("//*[@id=\"customer-form\"]/footer/button",200);
        s.writeText("//*[@id=\"field-address1\"]", "16, Main street");
        s.writeText("//*[@id=\"field-city\"]", "New York");
        s.writeText("//*[@id=\"field-postcode\"]", "33133");
        s.click("//*[@id=\"field-id_state\"]", 100);
        s.click("//*[@id=\"field-id_state\"]/option[2]");
        s.click("//*[@id=\"delivery-address\"]/div/footer/button",200);
    });

    ec.refine('guest FR').with(function(event){
        multiplier = 1.2 * multiplier;
        s.click("//a[contains(text(),'Proceed to checkout')]",200);
        s.click("//*[@id=\"customer-form\"]/div/div[1]/div[1]/label[1]/span");
        s.writeText("//*[@id=\"field-firstname\"]", "John");
        s.writeText("//*[@id=\"field-lastname\"]", "Doe");
        s.writeText("//*[@id=\"field-email\"]", "test@example.com");
        s.click("//*[@id=\"customer-form\"]/div/div[8]/div[1]/span/label");
        s.click("//*[@id=\"customer-form\"]/div/div[10]/div[1]/span/label/em");
        s.click("//*[@id=\"customer-form\"]/footer/button",200);
        s.click("//*[@id=\"field-id_country\"]", 100);
        s.click("//*[@id=\"field-id_country\"]/option[2]");
        s.writeText("//*[@id=\"field-address1\"]", "16, Main street");
        s.writeText("//*[@id=\"field-city\"]", "Paris");
        s.writeText("//*[@id=\"field-postcode\"]", "75002");
        s.click("//*[@id=\"checkout-addresses-step\"]/div/div/form/footer/button",200);
    });
