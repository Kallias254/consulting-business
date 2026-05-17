import re

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "r") as f:
    content = f.read()

# 1. Update SERVICES Box wrapper
content = re.sub(
    r'<Box style={{ cursor: \'pointer\' }}>\s*<Center inline>\s*<Text\s*fw={600}\s*size="xs"\s*className={`nav-link \${isActive\(\'/scholarcrafted/services\'\) \? \'active\' : \'\'}`}',
    r'<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/services\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                  <Center inline>\n                    <Text\n                      fw={600}\n                      size="xs"\n                      className="nav-link"',
    content
)

# 2. Update RESOURCES Box wrapper
content = re.sub(
    r'<Box style={{ cursor: \'pointer\' }}>\s*<Center inline>\s*<Text\s*fw={600}\s*size="xs"\s*className={`nav-link \${isActive\(\'/scholarcrafted/resources\'\) \? \'active\' : \'\'}`}',
    r'<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/resources\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                  <Center inline>\n                    <Text\n                      fw={600}\n                      size="xs"\n                      className="nav-link"',
    content
)

# 3. Update HOW IT WORKS wrapper
content = re.sub(
    r'<Box style={{ cursor: \'pointer\' }}>\s*<Center inline>\s*<Text\s*fw={600}\s*size="xs"\s*className={`nav-link \${isActive\(\'/scholarcrafted/how-it-works\'\) \? \'active\' : \'\'}`}',
    r'<Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/how-it-works\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                <Center inline>\n                  <Text\n                    fw={600}\n                    size="xs"\n                    className="nav-link"',
    content
)

# 4. Update ABOUT Link wrapper (it doesn't have a Box, let's wrap it or add class to Text)
# Wait, let's just make it a Box > Center > Text like the others.
content = re.sub(
    r'<Link href="/scholarcrafted/about" style={{ textDecoration: \'none\', color: \'inherit\' }}>\s*<Text\s*fw={600}\s*size="xs"\s*className={`nav-link \${isActive\(\'/scholarcrafted/about\'\) \? \'active\' : \'\'}`}\s*style={{ cursor: \'pointer\', letterSpacing: \'0.1em\' }}\s*>\s*ABOUT\s*</Text>\s*</Link>',
    r'<Link href="/scholarcrafted/about" style={{ textDecoration: \'none\', color: \'inherit\' }}>\n              <Box className={`nav-link-wrapper ${isActive(\'/scholarcrafted/about\') ? \'active\' : \'\'}`} style={{ cursor: \'pointer\' }}>\n                <Center inline>\n                  <Text\n                    fw={600}\n                    size="xs"\n                    className="nav-link"\n                    style={{ letterSpacing: \'0.1em\' }}\n                  >\n                    ABOUT\n                  </Text>\n                </Center>\n              </Box>\n            </Link>',
    content
)

# 5. Update HoverCard.Dropdown styles
content = re.sub(
    r'<HoverCard.Dropdown style={{ overflow: \'hidden\', padding: 0, border: `1px solid \${active.primary}15` }}>',
    r'<HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: \'hidden\', padding: 0 }}>',
    content
)

# 6. Update mega-link text colors and icon colors
content = re.sub(r'c="dark.9"', r'c="white"', content)
content = re.sub(r'c="dimmed"', r'c="rgba(255,255,255,0.7)"', content)
content = re.sub(r'variant="light" color={active.primary}', r'variant="filled" bg="rgba(0,0,0,0.2)" color="white"', content)

# 7. Replace CSS
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
          border: 1px solid rgba(255,255,255,0.1) !important;
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

content = re.sub(r'<style jsx global>\{`.*`\}</style>', new_css, content, flags=re.DOTALL)

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "w") as f:
    f.write(content)

