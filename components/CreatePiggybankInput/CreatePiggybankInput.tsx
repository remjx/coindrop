import { useState, FunctionComponent } from 'react';
import { Box, List, ListItem, Flex, Input, InputGroup, InputLeftAddon, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { useUser } from '../../utils/auth/useUser';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { piggybankPathRegex } from '../../src/settings';

const BoxMargin: FunctionComponent = ({ children }) => (
    <Box mt={2}>
        {children}
    </Box>
);

type Props = {
    onCancel: () => void | null
    createButtonColorScheme: "orange" | "green"
}

export const CreatePiggybankInput: FunctionComponent<Props> = ({ onCancel, createButtonColorScheme }) => {
    const { user } = useUser();
    const router = useRouter();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState(false);
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const { submitStatus, error, setError } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    const errorTextColor = useColorModeValue("red.500", "red.300");
    async function handleCreateUrl() {
        const isInvalid = !candidatePiggybankPath.match(piggybankPathRegex);
        if (isInvalid) {
            setIsCandidatePiggybankPathInvalid(true);
        } else if (user) {
            setIsCreateTriggered(true);
        } else if (router.pathname === '/') {
            cookies.set('pendingLoginCreatePiggybankPath', candidatePiggybankPath);
            router.push('/?auth=1', undefined, { shallow: true });
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
                            maxLength={32}
                            roundedLeft="0"
                            placeholder="your-name"
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
                        isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting'}
                        isLoading={submitStatus === 'submitting'}
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
                <Text mt={2} textAlign="center" color={errorTextColor}>
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
