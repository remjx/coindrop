import { FunctionComponent } from 'react';
import { Button, useClipboard } from '@chakra-ui/react';
import { CheckIcon, LinkIcon } from "@chakra-ui/icons";

type Props = {
    textToCopy: string
    buttonVariant?: string
    buttonColorScheme?: string
}
const CopyLinkShareButton: FunctionComponent<Props> = (props) => {
    const { textToCopy, buttonVariant, buttonColorScheme } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
            onClick={onCopy}
            variant={buttonVariant}
            colorScheme={buttonColorScheme}
        >
            {hasCopied ? "Copied" : "Copy"}
        </Button>
    );
};

export default CopyLinkShareButton;
