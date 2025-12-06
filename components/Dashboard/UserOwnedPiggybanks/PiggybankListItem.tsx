import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import NextLink from 'next/link';
import { Spinner, Box, Flex, Heading, useTheme, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from "@chakra-ui/icons";

type Props = {
    id: string
    setLoadingCoindropId: Dispatch<SetStateAction<string>>
    loadingCoindropId: string;
}

const PiggybankListItem: FunctionComponent<Props> = ({ id, loadingCoindropId, setLoadingCoindropId }) => {
    const { colors } = useTheme();
    const hoverBg = useColorModeValue(colors.gray['100'], colors.gray['600']);
    const isThisItemLoading = loadingCoindropId === id;
    const isAnyItemLoading = !!loadingCoindropId;
    const isOtherItemLoading = loadingCoindropId && loadingCoindropId !== id;
    const textOpacity = isOtherItemLoading ? 0.5 : undefined;
    return (
        <Box
            onClick={() => {
                if (!isAnyItemLoading) {
                    setLoadingCoindropId(id);
                }
            }}
            mt={3}
            cursor={isThisItemLoading ? "default" : isAnyItemLoading ? "not-allowed" : "pointer"}
            _hover={{
                bg: !isAnyItemLoading ? hoverBg : undefined,
                textDecoration: "none",
            }}
            borderWidth="1px"
            borderRadius="10px"
        >
            <NextLink href={`/${loadingCoindropId || id}`} passHref id={`link-to-coindrop-${id}`} style={{cursor: "inherit"}}>
                <Box
                    py={5}
                    shadow="md"
                >
                    {isThisItemLoading ? (
                        <Flex align="center" justify="center">
                            <Spinner boxSize="32px" />
                            <Heading ml={2} fontSize="xl">
                                Loading
                            </Heading>
                        </Flex>
                    ) : (
                        <Flex
                            justify="space-between"
                            align="center"
                            mx={4}
                        >
                            <Heading fontSize="xl" wordBreak="break-word" opacity={textOpacity}>
                                coindrop.to/
                                {id}
                            </Heading>
                            <ChevronRightIcon boxSize="32px" opacity={textOpacity} />
                        </Flex>
                    )}
                </Box>
            </NextLink>
        </Box>
    );
};

export default PiggybankListItem;
