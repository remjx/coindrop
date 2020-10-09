import { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Button } from '@chakra-ui/core';
import { maxPiggybanksPerUser } from '../../../../src/settings';
import CreatePiggybankInput from '../../../CreatePiggybankInput/CreatePiggybankInput';

const AddPiggybankListItem = (props) => {
    const { numActivePiggybanks } = props;
    const [showInput, setShowInput] = useState();
    if (numActivePiggybanks < maxPiggybanksPerUser) {
        if (!showInput) {
            return (
                <Button
                    leftIcon="add"
                    borderRadius="10px"
                    mt={3}
                    onClick={() => setShowInput(true)}
                    variantColor="green"
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
                    createButtonVariantColor="green"
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
