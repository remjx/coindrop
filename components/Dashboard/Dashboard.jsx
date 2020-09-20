import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Heading, Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';
import { mutate } from 'swr';
import Logo from '../Logo/Logo';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { CreatePiggybankContext } from '../AppContext/AppContext';

const Dashboard = () => {
    const router = useRouter();
    const { user, logout } = useUser();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState();
    const { pendingLoginCreatePiggybankPath } = useContext(CreatePiggybankContext);
    const { submitStatus } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    useDidMountEffect(() => {
        if (!user) {
            router.push('/');
        }
    });
    useEffect(() => {
        if (pendingLoginCreatePiggybankPath) {
            setCandidatePiggybankPath(pendingLoginCreatePiggybankPath);
            setIsCreateTriggered(true);
        }
    }, []);
    useEffect(() => {
        if (submitStatus === 'success' && user) {
            mutate(user.id);
        }
    }, [submitStatus]);
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
        </Box>
    );
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
