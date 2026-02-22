'use client';
import React from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  ActionIcon, 
  Box, 
  Button, 
  ScrollArea,
  Divider,
  Center
} from '@mantine/core';
import { 
  IconDownload, 
  IconPrinter, 
  IconMessageCircle, 
  IconArrowLeft,
  IconZoomIn,
  IconZoomOut,
  IconLayoutColumns,
  IconCertificate
} from '@tabler/icons-react';
import Link from 'next/link';

export default function GalleryProofPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* 1. Review Header */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Button 
              component={Link} 
              href="/dashboard/vault" 
              variant="subtle" 
              color="dimmed" 
              leftSection={<IconArrowLeft size={16} />} 
              p={0} 
              mb="md"
            >
              Back to Vault
            </Button>
            <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
              Gallery <Text component="span" inherit c="burnished-gold.7">Proof</Text>
            </Title>
            <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
              Executive Draft // Publisher Mold: ROUTLEDGE_ACADEMIC_v2 // Version: 4.0.2
            </Text>
          </Box>
          <Group gap="md">
            <Button color="deep-green" radius={0} leftSection={<IconCertificate size={18} />}>
              Approve for Submission
            </Button>
            <Button variant="outline" color="deep-green" radius={0} leftSection={<IconMessageCircle size={18} />}>
              Request Revision
            </Button>
          </Group>
        </Group>

        {/* 2. PDF Toolbar */}
        <Paper withBorder p="xs" radius={0} bg="parchment.0">
          <Group justify="space-between">
            <Group gap="xs">
              <ActionIcon variant="subtle" color="deep-green"><IconZoomIn size={18} /></ActionIcon>
              <ActionIcon variant="subtle" color="deep-green"><IconZoomOut size={18} /></ActionIcon>
              <Divider orientation="vertical" h={20} />
              <ActionIcon variant="subtle" color="deep-green"><IconLayoutColumns size={18} /></ActionIcon>
            </Group>
            <Group gap="md">
              <Text ff="var(--font-body)" size="7px" c="dimmed">PAGE_01_OF_48</Text>
              <ActionIcon variant="subtle" color="deep-green"><IconPrinter size={18} /></ActionIcon>
              <ActionIcon variant="subtle" color="deep-green"><IconDownload size={18} /></ActionIcon>
            </Group>
          </Group>
        </Paper>

        {/* 3. The Proof Canvas */}
        <ScrollArea h={800} bg="rgba(0,0,0,0.05)" p={60} style={{ border: '1px solid var(--mantine-color-parchment-2)' }}>
          <Center>
            <Paper 
              shadow="xl" 
              radius={0} 
              p={80} 
              w={700} 
              mih={1000} 
              bg="white" 
              style={{ 
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
              }}
            >
              {/* Institutional Watermark */}
              <Box 
                pos="absolute" 
                top="50%" 
                left="50%" 
                style={{ 
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  textAlign: 'center',
                  opacity: 0.05
                }}
              >
                <Title ff="var(--font-display)" size="5rem" c="deep-green.9">CONFIDENTIAL</Title>
                <Text ff="var(--font-body)" size="1.5rem" c="deep-green.9">EXECUTIVE_REVIEW_DRAFT</Text>
              </Box>

              <Stack gap="xl">
                <Box ta="center" mb={40}>
                  <Text ff="var(--font-body)" size="xs" c="dimmed" mb="xl">PRE-PUBLICATION PROOF // DO NOT DISTRIBUTE</Text>
                  <Title order={1} style={{ fontSize: '2.2rem', color: 'black' }}>
                    Impact of Digital Spaces on Youth Development: A Longitudinal Analysis
                  </Title>
                  <Text mt="lg" size="sm" fw={700}>Dr. Emily Chen</Text>
                  <Text size="xs" c="dimmed">Department of Behavioral Economics, Yale University</Text>
                </Box>
                
                <Divider color="gray.2" />
                
                <Title order={3} size="1.2rem" style={{ color: 'black' }}>Abstract</Title>
                <Text size="sm" style={{ color: '#333', lineHeight: 2, textAlign: 'justify' }}>
                  The rapid expansion of digital environments has fundamentally altered the social landscape for youth. This paper examines the longitudinal effects of high-immersion digital interactions on neuro-cognitive decision-making paradigms. Using a combination of qualitative and quantitative measures, we track decision-making processes across a 12-month study involving 1,240 participants. Preliminary data suggests a significant correlation between immersion depth and variance in social signaling response times.
                </Text>

                <Title order={3} size="1.2rem" style={{ color: 'black' }}>1. Introduction</Title>
                <Text size="sm" style={{ color: '#333', lineHeight: 2, textAlign: 'justify' }}>
                  Traditional sociological models of youth interaction often fail to account for the velocity and scale of digital-native social architectures. Our research bridges the gap between classic longitudinal study designs and the modern requirement for real-time data ingestion. By treating the manuscript generation as a code-first pipeline, we ensure that the methodological integrity remains intact from data collection to typeset output.
                </Text>

                <Box p="xl" mt="xl" bg="parchment.0" style={{ border: '1px solid #eee' }}>
                  <Text size="7px" ff="var(--font-body)" c="dimmed" mb="md" ta="center">TABLE 1.1: METHODOLOGICAL PARAMETERS</Text>
                  <Box style={{ border: '1px solid #ddd' }}>
                    <Group grow p="xs" bg="white" style={{ borderBottom: '1px solid #ddd' }}>
                      <Text size="xs" fw={700}>Parameter</Text>
                      <Text size="xs" fw={700}>Value</Text>
                    </Group>
                    <Group grow p="xs">
                      <Text size="xs">Sample Size (N)</Text>
                      <Text size="xs">1,240</Text>
                    </Group>
                    <Group grow p="xs" bg="parchment.0">
                      <Text size="xs">Confidence Interval</Text>
                      <Text size="xs">95%</Text>
                    </Group>
                  </Box>
                </Box>
              </Stack>

              {/* Footnote Metadata */}
              <Box pos="absolute" bottom={40} left={80} right={80}>
                <Divider color="gray.2" mb="xs" />
                <Group justify="space-between">
                  <Text size="7px" ff="var(--font-body)" c="dimmed">VERIFIED BY PRINCIPAL_ID: MICAH_S_77</Text>
                  <Text size="7px" ff="var(--font-body)" c="dimmed">PAGE_01_OF_48</Text>
                </Group>
              </Box>
            </Paper>
          </Center>
        </ScrollArea>
      </Stack>
    </Container>
  );
}
