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

export interface HomeSectionHomeSections extends Schema.Component {
  collectionName: 'components_home_section_home_sections';
  info: {
    displayName: 'home_section';
    icon: 'apps';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    subtitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    home_section_image: Attribute.Media & Attribute.Required;
    home_section_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 1000;
      }>;
    home_section_url: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    align_content: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required;
  };
}

export interface NotebookImageNotebookEntry extends Schema.Component {
  collectionName: 'components_notebook_image_notebook_entries';
  info: {
    displayName: 'Notebook Entry';
    icon: 'picture';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
    videoUrl: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'date.upcoming-dates': DateUpcomingDates;
      'home-section.home-sections': HomeSectionHomeSections;
      'notebook-image.notebook-entry': NotebookImageNotebookEntry;
    }
  }
}
