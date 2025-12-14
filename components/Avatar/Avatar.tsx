import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { AvatarLoading } from "./AvatarLoading";
import styles from './Avatar.module.css';
import { publicPiggybankImageURL } from "../../utils/storage/image-paths";
import { PublicPiggybankDataContext } from '../PublicPiggybankPage/PublicPiggybankDataContext';

export function Avatar(): JSX.Element {
    const { piggybankDbData: { owner_uid: ownerUid, avatar_storage_id } } = useContext(PublicPiggybankDataContext);
    const { query: { piggybankName: piggybankNameQuery }} = useRouter();
    const piggybankName = typeof piggybankNameQuery === 'string' ? piggybankNameQuery : piggybankNameQuery[0];
    const publicAvatarUrl = publicPiggybankImageURL({
        ownerUid,
        piggybankName,
        imageAs: "avatar",
        imageStorageId: avatar_storage_id,
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (avatar_storage_id) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [avatar_storage_id]);
    if (!avatar_storage_id) return null;
    return (
        <>
        {isLoading && <AvatarLoading />}
        <div
            className={isLoading ? styles.imageWrapperLoading : styles.imageWrapper}
            data-cy="coindrop-avatar"
        >
            <Image
                src={publicAvatarUrl}
                alt="avatar"
                className={styles.image}
                width={200}
                height={200}
                onLoadingComplete={() => {
                    setIsLoading(false);
                }}
                unoptimized
            />
        </div>
        </>
    );
}
