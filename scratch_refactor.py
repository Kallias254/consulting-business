import os
import re
from pathlib import Path

TARGET_DIR = Path('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted')

for path in TARGET_DIR.rglob('*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the local values
    section_match = re.search(r'const SECTION_SPACING\s*=\s*rem\([^)]+\)', content)
    inner_match = re.search(r'const INNER_WIDTH\s*=\s*(\d+).*', content)

    if not section_match and not inner_match:
        continue

    # Determine if this file used a narrow INNER_WIDTH
    is_narrow = False
    if inner_match:
        width_val = int(inner_match.group(1))
        if width_val < 1000:
            is_narrow = True

    # Remove the local declarations
    content = re.sub(r'const SECTION_SPACING\s*=\s*rem\([^)]+\)\n?', '', content)
    content = re.sub(r'const INNER_WIDTH\s*=\s*\d+.*\n?', '', content)

    # Replace INNER_WIDTH with READING_WIDTH in the JSX if narrow
    if is_narrow:
        content = re.sub(r'\bINNER_WIDTH\b', 'READING_WIDTH', content)

    # Inject the import statement after the last import
    imports = list(re.finditer(r'^import .*$', content, re.MULTILINE))
    if imports:
        last_import = imports[-1]
        insert_pos = last_import.end()
        new_import = "\nimport { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'\n"
        content = content[:insert_pos] + new_import + content[insert_pos:]
    else:
        content = "import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'\n" + content

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Refactored: {path}")

