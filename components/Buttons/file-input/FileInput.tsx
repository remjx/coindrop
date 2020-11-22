import { Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { CgSoftwareUpload } from 'react-icons/cg';
import styles from './FileInput.module.css';

type Props = {
    id: string
    text: string
    accept: string
    onChange: () => void
    inputRef: any
}

export const FileInput: FunctionComponent<Props> = ({ id, text, accept, onChange, inputRef }: Props) => (
    <div className={`${styles.wrapper}`}>
        <input
            type="file"
            name={id}
            id={id}
            className={styles.input}
            accept={accept}
            onChange={onChange}
            ref={inputRef}
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
