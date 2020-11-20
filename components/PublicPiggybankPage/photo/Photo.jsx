import { useContext } from "react";
import { useRouter } from "next/router";
import { Image } from '@chakra-ui/react';
import styles from './Photo.module.css';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankImageURL } from '../../../utils/storage/image-paths';
import { AvatarContext } from '../context/avatar-context';

export const Photo = () => {
    const { piggybankDbData: { owner_uid: ownerUid, has_avatar: hasAvatar } } = useContext(PublicPiggybankData);
    const { imageUploadedDateTime } = useContext(AvatarContext);
    const { query: { piggybankName }} = useRouter();
    const gsPublicImageURL = publicPiggybankImageURL({ ownerUid, piggybankName });
    return (
        <div className={styles["image-wrapper"]}>
            <Image src={`${gsPublicImageURL}?${imageUploadedDateTime}`} fallbackSrc="https://via.placeholder.com/150" />
            <img src={gsPublicImageURL} alt="avatar" className={styles.image} />
        </div>
    );
};
