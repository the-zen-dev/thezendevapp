/* eslint-disable node/no-extraneous-require */
'use strict';

const StaticSiteJson = require('broccoli-static-site-json');
const mergeTrees = require('broccoli-merge-trees');
const { readdirSync } = require('fs');
const { join } = require('path');

const contentsJson = new StaticSiteJson('articles', {
  attributes: ['title', 'image', 'created', 'unsplashtext', 'unsplashurl'],
  collate: true,
  contentFolder: 'articles',
  references: ['tags', 'authors'],
  type: 'article',
});

const tagsJson = new StaticSiteJson('tags', {
  type: 'tag',
  contentFolder: 'tags',
  collate: true,
  attributes: ['title', 'type', 'url'],
});

const authorsJson = new StaticSiteJson('authors', {
  type: 'author',
  contentFolder: 'authors',
  collate: true,
  attributes: ['first', 'last', 'site', 'url'],
});

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  urlsForPrember(distDir) {
    return (
      readdirSync(join(distDir, 'articles'))
        // skip the collated file
        .filter((file) => file !== 'all.json')
        .map((file) => `/articles/${file.replace(/\.json$/, '')}`)
    );
  },

  treeForPublic() {
    return mergeTrees([contentsJson, tagsJson, authorsJson]);
  },
};
