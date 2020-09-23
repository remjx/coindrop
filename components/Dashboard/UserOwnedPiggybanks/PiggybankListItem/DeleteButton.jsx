import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';
import { mutate } from 'swr';
import { db } from '../../../../utils/client/db';

const DeleteButton = (props) => {
    const { name, user } = props;
    const [awaitingDeleteConfirmation, setAwaitingDeleteConfirmation] = useState();
    const [isDeleting, setIsDeleting] = useState();
    async function handleDelete() {
        if (!awaitingDeleteConfirmation) {
            return setAwaitingDeleteConfirmation(true);
        }
        try {
            setIsDeleting(true);
            await db
                .collection('piggybanks')
                .doc(name)
                .delete();
            mutate(user.id);
        } catch (err) {
            setAwaitingDeleteConfirmation(false);
        }
        return undefined;
    }
    useEffect(() => {
        if (awaitingDeleteConfirmation) {
            setTimeout(() => {
                if (awaitingDeleteConfirmation) {
                    setAwaitingDeleteConfirmation(false);
                }
            }, 5000);
        }
    });
    return (
        <Button
            leftIcon="delete"
            m={1}
            variantColor={awaitingDeleteConfirmation ? "red" : undefined}
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Deleting"
        >
            {awaitingDeleteConfirmation ? "Confirm" : "Delete"}
        </Button>
    );
};

DeleteButton.propTypes = {
    name: PropTypes.string.isRequired,
    user: PropTypes.object,
};

DeleteButton.defaultProps = {
    user: null,
};

export default DeleteButton;
