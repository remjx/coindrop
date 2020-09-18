import { useEffect, useState } from 'react';
import { List, ListItem, Flex, Input, InputGroup, InputLeftAddon, Button, Text } from "@chakra-ui/core";
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUser } from '../../utils/auth/useUser';
import useCreatePiggybank from '../../utils/hooks/useCreatePiggybank';

const CreatePiggybankInput = () => {
    const { user } = useUser();
    const router = useRouter();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState();
    const [isCreateTriggered, setIsCreateTriggered] = useState(false);
    const { submitStatus } = useCreatePiggybank(candidatePiggybankPath, setCandidatePiggybankPath, user, isCreateTriggered, setIsCreateTriggered);
    async function handleCreateUrl(event) {
        event.preventDefault();
        const isInvalid = !candidatePiggybankPath.match(/^[a-zA-Z][\w-]{1,30}[a-zA-Z0-9]$/);
        if (isInvalid) {
            setIsCandidatePiggybankPathInvalid(true);
        } else if (user) {
            setIsCreateTriggered(true);
        } else if (router.pathname !== '/auth') {
            Cookies.set('pendingLoginCreatePiggybankPath', candidatePiggybankPath);
            router.push('/auth');
        }
    }
    return (
        <form>
            <Flex
                align="center"
                justify="center"
                mt={4}
                mb={1}
            >
                <InputGroup>
                    <InputLeftAddon>
                        coindrop.to/
                    </InputLeftAddon>
                    <Input
                        roundedLeft="0"
                        placeholder="my-piggybank-url"
                        onChange={(e) => {
                            setCandidatePiggybankPath(e.target.value);
                            setIsCandidatePiggybankPathInvalid(false);
                        }}
                        value={candidatePiggybankPath}
                        isInvalid={isCandidatePiggybankPathInvalid}
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
            </Flex>
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
};

CreatePiggybankInput.defaultProps = {

};

export default CreatePiggybankInput;
