/* eslint-disable arrow-body-style */
/* eslint-disable react/no-danger */
// eslint-disable-next-line no-unused-vars
import { FunctionComponent } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';

function ecwidStoreScript() {
    return {__html: '<script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?44137065&data_platform=code&data_date=2020-12-30" charset="utf-8"></script><script type="text/javascript"> xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-44137065");</script>'};
}

function ecwidBuyNowTip500() {
    return {__html: '<div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-276239705" itemtype="http://schema.org/Product" data-single-product-id="276239705"><div class="ecsp-title" itemprop="name" style="display:none;" content="500 Tip Cards"></div><div customprop="addtobag"></div></div><script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?44137065&data_platform=singleproduct_v2" charset="utf-8"></script><script type="text/javascript">xProduct()</script>'};
}

function ecwidBuyNowTip1000() {
    return {__html: '<div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-276385182" itemtype="http://schema.org/Product" data-single-product-id="276385182"><div class="ecsp-title" itemprop="name" style="display:none;" content="1000 Tip Cards"></div><div customprop="addtobag"></div></div><script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?44137065&data_platform=singleproduct_v2" charset="utf-8"></script><script type="text/javascript">xProduct()</script>'};
}

function ecwidBuyNowTip2500() {
    return {__html: '<div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-276366536" itemtype="http://schema.org/Product" data-single-product-id="276366536"><div class="ecsp-title" itemprop="name" style="display:none;" content="2500 Tip Cards"></div><div customprop="addtobag"></div></div><script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?44137065&data_platform=singleproduct_v2" charset="utf-8"></script><script type="text/javascript">xProduct()</script>'};
}

const FAQ: FunctionComponent = () => {
    return (
        <Box mt={4}>
            <div id="my-store-44137065" />
            {/* <div dangerouslySetInnerHTML={ecwidStoreScript()} /> */}
            <Text>500 Tip Cards</Text>
            <div dangerouslySetInnerHTML={ecwidBuyNowTip500()} />
            <Text>1000 Tip Cards</Text>
            <div dangerouslySetInnerHTML={ecwidBuyNowTip1000()} />
            <Text>2500 Tip Cards</Text>
            <div dangerouslySetInnerHTML={ecwidBuyNowTip2500()} />
        </Box>
    );
};

export default withDefaultLayout(FAQ);
