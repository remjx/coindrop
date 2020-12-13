import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { NotAllowedIcon, CheckIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, Spinner, Box, Input, InputRightElement } from '@chakra-ui/react';
import { db } from '../../../utils/client/db';
import useDebounce from '../../../utils/hooks/useDebounce';
import { AdditionalValidation } from './AdditionalValidationContext';

async function isUrlAvailable(path: string) {
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

type StatusIconProps = {
    value: string
    debouncedValue: string
    isValidating: boolean
    isValid: boolean
    currentPiggybankId: string
};
const StatusIcon: FunctionComponent<StatusIconProps> = ({
    value,
    debouncedValue,
    isValidating,
    isValid,
    currentPiggybankId,
}) => {
    if (isValidating || value !== debouncedValue) {
        return (
            <Box>
                <Spinner size="sm" />
            </Box>
        );
    }
    if (isValid || value === currentPiggybankId) {
        return (
            <CheckIcon id="piggybank-id-ok" color="green.500" />
        );
    }
    return <NotAllowedIcon id="piggybank-id-not-allowed" color="red.500" />;
};

type Props = {
    register: any // from react-hook-form useForm
    value: string
}

const EditUrlInput: FunctionComponent<Props> = ({ register, value }) => {
    const { query: { piggybankName }} = useRouter();
    const currentPiggybankId = Array.isArray(piggybankName) ? piggybankName[0] : piggybankName;
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const debouncedValue = useDebounce(value, 1500);
    const { setIsPiggybankIdAvailable } = useContext(AdditionalValidation);
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
    useEffect(() => {
        if ((isValid && !isValidating) || isUrlUnchanged) {
            setIsPiggybankIdAvailable(true);
        } else {
            setIsPiggybankIdAvailable(false);
        }
    }, [isValidating, isValid, isUrlUnchanged]);
    return (
        <InputGroup>
            <InputLeftAddon>
                coindrop.to/
            </InputLeftAddon>
            <Input
                id="input-piggybankId"
                maxLength={32}
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

export default EditUrlInput;
