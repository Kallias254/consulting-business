import re

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace(
    "import { Container, Group, Text, Stack, Button, rem, Box, useMantineTheme, HoverCard, SimpleGrid, ThemeIcon, Center } from '@mantine/core'",
    "import { Container, Group, Text, Stack, Button, rem, Box, useMantineTheme, HoverCard, SimpleGrid, ThemeIcon, Center, Burger, Drawer, Divider } from '@mantine/core'\nimport { useDisclosure } from '@mantine/hooks'"
)

# Add useDisclosure
content = content.replace(
    "const pathname = usePathname()",
    "const pathname = usePathname()\n  const [opened, { toggle, close }] = useDisclosure(false)"
)

# Add Burger inside Group
content = content.replace(
    "          </Group>\n        </Group>\n      </Container>",
    "          </Group>\n          <Burger opened={opened} onClick={toggle} hiddenFrom=\"sm\" size=\"sm\" color=\"white\" />\n        </Group>\n      </Container>"
)

# Add Drawer before closing Box
drawer_content = """
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={<Text fw={700} c={active.primary} style={{ letterSpacing: '-0.02em', fontSize: rem(20) }}>SCHOLARCRAFTED</Text>}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="lg" mt="xl">
          <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.1em' }}>SERVICES</Text>
          <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">Private Coaching</Text>
          </Link>
          <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">Editing & Proofreading</Text>
          </Link>
          <Link href="/scholarcrafted/services/research-support" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">Research Support</Text>
          </Link>

          <Divider my="sm" />

          <Link href="/scholarcrafted/how-it-works" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">How it Works</Text>
          </Link>

          <Divider my="sm" />

          <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.1em' }}>RESOURCES</Text>
          <Link href="/scholarcrafted/resources" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">Academic Blueprints</Text>
          </Link>
          <Link href="/scholarcrafted/resources/articles" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">Articles & Guides</Text>
          </Link>

          <Divider my="sm" />

          <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={600} c="dark.9" size="lg">About</Text>
          </Link>

          <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }} onClick={close}>
            <Button variant="filled" bg={active.primary} fullWidth mt="xl" size="lg" radius={0} className="impeccable-button">
              BOOK INTRO CALL
            </Button>
          </Link>
        </Stack>
      </Drawer>
"""

content = content.replace("      <style jsx global>{`", drawer_content + "\n      <style jsx global>{`")

with open("src/app/(frontend)/scholarcrafted/_components/Navbar.tsx", "w") as f:
    f.write(content)

