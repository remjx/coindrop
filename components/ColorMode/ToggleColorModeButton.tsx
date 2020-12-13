import { Button, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FunctionComponent } from 'react';

export const ToggleColorModeButton: FunctionComponent = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={toggleColorMode}
            variant="ghost"
        >
            {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};
