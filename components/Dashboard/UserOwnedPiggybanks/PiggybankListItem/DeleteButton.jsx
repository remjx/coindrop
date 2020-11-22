import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { db } from '../../../../utils/client/db';
import { piggybankImageStoragePath } from '../../../../utils/storage/image-paths';
import { storage } from '../../../../utils/client/storage';

const DeleteButton = (props) => {
    const { id, ownerUid } = props;
    const { push } = useRouter();
    const [awaitingDeleteConfirmation, setAwaitingDeleteConfirmation] = useState();
    const [isDeleting, setIsDeleting] = useState();
    async function handleDelete() {
        if (!awaitingDeleteConfirmation) {
            return setAwaitingDeleteConfirmation(true);
        }
        try {
            setIsDeleting(true);
            const storageRef = storage.ref();
            const avatarRef = storageRef.child(piggybankImageStoragePath({ ownerUid, piggybankName: id }));
            await Promise.all([
                avatarRef.delete(),
                db.collection('piggybanks').doc(id).delete(),
            ]);
            push('/dashboard');
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
            leftIcon={<DeleteIcon />}
            colorScheme={awaitingDeleteConfirmation ? "red" : undefined}
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
    ownerUid: PropTypes.string.isRequired,
};

DeleteButton.defaultProps = {
};

export default DeleteButton;
