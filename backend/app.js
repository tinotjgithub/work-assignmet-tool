const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

app.get("/api/drawMode/draw-claims", (req, res, next) => {
  console.log(req.body);
  const claim = {
    "claimType": "Institutional",
    "claimId": "2019110800000067",
    "state": "Review",
    "reviewRepairReason": "Claim requires review payment total greater than $20,000.00",
    "workBasketName": "Itemized Bill WB",
    "owner": "",
    "entryDate": "2019-11-08T18:30:00.000+0000",
    "receiptDate": "2019-11-09T18:30:00.000+0000",
    "billedAmount": 37944.07, "allowedAmount": null,
    "claimSource": "EDI",
    "createdTime": "2019-11-18T18:30:00.000+0000",
    "rank": 0
  }
  res.status(200).json(claim);
});

app.post("/api/drawMode/assign-task", (req, res, next) => {
  const claim = {
    "taskId": 4,
    "workItemId": "2019082800000200",
    "workItemType": "Institutional",
    "primaryEmail": 1,
    "startTime": "2019-11-20",
    "action": null,
    "finishTime": null,
    "comments": null
  }

  res.status(200).json(claim);
});

app.post("/api/drawMode/update-task", (req, res, next) => {
  const claim = {
    message: "succes"
  }
  res.status(200).json(claim);
});

module.exports = app;
