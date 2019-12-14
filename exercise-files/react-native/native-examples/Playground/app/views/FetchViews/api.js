const baseUrl = 'https://api.github.com';

export const getGithubUsers = ({ offset }) => {
  return fetch(`${baseUrl}/users?since=${offset}`)
          .then(response => response.json())
          .catch(console.warn);
};

export const makeGist = (
  activity, 
  { description = '', isPublic = true } = {}
  ) => fetch(`${baseUrl}/gists`, {
    method: 'POST',
    body: JSON.stringify({
      files: {
        'activity.json': {
          content: JSON.stringify(activity),
        },
      },
      description,
      public: isPublic,
    }),
  })
  .then(response => response.json());

