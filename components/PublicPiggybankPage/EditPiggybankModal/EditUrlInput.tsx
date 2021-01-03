import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { NotAllowedIcon, CheckIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, Spinner, Box, Input, InputRightElement } from '@chakra-ui/react';
import useDebounce from '../../../utils/hooks/useDebounce';
import { AdditionalValidation } from './AdditionalValidationContext';
import { isCoindropUrlAvailable } from '../../../src/db/queries/coindrops/isCoindropUrlAvailable';
import { piggybankPathRegex } from '../../../src/settings';
import { CoindropRequirements } from '../../CoindropRequirements/CoindropRequirements';
import { CreateCoindropError } from '../../CreatePiggybankInput/CreateCoindropError';

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
    const [error, setError] = useState<'Invalid input' | 'Id taken' | 'Network error'>();
    const debouncedValue = useDebounce(value, 1500);
    const { setIsPiggybankIdAvailable } = useContext(AdditionalValidation);
    const isUrlUnchanged = value === currentPiggybankId;
    const isInvalid = !debouncedValue.match(piggybankPathRegex);
    const validateIsAvailable = async () => {
        if (isUrlUnchanged) {
            setIsValid(true);
            setIsPiggybankIdAvailable(true);
            setError(null);
            setIsValidating(false);
            return;
        }
        if (isInvalid) {
            setIsValid(false);
            setIsPiggybankIdAvailable(false);
            setError('Invalid input');
            setIsValidating(false);
            return;
        }
        try {
            const isAvailable = await isCoindropUrlAvailable(debouncedValue);
            setIsValid(isAvailable && !isInvalid);
            setIsPiggybankIdAvailable(isAvailable && !isInvalid);
            if (!isAvailable) {
                setError('Id taken');
            }
        } catch (err) {
            setIsValid(false);
            setIsPiggybankIdAvailable(false);
            setError('Network error');
        } finally {
            setIsValidating(false);
        }
    };
    useEffect(() => {
        validateIsAvailable();
    }, [debouncedValue]);
    useEffect(() => {
        setIsValidating(true);
        setError(null);
    }, [value]);
    useEffect(() => {
        setIsValidating(false);
    }, []);
    return (
        <>
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
        {error === 'Invalid input' && (
            <CoindropRequirements />
        )}
        {error === 'Id taken' && (
            <CreateCoindropError
                error="URL is taken, try another!"
            />
        )}
        {error === 'Network error' && (
            <CreateCoindropError
                error="Error checking availability, please try again"
            />
        )}
        </>
    );
};

export default EditUrlInput;
