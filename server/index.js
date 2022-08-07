const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors());
const path = require("path");
const ext = require('./helpers/Ext');

const fs = require('fs');
const HTMLtoDOCX = require('./dist/html-to-docx.umd') //require('../dist/html-to-docx.umd');
const filePath = './example.docx';



// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:3000/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));

// app.use('/', createProxyMiddleware({ 
//   target: 'http://localhost:3000/', //original url
//   changeOrigin: true, 
//   //secure: false,
//   onProxyRes: function (proxyRes, req, res) {
//      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));


app.use(express.static(path.join(__dirname.replace('server', ''), 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname.replace('server', ''), '/client/build/index.html'));
});

app.use('/api', ext);

// const htmlString = `<!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <title>Document</title>
//     </head>
//     <body>
//         <div>
//             <p>Taken from wikipedia</p>
//             <img
//                 src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExITFRUVExYXEhcXGBMYGBcZGBcWGBgWFhUYHSggGBolGxUXITEiJiorLi4uFyA/ODMtNyotLisBCgoKDg0OGhAPGi4lHyU3LS8tLys3Ny0tKzUuKy8tLS8tKysrNS0wLS0tNS0tLS03LS01NS0tLTgtNy8tLTgrLf/AABEIAMoA+QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgEGB//EAD4QAAEDAgMFBAYHCAMBAAAAAAEAAhEDIQQSMQUTIkFRYXGBkRUyQqGx4QYUI1NiwfAzUmNygpKi0QdDsvH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIEA//EAB8RAQEBAQEAAAcAAAAAAAAAAAABEQIhBBIiMWGh8P/aAAwDAQACEQMRAD8A/cUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBUMZjC2oGB9NksLpfebgQOIK+VnbSouc15YamfKcgERMW1EaoPcPjyW1SSx27flBbIa6WMcNMxF3xadEw2Pe54aacAzJG9tA55qbR71zXo8JaA58xIe9zIi8tcxpIMwqmz6Fam5pdxcDGumvXdcTnflc2CTItyjVBO/bF3gCYqU20/4jXPpse5hmDlc5zT0IE6ifXbQeWUXAQagl32VR4bwl0nIbXEeIUT3vzPBp1SwObusn1fKGhjNA4ggh4d+oVatReWUvsQXbv7Q5aBIIygNIkD97S1kGvs3EOe0l2oc4fs307AkAw8mZifELO2xtTE0TUqCjT3FIsBzOO8qh2XMaQbIbGaAHXe4EcIhxl2PTyZi5gBJ4eCk0hsC0sJkSCbqhjcJiX4k1iyhVpsy/VmPqVWimQBmeWNpua6pmmHE8IAiJcXBL6crWrGmwYc4ncau3sGruG1rcJaakcPJjpmRlVLan0hxjK+SnSY6kHPDnmlXzjL93SkOxMe0aYIE2m4E/omsQMOXMOGGI308W9IFXftoZYy5Q+BnkywRlk5lg7Y+i4NapusBT/6/qhZQwG4Ahuf6wHjOeLNMexly8UoP0LD1MzGu6tB0I1HR1x3G6kVbA4alSYKdKk2mwEw1jAxokkmGtECSSfFWUBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEWbj69UVGNYDlLqckNm2YhwJ5WI7o7UGki+ZZjsXuyS15dvABLIOXK6bBukgXPctSo+vNKAYIZn9Wx9Z0yOgi0XIQNq4eo8tyAjK6m7MKjm2bUa5zSwWMtBF/3lUxezKz8TnFQimRFrETTe0wc0wDBiIzEGLLsYivlqHjmRkG75AunLa8iNY15KbEV64bTy3JaRUJpv1tDoAto63aLQgxKGycSGku3wJqU3FoqNfZpquIZLgA0F7efsgxyU+1dm4k4ajTYarnNpBr4dTaSQGHiJ7WxINpOq0qtbEZyILRkEGJk7y8ZQ7Vn/wAXVSrXlhaDl4A8kC81AHWytcCG84iDyiUGfs/A4huOfUcHbkh2Uk04MinYNBn2dT0P7xmtgtkYrLUaS9vBSDS+sZJE5+OncQbzF+cSVvbOr1Dmzg8sstcOsmcogWFjMdTKho1MQG1M85hlLJAcILz+4Lw2J7ptKDIxWy8UatFzc0NqOLzNMiDiHODoJschBgDoFaxOzq7sU9wdUaxxzMdnBaw7k07MzSBmg2GpPhfbiKpyE2mMwDXx61weA8rai/UGzCvrOFSSZj7PhygG9wSL6gXHsoM07MxQByvIcKjXNGdzmxFQFuYw5wAeNebG2Q7OxAqUb1XMY2iHneMg7sOkuabuJcQTe8n90Z7VfEYgAevPEDwNdJyMg2/ESRB+CtPrVRVLf+uZkMeTGTQGInNf9Qgz9nbLrgEVC4fbU3gio5xAaZc0XENOmW9ibm0fQrKq1qoovIz5swDZaA4Aho0LADBJPdzCio18RLQc3EBPC2BxmeICxyiOcW62DaRY28xQY6xLhMTkB9V2gbYmcpgE8/HqliK83Dv2UiWmM2RpiA3XNPPlEINdERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQeSkqsiCzKSqyILMpKrIgsykqsiCzKSqyILMpKrIgsykqsiCzKSqyILMpKrIgsykqsiCzKSqyILMpKrIgsykqsiCzKSqyILMpKrIgsykqsiAocXiBTaXmSAWi0D1nBou4gC5GpUyixOXKS/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"
//                 alt="Red dot"
//             />
//         </div>
//         <div>
//             <h1>This is heading 1</h1>
//             <p>Content</p>
//             <h2>This is heading 2</h2>
//             <p>Content</p>
//             <h3>This is heading 3</h3>
//             <p>Content</p>
//             <h4>This is heading 4</h4>
//             <p>Content</p>
//             <h5>This is heading 5</h5>
//             <p>Content</p>
//             <h6>This is heading 6</h6>
//             <p>Content</p>
//         </div>
//         <p>
//             <strong>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
//                 a type specimen book.
//             </strong>
//             <i>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</i>
//             <u>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</u>and more recently with desktop publishing software
//             <span style="color: hsl(0, 75%, 60%);"> like Aldus PageMaker </span>including versions of Lorem Ipsum.
//             <span style="background-color: hsl(0, 75%, 60%);">Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text.</span>
//             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
//         </p>
//         <blockquote>
//             For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
//         </blockquote>
//         <p>
//             <strong>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
//                 a type specimen book.
//             </strong>
//         </p>
//         <p style="margin-left: 40px;">
//             <strong>Left indented paragraph:</strong>
//             <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
//         </p>
//         <p style="margin-right: 40px;">
//             <strong>Right indented paragraph:</strong>
//             <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
//         </p>
//         <p style="margin-left: 40px; margin-right: 40px;">
//             <strong>Left and right indented paragraph:</strong>
//             <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
//         </p>
//         <ul style="list-style-type: circle;">
//             <li>Unordered list element</li>
//         </ul>
//         <br>
//         <ol style="list-style-type: decimal;">
//             <li>Ordered list element</li>
//         </ol>
//         <div class="page-break" style="page-break-after: always"></div>
//         <ul>
//             <li>
//                 <a href="https://en.wikipedia.org/wiki/Coffee">
//                     <strong>
//                         <u>Coffee</u>
//                     </strong>
//                 </a>
//             </li>
//             <li>Tea
//                 <ol>
//                     <li>Black tea
//                         <ol style="list-style-type:lower-alpha-bracket-end;" data-start="2">
//                             <li>Srilankan <strong>Tea</strong>
//                                 <ul>
//                                     <li>Uva <b>Tea</b></li>
//                                 </ul>
//                             </li>
//                             <li>Assam Tea</li>
//                         </ol>
//                     </li>
//                     <li>Green tea</li>
//                 </ol>
//             </li>
//             <li>Milk
//                 <ol>
//                     <li>Cow Milk</li>
//                     <li>Soy Milk</li>
//                 </ol>
//             </li>
//         </ul>
//         <br>
//         <table>
//             <tr>
//                 <th>Country</th>
//                 <th>Capital</th>
//             </tr>
//             <tr>
//                 <td>India</td>
//                 <td>New Delhi</td>
//             </tr>
//             <tr>
//                 <td>United States of America</td>
//                 <td>Washington DC</td>
//             </tr>
//             <tr>
//                 <td>Bolivia</td>
//                 <td>
//                     <ol>
//                         <li>Sucre</li>
//                         <li>La Paz</li>
//                     </ol>
//                 </td>
//             </tr>
//         </table>
//     </body>
// </html>`;

async function  a (htmlString) {
  const fileBuffer = await HTMLtoDOCX(htmlString, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
  });

  fs.writeFile(filePath, fileBuffer, (error) => {
    if (error) {
      console.log('Docx file creation failed');
      return;
    }
    console.log('Docx file created successfully');
  });
};

// (async () => {
//   const fileBuffer = await HTMLtoDOCX(htmlString, null, {
//     table: { row: { cantSplit: true } },
//     footer: true,
//     pageNumber: true,
//   });

//   fs.writeFile(filePath, fileBuffer, (error) => {
//     if (error) {
//       console.log('Docx file creation failed');
//       return;
//     }
//     console.log('Docx file created successfully');
//   });
// })();

app.post('/abc',  async function (req, res) {
  console.log(req);
  // await a();
  res.send('hi2');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname.replace('server', ''), '/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

