import PropTypes from 'prop-types';
import { Button, useClipboard } from '@chakra-ui/react';
import { CheckIcon, LinkIcon } from "@chakra-ui/icons";

const CopyLinkShareButton = (props) => {
    const { textToCopy, buttonVariant, buttoncolorScheme } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
            onClick={onCopy}
            variant={buttonVariant}
            colorScheme={buttoncolorScheme}
        >
            {hasCopied ? "Copied" : "Copy Link"}
        </Button>
    );
};

CopyLinkShareButton.propTypes = {
    textToCopy: PropTypes.string.isRequired,
    buttonVariant: PropTypes.string,
    buttoncolorScheme: PropTypes.string,
};

CopyLinkShareButton.defaultProps = {
    buttonVariant: undefined,
    buttoncolorScheme: undefined,
};

export default CopyLinkShareButton;
