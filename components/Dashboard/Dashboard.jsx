import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Heading, Box, Flex, Button, Icon, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/core';
import Logo from '../Logo2/Logo';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';
import UserOwnedPiggybanks from './UserOwnedPiggybanks';

const Dashboard = () => {
    const router = useRouter();
    const { user, logout } = useUser();
    console.log('user', user)
    useDidMountEffect(() => {
        if (!user) {
            router.push('/');
        }
    });
    if (!user) return null;
    return (
        <Box
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
        >
            <Flex
                id="navbar"
                align="center"
                justify="space-between"
            >
                <Logo />
                <Flex>
                    <Menu>
                        <MenuButton as={Button} rightIcon="chevron-down">
                            {user?.email ?? 'Menu'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>About</MenuItem>
                            <MenuItem>Github</MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            {user?.id && (
                <UserOwnedPiggybanks
                    uid={user.id}
                />
            )}
            <Heading textAlign="center">
                Create New Piggybank
            </Heading>
            <CreatePiggybankInput />
        </Box>
    );
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
