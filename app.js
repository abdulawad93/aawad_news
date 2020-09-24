require('dotenv').config();

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const _=require("lodash");

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

const chunks=[];

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.KEY);
const newsParams={
  language: 'en',
  category: null,
  country: 'ca'
}

const date=new Date();

function filterDuplicates(newsArticles){
  const validArticles=[];
  let counter=0;
  newsArticles.forEach(function(newsArticle){
    validArticles.forEach(function(validArticle){
      if(newsArticle.title===validArticle.title)
      {
        counter++;
      }
    })
    if(counter===0)
    {
      validArticles.push(newsArticle);
    }
    counter=0;
  })
  return validArticles;
}

function setCountry(language){
  switch (language) {
    case "en": newsParams.country="ca"; break;
    case "ar": newsParams.country="ae"; break;
    case "fr": newsParams.country="fr"; break;
    default: newsParams.country="ca"; break;
  }
}

function setDefault(){
  newsParams.language="en";
  newsParams.country="ca";
  newsParams.category="general";
  newsParams.q="";
}

function resetFilter(){
  newsParams.language="";
  newsParams.country="";
  newsParams.category="";
  newsParams.q="";
}

function setPrevious(language,country,category){

  if(!language){newsParams.language="en";}
  else{newsParams.language=language;}
  if(!country){newsParams.country="ca";}
  else{newsParams.country=country;}
  if(!category){newsParams.category="general";}
  else{newsParams.category=category;}
  newsParams.q="";
}

app.get("/",function(req,res){
  setDefault();
  newsapi.v2.topHeadlines(newsParams).then(response => {
    res.render("home",{topHeadlines:filterDuplicates(response.articles),apiParameters:newsParams,newsCategory:"Breaking",currentYear:date.getFullYear()})
  });
})

app.get("/language/:selectedLanguage/category/:selectedCategory",function(req,res){
  newsParams.language=req.params.selectedLanguage;
  newsParams.category=req.params.selectedCategory;
  setCountry(newsParams.language);
  newsapi.v2.topHeadlines(newsParams).then(response => {
    res.render("filtered",{topHeadlines:filterDuplicates(response.articles),apiParameters:newsParams,newsCategory:_.capitalize(newsParams.category),currentYear:date.getFullYear()})
  });
})

app.post("/",function(req,res){
  prevLang=newsParams.language,
  prevCountry=newsParams.country,
  prevCat=newsParams.category
  resetFilter();
  newsParams.q=req.body.search;
  newsapi.v2.topHeadlines(newsParams).then(response => {
  res.render("search",{topHeadlines:filterDuplicates(response.articles),apiParameters:newsParams,newsCategory:"Breaking",currentYear:date.getFullYear()});
});
setPrevious(prevLang,prevCountry,prevCat);
})



app.listen(process.env.PORT||3000,()=>{console.log("App is waiting for requests")});
