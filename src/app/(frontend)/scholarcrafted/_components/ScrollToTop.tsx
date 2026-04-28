'use client'

import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition, rem } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Transition transition="slide-up" mounted={scroll.y > 400}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            color="dark"
            radius="xl"
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
