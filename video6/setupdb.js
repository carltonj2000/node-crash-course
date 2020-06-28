const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "node-tuts";
const collectionName = "blogs";

const blogs = [
  ["Introduction To Js", "Write About Js", "Writing more about JS"],
  ["Introduction To React", "Write About React", "Writing more about React"],
];

const main = async () => {
  const db = await MongoClient.connect(url, { useUnifiedTopology: true });
  var dbo = db.db(dbName);
  const collections = await dbo.listCollections().toArray();
  if (collections.includes(collectionName))
    await dbo.collection(collectionName).drop();
  const collection = dbo.collection(collectionName);

  for (const blog of blogs)
    await collection.insertOne({
      title: blog[0],
      snippet: blog[1],
      body: blog[2],
    });

  db.close();
};

main().catch((err) => console.error(err));
