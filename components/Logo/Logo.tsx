import { FC } from 'react';
import { Box, Flex, Text, useTheme, useColorModeValue, IconProps, useColorMode } from '@chakra-ui/react';
import { PiggyLogoIcon, PiggyLogoIconDarkMode } from "../Icons/CustomIcons";

export const PiggyLogo: FC<IconProps> = (iconProps) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const logoOutlineColor = useColorModeValue(theme.colors.gray['800'], theme.colors.gray['900']);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return colorMode === 'light'
        ? <PiggyLogoIcon color={logoOutlineColor} {...iconProps} />
        : <PiggyLogoIconDarkMode color={logoOutlineColor} {...iconProps} />;
};

type Props = {
    text?: string
    subtitle?: string
}

const Logo: FC<Props> = ({ text = 'coindrop', subtitle }) => {
    const theme = useTheme();
    const fontColor = useColorModeValue(theme.colors.gray['600'], theme.colors.gray['50']);
    const LogoText = () => (
        <Text
            fontSize={["4xl", "5xl"]}
            fontFamily="Changa, system-ui, sans-serif"
            fontWeight={500}
            color={fontColor}
            ml={2}
            lineHeight={["1.5rem", "2.5rem"]}
        >
            {text}
        </Text>
    );
    return (
        <Flex
            ml={1}
            mr={2}
            mb={[2, 0]}
            align="center"
        >
            <PiggyLogo boxSize={["48px", "64px"]} />
            <Box>
                <LogoText />
                {subtitle && (
                    <Text textAlign="center">
                        {subtitle}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default Logo;
