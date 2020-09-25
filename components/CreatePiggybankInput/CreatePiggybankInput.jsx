import { useEffect, useState, useContext } from 'react';
import { List, ListItem, Flex, Input, InputGroup, InputLeftAddon, Button, Text } from "@chakra-ui/core";
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/useUser';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';
import { CreatePiggybankContext } from '../AppContext/AppContext';
import { piggybankPathRegex } from '../../src/settings';

const CreatePiggybankInput = ({ setShowInput }) => {
    const { user } = useUser();
    const router = useRouter();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const { setPendingLoginCreatePiggybankPath } = useContext(CreatePiggybankContext);
    const { submitStatus, error, setError } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    async function handleCreateUrl(event) {
        event.preventDefault();
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
    return (
        <form>
            <Flex
                align="center"
                justify="center"
            >
                <InputGroup>
                    <InputLeftAddon>
                        coindrop.to/
                    </InputLeftAddon>
                    <Input
                        maxLength="32"
                        roundedLeft="0"
                        placeholder="my-piggybank-url"
                        onChange={(e) => {
                            setError(null);
                            setCandidatePiggybankPath(e.target.value);
                            setIsCandidatePiggybankPathInvalid(false);
                        }}
                        value={candidatePiggybankPath}
                        isInvalid={isCandidatePiggybankPathInvalid || !!error}
                    />
                </InputGroup>
                <Button
                    ml={1}
                    variantColor="orange"
                    isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting' || router.pathname === '/auth'}
                    isLoading={submitStatus === 'submitting' || router.pathname === '/auth'}
                    loadingText="Creating"
                    onClick={handleCreateUrl}
                    type="submit"
                >
                    Create
                </Button>
                <Button
                    onClick={() => setShowInput(false)}
                    ml={1}
                >
                    Cancel
                </Button>
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
                            <ListItem>Only include letters, numbers, -, and _</ListItem>
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
    setShowInput: PropTypes.func.isRequired,
};

CreatePiggybankInput.defaultProps = {

};

export default CreatePiggybankInput;
