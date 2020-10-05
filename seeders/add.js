const mongoose = require('mongoose');
const Product = require('../src/schema/product');
const User = require('../src/schema/user');
const Cart = require('../src/schema/cart');
const {
  Types: { ObjectId }
} = mongoose;
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const products = [
  {
    _id: ObjectId('111856432512345678655678'),
    name: 'Google Pixel 5',
    description:
      'Google Pixel 5 with the 16MP camera 128GB storage 8GB RAM with fast charing and android 11',
    thumbnail:
      'https://cdn57.androidauthority.net/wp-content/uploads/2020/08/Google-Pixel-5-Renders.jpg',
    count: 10,
    price: 699,
    reviews: [],
    discount: 5,
    tags: ['Phone']
  },
  {
    _id: ObjectId('111156432512345678655678'),
    name: 'Amazon Echo Dot',
    description:
      'Amazon Echo Dot is a wireless speaker device with premium build quality and best sound with UI for time display and many more',
    thumbnail:
      'https://images.crutchfieldonline.com/products/2018/45/837/g837EDOT3B-F.jpg',
    count: 6,
    price: 299,
    discount: 5,
    tags: ['Bluetooth', 'Speaker'],
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
    _id: ObjectId('111856432512345678651111'),
    name: 'Samsung Galaxy Fan Edition(FE)',
    description:
      'Galaxy FE with the same feature from its Flagship variant amazing performance from snapdragon 865 with 5G support and wireless fast charging',
    thumbnail:
      'https://www.androidpolice.com/wp-content/uploads/2020/08/17/SamsungGalaxyS20FE-01.png',
    count: 20,
    price: 699,
    reviews: [],
    discount: 4,
    tags: ['Phone']
  },
  {
    _id: ObjectId('111856432512345678655111'),
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
    ],
    discount: 0,
    tags: ['Lactop']
  }
];

const users = [
  {
    _id: ObjectId('787856432512345678651234'),
    name: 'khami gokosi',
    email: 'khamisama@gmail.com',
    password: 'Khami123#',
    address: 'Pratappur-5, Nawalparasi, Nepal',
    age: 22,
    gender: 'Male',
    phone: '+97798490343013',
    token: '3872893748df78w787dsd8fd78gds7fg87f89g7fdn87b89db78g86g8dg78',
    expiresIn: 'Fri Oct 02 2020 14:42:45 GMT+0545 (Nepal Time)'
  },
  {
    _id: ObjectId('787856432512345678654321'),
    name: 'binod yadav',
    email: 'binodkyadav@gmail.com',
    password: 'Binod123#',
    address: 'Pratappur-1, Nawalparasi, Nepal',
    age: 25,
    gender: 'Male',
    phone: '+9779811440512',
    token: '3872893748df78w787dsd8fd78gds7fg87f89g7fdn87b89db78g86sfsdfsdfsd',
    expiresIn: 'Fri Oct 02 2020 18:42:45 GMT+0545 (Nepal Time)'
  },
  {
    _id: ObjectId('787856432512345678655678'),
    name: 'pragya yadav',
    email: 'pragyayadav2055@gmail.com',
    password: 'Pragya123#',
    address: 'Devgaun-17, Nawalparasi, Nepal',
    age: 22,
    gender: 'Female',
    phone: '+9779840000000',
    token: '2272893748df78w787dsd8fd78gds7fg87f89g7fdn87b89db78g86g8dg78',
    expiresIn: 'Fri Oct 02 2020 16:42:45 GMT+0545 (Nepal Time)'
  },
  {
    _id: ObjectId('656556432512345678654321'),
    name: 'sandhya yadav',
    email: 'sandhyayadav2054@gmail.com',
    password: 'Sandhya123#',
    address: 'Pratappur-1, Nawalparasi, Nepal',
    age: 23,
    gender: 'Female',
    phone: '+9779810101010',
    token: '3872893748df78w787dsd8fd78gds7fg87f89g7fdn87b89db33g86g8dg78',
    expiresIn: 'Fri Oct 02 2020 17:42:45 GMT+0545 (Nepal Time)'
  }
];

const carts = [
  {
    _id: ObjectId('227856432512345678655622'),
    userId: ObjectId('787856432512345678655678'),
    productId: ObjectId('111856432512345678655678'),
    inWishList: true,
    inCart: false,
    count: 1,
    deliveryCharge: 0,
    deliveryTime: 'N/A',
    deliveryStatus: 'N/A'
  },
  {
    _id: ObjectId('222856432512345678655622'),
    userId: ObjectId('787856432512345678651234'),
    productId: ObjectId('111856432512345678655111'),
    inWishList: false,
    inCart: true,
    count: 1,
    deliveryCharge: 100,
    deliveryTime: '2d',
    deliveryStatus: 'INPROGRESS'
  }
];

(async () => {
  try {
    await Product.create(products);
    await User.create(users);
    await Cart.create(carts);
    console.log('seeded');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
