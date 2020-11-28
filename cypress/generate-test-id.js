/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const { default: ShortUniqueId } = require('short-unique-id');

const uid = new ShortUniqueId();

console.log(uid().toLowerCase());
