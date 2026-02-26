'use client';
import React from 'react';
import { Container, Title, Text, Box, Stack } from '@mantine/core';

export default function ProjectOverviewPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const projectIdFormatted = projectId.replace(/-/g, ' ').toUpperCase();

  return (
    <Container size="xl" my="xl">
      <Stack gap="lg">
        <Box mt="md">
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Project Overview: <Text component="span" inherit c="burnished-gold.7">{projectIdFormatted}</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            This is the overview page for the project: {projectIdFormatted}.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
