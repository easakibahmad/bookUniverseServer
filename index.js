const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.Db_PASSWORD}@firstcluster.3g9daa6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client
      .db("booksUniverse")
      .collection("booksCategories");
    const classicCollection = client.db("booksUniverse").collection("classics");
    const horrorCollection = client.db("booksUniverse").collection("horror");
    const fantasyCollection = client.db("booksUniverse").collection("fantasy");

    app.get("/categories", async (req, res) => {
      const query = {};
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    // app.get("/category/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const oneCategory = await categoriesCollection.findOne(query);
    //   res.send(oneCategory);
    // });
    app.get("/classics", async (req, res) => {
      const query = {};
      const cursor = classicCollection.find(query);
      const classicCol = await cursor.toArray();
      res.send(classicCol);
    });
    app.get("/horror", async (req, res) => {
      const query = {};
      const cursor = horrorCollection.find(query);
      const horrorCol = await cursor.toArray();
      res.send(horrorCol);
    });
    app.get("/fantasy", async (req, res) => {
      const query = {};
      const cursor = fantasyCollection.find(query);
      const fantasyCol = await cursor.toArray();
      res.send(fantasyCol);
    });
  } finally {
  }
}
run().catch(console.log());

app.get("/", (req, res) => {
  res.send("book universe server is running");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
