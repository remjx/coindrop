import { FunctionComponent } from 'react';
import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image, useClipboard } from '@chakra-ui/react';
import { SourceCodeIcon } from "../../../Icons/CustomIcons";
import styles from './HtmlEmbedButton.module.scss';

const fullBaseUrl = 'https://coindrop.to/';

type Props = {
    fullPublicUrl: string
}

const ShareEmbedButton: FunctionComponent<Props> = ({ fullPublicUrl }) => {
    const imageButtonHtml = `<a href="${fullPublicUrl}" target="_blank"><img src="${fullBaseUrl}embed-button.png" style="border-radius: 10px; height: 57px !important;width: 229px !important;" alt="Coindrop.to me"></img></a>`;
    const { onCopy: onCopyImage, hasCopied: hasCopiedImage } = useClipboard(imageButtonHtml);
    return (
        <Box>
            <Flex>
                <Box>
                    <Heading
                        as="h2"
                        size="lg"
                    >
                        Button
                    </Heading>
                </Box>
            </Flex>
                <>
                    <Box textAlign="center" my={3}>
                        <Image className={styles['coindrop-html-embed-button']} display="block" mx="auto" src="/embed-button.png" />
                    </Box>
                    <Box textAlign="center">
                        <Button
                            leftIcon={hasCopiedImage ? <CheckIcon /> : <SourceCodeIcon />} // TODO: Fix icon
                            colorScheme="green"
                            mb={1}
                            onClick={onCopyImage}
                        >
                            {hasCopiedImage ? 'Copied' : 'Copy Embed Code'}
                        </Button>
                    </Box>
                </>
        </Box>
    );
};

export default ShareEmbedButton;
