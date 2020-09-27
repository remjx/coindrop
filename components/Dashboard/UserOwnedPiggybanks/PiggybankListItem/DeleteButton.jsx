import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';
import { mutate } from 'swr';
import { db } from '../../../../utils/client/db';

const DeleteButton = (props) => {
    const { id, uid } = props;
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
                .doc(id)
                .delete();
            mutate(uid);
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
            }, 3000);
        }
    });
    return (
        <Button
            leftIcon="delete"
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
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
};

export default DeleteButton;
