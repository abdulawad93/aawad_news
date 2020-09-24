# aawad_news

<h1>Description</h1>

<p>AAWAD News is a news scrapping web app that gets and display daily news using <a href="https://newsapi.org/">NewsAPI</a> Here is a live link of the app: https://protected-brushlands-25948.herokuapp.com/</p>

<p>The home page views assorted news from various categories. Please notice that the default language of the home page is English and the default country is Canada.</p>
<img src="./NewsAPIScreenshots/home.JPG" alt="aawad-news-home-page"/>
<p>You can see from the screenshot above that each news block shows only the first 40 characters, which is done like that to keep a consistent design. Some of the news retreived from NewsAPI does not have images stored Furthermore, to go around this issue, I uploaded a filler image that shows "BREAKING" text, and I set up the app to show this image when no image is available from the API.</br>Please notice that some times the news article itself may provide a broken image URL. In this case, the first word of the article titles appears as an alternative text of the broken image.</p>
<p>By using the navigation bar, users can filter the news by category or language.</br>
This app only filter to four categories:
<ul>
  <li>Politics</li>
  <li>Health</li>
  <li>Business</li>
  <li>Technology</li>
 </ul></p>
 <p>Also, this app allows users to filter the news to appears in one of three language. Please notice each country have limited set of languages. It's not possible to get Arabic news of News content published by Canadian sources. The table below maps languages used to the country where the news were published.
  <table>
    <tr>
      <th>Language</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>English</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td>Arabic</td>
      <td>United Arab Emirates</td>
    </tr>
    <tr>
      <td>French</td>
      <td>France</td>
    </tr>
   </table>
   </p>
   <p>The screenshot shows a page filtered to show news with technology as the selected category and french as the selected language</p>
   <img src="./NewsAPIScreenshots/techFrNews.JPG" alt="technology-news-in-french"/>
   <p>Notice the change of the website's header message. In the home page the header message is "AAWAD Breaking News!", while in the image above the message says "AAWAD Technology News!" instead, which reflects the selected category.</p>
   <p>The final feature in the naviagation bar is the search input. User can search using any language, even the languages which are not available in this app, as long as they are supported by the NewsAPI.</p>

<h1>Code Structure</h1>
<h2>EJS</h2>
<p>This project uses EJS files to view the frontend content. EJS file allowed me to insert javascript code into the HTML content, and at the same time, it allowed me to access variables data. Also, it allowed me to integrate EJS files within other EJS files, which made the code much simpler.
The EJS syntax that have been used in this code is shown as below.</p>
<table>
  <tr>
    <th>EJS</th>
    <th>Function</th>
  </tr>
  <tr>
    <td><%statements%></td>
    <td>Integrating javascript in HTML document</td>
  </tr>
  <tr>
    <td><%=variable%></td>
    <td>Reading variable value rendered by Node.js</td>
  </tr>
  <tr>
    <td><%-include(<ejs>)-%></td>
    <td>Integrating/including an ejs file including another</td>
  </tr>
  </table>
  <p>Using EJS and forEach statement I rendered as much news as the NewsAPI is providing for specific category, language, or search.</p>
  <p>Another thing to notice in the code is that there are 5 views, as listed below:
  <ul>
    <li>Header</li>
    <li>Footer</li>
    <li>Home</li>
    <li>Filtered</li>
    <li>Search</li>
  </ul>
  Both Header and Footer views gets integrated into the rest of the views using EJS.</br>
  The header is where Bootstraps CDN and Navbar are included. There are 7 links in total in the navbar, and each category or language selected has one link. Furthermore, these links helps in determaining the category and the language selected by the user. The links associated with categories and language use <em>params</em> is the link.</br>
  If a category is selected, the link will include that category, and any of the three languages based on previous the language previous selected.</br>
  The opposite happens if a language was selected instead of a category.</br>
  The search form intiates a POST request with the route "/" when submitted.</p>
  <p>The footer simply states the copyright with my name and the current year. Notice that the current year updates dynamically based on the year value rendered by the app.</p>
  <p>Home views is explained previously, renders as
  <h2>Node.js</h2>
  
