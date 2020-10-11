import { Box, Flex, Icon, useTheme } from '@chakra-ui/core';
import styles from './CompetitorComparisonTable.module.scss';

const data = [
    {
        id: 'kofi',
        displayName: 'Ko-fi',
        numPagesPerAccount: 1,
        paymentMethods: 'PayPal, Credit Card',
        isOpenSource: 'No',
        membershipFeatures: 'No',
    },
];

const CompetitorComparisonTable = () => {
    const theme = useTheme();
    const green = theme.colors.green['400'];
    const red = theme.colors.red['500'];
    const orange = theme.colors.orange['500'];
    return (
        <Box>
            <Flex
                id="full-width-comparison-table"
                justify="center"
                textAlign="center"
                display={['none', 'none', 'flex']}
            >
                <table className={styles.comparisontable}>
                    <tr>
                        <th> </th>
                        <th>
                            <Flex align="center">
                                Coindrop
                                <Icon ml={1} name="piggyLogo" size="19px" />
                            </Flex>
                        </th>
                        <th>
                            Ko-fi
                            <Icon ml={1} name="kofi" />
                        </th>
                        <th>
                            Buy Me A Coffee
                            <Icon ml={1} name="buymeacoffee" />
                        </th>
                        <th>
                            Patreon
                            <Icon ml={1} name="patreon" />
                        </th>
                    </tr>
                    <tr>
                        <td># Pages per account</td>
                        <td style={{backgroundColor: green, color: '#FFFFFF'}}>Unlimited</td>
                        <td style={{backgroundColor: red}}>1</td>
                        <td style={{backgroundColor: red}}>1</td>
                        <td style={{backgroundColor: red}}>1</td>
                    </tr>
                    <tr>
                        <td>Payment methods</td>
                        <td style={{backgroundColor: green}}>Any</td>
                        <td style={{backgroundColor: red}}>PayPal or Credit Card</td>
                        <td style={{backgroundColor: red}}>Credit card</td>
                        <td style={{backgroundColor: red}}>Credit card</td>
                    </tr>
                    <tr>
                        <td>Open-source</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: red}}>No</td>
                    </tr>
                    <tr>
                        <td>Fees</td>
                        <td style={{backgroundColor: green}}>Free</td>
                        <td style={{backgroundColor: green}}>Freemium</td>
                        <td style={{backgroundColor: red}}>5%</td>
                        <td style={{backgroundColor: red}}>5-12%</td>
                    </tr>
                    <tr>
                        <td>Memberships</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: red}}>$9/mo</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                    </tr>
                </table>
            </Flex>
            <Flex
                id="partial-width-comparison-table-kofi"
                justify="center"
                textAlign="center"
                display={['flex', 'flex', 'none']}
            >
                <table className={styles.comparisontable}>
                    <tr>
                        <th> </th>
                        <th>
                            <Flex align="center">
                                Coindrop
                                <Icon ml={1} name="piggyLogo" size="19px" />
                            </Flex>
                        </th>
                        <th>
                            Ko-fi
                            <Icon ml={1} name="kofi" />
                        </th>
                    </tr>
                    <tr>
                        <td># Pages per account</td>
                        <td style={{backgroundColor: green, color: '#FFFFFF'}}>Unlimited</td>
                        <td style={{backgroundColor: red}}>1</td>
                    </tr>
                    <tr>
                        <td>Payment methods</td>
                        <td style={{backgroundColor: green}}>Any</td>
                        <td style={{backgroundColor: red}}>PayPal or Credit Card</td>
                    </tr>
                    <tr>
                        <td>Open-source</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                        <td style={{backgroundColor: red}}>No</td>
                    </tr>
                    <tr>
                        <td>Fees</td>
                        <td style={{backgroundColor: green}}>Free</td>
                        <td style={{backgroundColor: green}}>Freemium</td>
                    </tr>
                    <tr>
                        <td>Memberships</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: orange}}>$9/mo</td>
                    </tr>
                </table>
            </Flex>
            <Flex
                id="partial-width-comparison-table-bmac"
                justify="center"
                textAlign="center"
                display={['flex', 'flex', 'none']}
            >
                <table className={styles.comparisontable}>
                    <tr>
                        <th> </th>
                        <th>
                            <Flex align="center">
                                Coindrop
                                <Icon ml={1} name="piggyLogo" size="19px" />
                            </Flex>
                        </th>
                        <th>
                            Buy Me A Coffee
                            <Icon ml={1} name="buymeacoffee" />
                        </th>
                    </tr>
                    <tr>
                        <td># Pages per account</td>
                        <td style={{backgroundColor: green, color: '#FFFFFF'}}>Unlimited</td>
                        <td style={{backgroundColor: red}}>1</td>
                    </tr>
                    <tr>
                        <td>Payment methods</td>
                        <td style={{backgroundColor: green}}>Any</td>
                        <td style={{backgroundColor: red}}>Credit card</td>
                    </tr>
                    <tr>
                        <td>Open-source</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                        <td style={{backgroundColor: red}}>No</td>
                    </tr>
                    <tr>
                        <td>Fees</td>
                        <td style={{backgroundColor: green}}>Free</td>
                        <td style={{backgroundColor: red}}>5%</td>
                    </tr>
                    <tr>
                        <td>Memberships</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                    </tr>
                </table>
            </Flex>
            <Flex
                id="partial-width-comparison-table-patreon"
                justify="center"
                textAlign="center"
                display={['flex', 'flex', 'none']}
            >
                <table className={styles.comparisontable}>
                    <tr>
                        <th> </th>
                        <th>
                            <Flex align="center">
                                Coindrop
                                <Icon ml={1} name="piggyLogo" size="19px" />
                            </Flex>
                        </th>
                        <th>
                            Patreon
                            <Icon ml={1} name="patreon" />
                        </th>
                    </tr>
                    <tr>
                        <td># Pages per account</td>
                        <td style={{backgroundColor: green, color: '#FFFFFF'}}>Unlimited</td>
                        <td style={{backgroundColor: red}}>1</td>
                    </tr>
                    <tr>
                        <td>Payment methods</td>
                        <td style={{backgroundColor: green}}>Any</td>
                        <td style={{backgroundColor: red}}>Credit card</td>
                    </tr>
                    <tr>
                        <td>Open-source</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                        <td style={{backgroundColor: red}}>No</td>
                    </tr>
                    <tr>
                        <td>Fees</td>
                        <td style={{backgroundColor: green}}>Free</td>
                        <td style={{backgroundColor: red}}>5-12%</td>
                    </tr>
                    <tr>
                        <td>Memberships</td>
                        <td style={{backgroundColor: red}}>No</td>
                        <td style={{backgroundColor: green}}>Yes</td>
                    </tr>
                </table>
            </Flex>
        </Box>
    );
};

export default CompetitorComparisonTable;
