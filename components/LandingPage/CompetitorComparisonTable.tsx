import { FunctionComponent } from 'react';
import { useTheme, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { PiggyLogoIcon, KofiIcon, BuyMeACoffeeIcon, PatreonIcon } from "../Icons/CustomIcons";
import styles from './CompetitorComparisonTable.module.scss';

type Competitor = {
    id: string
    displayName: string,
    numPagesPerAccount: string | number,
    paymentMethods: string,
    isOpenSource: 'Yes' | 'No',
    fees: string,
    membershipFeatures: string,
    icon: JSX.Element,
}
const data: Competitor[] = [
    {
        id: 'coindrop',
        displayName: 'Coindrop',
        numPagesPerAccount: 'Unlimited',
        paymentMethods: 'Any',
        isOpenSource: 'Yes',
        fees: 'None',
        membershipFeatures: 'No',
        icon: <PiggyLogoIcon />,
    },
    {
        id: 'kofi',
        displayName: 'Ko-fi',
        numPagesPerAccount: 1,
        paymentMethods: 'PayPal, Credit Card',
        isOpenSource: 'No',
        fees: '3%',
        membershipFeatures: '$9/mo',
        icon: <KofiIcon ml={1} />,
    },
    {
        id: 'buymeacoffee',
        displayName: 'Buy Me A Coffee',
        numPagesPerAccount: 1,
        paymentMethods: 'Credit Card',
        isOpenSource: 'No',
        fees: '5%',
        membershipFeatures: 'Yes',
        icon: <BuyMeACoffeeIcon ml={1} />,
    },
    {
        id: 'patreon',
        displayName: 'Patreon',
        numPagesPerAccount: 1,
        paymentMethods: 'Credit Card',
        isOpenSource: 'No',
        fees: '5-12%',
        membershipFeatures: 'Yes',
        icon: <PatreonIcon ml={1} />,
    },
];
const coindropData = data.find(obj => obj.id === 'coindrop');
const competitorData = data.filter(obj => obj.id !== 'coindrop');

const CompetitorComparisonTable: FunctionComponent = () => {
    const theme = useTheme();
    const green = useColorModeValue(theme.colors.green['500'], theme.colors.green['300']);
    const red = useColorModeValue(theme.colors.red['500'], theme.colors.red['300']);
    const orange = useColorModeValue(theme.colors.orange['500'], theme.colors.orange['300']);
    const logoOutlineColor = useColorModeValue(theme.colors.gray['800'], theme.colors.gray['900']);
    const StyledTd: FunctionComponent<{ value: string | number }> = ({ value }) => {
        let backgroundColor;
        switch (value) {
            case 'Unlimited':
            case 'Any':
            case 'None':
            case 'Freemium':
            case 'Yes':
                backgroundColor = green;
                break;
            case '$9/mo':
                backgroundColor = orange;
                break;
            default:
                backgroundColor = red;
        }
        return (
            <td style={{backgroundColor, color: "white"}}>
                {value}
            </td>
        );
    };
    return (
        <Box>
            <Flex
                id="full-width-comparison-table"
                justify="center"
                textAlign="center"
                display={['none', 'none', 'flex']}
            >
                <table className={styles.comparisontable}>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>
                                <Flex align="center">
                                    {coindropData.displayName}
                                    <PiggyLogoIcon ml={1} size="19px" color={logoOutlineColor} />
                                </Flex>
                            </th>
                            {competitorData.map(obj => (
                                <th key={obj.id}>
                                    {obj.displayName}
                                    {obj.icon}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fees</td>
                            {data.map(obj => (
                                <StyledTd value={obj.fees} key={obj.id} />
                            ))}
                        </tr>
                        <tr>
                            <td>Payment methods</td>
                            {data.map(obj => (
                                <StyledTd value={obj.paymentMethods} key={obj.id} />
                            ))}
                        </tr>
                        <tr>
                            <td># Pages per account</td>
                            {data.map(obj => (
                                <StyledTd value={obj.numPagesPerAccount} key={obj.id} />
                            ))}
                        </tr>
                        <tr>
                            <td>Open-source</td>
                            {data.map(obj => (
                                <StyledTd value={obj.isOpenSource} key={obj.id} />
                            ))}
                        </tr>
                        <tr>
                            <td>Memberships</td>
                            {data.map(obj => (
                                <StyledTd value={obj.membershipFeatures} key={obj.id} />
                            ))}
                        </tr>
                    </tbody>
                </table>
            </Flex>

            {competitorData.map(obj => (
                <Flex
                    key={obj.id}
                    id={`partial-width-comparison-table-${obj.id}`}
                    justify="center"
                    textAlign="center"
                    display={['flex', 'flex', 'none']}
                >
                    <table className={styles.comparisontable}>
                        <thead>
                            <tr>
                                <th> </th>
                                <th>
                                    <Flex align="center">
                                        Coindrop
                                        <PiggyLogoIcon ml={1} size="19px" color={logoOutlineColor} />
                                    </Flex>
                                </th>
                                <th>
                                    {obj.displayName}
                                    {obj.icon}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fees</td>
                                <StyledTd value={coindropData.fees} />
                                <StyledTd value={obj.fees} />
                            </tr>
                            <tr>
                                <td>Payment methods</td>
                                <StyledTd value={coindropData.paymentMethods} />
                                <StyledTd value={obj.paymentMethods} />
                            </tr>
                            <tr>
                                <td># Pages per account</td>
                                <StyledTd value={coindropData.numPagesPerAccount} />
                                <StyledTd value={obj.numPagesPerAccount} />
                            </tr>
                            <tr>
                                <td>Open-source</td>
                                <StyledTd value={coindropData.isOpenSource} />
                                <StyledTd value={obj.isOpenSource} />
                            </tr>
                            <tr>
                                <td>Memberships</td>
                                <StyledTd value={coindropData.membershipFeatures} />
                                <StyledTd value={obj.membershipFeatures} />
                            </tr>
                        </tbody>
                    </table>
                </Flex>
            ))}
        </Box>
    );
};

export default CompetitorComparisonTable;
