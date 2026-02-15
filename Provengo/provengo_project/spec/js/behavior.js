// /* @provengo summon ctrl */

bthread('select product', function () {
  sync({ request : ec.event('Select product Hummingbird sweater') })
}) 

bthread('choose size', function () {
  sync({ request : [ec.event('Choose size S'), ec.event('Choose size L'), ec.event('Choose size M')] })
})

bthread('choose quantity', function () {
  sync({ request : [ec.event('Choose quantity 1'), ec.event('Choose quantity 4')] })
})

bthread('add to cart', function () {
  sync({ request : ec.event('Add to cart') })
})

bthread('choose country', function () {
  sync({ request : [ec.event('Choose country US'), ec.event('Choose country FR')] })
})

bthread('choose carrier', function () {
  sync({ request : [ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'), ec.event('Choose carrier My carrier guest'), ec.event('Choose carrier My cheap carrier guest')] })
})

bthread('checkout', function () {
  sync({ request : ec.event('Checkout') })
})

bthread('Login before', function () {
  sync({ request : [ec.event('Login before vip'), ec.event('Login before customer')] })
})

bthread('Login after', function () {
  sync({ request : [ec.event('Login after vip'), ec.event('Login after customer')] })
})

bthread('start', function () {
  sync({ request : ec.event('Start shopping') })
})

bthread('end shopping', function () {
  sync({ request : ec.event('End shopping') })
})

bthread('end', function () {
  sync({ waitFor : [ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'), ec.event('Choose carrier My carrier guest'), ec.event('Choose carrier My cheap carrier guest')], block : ec.event('End shopping') })
})

bthread('guest', function () {
  sync({ request : [ec.event('guest US'), ec.event('guest FR')]})
})


bthread('start is first', function () {
  sync({
    waitFor : ec.event('Start shopping'),
    block : [ec.event('Select product Hummingbird sweater'), ec.event('Choose size S'), ec.event('Choose size L'), ec.event('Choose size M'),
             ec.event('Choose quantity 1'), ec.event('Choose quantity 4'), ec.event('Add to cart'),
             ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
             ec.event('Checkout'), ec.event('Login before vip'), ec.event('Login after vip'), 
             ec.event('Login before customer'), ec.event('Login after customer')]
  })
})


bthread('product before size quantity cart country carrier checkout', function () {
  sync({
    waitFor : ec.event('Select product Hummingbird sweater'),
    block : [ec.event('Choose size S'), ec.event('Choose size L'), ec.event('Choose size M'), ec.event('Choose quantity 1'), ec.event('Choose quantity 4'),
             ec.event('Add to cart'),ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
             ec.event('Checkout')]
  })
  sync({ block : [ec.event('Login before vip'), ec.event('Login before customer')]})
})


bthread('block login', function () {
  sync({ waitFor : [ec.event('Login before vip'), ec.event('Login before customer'),ec.event('Login after vip'), ec.event('Login after customer'), ec.event('guest US'), ec.event('guest FR')] })
  sync({ block : [ec.event('Login after vip'), ec.event('Login after customer'), ec.event('Login before vip'), ec.event('Login before customer'), ec.event('guest US'), ec.event('guest FR') ] })
})


bthread('size before cart country carrier checkout', function () {
  sync({
    waitFor : [ec.event('Choose size S'), ec.event('Choose size L'), ec.event('Choose size M')],
    block : [ec.event('Add to cart'),ec.event('Choose country US'), ec.event('Choose country FR'),
              ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
              ec.event('Checkout'), ec.event('Login after vip'), ec.event('Login after customer'),
              ec.event('Choose quantity 1'), ec.event('Choose quantity 4')]
  })
})


bthread('quantity before cart country carrier checkout', function () {
  sync({
    waitFor : [ec.event('Choose quantity 1'), ec.event('Choose quantity 4')],
    block : [ec.event('Add to cart'),ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
             ec.event('Checkout'), ec.event('Login after vip'), ec.event('Login after customer')]
  })
})


bthread('cart before country carrier checkout', function () {
  sync({
    waitFor : ec.event('Add to cart'),
    block : [ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
             ec.event('Checkout'), ec.event('Login after vip'), ec.event('Login after customer'),
             ec.event('guest US'), ec.event('guest FR')]
  })
})


bthread('checkout before country carrier', function () {
  sync({
    waitFor : ec.event('Checkout'),
    block : [ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier')]
  })
})


bthread('Login before country carrier checkout', function () {
  sync({
    waitFor : [ec.event('Login after vip'), ec.event('Login before vip'), ec.event('Login before customer'), ec.event('Login after customer')],
    block : [ec.event('Choose country US'), ec.event('Choose country FR'),
             ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier'),
             ec.event('Checkout')]
  })
})


bthread('country before carrier', function () {
  sync({
    waitFor : [ec.event('Choose country US'), ec.event('Choose country FR')],
    block : [ec.event('Choose carrier My carrier'), ec.event('Choose carrier My cheap carrier')]
  })
})


bthread('guest login before guest carrier', function () {
  sync({
    waitFor : [ec.event('guest US'), ec.event('guest FR')],
    block : [ec.event('Choose carrier My carrier guest'), ec.event('Choose carrier My cheap carrier guest')]
  })
})
