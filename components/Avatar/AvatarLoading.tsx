import { Box, Center, Spinner } from '@chakra-ui/react';

export function AvatarLoading() {
    return (
        <Box
          w={200}
          h={200}
          borderRadius="50%"
        >
          <Center h="100%" w="100%" backgroundColor="#e1e1e1" borderRadius="50%">
            <Spinner size="lg" color="#a3a3a3" />
          </Center>
        </Box>
      );
}
