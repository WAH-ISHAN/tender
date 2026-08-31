const fs = require('fs');
const files = [
    'src/app/(public)/page.tsx',
    'src/app/(public)/tenders-sri-lanka/page.tsx'
];

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Remove cat-glyph divs
    content = content.replace(/<div className="cat-glyph">[\s\S]*?<\/div>/g, '');
    
    // Remove the circular urgency SVGs
    content = content.replace(/<svg width="34" height="34" viewBox="0 0 34 34">[\s\S]*?<\/svg>/g, '');
    
    // Remove all other SVGs
    content = content.replace(/<svg[\s\S]*?<\/svg>/g, '');
    
    fs.writeFileSync(filepath, content, 'utf8');
});
console.log('Done!');
