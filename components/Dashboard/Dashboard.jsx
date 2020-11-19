import { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Link, Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { QuestionIcon } from "@chakra-ui/icons";
import { mutate } from 'swr';
import { LogoutIcon, HamburgerMenuIcon, GithubIcon } from '../Icons/CustomIcons';
import Logo from '../Logo/Logo';
import { useUser } from '../../utils/auth/useUser';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';
import UserOwnedPiggybanks from './UserOwnedPiggybanks/UserOwnedPiggybanks';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { CreatePiggybankContext } from '../AppContext/AppContext';
import { githubReadmeHelpUrl } from '../../src/settings';

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
        <>
        <NextSeo
            title="Dashboard | Coindrop"
        />
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
                wrap="wrap"
            >
                <Logo />
                <Flex>
                    <Menu placement="bottom-end">
                        <MenuButton as={Button} variant="ghost">
                            <HamburgerMenuIcon />
                        </MenuButton>
                        <MenuList>
                            <Link
                                href="https://github.com/markjackson02/coindrop#coindrop-"
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration: "none"}}
                            >
                                <MenuItem>
                                        <Flex
                                            align="center"
                                        >
                                            <GithubIcon mr={2} />
                                            About
                                        </Flex>
                                </MenuItem>
                            </Link>
                            <Link
                                href={githubReadmeHelpUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration: "none"}}
                            >
                                <MenuItem>
                                        <Flex
                                            align="center"
                                        >
                                            <QuestionIcon mr={2} />
                                            Help
                                        </Flex>
                                </MenuItem>
                            </Link>
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
                </Flex>
            </Flex>
            {user?.id && (
                <UserOwnedPiggybanks
                    uid={user.id}
                />
            )}
        </Box>
        </>
    );
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
