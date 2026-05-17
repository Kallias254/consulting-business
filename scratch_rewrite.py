import re

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "r") as f:
    content = f.read()

# Add usePathname
content = content.replace("import Link from 'next/link'", "import Link from 'next/link'\nimport { usePathname } from 'next/navigation'")

# Add usePathname hook and isActive function
content = content.replace(
    "const active = theme.other",
    "const active = theme.other\n  const pathname = usePathname()\n\n  const isActive = (path: string) => {\n    if (path === '/scholarcrafted') return pathname === path\n    return pathname?.startsWith(path)\n  }"
)

# Update Box component nav styling
content = re.sub(
    r'borderBottom: `1px solid \${active\.primary}12`,\n\s*backgroundColor: `\${active\.background}f2`,\n\s*backdropFilter: \'blur\(12px\)\',',
    'backgroundColor: active.primary,',
    content
)

# Update Logo Text
content = re.sub(
    r'<Text\n\s*fw=\{700\}\n\s*style=\{\{\n\s*fontSize: rem\(22\),\n\s*lineHeight: 1,\n\s*color: active\.primary,\n\s*letterSpacing: \'-0\.02em\' \}\}\n\s*>\n\s*SCHOLARCRAFTED\n\s*</Text>',
    '<Text\n                fw={700}\n                c="white"\n                style={{\n                  fontSize: rem(22),\n                  lineHeight: 1,\n                  letterSpacing: \'-0.02em\' }}\n              >\n                SCHOLARCRAFTED\n              </Text>',
    content
)

# Update sublogo text
content = re.sub(
    r'c="dimmed"\n\s*fw=\{500\}\n\s*style=\{\{ fontSize: rem\(9\), letterSpacing: \'0\.15em\', textTransform: \'uppercase\' \}\}',
    'c="rgba(255,255,255,0.7)"\n                fw={500}\n                style={{ fontSize: rem(9), letterSpacing: \'0.15em\', textTransform: \'uppercase\' }}',
    content
)

# SERVICES Link Wrapper
content = re.sub(
    r'<Box style=\{\{ cursor: \'pointer\' \}\}>\n\s*<Center inline>\n\s*<Text\n\s*fw=\{600\}\n\s*size="xs"\n\s*className="nav-link"\n\s*style=\{\{ letterSpacing: \'0\.1em\', display: \'flex\', alignItems: \'center\' \}\}\n\s*>',
    '<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/services\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                  <Center inline>\n                    <Text\n                      fw={600}\n                      size="xs"\n                      className="nav-link"\n                      style={{ letterSpacing: \'0.1em\', display: \'flex\', alignItems: \'center\' }}\n                    >',
    content
)

# SERVICES MegaMenu
content = re.sub(
    r'<HoverCard\.Dropdown style=\{\{ overflow: \'hidden\', padding: 0, border: `1px solid \${active\.primary}15` \}\}>',
    '<HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: \'hidden\', padding: 0 }}>',
    content
)
# We will do a generic replacement for the ThemeIcons and Texts inside mega menus later.

# HOW IT WORKS Link Wrapper
content = re.sub(
    r'<Box style=\{\{ cursor: \'pointer\' \}\}>\n\s*<Center inline>\n\s*<Text\n\s*fw=\{600\}\n\s*size="xs"\n\s*className="nav-link"\n\s*style=\{\{ letterSpacing: \'0\.1em\', display: \'flex\', alignItems: \'center\', minHeight: rem\(14\) \}\}\n\s*>',
    '<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/how-it-works\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                <Center inline>\n                  <Text\n                    fw={600}\n                    size="xs"\n                    className="nav-link"\n                    style={{ letterSpacing: \'0.1em\', display: \'flex\', alignItems: \'center\', minHeight: rem(14) }}\n                  >',
    content
)

# RESOURCES Link Wrapper
content = re.sub(
    r'<Box style=\{\{ cursor: \'pointer\' \}\}>\n\s*<Center inline>\n\s*<Text\n\s*fw=\{600\}\n\s*size="xs"\n\s*className="nav-link"\n\s*style=\{\{ letterSpacing: \'0\.1em\', display: \'flex\', alignItems: \'center\' \}\}\n\s*>',
    '<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/resources\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                  <Center inline>\n                    <Text\n                      fw={600}\n                      size="xs"\n                      className="nav-link"\n                      style={{ letterSpacing: \'0.1em\', display: \'flex\', alignItems: \'center\' }}\n                    >',
    content
)

# RESOURCES MegaMenu
content = re.sub(
    r'<HoverCard\.Dropdown style=\{\{ overflow: \'hidden\', padding: 0, border: `1px solid \${active\.primary}15` \}\}>',
    '<HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: \'hidden\', padding: 0 }}>',
    content
)

# ABOUT Link Wrapper
content = re.sub(
    r'<Link href="/scholarcrafted/about" style=\{\{ textDecoration: \'none\', color: \'inherit\' \}\}>\n\s*<Text\n\s*fw=\{600\}\n\s*size="xs"\n\s*className="nav-link"\n\s*style=\{\{ cursor: \'pointer\', letterSpacing: \'0\.1em\' \}\}\n\s*>\n\s*ABOUT\n\s*</Text>\n\s*</Link>',
    '<Link href="/scholarcrafted/about" style={{ textDecoration: \'none\', color: \'inherit\' }}>\n              <Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/about\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                <Center inline>\n                  <Text\n                    fw={600}\n                    size="xs"\n                    className="nav-link"\n                    style={{ letterSpacing: \'0.1em\' }}\n                  >\n                    ABOUT\n                  </Text>\n                </Center>\n              </Box>\n            </Link>',
    content
)

# Button invert
content = re.sub(
    r'variant="filled"\n\s*bg=\{active\.primary\}',
    'variant="filled"\n                bg="white"\n                c={active.primary}',
    content
)

# Generic MegaMenu replacements
content = content.replace('c="dark.9"', 'c="white"')
content = content.replace('c="dimmed"', 'c="rgba(255,255,255,0.7)"')
content = content.replace('variant="light" color={active.primary}', 'variant="filled" bg="rgba(0,0,0,0.2)" color="white"')

# Global CSS
new_css = """      <style jsx global>{`
        :root {
          --nav-hover-bg: color-mix(in srgb, ${active.primary}, black 20%);
        }
        .nav-link-wrapper {
          padding: 8px 16px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .nav-link-wrapper:hover, .nav-link-wrapper.active {
          background-color: var(--nav-hover-bg);
        }
        .nav-link {
          color: rgba(255,255,255,0.85) !important;
          transition: all 0.2s ease;
          position: relative;
          text-decoration: none;
        }
        .nav-link-wrapper:hover .nav-link, .nav-link-wrapper.active .nav-link {
          color: #fff !important;
          opacity: 1;
        }
        .mega-menu-dropdown {
          background-color: var(--nav-hover-bg) !important;
          border: 1px solid rgba(255,255,255,0.05) !important;
        }
        .mega-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: background-color 0.2s ease;
        }
        .mega-link:hover {
          background-color: rgba(255,255,255,0.05);
        }
      `}</style>"""

content = re.sub(r'<style jsx global>\{`.*?`\}</style>', new_css, content, flags=re.DOTALL)

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "w") as f:
    f.write(content)

