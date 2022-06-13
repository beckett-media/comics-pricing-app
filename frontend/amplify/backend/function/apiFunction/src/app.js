/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express")
const bodyParser = require("body-parser")
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")

const {
  getIssuePrices,
  getPopularIssues,
  getDetails,
  getNewComics,
  getRecentPriceDrops,
  getRelatedTitles,
  getRelatedIssues,
  getTrendingIssues,
  getIssueSalesHistory
} = require("./services/issue.service.js")
const { getPopularPublishers } = require("./services/publisher.service.js")
const { getPopularTitles } = require("./services/title.service.js")

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

/**********************
 * Example get method *
 **********************/

app.get("/api", function (req, res) {
  // Add your code here
  res.json({ success: "ok", status: 200 })
})

app.get("/api/issue/popular", async function (req, res) {
  res.json(await getPopularIssues())
})

app.get("/api/issue/trending", async (_req, res) => {
  res.json(await getTrendingIssues())
})

app.get("/api/issue/new-comics", async (_req, res) => {
  res.json(await getNewComics())
})

app.get("/api/issue/recent-price-drops", async (_req, res) => {
  res.json(await getRecentPriceDrops())
})


app.get("/api/issue/sales-history", async (_req, res) => {
  res.json(await getIssueSalesHistory())
})

app.get("/api/issue/:id", async (_req, res) => {
  const { id } = _req.params
  res.json(await getDetails(id))
})

app.get("/api/issue/:id/prices", async (_req, res) => {
  res.json(await getIssuePrices(_req.params.id))
})

app.get("/api/issue/:id/related/issues", async (_req, res) => {
  res.json(await getRelatedIssues(_req.params.id))
})

app.get("/api/issue/:id/related/titles", async (_req, res) => {
  res.json(await getRelatedTitles(_req.params.id))
})

app.get("/api/issue/issue-price-analytics", async (_req, res) => {
  res.json(await getIssuePriceAnalytics(_req.query.id, _req.query.num_months))
})


// ##########################################################
// ############## GET PUBLISHERS ############################
// ##########################################################
app.get("/api/publisher/popular", async (_req, res) => {
  res.json(await getPopularPublishers())
})

// ##########################################################
// ############## GET TITLE ###############################
// ##########################################################
app.get("/api/title/popular", async (_req, res) => {
  res.json(await getPopularTitles())
})

app.listen(3000, function () {
  console.log("App started")
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
