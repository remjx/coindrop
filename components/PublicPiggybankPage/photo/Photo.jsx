import { useContext } from "react";
import { useRouter } from "next/router";
import styles from './Photo.module.css';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankImageURL } from '../../../utils/storage/image-paths';

export const Photo = () => {
    const { piggybankDbData: { owner_uid: ownerUid } } = useContext(PublicPiggybankData);
    const { query: { piggybankName }} = useRouter();
    const gsPublicImageURL = publicPiggybankImageURL({ ownerUid, piggybankName });
    return (
        <div className={styles["image-wrapper"]}>
            <span id="avatar-span">My avatar:</span>
            <img src={gsPublicImageURL} alt="avatar" className={styles.image} />
        </div>
    );
};
