import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'Portfolio CMS',
    },
  },

  collections: {
    contributions: collection({
      label: 'Contributions',
      slugField: 'title',
      path: 'src/pages/contributions/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        body: fields.mdx({ label: 'Body' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', validation: { length: { min: 1 } } }),
        image: fields.image({ label: 'Image', directory: 'public/img', publicPath: '/img/', validation: { isRequired: true } }),
        link: fields.text({ label: 'Link' }),
        weight: fields.integer({ label: 'Weight', defaultValue: 400 }),
        sitemap: fields.array(
          fields.object(
            { priority: fields.number({ label: 'Priority' }) },
            { label: 'Sitemap Entry' }
          ),
          { label: 'Sitemap' }
        ),
        layout: fields.ignored(),
        type: fields.ignored(),
      },
    }),

    creations: collection({
      label: 'Creations',
      slugField: 'title',
      path: 'src/pages/creations/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        body: fields.mdx({ label: 'Body' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        image: fields.image({ label: 'Image', directory: 'public/img', publicPath: '/img/', validation: { isRequired: true } }),
        link: fields.text({ label: 'Link' }),
        weight: fields.integer({ label: 'Weight', defaultValue: 400 }),
        layout: fields.ignored(),
        type: fields.ignored(),
      },
    }),

    publications: collection({
      label: 'Publications',
      slugField: 'title',
      path: 'src/pages/publications/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        date: fields.datetime({ label: 'Publish Date', validation: { isRequired: true } }),
        pubtype: fields.text({ label: 'Publish Type' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        body: fields.mdx({ label: 'Body' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        image: fields.image({ label: 'Image', directory: 'public/img', publicPath: '/img/', validation: { isRequired: true } }),
        link: fields.text({ label: 'Link' }),
        weight: fields.integer({ label: 'Weight', defaultValue: 400 }),
        sitemap: fields.array(
          fields.object(
            { priority: fields.number({ label: 'Priority' }) },
            { label: 'Sitemap Entry' }
          ),
          { label: 'Sitemap' }
        ),
        layout: fields.ignored(),
        type: fields.ignored(),
      },
    }),
  },
});
