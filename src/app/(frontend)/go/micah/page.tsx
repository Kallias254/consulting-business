'use client';
import React from 'react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Badge, 
  Button, 
  Paper, 
  Divider, 
  ThemeIcon,
  Avatar,
  SimpleGrid,
  List
} from '@mantine/core';
import { 
  IconShieldCheck, 
  IconUpload, 
  IconFileText, 
  IconArrowRight,
  IconFingerprint,
  IconX
} from '@tabler/icons-react';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import Link from 'next/link';

export default function PriorityAccessPage() {
  return (
    <Box bg="dark-forest" mih="100vh" pt={160} pb={100}>
      <Container size="md">
        <Stack gap={60}>
          {/* 1. Personalized Welcome */}
          <Paper withBorder p={60} radius={0} bg="rgba(14, 29, 22, 0.4)">
            <Stack gap="xl" align="center" ta="center">
              <Avatar size={100} radius={0} src={null} color="deep-green" style={{ border: '2px solid var(--mantine-color-burnished-gold-7)' }}>MS</Avatar>
              <Box>
                <Badge variant="filled" color="burnished-gold" radius={0} mb="md">Priority Faculty Referral</Badge>
                <Title 
                  order={1} 
                  ff="var(--font-display)" 
                  c="parchment" 
                  style={{ fontSize: '2.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}
                >
                  Micah S. has recommended you for <br />
                  <Text component="span" inherit c="burnished-gold">Priority Diagnostic Support</Text>
                </Title>
                <Text c="parchment" size="md" opacity={0.7} maw={600} mt="xl" mx="auto">
                  &quot;I&apos;ve shared your project details with my team. We are ready to perform an expedited Publication Health Check on your manuscript to ensure it meets the highest scholarly standards.&quot;
                </Text>
              </Box>
            </Stack>
          </Paper>

          {/* 2. Direct Action: The Manuscript Ingestion */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            <Stack gap="xl">
              <Box>
                <Title order={3} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }}>
                  The Peer Referral Hook
                </Title>
                <Text c="parchment" size="sm" opacity={0.6} mt="md" style={{ lineHeight: 1.8 }}>
                  As a direct referral, you bypass our standard intake queue. Upload your manuscript draft (or a representative chapter) for an immediate technical audit by our lead researchers and an executive review by Micah.
                </Text>
              </Box>

              <List 
                spacing="md" 
                size="xs" 
                c="parchment" 
                center
                icon={
                  <ThemeIcon color="sage" size={20} radius={0}>
                    <IconShieldCheck size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item>Typesetting Feasibility Report</List.Item>
                <List.Item>Citation Integrity Check (BibTeX/Zotero)</List.Item>
                <List.Item>Principal Strategy Session (20 Mins)</List.Item>
              </List>

              <Button 
                component={Link}
                href="/audit"
                size="lg" 
                color="burnished-gold" 
                c="dark-forest" 
                radius={0} 
                rightSection={<IconArrowRight size={18} />}
              >
                Start Priority Diagnostic
              </Button>
            </Stack>

            <Box>
              <Paper withBorder p={0} radius={0} bg="white">
                <Box p="md" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
                  <Text ff="var(--font-body)" size="7px" fw={700} c="deep-green.7">SECURE_FILE_INGESTION_v4</Text>
                </Box>
                <Dropzone
                  onDrop={(files) => console.log('dropped files', files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={5 * 1024 ** 2}
                  accept={PDF_MIME_TYPE}
                  radius={0}
                  styles={{
                    root: { height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }
                  }}
                >
                  <Stack align="center" gap="xs" style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload size={50} color="var(--mantine-color-sage-0)" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size={50} color="var(--mantine-color-red-6)" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconFileText size={50} color="var(--mantine-color-deep-green-3)" />
                    </Dropzone.Idle>

                    <Text size="sm" inline fw={700} ta="center">
                      Drag manuscript here or click to select
                    </Text>
                    <Text size="xs" c="dimmed" inline mt={7} ta="center">
                      Secure PDF ingestion only. Max file size: 5MB
                    </Text>
                  </Stack>
                </Dropzone>
              </Paper>
              <Group justify="center" mt="md">
                <IconFingerprint size={14} color="var(--mantine-color-deep-green-3)" />
                <Text ff="var(--font-body)" size="7px" c="deep-green.3">END_TO_END_ENCRYPTION_ACTIVE</Text>
              </Group>
            </Box>
          </SimpleGrid>

          {/* 3. Social Proof / Impact */}
          <Divider color="deep-green.7" opacity={0.2} label="Institutional Success" labelPosition="center" />
          
          <SimpleGrid cols={{ base: 2, md: 4 }}>
            {[
              { label: 'Harvard', val: 'Grant Award' },
              { label: 'Oxford', val: 'Book Contract' },
              { label: 'MIT', val: 'Journal Acceptance' },
              { label: 'Stanford', val: 'Tenure Success' },
            ].map((item, i) => (
              <Box key={i} ta="center">
                <Text ff="var(--font-display)" c="parchment" size="lg">{item.label}</Text>
                <Text ff="var(--font-body)" size="7px" c="burnished-gold">{item.val}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
