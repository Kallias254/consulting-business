'use client'
import React from 'react'
import {
  Card,
  Text,
  Badge,
  Group,
  Title,
  Button,
  RingProgress,
  Stack,
  Box,
} from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

// This would come from your database/API
export type ProjectSummary = {
  id: string
  name: string
  tagline: string
  status: string
  readiness: number
}

interface ProjectCardProps {
  project: ProjectSummary
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      component={Link}
      href={`/dashboard/${project.id}`}
      withBorder
      p={{ base: 'xl', md: 40 }}
      radius={0}
      bg="white"
      style={{
        borderColor: '#E0DBCC',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="project-card-link" // Add a class for hover effects
    >
      <Stack justify="space-between" style={{ height: '100%' }}>
        <Box>
          <Group justify="space-between" align="flex-start">
            <Badge
              variant="filled"
              color="burnished-gold"
              size="xs"
              radius={0}
            >
              {project.status}
            </Badge>
            <RingProgress
              size={60}
              thickness={4}
              roundCaps
              label={
                <Text size="xs" ta="center" fw={700} c="#0A140F">
                  {project.readiness}%
                </Text>
              }
              sections={[{ value: project.readiness, color: 'deep-green.7' }]}
            />
          </Group>
          <Title
            order={3}
            ff="var(--font-display)"
            size="2rem"
            mt={40}
            style={{ textTransform: 'uppercase', lineHeight: 1.2, color: '#0A140F' }}
          >
            {project.name}
          </Title>
          <Text size="sm" c="#4A4D51" mt="xs" style={{ lineHeight: 1.7 }}>
            {project.tagline}
          </Text>
        </Box>
        <Button
          component="div" // To prevent nested links, but still look like a button
          variant="filled"
          color="deep-green.7"
          radius={0}
          rightSection={<IconArrowRight size={16} />}
          size="md"
          mt="xl"
        >
          View Project
        </Button>
      </Stack>
    </Card>
  )
}
