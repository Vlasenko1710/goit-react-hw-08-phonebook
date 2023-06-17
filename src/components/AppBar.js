import { useAuth } from 'hooks/useAuth';
import { Navigation } from 'components/Navigation';
import { AuthNav } from 'components/AuthNav';
import { UserMenu } from 'components/UserMenu';
import { Flex, Box } from '@chakra-ui/react';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header>
      <Box py="15px" position="relative">
        <Flex align="center" justify="space-between" gap="150px">
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Flex>
      </Box>
    </header>
  );
};
