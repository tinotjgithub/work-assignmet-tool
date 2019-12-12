const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json())

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Content-Type", 'application/json');
  req.header("Content-Type", 'application/json');
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
  const reports = [{ "reportFilter": { "selectedClaimids": ["100003", "100004"], "billedAmountFrom": 1000, "billedAmountTo": 2000, "allowedAmountFrom": 7500, "allowedAmountTo": 68900, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 5", "Claim Source 4"], "age": 25, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 1 }, "reportId": 1 },
  { "reportFilter": { "selectedClaimids": ["100001", "100006"], "billedAmountFrom": 2000, "billedAmountTo": 3000, "allowedAmountFrom": 10000, "allowedAmountTo": 145620, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 1", "Claim Source 2"], "age": 15, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 2 }, "reportId": 2 },
  { "reportFilter": { "selectedClaimids": ["100002", "100005"], "billedAmountFrom": 3000, "billedAmountTo": 4000, "allowedAmountFrom": 30000, "allowedAmountTo": 423432, "selectedWbids": ["WB4", "WB5"], "selectedClaimsources": ["Claim Source 3", "Claim Source 5"], "age": 10, "selectedSupplierName": ["Supplier 2", "Supplier 4"], "last": 3 }, "reportId": 3 }]
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


app.get("/api/audit-mode/audit-claim", (req, res, next) => {
  const claim = {
    "billedAmount": 0,
    "claimId": "123",
    "claimSource": "Source",
    "claimType": "Type",
    "entryDate": "2019-12-04T11:52:49.474Z",
    "finalizedBy": "Me",
    "finalizedDate": "2019-12-04T11:52:49.474Z",
    "receiptDate": "2019-12-04T11:52:49.474Z",
    "reviewRepairReason": "NO Reason",
    "state": "state",
    "workBasketName": "WB",
    "taskAssignmentId": 3
  }
  res.status(200).json(claim);
});

app.post("/api/audit-mode/assign-task", (req, res, next) => {
  const claim = {
    "auditTaskId": 1,
    "auditorAction": null,
    "auditorComments": null,
    "auditorID": "bbb@abc.com",
    "createdAt": "2019-12-05T09:22:24.635Z",
    "auditorPrimaryEmail": "bbb@abc.com",
    "processorPrimaryEmail": "abc@abc.com",
    "processorAction": "Accept",
    "processorComments": "No Comments",
    "processorId": "abc@abc.com",
    "taskAssignmentId": 3,
    "verificationCriteria": "No Idea"
  }
  res.status(200).json(claim);
});

app.post("/api/audit-mode/update-auditor-task", (req, res, next) => {
  res.status(200).json({ success: true });
  // res.status(500).send({error: 'you have an error'});
});

app.get("/api/authentication/login", (req, res, next) => {
  res.status(200).json({ success: true, token: 'THIS_IS_SAMPLE_TOKEN', roleId: "PROCESSOR" });
});


app.post("/api/resource-dashboard/claims-per-user", (req, res, next) => {
  const userProductivityDto = {
    "userProductivityDto": [
      {
        "finishDate": "2019-12-02",
        "claimCount": 1
      },
      {
        "finishDate": "2019-12-03",
        "claimCount": 6
      },
      {
        "finishDate": "2019-12-04",
        "claimCount": 9
      }
    ]
  }
  res.status(200).json(userProductivityDto);
});

app.post("/api/resource-dashboard/claims-per-status", (req, res, next) => {
  const userStatusDto = {
    "userStatusDtos": [
      {
        "status": "complete",
        "claimCount": 8
      },
      {
        "status": "pend",
        "claimCount": 6
      },
      {
        "status": "route",
        "claimCount": 1
      }
    ]
  }
  res.status(200).json(userStatusDto);
});

app.post("/api/resource-dashboard/claims-audited-per-user", (req, res, next) => {
  const userAuditDto = {
    "userAuditScoreDto": [
      {
        "startDate": "2019-10-07",
        "completedAuditCount": 5,
        "successAuditCount": 3
      },
      {
        "startDate": "2019-11-04",
        "completedAuditCount": 5,
        "successAuditCount": 3
      },
      {
        "startDate": "2019-12-02",
        "completedAuditCount": 7,
        "successAuditCount": 5
      }
    ]
  }

  res.status(200).json(userAuditDto);
});

app.post("/api/resource-dashboard/claims-per-contribution", (req, res, next) => {
  const userContributionDto = {
    "userContributionDtos": [
      {
        "finishDate": "2019-12-02",
        "userClaimCount": 1,
        "teamClaimCount": 4
      },
      {
        "finishDate": "2019-12-03",
        "userClaimCount": 2,
        "teamClaimCount": 8
      },
      {
        "finishDate": "2019-12-04",
        "userClaimCount": 1,
        "teamClaimCount": 5
      }
    ]
  }
  res.status(200).json(userContributionDto);
});

module.exports = app;
