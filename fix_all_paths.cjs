const fs = require('fs');


const paths = [
    'src/pages/AboutPage.jsx',
    'src/pages/InvestorsPage.jsx',
    'src/pages/PortfolioPage.jsx',
    'src/pages/StartupPage.jsx',
    'src/pages/HomePageClient.jsx',
    'src/App.jsx', // if it has any local assets
    'src/components/AdditionalSections.jsx',
    'src/components/Navbar.jsx'
];

paths.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content.replace(/\/assets\/webimages\/[^\"\']+/g, match => match.replace(/ /g, '%20'));
        if(content !== newContent) {
           fs.writeFileSync(file, newContent);
           console.log(`Updated paths in ${file}`);
        }
    }
});

