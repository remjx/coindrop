import { useState, useContext } from 'react';
import { Box, List, ListItem, Flex, Input, InputGroup, InputLeftAddon, Button, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/useUser';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { CreatePiggybankContext } from '../AppContext/AppContext';
import { piggybankPathRegex } from '../../src/settings';

const BoxMargin = ({ children }) => (
    <Box mt={2}>
        {children}
    </Box>
);
BoxMargin.propTypes = {
    children: PropTypes.element.isRequired,
};

const CreatePiggybankInput = ({ onCancel, createButtonColorScheme }) => {
    const { user } = useUser();
    const router = useRouter();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const { setPendingLoginCreatePiggybankPath } = useContext(CreatePiggybankContext);
    const { submitStatus, error, setError } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    async function handleCreateUrl() {
        const isInvalid = !candidatePiggybankPath.match(piggybankPathRegex);
        if (isInvalid) {
            setIsCandidatePiggybankPathInvalid(true);
        } else if (user) {
            setIsCreateTriggered(true);
        } else if (router.pathname !== '/auth') {
            setPendingLoginCreatePiggybankPath(candidatePiggybankPath);
            router.push('/auth');
        }
    }
    function onSubmit(event) {
        event.preventDefault();
        handleCreateUrl();
    }
    const inputName = "create-coindrop-input";
    return (
        <form id="create-coindrop-form" onSubmit={onSubmit}>
            <Flex
                align="center"
                justify="center"
                wrap="wrap"
            >
                <BoxMargin>
                    <InputGroup>
                        <InputLeftAddon>
                            coindrop.to/
                        </InputLeftAddon>
                        <Input
                            name={inputName}
                            id={inputName}
                            maxLength="32"
                            roundedLeft="0"
                            placeholder="my-custom-url"
                            onChange={(e) => {
                                setError(null);
                                setCandidatePiggybankPath(e.target.value);
                                setIsCandidatePiggybankPathInvalid(false);
                            }}
                            value={candidatePiggybankPath}
                            isInvalid={isCandidatePiggybankPathInvalid || !!error}
                        />
                    </InputGroup>
                </BoxMargin>
                <BoxMargin>
                    <Button
                        ml={1}
                        colorScheme={createButtonColorScheme}
                        isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting' || router.pathname === '/auth'}
                        isLoading={submitStatus === 'submitting' || router.pathname === '/auth'}
                        loadingText="Creating"
                        onClick={onSubmit}
                        type="submit"
                    >
                        Create
                    </Button>
                </BoxMargin>
                {onCancel && (
                    <BoxMargin>
                        <Button
                            onClick={onCancel}
                            ml={1}
                        >
                            Cancel
                        </Button>
                    </BoxMargin>
                )}
            </Flex>
            {error && (
                <Text textAlign="center" color="red.500">
                    {error}
                </Text>
            )}
            {isCandidatePiggybankPathInvalid && (
                <Text
                    textAlign="center"
                >
                    Your URL is required to:
                    <Text>
                        <List styleType="disc">
                            <ListItem>Start with a letter</ListItem>
                            <ListItem>Only include lowercase letters, numbers, -, and _</ListItem>
                            <ListItem>End with a letter or number</ListItem>
                            <ListItem>Have maximum length of 32 characters</ListItem>
                        </List>
                    </Text>
                </Text>
            )}
        </form>
    );
};

CreatePiggybankInput.propTypes = {
    onCancel: PropTypes.func,
    createButtonColorScheme: PropTypes.string,
};

CreatePiggybankInput.defaultProps = {
    onCancel: null,
    createButtonColorScheme: "orange",
};

export default CreatePiggybankInput;
