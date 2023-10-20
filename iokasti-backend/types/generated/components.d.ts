import type { Schema, Attribute } from '@strapi/strapi';

export interface DateUpcomingDates extends Schema.Component {
  collectionName: 'components_date_upcoming_dates';
  info: {
    displayName: 'upcoming_dates';
    description: '';
  };
  attributes: {
    upcoming_date: Attribute.Date;
    from: Attribute.Time;
    to: Attribute.Time;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'date.upcoming-dates': DateUpcomingDates;
    }
  }
}
