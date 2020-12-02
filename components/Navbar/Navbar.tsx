import { FunctionComponent } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../Logo/Logo';
import { ToggleColorModeButton } from '../ColorMode/ToggleColorModeButton';
import { useUser } from '../../utils/auth/useUser';

type Props = {
    isAuthOpen: boolean | null
}

export const Navbar: FunctionComponent<Props> = ({ isAuthOpen }) => {
    const { user } = useUser();
    const { pathname } = useRouter();
    return (
        <Flex
            id="navbar"
            align="center"
            justify="space-between"
            wrap="wrap"
        >
            <Logo />
            <Flex align="center">
                {user
                && pathname !== '/' // prevent flash of "Dashboard" text when logging in from landing page
                    ? (
                        <NextLink href="/dashboard">
                            <Button
                                id="dashboard-button"
                                mr={2}
                            >
                                Dashboard
                            </Button>
                        </NextLink>
                    ) : (
                        <NextLink href="/?auth=1" shallow>
                            <Button
                                id="log-in-button"
                                mr={2}
                                isDisabled={isAuthOpen}
                            >
                                Log in
                            </Button>
                        </NextLink>
                    )}
                <ToggleColorModeButton />
            </Flex>
        </Flex>
    );
};
