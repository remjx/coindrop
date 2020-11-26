import { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Button } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import { maxPiggybanksPerUser } from '../../../../src/settings';
import CreatePiggybankInput from '../../../CreatePiggybankInput/CreatePiggybankInput';

const AddPiggybankListItem = (props) => {
    const { numActivePiggybanks } = props;
    const [showInput, setShowInput] = useState();
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

AddPiggybankListItem.propTypes = {
    numActivePiggybanks: PropTypes.number.isRequired,
};

AddPiggybankListItem.defaultProps = {

};

export default AddPiggybankListItem;
