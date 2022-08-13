const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/wikiDB");
}

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res) {
  res.send("<h1>Hello everyone!</h1>");
});

app.route("/articles")

.get(function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });

  article.save(function(err) {
    if (!err) {
      res.send("Successfully added new article.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err) {
      res.send("Successfully deleted all articles.");
    }
  });
});

app.route("/articles/:articleTitle")

.get(function (req, res)  {
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function (req, res) {
  Article.replaceOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    function(err, updatedArticle) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    });
});





app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
