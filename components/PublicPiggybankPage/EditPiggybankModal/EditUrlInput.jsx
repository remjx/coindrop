import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { NotAllowedIcon, CheckIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, Spinner, Box, Input, InputRightElement } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import useDebounce from '../../../utils/hooks/useDebounce';

async function isUrlAvailable(path) {
    try {
        const piggybankRef = await db
            .collection('piggybanks')
            .doc(path)
            .get();
        if (piggybankRef.exists) {
            return false;
        }
        return true;
    } catch (err) {
        throw new Error('Error checking if url is available.');
    }
}

const StatusIcon = ({ value, debouncedValue, isValidating, isValid, currentPiggybankId }) => {
    if (isValidating || value !== debouncedValue) {
        return (
            <Box>
                <Spinner size="sm" />
            </Box>
        );
    }
    if (isValid || value === currentPiggybankId) {
        return (
            <CheckIcon color="green.500" />
        );
    }
    return <NotAllowedIcon color="red.500" />;
};
StatusIcon.propTypes = {
    value: PropTypes.string.isRequired,
    debouncedValue: PropTypes.string.isRequired,
    isValidating: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    currentPiggybankId: PropTypes.string.isRequired,
};

const EditUrlInput = ({ register, value }) => {
    const { query: { piggybankName: currentPiggybankId }} = useRouter();
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const debouncedValue = useDebounce(value, 1500);
    useEffect(
        () => {
            if (debouncedValue && debouncedValue !== currentPiggybankId) {
                setIsValidating(true);
                isUrlAvailable(debouncedValue).then(result => {
                    setIsValidating(false);
                    setIsValid(result);
                });
            }
        },
        [debouncedValue],
    );
    const isUrlUnchanged = value === currentPiggybankId;
    return (
        <InputGroup>
            <InputLeftAddon>
                coindrop.to/
            </InputLeftAddon>
            <Input
                id="input-piggybankId"
                maxLength="32"
                roundedLeft="0"
                isInvalid={!isValid && !isValidating && value === debouncedValue && !isUrlUnchanged}
                ref={register}
                name="piggybankId"
            />
            <InputRightElement>
                <StatusIcon
                    value={value}
                    debouncedValue={debouncedValue}
                    currentPiggybankId={currentPiggybankId}
                    isValid={isValid}
                    isValidating={isValidating}
                />
            </InputRightElement>
        </InputGroup>
    );
};

EditUrlInput.propTypes = {
    register: PropTypes.any.isRequired,
    value: PropTypes.string.isRequired,
};

EditUrlInput.defaultProps = {

};

export default EditUrlInput;
