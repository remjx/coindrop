import { FunctionComponent } from 'react';
import { Button, useClipboard } from '@chakra-ui/react';
import { CheckIcon, LinkIcon } from "@chakra-ui/icons";

type Props = {
    textToCopy: string
}
const CopyLinkShareButton: FunctionComponent<Props> = (props) => {
    const { textToCopy } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
            onClick={onCopy}
            colorScheme="green"
        >
            {hasCopied ? "Copied" : "Copy Link"}
        </Button>
    );
};

export default CopyLinkShareButton;
