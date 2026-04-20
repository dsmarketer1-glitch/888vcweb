const fs = require('fs');
let content = fs.readFileSync('src/data/site-content.js', 'utf8');

// Update Hero slides
content = content.replace('/assets/webimages/Homepage/Hero/Slide 1.jpg', '/assets/webimages/Homepage/Hero/1.JPG');
content = content.replace('/assets/webimages/Homepage/Hero/Slide 2.jpg', '/assets/webimages/Homepage/Hero/2.JPG');
content = content.replace('/assets/webimages/Homepage/Hero/Slide 3.jpg', '/assets/webimages/Homepage/Hero/3.JPG');
content = content.replace('/assets/webimages/Homepage/Hero/Slide 4.jpg', '/assets/webimages/Homepage/Hero/4.jpg');

// Identify and URL encode all image paths
content = content.replace(/\/assets\/webimages\/[^\"\']+/g, match => match.replace(/ /g, '%20'));

fs.writeFileSync('src/data/site-content.js', content);
console.log("Updated site-content.js");
