import os
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # Replace bad variable with #eee
    content = content.replace("var(--color-border)", "#eee")

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed border: {path}")

