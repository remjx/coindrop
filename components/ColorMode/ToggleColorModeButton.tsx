import { Button, useColorMode, ButtonProps } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FC } from 'react';

export const ToggleColorModeButton: FC<ButtonProps> = (buttonProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={toggleColorMode}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...buttonProps}
        >
            {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};
