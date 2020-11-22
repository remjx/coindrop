import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { db } from '../../../../utils/client/db';
import { piggybankImageStoragePath } from '../../../../utils/storage/image-paths';
import { storage } from '../../../../utils/client/storage';
import { PublicPiggybankData } from '../../../PublicPiggybankPage/PublicPiggybankDataContext';

type Props = {
    piggybankName: string
}

const DeleteButton: FunctionComponent<Props> = ({ piggybankName }) => {
    const { push } = useRouter();
    const [awaitingDeleteConfirmation, setAwaitingDeleteConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {
        piggybankDbData: {
            avatar_storage_id,
            owner_uid: ownerUid,
        },
    } = useContext(PublicPiggybankData);
    async function handleDelete() {
        if (!awaitingDeleteConfirmation) {
            return setAwaitingDeleteConfirmation(true);
        }
        try {
            setIsDeleting(true);
            const storageRef = storage.ref();
            const avatarRef = storageRef.child(piggybankImageStoragePath({
                ownerUid,
                piggybankName,
                imageAs: "avatar",
                imageStorageId: avatar_storage_id,
            }));
            await Promise.all([
                avatarRef.delete(),
                db.collection('piggybanks').doc(piggybankName).delete(),
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

export default DeleteButton;
