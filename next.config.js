const bundleAnalyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ['storage.googleapis.com'],
    },
});
