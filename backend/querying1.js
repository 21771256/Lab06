const Sequelize = require('sequelize');
const db = require('./connect_db');
const { Op } = require("sequelize");

// Tell Sequelize about the 'articles' table.
const Article = db.define('articles', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
});

// Now we will execute a bunch of queries. Notice that we are forcing the
// queries to execute in order by chaining with `then`.

// Q1: This query finds the article with id of 2
Article.findByPk(2)
.then(article => {
  console.log('# Article with id=2');
  console.log(article.dataValues);
  console.log();
})

// Q2: This query finds all articles
.then(() => Article.findAll())
.then(articles => {
  console.log('# All articles');
  articles.forEach(article => {
    console.log(article.dataValues);
  });
  console.log();
})

// Q3:  This query finds all articles with id between 1 and 2
.then(() => Article.findAll({
  where: {
    id:{[Op.between]: [1, 2]} 
  }
}))
.then(articles => {
  console.log('# All articles with id between 1 and 2');
  articles.forEach(article => {
    console.log(article.dataValues);
  })
  console.log();
})

// Q4: This query finds all articles with id greater than 3 and then destroys them.
// Notes: old syntax using $gt is now replaced by Op.gt  
.then(() => Article.findAll({
  where: {
    id: { [Op.gt]: 3 }
  }
}))
.then(articles => {
  // Notice how we combine an array of promises into a single promise by
  // using Promise.all()
  return Promise.all(
    articles.map(article => article.destroy())
  );
})

// Q5: This query prints out all the articles again to show you what has been destoyed.
.then(() => Article.findAll())
.then(articles => {
  console.log('# All articles after destroying');
  articles.forEach(article => {
    console.log(article.dataValues);
  });
  console.log();
})

// Exercise 1
// Print out the contents of ar�cles whose id is either 1 or 3.
// *** TODO: Insert code here ***
.then(() => Article.findAll({
  where: {
    id:{[Op.in]: [1, 3]} 
  }
}))
.then(articles => {
  console.log('Ex1: ID = 1 or 3');
  articles.forEach(article => {
    console.log(article.dataValues);
  })
  console.log();
})
  


// Exercise 2
// Retrieve the ar�cle record which has an id of 2 and update it so that its content is now 
// "Sequelize is the worst ORM ever!".
// *** TODO: Insert code here ***
.then(() => Article.findByPk(2))
.then(article => article.update({content: "Sequelize is the worst ORM ever"}))
.then(() => Article.findByPk(2))
.then(article => {
  console.log('Ex2: Article with ID = 2 -> updated content');
  console.log(article.dataValues);
  console.log();
})



// Close the database connection.
.catch(console.error).then(() => db.close());
