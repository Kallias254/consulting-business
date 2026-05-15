import os
import re
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # Replace borders
    content = re.sub(r"'1px solid #eee'", "'1px solid var(--color-border)'", content)
    content = re.sub(r"'1px solid #ddd'", "'1px solid var(--color-border)'", content)
    content = re.sub(r"`1px solid \$\{active\.primary\}22`", "`1px solid var(--color-border)`", content)
    content = re.sub(r"`1px solid \$\{active\.primary\}44`", "`1px solid var(--color-border)`", content)

    # Replace heroColor in articles
    content = re.sub(r"heroColor:\s*'#1a1a2e'", "heroColor: active.primary", content)

    # Replace background #ccc in page.tsx
    content = re.sub(r"backgroundColor:\s*'#ccc'", "backgroundColor: 'var(--color-border)'", content)

    # Replace weird fallback in Routledge page
    content = re.sub(r"const active = theme.other \|\| \{ primary: '#1A1A1A', background: '#FAFAFA', surface: '#FFFFFF', accent: '#D4AF37' \}", "const active = theme.other", content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Purged Hex Colors: {path}")

