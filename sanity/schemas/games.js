export default {
  title: 'Game',
  name: 'game',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Gametitle',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      fields: [
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      //kilde:https://www.sanity.io/docs/slug-type
      //kilde: https://github.com/toremake/UIN23_sanity_sandbox/blob/main/sanity/schemas/products.js
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w-]+/g, '-')
            .slice(0, 200),
      },
    },
    {
      name: 'apiid',
      type: 'number',
      title: 'Api-id',
    },
    {
      name: 'hoursplayed',
      type: 'number',
      title: 'Hours-played',
    },
    {
      name: 'genre',
      type: 'reference',
      to: {type: 'genre'},
      title: 'Genre',
    },
  ],
}
