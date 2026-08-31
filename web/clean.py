import re

files = [
    r'src/app/(public)/page.tsx',
    r'src/app/(public)/tenders-sri-lanka/page.tsx'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove cat-glyph div and its contents (handling multiple lines if necessary)
    content = re.sub(r'<div className="cat-glyph">[\s\S]*?</div>', '', content)
    
    # Remove the circular urgency SVGs
    content = re.sub(r'<svg width="34" height="34" viewBox="0 0 34 34">[\s\S]*?</svg>', '', content)
    
    # Remove any remaining SVGs (like the location map pin or category icons)
    content = re.sub(r'<svg.*?>[\s\S]*?</svg>', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print('Done!')
