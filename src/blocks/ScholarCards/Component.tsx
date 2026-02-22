'use client';
import React from 'react';
import { Box, Container, SimpleGrid, Card, Title, Text, Button, Stack, Badge } from '@mantine/core';
import RichText from '@/components/RichText';

export type ScholarCardsProps = {
  blockType: 'scholarCards';
  cards: Array<{
    title: string;
    subtitle?: string;
    description: any;
    highlight?: boolean;
    buttonLabel?: string;
  }>;
};

export const ScholarCardsBlock: React.FC<ScholarCardsProps> = ({ cards }) => {
  return (
    <Box component="section" py={120} bg="dark-forest">
      <Container size="xl">
        <Stack gap="xl" mb={60} align="center" style={{ textAlign: 'center' }}>
          <Badge 
            variant="outline" 
            color="burnished-gold" 
            size="lg" 
            radius={0}
            ff="var(--font-body)"
            style={{ letterSpacing: '2px' }}
          >
            THE SERVICE MENU
          </Badge>
          <Title 
            order={2} 
            ff="var(--font-display)" 
            c="parchment" 
            size="3.5rem" 
            style={{ textTransform: 'uppercase', letterSpacing: '-1px' }}
          >
            Institutional <Text component="span" inherit c="burnished-gold">Service Tiers</Text>
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={32}>
          {cards.map((card, index) => (
            <Card
              key={index}
              p={40}
              bg={card.highlight ? 'white' : 'var(--mantine-color-deep-green-8)'}
              style={{
                border: card.highlight 
                  ? '1px solid var(--mantine-color-burnished-gold-7)' 
                  : '1px solid var(--mantine-color-deep-green-7)',
                position: 'relative',
              }}
            >
              {card.highlight && (
                <Box 
                  pos="absolute" 
                  top={0} 
                  left={0} 
                  right={0} 
                  h={3} 
                  bg="burnished-gold.7" 
                />
              )}

              <Stack gap="xl" h="100%">
                <Box style={{ borderBottom: `1px solid ${card.highlight ? 'var(--mantine-color-parchment-2)' : 'var(--mantine-color-deep-green-7)'}`, paddingBottom: 24 }}>
                  <Title 
                    order={3} 
                    ff="var(--font-display)" 
                    c={card.highlight ? 'deep-green.9' : 'parchment'} 
                    size="2rem"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {card.title}
                  </Title>
                  {card.subtitle && (
                    <Text ff="var(--font-body)" c="burnished-gold.7" size="sm" mt={8} style={{ letterSpacing: '1px' }}>
                      {card.subtitle}
                    </Text>
                  )}
                </Box>

                <Box style={{ flexGrow: 1 }}>
                  {card.description && (
                    <RichText 
                      data={card.description} 
                      enableGutter={false} 
                      style={{ 
                        color: card.highlight ? 'var(--mantine-color-deep-green-9)' : 'var(--mantine-color-parchment-0)', 
                        fontSize: '0.95rem',
                        opacity: card.highlight ? 0.8 : 0.6 
                      }} 
                    />
                  )}
                </Box>

                <Button
                  variant={card.highlight ? 'filled' : 'outline'}
                  color={card.highlight ? 'deep-green' : 'burnished-gold'}
                  fullWidth
                  size="md"
                  radius={0}
                  ff="var(--font-body)"
                  style={{ 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                  }}
                >
                  {card.buttonLabel || 'Select Path'}
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
