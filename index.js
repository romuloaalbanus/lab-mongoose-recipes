const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

async function init() {
  try {
    const MONGODB_URI =
      // Connection to the database "recipe-app"
      await mongoose.connect("mongodb://localhost:27017/recipe-app", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    await connection.connection.dropDatabase();
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    // const result = await MONGODB_URI.create({
    //   title: "",
    //   level: "",
    //   ingredients: "",
    //   cuisine: "",
    //   dishType: "",
    //   image: "",
    //   duration: 0,
    //   creator: "",
    //   created: "",
    // });

    // console.log("CREATED RECIPE => ", result);

    const insertRecipe = await MONGODB_URI.insertMany([{ title: "" }]);

    console.log("INSERTED RECIPE => ", insertRecipe);

    const updatedRecipe = await MONGODB_URI.findOneAndUpdate(
      { duration: 0 },
      { $set: { duration: "100" } },
      { new: true }
    );

    console.log("UPDATED RECIPE => ", updatedRecipe);

    const deleteResult = await MONGODB_URI.deleteOne({
      title: "Carrot Cake",
    });

    console.log("DELETE RESULT => ", deleteResult);
  } catch (err) {
    console.error("Database connection error: ", err);
  }
}

init();

// return Recipe.deleteMany();
// })
// .then(() => {
//   // Run your code here, after you have insured that the connection was made
// })
// .catch((error) => {
//   console.error("Error connecting to the database", error);
// });
