import PropTypes from 'prop-types';
import { Button, useClipboard } from '@chakra-ui/react';
import { CheckIcon, LinkIcon } from "@chakra-ui/icons";

const CopyLinkShareButton = (props) => {
    const { textToCopy, buttonVariant, buttonColorScheme } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
            onClick={onCopy}
            variant={buttonVariant}
            colorScheme={buttonColorScheme}
        >
            {hasCopied ? "Copied" : "Copy Link"}
        </Button>
    );
};

CopyLinkShareButton.propTypes = {
    textToCopy: PropTypes.string.isRequired,
    buttonVariant: PropTypes.string,
    buttonColorScheme: PropTypes.string,
};

CopyLinkShareButton.defaultProps = {
    buttonVariant: undefined,
    buttonColorScheme: undefined,
};

export default CopyLinkShareButton;
