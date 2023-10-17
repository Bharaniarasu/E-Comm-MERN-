const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateData = () => {
  const data = [];

  for (let i = 0; i < 100; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: Math.round(10 + Math.random() * (10000 - 10)),
      description: faker.lorem.paragraph(),
      ratings: Math.round(0 + Math.random() * (5 - 0)),
      images: [
        { image: faker.image.urlLoremFlickr({ category: "product" }) },
        { image: faker.image.urlLoremFlickr({ category: "product" }) },

        // { image: faker.image.imageUrl() },
      ],
      category: faker.commerce.department(),
      seller: faker.company.name(),
      stock: Math.round(0 + Math.random() * (100 - 0)),
      numOfReviews: Math.round(0 + Math.random() * (1000 - 0)),
      reviews: [],
    };
    data.push(product);
  }

  return data;
};

const jsonData = JSON.stringify(generateData(), null, 2);

fs.writeFile("server/data/data.json", jsonData, (err) => {
  if (err) throw err;
  //console.log("Data has been written to data.json");
});
