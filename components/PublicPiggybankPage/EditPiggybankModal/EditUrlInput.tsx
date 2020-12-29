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
    const [error, setError] = useState<'Invalid input' | 'Id taken'>();
    const debouncedValue = useDebounce(value, 1500);
    const { setIsPiggybankIdAvailable } = useContext(AdditionalValidation);
    useEffect(
        () => {
            if (debouncedValue && debouncedValue !== currentPiggybankId) {
                setIsValidating(true);
                const isInvalid = !debouncedValue.match(piggybankPathRegex);
                if (isInvalid) {
                    setIsValid(false);
                    setError('Invalid input');
                } else {
                    isCoindropUrlAvailable(debouncedValue).then(isAvailable => {
                        setIsValid(isAvailable);
                        if (!isAvailable) {
                            setError('Id taken');
                        } else {
                            setError(null);
                        }
                    });
                }
                setIsValidating(false);
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
                error="This URL is already taken"
            />
        )}
        </>
    );
};

export default EditUrlInput;
