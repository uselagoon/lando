'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'lagoon-ruby',
  config: {
    version: 'custom',
    confSrc: __dirname,
    command: '/sbin/tini -- /lagoon/entrypoints.sh bundle exec puma -C config/puma.rb',
    port: '3000',
    moreHttpPorts: ['3000'],
  },
  parent: '_lagoon',
  builder: (parent, config) => class LandoLagoonRuby extends parent {
    constructor(id, options = {}, factory) {
      options = _.merge({}, config, options);

      // Build ruby
      const ruby = {
        command: options.command,
      };

      // Add in the ruby service and push downstream
      super(id, options, {services: _.set({}, options.name, ruby)});
    };
  },
};
