const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 4000;
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
    const bookingsCollection = client
      .db("booksUniverse")
      .collection("bookings");
    const buyersCollection = client.db("booksUniverse").collection("buyers");
    const sellersCollection = client.db("booksUniverse").collection("sellers");
    const adminCollection = client.db("booksUniverse").collection("admin");

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

    app.post("/classics", async (req, res) => {
      const classics = req.body;
      const result = await classicCollection.insertOne(classics);
      res.send(result);
    });
    app.post("/fantasy", async (req, res) => {
      const fantasy = req.body;
      const result = await fantasyCollection.insertOne(fantasy);
      res.send(result);
    });
    app.post("/horror", async (req, res) => {
      const horror = req.body;
      const result = await horrorCollection.insertOne(horror);
      res.send(result);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });
    app.post("/buyers", async (req, res) => {
      const buyers = req.body;
      const result = await buyersCollection.insertOne(buyers);
      res.send(result);
    });
    app.post("/sellers", async (req, res) => {
      const sellers = req.body;
      const result = await sellersCollection.insertOne(sellers);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const query = {};
      const cursor = bookingsCollection.find(query);
      const bookings = await cursor.toArray();
      res.send(bookings);
    });
    app.get("/buyers", async (req, res) => {
      const query = {};
      const cursor = buyersCollection.find(query);
      const buyersCol = await cursor.toArray();
      res.send(buyersCol);
    });
    app.get("/sellers", async (req, res) => {
      const query = {};
      const cursor = sellersCollection.find(query);
      const sellersCol = await cursor.toArray();
      res.send(sellersCol);
    });

    app.get("/buyers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const buyer = await buyersCollection.findOne(query);
      res.send({ isBuyerMail: buyer?.email === email });
    });
    app.get("/sellers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const seller = await sellersCollection.findOne(query);
      res.send({ isSellerMail: seller?.email === email });
    });
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const admin = await adminCollection.findOne(query);
      res.send({ isAdminMail: admin?.email === email });
    });

    app.delete("/buyers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const buyer = await buyersCollection.deleteOne(query);
      res.send(buyer);
    });

    app.delete("/sellers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const seller = await sellersCollection.deleteOne(query);
      res.send(seller);
    });
    app.delete("/classics/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await classicCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/fantasy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fantasyCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/horror/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await horrorCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/classicsSpecific", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = classicCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/fantasySpecific", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = fantasyCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/horrorSpecific", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = horrorCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
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
