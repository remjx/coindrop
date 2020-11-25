import { Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { CgSoftwareUpload } from 'react-icons/cg';
import styles from './FileInput.module.css';

type Props = {
    id: string
    text: string
    accept: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// Used this guide to forwardRef https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
export type FileInputRef = HTMLInputElement

export const FileInput = forwardRef<FileInputRef, Props>((props, ref) => {
    const { id, text, accept, onChange } = props;
    return (
        <div>
            <input
                type="file"
                name={id}
                id={id}
                className={styles.input}
                accept={accept}
                onChange={onChange}
                ref={ref}
            />
            <label
                className={styles.label}
                htmlFor={id}
            >
                <Tag size="lg" variant="subtle" colorScheme="gray">
                    <TagLeftIcon as={CgSoftwareUpload} />
                    <Text>{text}</Text>
                </Tag>
            </label>
        </div>
    );
});
