import os
import re
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # Accordion
    content = re.sub(r'variant="separated"\s*', '', content)
    
    # Radius
    content = re.sub(r'radius=\{\d+\}\s*', '', content)
    content = re.sub(r'radius="[^"]+"\s*', '', content)

    # Size on TextInput / Textarea (since md is now default, we can remove it to clean up code)
    # We only remove size="md" to avoid breaking intentional sizes like size="xl"
    content = re.sub(r'size="md"\s*', '', content)

    # Clean up empty spaces inside tags left by removals
    content = re.sub(r'<Accordion\s+>', '<Accordion>', content)
    content = re.sub(r'<TextInput\s+>', '<TextInput>', content)
    content = re.sub(r'<Textarea\s+>', '<Textarea>', content)
    content = re.sub(r'<Badge\s+>', '<Badge>', content)
    
    # Just in case there's multiple spaces before closing >
    content = re.sub(r'\s+>', '>', content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Purged Component Styles: {path}")

