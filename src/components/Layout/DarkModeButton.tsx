import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';

interface DarkModeButtonProps {}

export const DarkModeButton = ({}: DarkModeButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <IconButton
      aria-label="Toggle dark mode"
      onClick={toggleColorMode}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      variant="ghost"
    >
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </IconButton>
  );
};
