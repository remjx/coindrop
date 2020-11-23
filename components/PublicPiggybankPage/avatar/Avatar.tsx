import { FunctionComponent, useContext } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import styles from './Avatar.module.css';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankImageURL } from '../../../utils/storage/image-paths';

export const Avatar: FunctionComponent = () => {
    const { piggybankDbData: { owner_uid: ownerUid, avatar_storage_id } } = useContext(PublicPiggybankData);
    const { query: { piggybankName: piggybankNameQuery }} = useRouter();
    const piggybankName = typeof piggybankNameQuery === 'string' ? piggybankNameQuery : piggybankNameQuery[0];
    const publicAvatarUrl = publicPiggybankImageURL({
        ownerUid,
        piggybankName,
        imageAs: "avatar",
        imageStorageId: avatar_storage_id,
    });
    if (!avatar_storage_id) return null;
    return (
        <div className={styles.imageWrapper}>
            <Image
                src={publicAvatarUrl}
                alt="avatar"
                className={styles.image}
                width={250}
                height={250}
            />
        </div>
    );
};
