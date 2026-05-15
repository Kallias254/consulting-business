import os
import re
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # 1. Purge Title inline styles
    content = re.sub(r"fontFamily:\s*'var\(--font-serif\)',?\s*", "", content)
    content = re.sub(r"letterSpacing:\s*'-0\.02em',?\s*", "", content)
    
    # fontWeight: 400 is common for titles, but maybe used elsewhere. 
    # Let's only remove it if it's inside a style={{...}} block that we just modified.
    # A safer approach is to remove "fontWeight: 400" only if the string contains it.
    content = re.sub(r"fontWeight:\s*400,?\s*", "", content)

    # 2. Convert eyebrow styles to use the CSS class
    # Eyebrows usually have textTransform: 'uppercase'
    # We will look for <Text ... style={{ ... textTransform: 'uppercase' ... }}>
    # and add className="impeccable-eyebrow"
    
    def eyebrow_replacer(match):
        tag_content = match.group(0)
        # Strip the specific inline styles
        tag_content = re.sub(r"letterSpacing:\s*'0\.\d+em',?\s*", "", tag_content)
        tag_content = re.sub(r"textTransform:\s*'uppercase',?\s*", "", tag_content)
        tag_content = re.sub(r"fontWeight:\s*\d+,?\s*", "", tag_content)
        # also remove fw={...}
        tag_content = re.sub(r"fw=\{\d+\}\s*", "", tag_content)
        
        # Inject className
        if 'className=' in tag_content:
            tag_content = tag_content.replace('className="', 'className="impeccable-eyebrow ')
        else:
            tag_content = tag_content.replace('<Text ', '<Text className="impeccable-eyebrow" ')
            tag_content = tag_content.replace('<div ', '<div className="impeccable-eyebrow" ')
            tag_content = tag_content.replace('<Box ', '<Box className="impeccable-eyebrow" ')
            tag_content = tag_content.replace('<span ', '<span className="impeccable-eyebrow" ')
        return tag_content

    # Match <Text ...> or <Box ...> up to the closing >
    content = re.sub(r'<(Text|Box|div|span)[^>]*textTransform:\s*\'uppercase\'[^>]*>', eyebrow_replacer, content)

    # 3. Cleanup empty style tags: style={{ }} or style={{  }}
    content = re.sub(r'style=\{\{\s*\}\}', '', content)
    # Cleanup dangling commas at the end of style objects: style={{ color: active.primary, }}
    content = re.sub(r',\s*\}\}', ' }}', content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Purged: {path}")

