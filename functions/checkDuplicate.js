const filterDuplicates=function (newsArticle){
  console.log("test");
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

export filterDuplicates;
