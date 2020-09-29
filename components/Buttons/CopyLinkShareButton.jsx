import PropTypes from 'prop-types';
import { Button, useClipboard } from '@chakra-ui/core';

const CopyLinkShareButton = (props) => {
    const { textToCopy } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            leftIcon={hasCopied ? "check" : "link"}
            onClick={onCopy}
        >
            {hasCopied ? "Copied Link" : "Copy Link"}
        </Button>
    );
};

CopyLinkShareButton.propTypes = {
    textToCopy: PropTypes.string.isRequired,
};

CopyLinkShareButton.defaultProps = {

};

export default CopyLinkShareButton;
