const mongoose = require('mongoose');
const Product = require('../src/schema/product');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  {
    name: 'Google Pixel 5',
    description:
      'Google Pixel 5 with the 16MP camera 128GB storage 8GB RAM with fast charing and android 11',
    thumbnail:
      'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-5-5g-1.jpg',
    count: 10,
    price: 699,
    reviews: []
  },
  {
    name: 'Amazon Echo Dot',
    description:
      'Amazon Echo Dot is a wireless speaker device with premium build quality and best sound with UI for time display and many more',
    thumbnail:
      'https://images.crutchfieldonline.com/products/2018/45/837/g837EDOT3B-F.jpg',
    count: 6,
    price: 299,
    reviews: [
      {
        comment: 'Best version of echo device very nice sound',
        user: '787856432512345678651234',
        rating: '4'
      },
      {
        comment: 'Very smoothing sound qualty value for money',
        user: '787856432512345678654321',
        rating: '4'
      }
    ]
  },
  {
    name: 'Samsung Galaxy Fan Edition(FE)',
    description:
      'Galaxy FE with the same feature from its Flagship variant amazing performance from snapdragon 865 with 5G support and wireless fast charging',
    thumbnail: 'https://www.gizmochina.com/wp-content/uploads/2020/02/2.jpg',
    count: 20,
    price: 699,
    reviews: []
  },
  {
    name: 'Apple MacBook Pro 16',
    description:
      'The new MacBook Pro 16 with 16 inch retina display and amazing keyboard with smooth workload performance',
    thumbnail:
      'https://i.pcmag.com/imagery/reviews/0227QDT3xYwn3xEOpyiJpNU-1..1574212824.jpg',
    count: 12,
    price: 1299,
    reviews: [
      {
        comment:
          'The keyboard is better than the ones before permission and UI is upgraded looks cool with 16 inch display',
        user: '787856432512345678655678',
        rating: '4'
      },
      {
        comment:
          "Very disappoint as a fan it doesn't meet expectations from previous iterations",
        user: '656556432512345678654321',
        rating: '3'
      }
    ]
  }
];

(async () => {
  try {
    await Product.create(products);
    console.log('seeded');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
