import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box, Flex, Button, Icon, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/core';
import Logo from '../Logo/Logo';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';

const Dashboard = (props) => {
    const { initialUserOwnedPiggybanks } = props;
    const [userOwnedPiggybanks, setUserOwnedPiggybanks] = useState(initialUserOwnedPiggybanks);
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
                        <MenuButton as={Button}>
                            <Icon name="hamburgerMenu" />
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
            <Text textAlign="center">
                This is the user dashboard for
                {' '}
                {user && user.email}
            </Text>
            <CreatePiggybankInput />
        </Box>
    );
};

// Dashboard.getInitialProps = async (ctx) => {
//     console.log('ctx', ctx);
//     return {
//         initialUserOwnedPiggybanks,
//     };
// };

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
