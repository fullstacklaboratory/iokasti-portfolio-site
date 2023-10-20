'use strict';

/**
 * teaching service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teaching.teaching');
