import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ViewOffIcon, RepeatIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, Input, Button, useClipboard } from '@chakra-ui/react';
import { SourceCodeIcon } from "../../../Icons/CustomIcons";
import styles from '../../../../src/embed-button/embed-button.module.css';

const fullBaseUrl = 'https://coindrop.to/';
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
const shuffleCustomTextOptions = shuffle([
    'coin me maybe',
    'support my work',
    'appreciation fund',
    'holla for a dolla',
    'drop it like it\'s hot',
    'tip jar',
]);

// copy pasted from src/embed-button/embed-button.js. Ideally wouldnt exist in 2 places.
const svg = (
    <svg viewBox="0 -4 512.00074 512" xmlns="http://www.w3.org/2000/svg">
        <path d="m363.265625 150.015625c-12.175781 35.683594-50.976563 54.738281-86.65625 42.5625-27.214844-9.289063-45.691406-34.632813-46.210937-63.382813-10.660157 1.011719-21.257813 2.605469-31.742188 4.777344-11.046875-24.394531-35.339844-40.078125-62.121094-40.105468v61.953124c-33.332031 16.15625-60.867187 42.199219-78.847656 74.582032h-40.621094c-4.710937 0-8.53125 3.820312-8.53125 8.53125v102.402344c0 4.710937 3.820313 8.53125 8.53125 8.53125h40.621094c16.300781 29.496093 40.699219 53.714843 70.3125 69.804687v66.730469c0 4.710937 3.820312 8.53125 8.535156 8.53125h51.199219c4.710937 0 8.53125-3.820313 8.53125-8.53125v-40.707032c19.617187 4.347657 39.644531 6.550782 59.734375 6.574219 38.253906.246094 76.105469-7.816406 110.933594-23.640625v57.773438c0 4.710937 3.820312 8.53125 8.535156 8.53125h51.199219c4.710937 0 8.53125-3.820313 8.53125-8.53125v-108.375c21.585937-24.234375 33.707031-55.441406 34.132812-87.894532 0-59.816406-42.664062-112.042968-106.066406-140.117187zm0 0" fill="#ffb655" />
        <path d="m298.667969 59.734375c-37.703125 0-68.269531 30.5625-68.269531 68.265625v1.195312c.679687 37.695313 31.789062 67.707032 69.484374 67.027344 28.75-.515625 54.09375-18.992187 63.382813-46.207031 2.4375-7.082031 3.679687-14.523437 3.667969-22.015625 0-37.703125-30.5625-68.265625-68.265625-68.265625zm0 0" fill="#ffde55" />
        <g fill="#3e3d42">
            <path d="m128 221.867188c-9.425781 0-17.066406-7.640626-17.066406-17.066407h-17.066406c0 18.851563 15.28125 34.132813 34.132812 34.132813s34.132812-15.28125 34.132812-34.132813h-17.066406c0 9.425781-7.640625 17.066407-17.066406 17.066407zm0 0" />
            <path d="m503.464844 341.332031v-25.597656c0-14.140625-11.460938-25.601563-25.597656-25.601563 0-58.878906-39.878907-113.699218-104.449219-144.714843 9.660156-41.277344-15.96875-82.570313-57.246094-92.230469s-82.570313 15.96875-92.230469 57.246094c-.855468 3.648437-1.441406 7.355468-1.75 11.089844-6.28125.75-12.582031 1.636718-18.859375 2.796874-13.652343-24.046874-39.148437-38.929687-66.800781-38.988281-4.710938 0-8.53125 3.820313-8.53125 8.535157v56.796874c-31.324219 16.175782-57.453125 40.855469-75.394531 71.203126h-35.539063c-9.425781 0-17.066406 7.640624-17.066406 17.066406v102.398437c0 9.425781 7.640625 17.070313 17.066406 17.070313h35.542969c16.234375 27.421875 39.261719 50.203125 66.855469 66.148437v61.851563c0 9.425781 7.644531 17.066406 17.070312 17.066406h51.199219c9.425781 0 17.066406-7.640625 17.066406-17.066406v-30.277344c51.550781 9.535156 104.742188 4.511719 153.597657-14.507812v44.785156c0 9.425781 7.640624 17.066406 17.070312 17.066406h51.199219c9.425781 0 17.066406-7.640625 17.066406-17.066406v-105.277344c17.726563-21.039062 29.128906-46.671875 32.894531-73.925781h1.238282c4.710937 0 8.535156 3.820312 8.535156 8.535156v25.601563c0 9.425781 7.640625 17.066406 17.066406 17.066406h8.53125v-17.066406h-8.535156zm-264.53125-213.332031c0-32.988281 26.742187-59.734375 59.734375-59.734375 32.988281 0 59.730469 26.746094 59.730469 59.734375.011718 6.558594-1.078126 13.074219-3.214844 19.277344-8.222656 24.203125-30.957032 40.472656-56.515625 40.457031-1.996094 0-3.988281-.101563-5.976563-.308594-30.046875-3.183593-53.0625-28.183593-53.757812-58.394531zm189.773437 244.488281c-1.316406 1.546875-2.039062 3.507813-2.039062 5.539063v108.375h-51.199219v-57.773438c0-4.710937-3.820312-8.53125-8.535156-8.53125-1.242188.003906-2.464844.273438-3.59375.792969-51.863282 23.152344-109.820313 28.933594-165.238282 16.476563-4.601562-1.011719-9.15625 1.898437-10.167968 6.5-.132813.601562-.199219 1.214843-.199219 1.828124v40.707032h-51.203125v-66.730469c.007812-3.054687-1.621094-5.882813-4.265625-7.410156-28.199219-15.273438-51.441406-38.289063-66.996094-66.335938-1.472656-2.828125-4.398437-4.597656-7.585937-4.589843h-40.617188v-102.402344h40.621094c3.175781-.003906 6.089844-1.773438 7.558594-4.589844 17.117187-30.859375 43.386718-55.644531 75.1875-70.9375 2.84375-1.460938 4.632812-4.390625 4.632812-7.585938v-52.804687c20.136719 2.984375 37.386719 15.96875 45.824219 34.492187 1.648437 3.625 5.585937 5.632813 9.488281 4.828126 7.382813-1.527344 14.832032-2.773438 22.230469-3.703126.160156 1.167969.433594 2.304688.648437 3.457032.1875.980468.34375 1.980468.5625 2.945312.359376 1.550782.855469 3.070313 1.265626 4.589844.238281.785156.417968 1.585938.671874 2.355469.75 2.253906 1.605469 4.46875 2.558594 6.628906.214844.476563.480469.929687.699219 1.410156.777344 1.707031 1.582031 3.34375 2.476563 4.957031.433593.777344.929687 1.507813 1.390624 2.277344.761719 1.253906 1.511719 2.558594 2.339844 3.738282.554688.808593 1.160156 1.578124 1.707032 2.363281.851562 1.109375 1.628906 2.21875 2.507812 3.277343.640625.785157 1.332031 1.527344 2.003906 2.285157.898438 1 1.792969 1.988281 2.730469 2.945312.726563.734375 1.484375 1.433594 2.238281 2.140625.972656.90625 1.945313 1.785156 2.953125 2.636719.425781.359375.851563.742187 1.261719 1.09375h-28.757812v17.066406h153.601562v-17.066406h-28.578125c.40625-.332031.851563-.632813 1.234375-.972656l.113281-.09375c2.511719-2.140625 4.882813-4.4375 7.097657-6.878907.207031-.230468.417968-.433593.625-.664062 2.121093-2.390625 4.089843-4.910156 5.886718-7.554688.273438-.390624.554688-.773437.855469-1.175781 1.734375-2.636719 3.304687-5.375 4.699219-8.199219.121094-.230468.273437-.4375.394531-.667968 57.582031 28.261718 93.003906 76.910156 93.003906 128.605468-.453125 30.417969-11.847656 59.652344-32.09375 82.355469zm0 0" />
            <path d="m392.535156 25.601562h17.066406v17.066407h-17.066406zm0 0" />
            <path d="m409.601562 42.667969h17.066407v17.066406h-17.066407zm0 0" />
            <path d="m375.46875 42.667969h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m392.535156 59.734375h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m469.332031 93.867188h17.070313v17.066406h-17.070313zm0 0" />
            <path d="m486.402344 110.933594h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m452.265625 110.933594h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m469.332031 128h17.070313v17.066406h-17.070313zm0 0" />
            <path d="m196.265625 0h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m213.332031 17.066406h17.066407v17.066406h-17.066407zm0 0" />
            <path d="m179.199219 17.066406h17.066406v17.066406h-17.066406zm0 0" />
            <path d="m196.265625 34.132812h17.066406v17.066407h-17.066406zm0 0" />
        </g>
    </svg>
);

