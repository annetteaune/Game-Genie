export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'Username',
    },
    {
      name: 'useremail',
      type: 'string',
      title: 'User e-mail',
    },
    {
      name: 'userimage',
      type: 'image',
      title: 'User image',
    },
    {
      name: 'favourites',
      title: 'Favourites',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'game'}],
        },
      ],
    },
  ],
}
