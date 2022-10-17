// A special folder to create API ROUTES
// /api/new-meetup
import { MongoClient } from "mongodb";

// POST
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // Establishing connection to MongoDB
    // Is the best place , as you dont reveal your credentials to the client side
    // meetupsDB is the database name
    const client = await MongoClient.connect(
      "mongodb+srv://madhav-kwat:56T86XSzgGT4SoxX@meetupsnextcluster.gkceqkw.mongodb.net/meetupsDB?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollections = db.collection("meetups");
    // collections are like tables, documents are like data

    const result = await meetupCollections.insertOne(data);
    // insert some data/an object

    // This result have the generated id
    console.log(result);

    // Not handling errors here , Assuming it rans

    // Closing the connection as we are finished
    client.close();

    // Sending back the response
    res.status(201).json({ message: "Meetup Inserted!" });
  }
};

export default handler;
