const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
// const bodyParser = require("body-parser");
const assert = require("assert");

//exécution express
const app = express();
const mongo_url = "mongodb://localhost:27017";
const dataBase = "Rest-api";
//nous permer de lire le body de req
app.use(express.json());

MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "data base connexion failed");
  //pour connitr à qul db va travailler
  const db = client.db(dataBase);

  // Home Page 
  app.get("/", (req, res) => {
      res.send("Hello")      
  })

  app.post("/contacts", (req, res) => {
    const newContact = req.body;
    db.collection("contactlist").insertOne(newContact, (err, data) => {
      if (err) res.send("error");
      else res.send("contact added");
    });
  });

  // GET all contacts
  app.get("/getcontact", (req, res) => {
      db.collection("contactlist")
      .find()
      .toArray((err, data) => {
          if (err) res.send("can't fetch ontact");
          else res.send(data);
        });
    });
    
    
    // GET a single contact
  app.get("getContact/:id", (req, res) => {
    let searchContact = ObjectID(req.params.id);
    db.collection("contactlist").findOne(
      { _id: searchContact },
      (err, data) => {
        if (err) res.send("can't fetch contact");
        else res.send(data);
      }
    );
  });


  // PUT contact       
  app.put("/modifyContact/:id", (req, res) => {
    let idContact = ObjectID(req.params.id);
    // console.log("idContact", idContact)

    let modifiedContact = req.body;
    // console.log('modifiedContact', modifiedContact)

    db.collection("contactlist").findOneAndUpdate(
      { _id: idContact },
      { $set: {...modifiedContact} },
      (err, data) => {
        if (err) res.send("can't modify contact");
        else res.send("contact was modified");
      }
    );
  });

  app.delete("/delete_contact/:id", (req, res) => {
    let contactToremove = ObjectID(req.params.id);
    db.collection("contactlist").findOneAndDelete(
      { _id: contactToremove },
      (err, data) => {
        if (err) res.send("can't delete contact");
        else res.send("contact was deleted");
      }
    );
  });
});

app.listen(6000, err => {
  if (err) {
    console.log("server is not runnig");
  } else {
    console.log("server is runnig on port 6000");
  }
});
