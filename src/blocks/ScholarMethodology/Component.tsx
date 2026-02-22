'use client';
import React from 'react';
import { Box, Container, SimpleGrid, Title, Text, Stack, Badge } from '@mantine/core';

export type ScholarMethodologyProps = {
  blockType: 'scholarMethodology';
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export const ScholarMethodologyBlock: React.FC<ScholarMethodologyProps> = ({ steps }) => {
  return (
    <Box component="section" py={120} bg="dark-forest" pos="relative">
      <Container size="xl">
        <Stack gap="xl" mb={60}>
          <Badge 
            variant="outline" 
            color="burnished-gold" 
            size="lg" 
            radius={0}
            ff="var(--font-body)"
            style={{ letterSpacing: '2px', width: 'fit-content' }}
          >
            THE MACHINERY
          </Badge>
          <Title 
            order={2} 
            ff="var(--font-display)" 
            c="parchment" 
            size="3.5rem" 
            style={{ textTransform: 'uppercase', letterSpacing: '-1px' }}
          >
            Workflow <Text component="span" inherit c="burnished-gold">Architecture</Text>
          </Title>
        </Stack>

        <Box style={{ border: '1px solid var(--mantine-color-deep-green-7)', background: 'var(--mantine-color-deep-green-8)' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={0}>
            {steps.map((step, index) => (
              <Box 
                key={index}
                p={48}
                style={{
                  borderRight: index < steps.length - 1 ? '1px solid var(--mantine-color-deep-green-7)' : 'none',
                  borderBottom: { base: index < steps.length - 1 ? '1px solid var(--mantine-color-deep-green-7)' : 'none', md: 'none' },
                  position: 'relative'
                }}
              >
                <Text 
                  pos="absolute" 
                  top={20} 
                  right={20} 
                  ff="var(--font-display)" 
                  size="4.5rem" 
                  c="burnished-gold" 
                  opacity={0.05}
                  style={{ lineHeight: 1 }}
                >
                  0{index + 1}
                </Text>
                
                <Text 
                  ff="var(--font-body)" 
                  c="burnished-gold" 
                  size="sm" 
                  mb={16} 
                  style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  {step.title}
                </Text>
                
                <Text c="parchment" size="sm" style={{ opacity: 0.7, lineHeight: 1.6 }}>
                  {step.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
