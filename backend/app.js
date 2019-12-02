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

app.get("/api/draw-mode/draw-claim", (req, res, next) => {
  const claim = {
    "claimType": "Institutional",
    "claimId": Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000,
    "state": "Review",
    "reviewRepairReason": "Claim requires review payment total greater than $20,000.00",
    "workBasketName": "Auth",
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

app.get("/api/report/get-reports", (req, res, next) => {
  const reports = [{ "reportFilter": { "selectedClaimids": ["100004", "100005"], "billedAmountFrom": 3432, "billedAmountTo": 32423, "allowedAmountFrom": 43242, "allowedAmountTo": 423432, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 5", "Claim Source 4"], "age": 34324, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 1 }, "reportId": 1 },
  { "reportFilter": { "selectedClaimids": ["100004", "100005"], "billedAmountFrom": 3432, "billedAmountTo": 32423, "allowedAmountFrom": 43242, "allowedAmountTo": 423432, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 5", "Claim Source 4"], "age": 34324, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 2 }, "reportId": 2 },
  { "reportFilter": { "selectedClaimids": ["100004", "100005"], "billedAmountFrom": 3432, "billedAmountTo": 32423, "allowedAmountFrom": 43242, "allowedAmountTo": 423432, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 5", "Claim Source 4"], "age": 34324, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 3 }, "reportId": 3 }]
  res.status(200).json(reports);
});

app.post("/api/draw-mode/assign-task", (req, res, next) => {
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

app.post("/api/draw-mode/update-task", (req, res, next) => {
  const claim = {
    message: "succes"
  }
  res.status(200).json(claim);
});

module.exports = app;
