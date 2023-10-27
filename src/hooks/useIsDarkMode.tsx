import { useColorMode } from '@chakra-ui/react';

interface UseIsDarkModeProps {}

export const useIsDarkMode = ({}: UseIsDarkModeProps = {}) => {
  const { colorMode } = useColorMode();

  return colorMode === 'dark';
};
