import { useState, FunctionComponent, createRef, useEffect, MouseEventHandler } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftAddon, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { piggybankPathRegex } from '../../src/settings';
import { CoindropRequirements } from '../CoindropRequirements/CoindropRequirements';
import { CreateCoindropError } from './CreateCoindropError';
import { createPiggybank } from 'db/mutations/createPiggybank';
import {useUser} from '../../utils/auth/useUser';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const BoxMargin: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
    <Box mt={2}>
        {children}
    </Box>
);

type Props = {
    onCancel: () => void | null
}

export const CreatePiggybankInput: FunctionComponent<Props> = ({
    onCancel,
}) => {
    const router = useRouter();
    const inputRef = createRef<HTMLInputElement>();
    useEffect(() => {
            inputRef.current.focus();
    }, []);
    const { user } = useUser();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [submitError, setSubmitError] = useState('');
    async function handleCreateUrl() {
        const isInvalid = !candidatePiggybankPath.match(piggybankPathRegex);
        if (isInvalid) {
            setIsCandidatePiggybankPathInvalid(true);
        } else {
            setSubmitStatus('submitting');
            try {
                await createPiggybank(candidatePiggybankPath, user)
                setSubmitStatus('success');
                router.push(`/${candidatePiggybankPath}`);
            } catch (error) {
                setSubmitStatus('error');
                setSubmitError(error.message);
            }
        }
    }
    function onSubmit(event) {
        event.preventDefault();
        handleCreateUrl();
    }
    const inputName = `create-coindrop-input`;
    return (
        <form id={`create-coindrop-form`} onSubmit={onSubmit}>
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
                            aria-label="Enter custom URL path"
                            name={inputName}
                            id={inputName}
                            maxLength={32}
                            roundedLeft="0"
                            onChange={(e) => {
                                setSubmitError(null);
                                setSubmitStatus(null);
                                setCandidatePiggybankPath(e.target.value);
                                setIsCandidatePiggybankPathInvalid(false);
                            }}
                            value={candidatePiggybankPath}
                            isInvalid={isCandidatePiggybankPathInvalid || !!submitError}
                            ref={inputRef}
                        />
                    </InputGroup>
                </BoxMargin>
                <BoxMargin>
                    <Button
                        ml={1}
                        colorScheme="green"
                        isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting' || submitStatus === 'success'}
                        isLoading={submitStatus === 'submitting' || submitStatus === 'success'}
                        loadingText="Creating"
                        onClick={(event) => onSubmit(event)}
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
                            isDisabled={submitStatus === 'submitting' || submitStatus === 'success'}
                        >
                            Cancel
                        </Button>
                    </BoxMargin>
                )}
            </Flex>
            {submitError && (
                <CreateCoindropError
                    error={submitError}
                />
            )}
            {isCandidatePiggybankPathInvalid && (
                <CoindropRequirements />
            )}
        </form>
    );
};