const ShareEmbedButton = (props) => {
    const { fullPublicUrl, publicUrl, piggybankName } = props;
    const [customText, setCustomText] = useState(publicUrl);
    const scriptButtonHtml = `<script type="text/javascript" src="${fullBaseUrl}embed-button.js" data-id="coindrop-button" data-slug="${piggybankName}" data-customText="${customText}" ></script>`;
    const imageButtonHtml = `<a href="${fullPublicUrl}" target="_blank"><img src="${fullBaseUrl}embed-button.png" alt="Coindrop.to me" style="height: 57px !important;width: 229px !important;" ></a>`;
    const { onCopy: onCopyScript, hasCopied: hasCopiedScript } = useClipboard(scriptButtonHtml);
    const { onCopy: onCopyImage, hasCopied: hasCopiedImage } = useClipboard(imageButtonHtml);
    const initialShuffleTextArray = [publicUrl, ...shuffleCustomTextOptions];
    const [shuffleTextArray] = useState(initialShuffleTextArray);
    const [shuffleCustomTextIndex, setShuffleCustomTextIndex] = useState(0);
    const [isDisplayed, setIsDisplayed] = useState(false);
    useEffect(() => {
        setCustomText(shuffleTextArray[shuffleCustomTextIndex]);
    }, [shuffleCustomTextIndex]);
    const ButtonPreview = ({ text, isHtmlOnly }) => (
        <a href={`${fullBaseUrl}${piggybankName}`} target="_blank" rel="noreferrer">
            <button type="button" className={isHtmlOnly ? `${styles["coindrop-button"]} ${styles["coindrop-html-button"]}` : styles["coindrop-button"]}>
                <div className={styles["coindrop-button-content"]}>
                <div className={styles["coindrop-svg"]}>{svg}</div>
                <div>{text}</div>
                </div>
            </button>
        </a>
    );
    ButtonPreview.propTypes = {
        text: PropTypes.string,
        isHtmlOnly: PropTypes.bool,
    };
    ButtonPreview.defaultProps = {
        text: 'coindrop.to me',
        isHtmlOnly: false,
    };
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
                    <Text>Embed a button on your website</Text>
                </Box>
                <Flex align="center" flexGrow={1} justify="center" mt={2} wrap="wrap">
                    {isDisplayed ? (
                        <Button
                            leftIcon={<ViewOffIcon />}
                            onClick={() => setIsDisplayed(false)}
                            variant="outline"
                            colorScheme="green"
                        >
                            Hide
                        </Button>
                    ) : (
                        <Button
                            leftIcon={<SourceCodeIcon />}
                            onClick={() => setIsDisplayed(true)}
                            colorScheme="green"
                        >
                            Customize
                        </Button>
                    )}
                </Flex>
            </Flex>
            {isDisplayed && (
                <>
                <Heading as="h3" size="md" ml={4} mt={2}>With custom text</Heading>
                <Box textAlign="center" mt={3}>
                    <ButtonPreview text={customText} />
                </Box>
                <Flex justify="center" align="center" textAlign="center" mb={3}>
                    <Input
                        variant="flushed"
                        width="350px"
                        value={customText}
                        textAlign="center"
                        onChange={(e) => setCustomText(e.target.value)}
                    />
                </Flex>
                <Box textAlign="center">
                    <Flex justify="center" wrap="wrap">
                        <Button
                            leftIcon={<RepeatIcon />}
                            variant="outline"
                            colorScheme="green"
                            onClick={() => {
                                setShuffleCustomTextIndex(shuffleCustomTextIndex === shuffleCustomTextOptions.length - 1 ? 0 : shuffleCustomTextIndex + 1);
                            }}
                            mx={1}
                            mb={1}
                        >
                            Shake It Up
                        </Button>
                        <Button
                            leftIcon={hasCopiedScript ? <CheckIcon /> : <SourceCodeIcon />}
                            colorScheme="green"
                            mx={1}
                            mb={1}
                            onClick={onCopyScript}
                        >
                            {hasCopiedScript ? 'Copied' : 'Copy Code'}
                        </Button>
                    </Flex>
                    <Text fontSize="sm">For websites that support JavaScript embed</Text>
                </Box>
                <Heading as="h3" size="md" ml={4} mt={2}>With default text</Heading>
                <Box textAlign="center" my={3}>
                    <ButtonPreview
                        text="coindrop.to me"
                        isHtmlOnly
                    />
                </Box>
                <Box textAlign="center">
                    <Button
                        leftIcon={hasCopiedImage ? <CheckIcon /> : <SourceCodeIcon />} // TODO: Fix icon
                        colorScheme="green"
                        mb={1}
                        onClick={onCopyImage}
                    >
                        {hasCopiedImage ? 'Copied' : 'Copy Code'}
                    </Button>
                    <Text fontSize="sm">For websites that support HTML embed</Text>
                    <Text fontSize="xs">Note: button hover color does not change with this option</Text>
                </Box>
                </>
            )}
        </Box>
    );
};

ShareEmbedButton.propTypes = {
    fullPublicUrl: PropTypes.string.isRequired,
    publicUrl: PropTypes.string.isRequired,
    piggybankName: PropTypes.string.isRequired,
};

ShareEmbedButton.defaultProps = {

};

export default ShareEmbedButton;
