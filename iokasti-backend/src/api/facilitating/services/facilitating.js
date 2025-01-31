'use strict';

/**
 * facilitating service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::facilitating.facilitating');
