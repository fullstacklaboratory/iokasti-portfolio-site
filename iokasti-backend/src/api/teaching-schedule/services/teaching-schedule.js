'use strict';

/**
 * teaching-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teaching-schedule.teaching-schedule');
