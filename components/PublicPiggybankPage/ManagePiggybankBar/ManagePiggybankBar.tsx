/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, useState } from 'react';
import NextLink from 'next/link';
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Link as ChakraLink, Button, Flex, useDisclosure, ButtonProps } from '@chakra-ui/react';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';
import ShareButtonModal from './ShareButtonModal/ShareButtonModal';
import { AdditionalValidationProvider } from '../EditPiggybankModal/AdditionalValidationContext';
import { UserMenu } from '../../Navbar/Navbar';

type LinkButtonProps = {
    href: string
    buttonProps: ButtonProps
    children: React.ReactNode
}
const LinkButton: FunctionComponent<LinkButtonProps> = ({ href, children, buttonProps }) => (
    <NextLink href={href} passHref>
        <ChakraLink style={{textDecoration: "none"}}>
            <Button {...buttonProps}>
                {children}
            </Button>
        </ChakraLink>
    </NextLink>
);

type Props = {
    editButtonOptions: {
        text: string
        color: string
        icon: JSX.Element
    },
    initialSetupComplete: boolean
}

const ManagePiggybankBar: FunctionComponent<Props> = ({ editButtonOptions, initialSetupComplete }) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);
    return (
        <Box>
            {isEditOpen && ( // this conditional is needed to force remount of form so latest values are used
                <AdditionalValidationProvider>
                    <EditPiggybankModal
                        isOpen={isEditOpen}
                        onClose={onEditClose}
                    />
                </AdditionalValidationProvider>
            )}
            <Flex
                justify={["center", null, "space-between"]}
                my={4}
                mx={6}
                wrap="wrap"
            >
                <Box
                    onClick={() => setIsDashboardLoading(true)}
                    mt={2}
                >
                    <LinkButton
                        href="/dashboard"
                        buttonProps={{
                            leftIcon: <ArrowBackIcon />,
                            isLoading: isDashboardLoading,
                            loadingText: "Loading",
                        }}
                    >
                        My Coindrops
                    </LinkButton>
                </Box>
                <Flex mx={3} mt={2} gap={4}>
                    <Button
                        id="configure-coindrop-button"
                        leftIcon={editButtonOptions.icon}
                        onClick={onEditOpen}
                        colorScheme={editButtonOptions.color}
                        isDisabled={isEditOpen}
                    >
                        {editButtonOptions.text}
                    </Button>
                    <ShareButtonModal
                        buttonColor={initialSetupComplete ? 'green' : undefined}
                    />
                </Flex>
                <Box
                    alignItems="center"
                    alignContent="center"
                    mt={2}
                >
                    <UserMenu />
                </Box>
            </Flex>
            <hr />
        </Box>
    );
};

export default ManagePiggybankBar;
