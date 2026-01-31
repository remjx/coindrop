/* eslint-disable no-console */
/*
For convenience, all blog post content is kept in one place: /blog/[slug]/public/
To expose public content to the web (e.g. images), this script copies all content to the next.js /public/blog-content/[slug]/ folder.
*/

const { readdirSync, readdir, copyFile, mkdirSync, existsSync } = require('fs');
const path = require('path');

async function generateStaticFiles() {
    const postsDir = path.join(process.cwd(), '/blog/posts');
    const postSlugs = readdirSync(postsDir);
    const copyFilePromises = [];
    postSlugs.forEach(postSlug => {
        const postLocalContentDir = path.join(postsDir, postSlug, 'public');
        const postPublicDir = path.join(process.cwd(), 'public', 'blog-content', postSlug);

        if (!existsSync(postLocalContentDir)) {
            return;
        }

        mkdirSync(postPublicDir, { recursive: true });
        readdir(postLocalContentDir, (err, files) => {
            if (postLocalContentDir.includes('terms-of-service') || postLocalContentDir.includes('privacy-policy')) {
                // No public files expected
            } else if (err) {
                console.error('Error reading postLocalContentDir');
                throw err;
            } else {
                files.forEach(file => {
                    const fileSrcPath = path.join(postLocalContentDir, file);
                    const fileDestPath = path.join(postPublicDir, file);
                    copyFilePromises.push(
                        copyFile(fileSrcPath, fileDestPath, (copyErr) => {
                            if (copyErr) {
                                console.error('Error copying public blog content to Next.js /public/ dir.');
                                throw copyErr;
                            }
                        }),
                    );
                });
            }
        });
    });
    await Promise.all(copyFilePromises);
    console.log('All public blog content has been moved to Next.js /public/ dir.');
}

generateStaticFiles();
