import os
import re
from pathlib import Path

# 1. Update Footer.tsx
footer_path = '/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted/_components/Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

# Fix styles in Footer.tsx
new_footer_content = footer_content.replace(
    'borderTop: \'1px solid #eee\'', 
    'borderTop: `1px solid ${active.primary}12`'
)

# Replace the style block
style_block_pattern = r'<style jsx global>\{`.*?`\}</style>'
new_style_block = """<style jsx global>{`
        .footer-link {
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: ${active.primary} !important;
          opacity: 0.8;
          text-decoration: none !important;
        }
      `}</style>"""

new_footer_content = re.sub(style_block_pattern, new_style_block, new_footer_content, flags=re.DOTALL)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(new_footer_content)

print("Footer.tsx updated.")

# 2. Global Sweep for rogue underlines and borders in scholarcrafted pages
TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    if '_components' in str(path): continue # Skip components already handled or Navbar
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace harsh borders
    content = content.replace("border: '1px solid #eee'", "border: `1px solid ${active.primary}12`" if 'active' in content else "border: '1px solid #eee'")
    content = content.replace("borderTop: `1px solid #eee`", "borderTop: `1px solid ${active.primary}12`" if 'active' in content else "borderTop: `1px solid #eee`")
    content = content.replace("borderBottom: `1px solid #eee`", "borderBottom: `1px solid ${active.primary}12`" if 'active' in content else "borderBottom: `1px solid #eee`")

    # Remove underlines from links
    content = content.replace("textDecoration: 'underline'", "textDecoration: 'none'")
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Standardized: {path}")

