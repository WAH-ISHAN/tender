const fs = require('fs');
const files = [
    'src/app/(public)/page.tsx',
    'src/app/(public)/tenders-sri-lanka/page.tsx'
];

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Add Link import if not exists
    if (!content.includes('import Link')) {
        content = content.replace('"use client";', '"use client";\nimport Link from "next/link";');
    }

    // Replace anchor tags with Link tags for 'View details'
    content = content.replace(/<a href="#" className="view-link">View details<\/a>/g, '<Link href="/tender/MOE-2026-SP-01" className="view-link">View details</Link>');
    content = content.replace(/<a href="#" class="view-link">View details<\/a>/g, '<Link href="/tender/MOE-2026-SP-01" className="view-link">View details</Link>');
    
    fs.writeFileSync(filepath, content, 'utf8');
});
console.log('Links updated!');
