import React from 'react';
import PropTypes from 'prop-types';

const Preview = (props) => {
    const { } = props;
    return null;
    return (
        name && accentColor && verb && (
            <>
            <FormLabel
                htmlFor="input-verb"
            >
                Preview
            </FormLabel>
            <FormHelperText textAlign="center">
                {'"Choose a payment method to '}
                {verb ?? 'pay'}
                {' '}
                {website ? (
                    <Link href={website}>
                        <Text
                            as="span"
                            fontWeight="bold"
                            color={colors[accentColor]['500']}
                            textDecoration="underline"
                        >
                            {name}
                        </Text>
                    </Link>
                ) : (
                    <Text
                        as="span"
                        fontWeight="bold"
                        color={colors[accentColor]['500']}
                    >
                        {name}
                    </Text>
                )}
                &quot;
            </FormHelperText>
            </>       
    );
};

Preview.propTypes = {

};

Preview.defaultProps = {

};

export default Preview;
