import PropTypes from 'prop-types';
import { Button, useClipboard } from '@chakra-ui/core';

const CopyLinkShareButton = (props) => {
    const { textToCopy, buttonVariant, buttonVariantColor } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? "check" : "link"}
            onClick={onCopy}
            variant={buttonVariant}
            variantColor={buttonVariantColor}
        >
            {hasCopied ? "Copied" : "Copy Link"}
        </Button>
    );
};

CopyLinkShareButton.propTypes = {
    textToCopy: PropTypes.string.isRequired,
    buttonVariant: PropTypes.string,
    buttonVariantColor: PropTypes.string,
};

CopyLinkShareButton.defaultProps = {
    buttonVariant: undefined,
    buttonVariantColor: undefined,
};

export default CopyLinkShareButton;
