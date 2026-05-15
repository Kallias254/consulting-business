import os
import re
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('Footer.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # Replace footerBg logic
    content = re.sub(
        r"const footerBg = bg \|\| \(active\.primary === '#A51C30' \? active\.primary : active\.background\)",
        "const footerBg = bg || active.background",
        content
    )

    # Replace c={active.primary === '#A51C30' ? 'white' : active.primary}
    content = content.replace(
        "c={active.primary === '#A51C30' ? 'white' : active.primary}",
        "c={active.primary}"
    )

    # Replace borderTop logic
    content = re.sub(
        r"borderTop: `1px solid \$\{active\.primary === '#A51C30' \? 'rgba\(255,255,255,0\.2\)' : `\$\{active\.primary\}22`\}`",
        "borderTop: '1px solid var(--color-border)'",
        content
    )

    # Replace c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.7)' : 'dimmed'}
    content = content.replace(
        "c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.7)' : 'dimmed'}",
        "c=\"dimmed\""
    )

    # Replace c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
    content = content.replace(
        "c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}",
        "c=\"dimmed\""
    )

    # And for anywhere the string alone is used without dimmed fallback
    content = content.replace(
        "active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'",
        "'dimmed'"
    )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Purged Footer logic: {path}")
