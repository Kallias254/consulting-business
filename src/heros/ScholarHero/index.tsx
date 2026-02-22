'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Box, Container, Title, Text, Button, Group, Stack, Badge, Grid } from '@mantine/core';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';

export const ScholarHero: React.FC<Page['hero']> = ({ links, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  return (
    <Box 
      component="section" 
      pos="relative" 
      bg="dark-forest" 
      mih="90vh" 
      display="flex" 
      style={{ 
        alignItems: 'center', 
        overflow: 'hidden',
        borderBottom: '1px solid var(--mantine-color-deep-green-3)',
      }}
    >
      {/* Background Decorative Element: The "Lab" Vibe */}
      <Box
        pos="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        opacity={0.05}
        style={{
          backgroundImage: `
            linear-gradient(var(--mantine-color-deep-green-3) 1px, transparent 1px),
            linear-gradient(90deg, var(--mantine-color-deep-green-3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" w="100%" pos="relative" style={{ zIndex: 1 }}>
        <Grid gutter={80} align="center">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <Badge 
                variant="outline" 
                color="burnished-gold" 
                size="lg" 
                radius={0}
                ff="var(--font-body)"
                style={{ letterSpacing: '2px', border: '1px solid var(--mantine-color-burnished-gold-0)' }}
              >
                FACULTY-LED // CODE-FIRST
              </Badge>

              <Title 
                order={1} 
                ff="var(--font-display)" 
                c="parchment" 
                style={{ 
                  fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  letterSpacing: '-2px',
                }}
              >
                PUBLICATION <br />
                <Text component="span" inherit c="burnished-gold">SUCCESS</Text>
              </Title>

              {richText && (
                <Box maw={540}>
                  <RichText 
                    data={richText} 
                    enableGutter={false} 
                    style={{ 
                      color: 'var(--mantine-color-parchment-0)', 
                      fontSize: '1.2rem',
                      opacity: 0.8,
                      lineHeight: 1.6
                    }} 
                  />
                </Box>
              )}

              <Group gap="md">
                {Array.isArray(links) && links.map(({ link }, i) => (
                  <CMSLink 
                    key={i} 
                    {...link} 
                    className="" // We'll style it via CMSLink if it supports it, or wrap it
                  />
                ))}
                {!links && (
                   <Button 
                     component={Link}
                     href="/audit"
                     size="xl" 
                     bg="burnished-gold" 
                     c="dark-forest" 
                     radius={0}
                     ff="var(--font-body)"
                     style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                   >
                     REQUEST PUBLICATION AUDIT
                   </Button>
                )}
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }} visibleFrom="md">
            {/* The Engine Section: Visualizing the Word-to-Typst pipeline */}
            <Box 
              p="xl" 
              style={{ 
                border: '1px solid var(--mantine-color-deep-green-7)',
                background: 'var(--mantine-color-deep-green-9)',
                position: 'relative'
              }}
            >
              <Box 
                pos="absolute" 
                top={-1} 
                left={-1} 
                w={40} 
                h={40} 
                style={{ borderTop: '2px solid var(--mantine-color-burnished-gold-7)', borderLeft: '2px solid var(--mantine-color-burnished-gold-7)' }} 
              />
              
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text ff="var(--font-body)" size="xs" c="deep-green.3">PIPELINE_STATUS: ACTIVE</Text>
                  <Text ff="var(--font-body)" size="xs" c="deep-green.3">v2.0.4</Text>
                </Group>
                
                <Box h={1} bg="deep-green.7" />
                
                <Stack gap={4} mt="md">
                  <Text ff="var(--font-body)" size="7px" c="burnished-gold.7" style={{ letterSpacing: '1px' }}>01_INGESTION</Text>
                  <Box h={6} bg="deep-green.8" />
                </Stack>
                
                <Stack gap={4}>
                  <Text ff="var(--font-body)" size="7px" c="burnished-gold.7" style={{ letterSpacing: '1px' }}>02_TYPESETTING</Text>
                  <Box h={6} bg="deep-green.8" w="70%" />
                </Stack>
                
                <Stack gap={4}>
                  <Text ff="var(--font-body)" size="7px" c="burnished-gold.7" style={{ letterSpacing: '1px' }}>03_VERIFICATION</Text>
                  <Box h={6} bg="deep-green.8" w="40%" />
                </Stack>

                <Box mt="xl" p="md" style={{ border: '1px dashed var(--mantine-color-deep-green-7)', background: 'black' }}>
                  <Text ff="var(--font-body)" size="xs" c="parchment" opacity={0.5}>
                    $&gt; typst compile --root . manuscript.typ <br />
                    $&gt; output generated: 2.4s <br />
                    $&gt; status: SUCCESS
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Technical Metadata Footer */}
      <Box 
        pos="absolute" 
        bottom={20} 
        left={0} 
        right={0}
      >
        <Container size="xl">
          <Group justify="space-between">
            <Text ff="var(--font-body)" size="xs" c="deep-green.3" style={{ letterSpacing: '2px' }}>
              LATENCY: 24MS // ENCRYPTION: AES-256
            </Text>
            <Text ff="var(--font-body)" size="xs" c="deep-green.3" style={{ letterSpacing: '2px' }}>
              PROD_ENV_ALPHA_01
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
};
