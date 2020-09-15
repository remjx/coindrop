import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';
import { db } from '../../utils/client/db';

const MyPiggybanks = (props) => {
    const { } = props;
    const [data, setData] = React.useState();
    React.useEffect(() => {
        db.collection("wallets").get().then((querySnapshot) => {
            // setData(querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
    });
    return (
        <Text>
            test
            {data}
        </Text>
    );
};

MyPiggybanks.propTypes = {

};

MyPiggybanks.defaultProps = {

};

export default MyPiggybanks;
