import React, { useEffect, useState } from 'react';
import { List, ListItem, Flex, Input, InputGroup, InputLeftAddon, Button, Text } from "@chakra-ui/core";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/useUser';

const CreatePiggybankInput = (props) => {
    const { updatePiggybankList } = props;
    const { user } = useUser();
    const router = useRouter();
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    const [isCandidatePiggybankPathInvalid, setIsCandidatePiggybankPathInvalid] = useState();
    const [isAwaitingLoginToSubmit, setIsAwaitingLoginToSubmit] = useState();
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, error
    async function submitUrl() { // TODO: make real
        setSubmitStatus('submitting');
        const data = {
            piggybankName: candidatePiggybankPath,
        };
        const headers = {
            token: user.token,
        };
        try {
            await axios.post('/api/updatePiggybank', data, { headers });
            // TODO: test this function
            updatePiggybankList();
            setSubmitStatus('success');
        } catch (error) {
            setSubmitStatus('error');
        }
    }
    const handleCreateUrl = () => {
        const isInvalid = !candidatePiggybankPath.match(/^[a-zA-Z][\w-]{1,30}[a-zA-Z0-9]$/);
        if (isInvalid) {
            setIsCandidatePiggybankPathInvalid(true);
        } else if (user) {
            submitUrl();
        } else {
            setIsAwaitingLoginToSubmit(true);
            if (router.pathname !== '/auth') {
                router.push('/auth');
            }
        }
    };
    useEffect(() => { // does this unnecessarily cause LandingPage to render before router.push()?
        if (user && !isAwaitingLoginToSubmit && router.pathname !== '/dashboard') {
            router.push('/dashboard');
        }
    });
    useEffect(() => {
        if (isAwaitingLoginToSubmit && !!user) {
            handleCreateUrl();
        }
    });
    return (
        <>
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
                    isDisabled={isCandidatePiggybankPathInvalid || submitStatus === 'submitting'}
                    onClick={handleCreateUrl}
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
        </>
    );
};

CreatePiggybankInput.propTypes = {
    updatePiggybankList: PropTypes.func.isRequired,
};

CreatePiggybankInput.defaultProps = {

};

export default CreatePiggybankInput;
