import { FunctionComponent } from 'react';
import { Link, Icon, Flex, Button, Menu, MenuButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { AiOutlineShopping } from 'react-icons/ai';
import { LogoutIcon, HamburgerMenuIcon } from '../Icons/CustomIcons';
import Logo from '../Logo/Logo';
import { ToggleColorModeButton } from '../ColorMode/ToggleColorModeButton';
import { useUser } from '../../utils/auth/useUser';

const UserMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout } = useUser();
    return (
        <Menu placement="bottom-end">
            <MenuButton as={Button} variant="ghost">
                <HamburgerMenuIcon />
            </MenuButton>
            <MenuList>
                {/* This is an external link to ensure Ecwid scripts run on page changes */}
                {/* Should figure out a way to trigger the scripts manually within /shop */}
                <Link href="/shop" style={{textDecoration: "none"}}>
                    <MenuItem>
                        <Flex
                            align="center"
                        >
                            <Icon mr={2} as={AiOutlineShopping} />
                            Shop
                        </Flex>
                    </MenuItem>
                </Link>
                <MenuItem
                    onClick={toggleColorMode}
                >
                    <Flex
                        align="center"
                    >
                        {colorMode === 'dark' ? <SunIcon mr={2} /> : <MoonIcon mr={2} />}
                        {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
                    </Flex>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        logout();
                    }}
                >
                    <Flex
                        align="center"
                    >
                        <LogoutIcon mr={2} />
                        Log out
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const Options = () => {
    const { user } = useUser();
    if (!user) return <ToggleColorModeButton />;
    return <UserMenu />;
};

const DashboardButton: FunctionComponent = () => {
    const { user } = useUser();
    const { pathname } = useRouter();
    if (
        pathname === '/dashboard'
        || pathname === '/'
        || !user
    ) return null;
    return (
        <NextLink href="/dashboard">
            <Button
                id="dashboard-button"
                mr={2}
                colorScheme="orange"
            >
                Dashboard
            </Button>
        </NextLink>
    );
};

const LogInSignUpButton: FunctionComponent = () => {
    const { user } = useUser();
    const { pathname } = useRouter();
    if (
        user
        && pathname !== '/'
    ) return null;
    return (
        <NextLink href="/?auth=1" shallow>
            <Button
                id="log-in-button"
                mr={2}
                colorScheme={pathname === '/' ? undefined : "orange"}
            >
                Log in / Sign up
            </Button>
        </NextLink>
    );
};

export const Navbar: FunctionComponent = () => {
    const childFlexMx = ["auto", null, "initial"];
    return (
        <Flex
            id="navbar"
            align="center"
            justify="space-between"
            wrap="wrap"
        >
            <Flex mx={childFlexMx}>
                <NextLink href="/">
                    <Button variant="link">
                        <Logo />
                    </Button>
                </NextLink>
            </Flex>
            <Flex align="center" mx={childFlexMx}>
                <DashboardButton />
                <LogInSignUpButton />
                <Options />
            </Flex>
        </Flex>
    );
};
