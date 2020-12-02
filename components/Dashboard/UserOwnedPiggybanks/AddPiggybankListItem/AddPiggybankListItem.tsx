import { FunctionComponent, useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import { maxPiggybanksPerUser } from '../../../../src/settings';
import { CreatePiggybankInput } from '../../../CreatePiggybankInput/CreatePiggybankInput';

type Props = {
    numActivePiggybanks: number
}

const AddPiggybankListItem: FunctionComponent<Props> = ({ numActivePiggybanks }) => {
    const [showInput, setShowInput] = useState(false);
    if (numActivePiggybanks < maxPiggybanksPerUser) {
        if (!showInput) {
            return (
                <Button
                    id="create-new-coindrop-button"
                    leftIcon={<AddIcon />}
                    borderRadius="10px"
                    mt={3}
                    onClick={() => setShowInput(true)}
                    colorScheme="green"
                >
                    Create new
                </Button>
            );
        }
        return (
            <Flex
                p={5}
                borderWidth="2px"
                borderRadius="10px"
                borderStyle="dotted"
                mt={3}
                justify="center"
                wrap="wrap"
                align="center"
            >
                <CreatePiggybankInput
                    onCancel={() => setShowInput(false)}
                    createButtonColorScheme="green"
                />
            </Flex>
        );
    }
    return null;
};

export default AddPiggybankListItem;
