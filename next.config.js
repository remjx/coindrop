const bundleAnalyzer = require('@next/bundle-analyzer');
const withImages = require('next-images')

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withImages(withBundleAnalyzer({
    images: {
        domains: ['storage.googleapis.com'],
    },
}));
