import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";

import { Box, Link as ChakraLink, Button, Flex, useDisclosure } from '@chakra-ui/react';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';
import ShareButtonModal from './ShareButtonModal/ShareButtonModal';

/* eslint-disable react/jsx-props-no-spreading */
const LinkButton = ({ href, children, ...rest }) => (
    <NextLink href={href} passHref>
        <ChakraLink style={{textDecoration: "none"}}>
            <Button {...rest}>
                {children}
            </Button>
        </ChakraLink>
    </NextLink>
);
LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};
/* eslint-enable react/jsx-props-no-spreading */

const ManagePiggybankBar = ({ editButtonOptions, initialSetupComplete }) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [isDashboardLoading, setIsDashboardLoading] = useState();
    return (
        <Box>
            {isEditOpen && ( // this conditional is needed to force remount of form so latest values are used
                <EditPiggybankModal
                    isOpen={isEditOpen}
                    onClose={onEditClose}
                />
            )}
            <Flex
                justify="space-between"
                mt={2}
                mx={6}
                wrap="wrap"
            >
                <Box
                    mt={2}
                    onClick={() => setIsDashboardLoading(true)}
                >
                    <LinkButton
                        href="/dashboard"
                        leftIcon={<ArrowBackIcon />}
                        isLoading={isDashboardLoading}
                        loadingText="Loading"
                    >
                        Dashboard
                    </LinkButton>
                </Box>
                <Flex align="center">
                    <Box mt={2}>
                        <Button
                            leftIcon={editButtonOptions.icon}
                            onClick={onEditOpen}
                            colorScheme={editButtonOptions.color}
                            isDisabled={isEditOpen}
                        >
                            {editButtonOptions.text}
                        </Button>
                    </Box>
                    <Flex
                        align="center"
                        mt={2}
                        mx={2}
                    >
                        <ShareButtonModal
                            buttonColor={initialSetupComplete ? 'green' : undefined}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

ManagePiggybankBar.propTypes = {
    editButtonOptions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        icon: PropTypes.string.isRequired,
    }),
    initialSetupComplete: PropTypes.bool.isRequired,
};

ManagePiggybankBar.defaultProps = {
    editButtonOptions: {
        text: 'Configure',
        color: undefined,
        icon: <SettingsIcon />,
    },
};

export default ManagePiggybankBar;
