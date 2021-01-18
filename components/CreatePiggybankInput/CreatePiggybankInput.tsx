import { useState, FunctionComponent, createRef, useEffect } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftAddon, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { useUser } from '../../utils/auth/useUser';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { piggybankPathRegex } from '../../src/settings';
import { CoindropRequirements } from '../CoindropRequirements/CoindropRequirements';
import { CreateCoindropError } from './CreateCoindropError';

const BoxMargin: FunctionComponent = ({ children }) => (
    <Box mt={2}>
        {children}
    </Box>
);

type Props = {
    onCancel: () => void | null
    createButtonColorScheme: "orange" | "green"
    instanceId: string
    buttonText: string
    placeholder: string
}

export const CreatePiggybankInput: FunctionComponent<Props> = ({
    buttonText,
    instanceId,
    onCancel,
    createButtonColorScheme,
    placeholder,
}) => {
    const { user } = useUser();
    const router = useRouter();
    const inputRef = createRef<HTMLInputElement>();
    useEffect(() => {
        if (router.pathname === '/dashboard') {
            inputRef.current.focus();
        }
    }, []);
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState(false);
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const { submitStatus, error, setError } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
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
    const inputName = `create-coindrop-input-${instanceId}`;
    return (
        <form id={`create-coindrop-form-${instanceId}`} onSubmit={onSubmit}>
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
                            placeholder={placeholder}
                            onChange={(e) => {
                                setError(null);
                                setCandidatePiggybankPath(e.target.value);
                                setIsCandidatePiggybankPathInvalid(false);
                            }}
                            value={candidatePiggybankPath}
                            isInvalid={isCandidatePiggybankPathInvalid || !!error}
                            ref={inputRef}
                        />
                    </InputGroup>
                </BoxMargin>
                <BoxMargin>
                    <Button
                        ml={1}
                        colorScheme={createButtonColorScheme}
                        isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting' || submitStatus === 'success'}
                        isLoading={submitStatus === 'submitting' || submitStatus === 'success'}
                        loadingText="Creating"
                        onClick={onSubmit}
                        type="submit"
                    >
                        {buttonText}
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
                <CreateCoindropError
                    error={error}
                />
            )}
            {isCandidatePiggybankPathInvalid && (
                <CoindropRequirements />
            )}
        </form>
    );
};
