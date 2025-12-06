import { FC } from 'react';
import { Link, Icon, Flex, Button, Menu, MenuButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { SunIcon, MoonIcon, SettingsIcon } from "@chakra-ui/icons";
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { LogoutIcon, HamburgerMenuIcon } from '../Icons/CustomIcons';
import Logo from '../Logo/Logo';
import { ToggleColorModeButton } from '../ColorMode/ToggleColorModeButton';
import { useUser } from '../../utils/auth/useUser';

export function UserMenu() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout } = useUser();
    const router = useRouter();
    return (
        <Menu placement="bottom-end">
            <MenuButton as={Button}>
                <HamburgerMenuIcon />
            </MenuButton>
            <MenuList>
                {router.pathname !== '/dashboard' && (
                    <NextLink href="/dashboard">
                        <MenuItem>
                            <Flex
                                align="center"
                            >
                                <Icon mr={2} as={AiOutlineUnorderedList} />
                                My Coindrops
                            </Flex>
                        </MenuItem>
                    </NextLink>
                )}
                {/* {router.pathname !== '/shop' && (
                    <Link href="/shop" style={{textDecoration: "none"}}>
                        <MenuItem>
                            <Flex
                                align="center"
                            >
                                <Icon mr={2} as={CgShoppingCart} />
                                Shop
                            </Flex>
                        </MenuItem>
                    </Link>
                )} */}
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
                {router.pathname !== '/account' && (
                    <NextLink href="/account">
                        <MenuItem>
                            <Flex
                                align="center"
                            >
                                <SettingsIcon mr={2} />
                                Settings
                            </Flex>
                        </MenuItem>
                    </NextLink>
                )}
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
}

function Options() {
    const { user } = useUser();
    if (!user) return <ToggleColorModeButton />;
    return <UserMenu />;
}

const DashboardButton: FC = () => {
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

const LogInSignUpButton: FC = () => {
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
                colorScheme={pathname === '/' ? "green" : "orange"}
            >
                Log in / Sign up
            </Button>
        </NextLink>
    );
};

type Props = {
    logoSubtitle?: string
}
export const Navbar: FC<Props> = ({ logoSubtitle }) => {
    const childFlexMx = ["auto", null, "initial"];
    return (
        <Flex
            my={2}
            id="navbar"
            align="center"
            justify="space-between"
            wrap="wrap"
        >
            <Flex mx={childFlexMx}>
                <Logo
                    subtitle={logoSubtitle}
                />
            </Flex>
            <Flex align="center" mx={childFlexMx}>
                <DashboardButton />
                <LogInSignUpButton />
                <Options />
            </Flex>
        </Flex>
    );
};
