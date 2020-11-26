import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { db } from '../../../../utils/client/db';
import { PublicPiggybankData } from '../../../PublicPiggybankPage/PublicPiggybankDataContext';
import { deleteImage } from '../../../../src/db/mutations/delete-image';

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
            await Promise.all([
                deleteImage({
                    storageId: avatar_storage_id,
                    ownerUid,
                    piggybankName,
                }),
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
