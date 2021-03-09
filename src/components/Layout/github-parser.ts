/**
 * Parses raw data and returns usable data for the page
 * @param Object rawData raw Data
 * @ return Object
 */
export const parseData = ({
  githubData: {
    data: { user },
  },
}) => {
  const {
    avatarUrl: avatar,
    bio,
    status: { message: status },
    contributionsCollection: {
      commitContributionsByRepository,
      totalCommitContributions,
      totalPullRequestContributions,
      totalPullRequestReviewContributions,
      totalRepositoriesWithContributedCommits,
      totalRepositoriesWithContributedPullRequests,
      totalRepositoryContributions,
      contributionCalendar,
    },
    organizations,
    pinnedItems,
  } = user;

  const contributions = [].concat(
    [],
    ...commitContributionsByRepository.map(({ contributions }: any) =>
      contributions.edges.map(({ node }) => node)
    )
  );

  const pinned = pinnedItems?.edges?.map((edge) => edge.node);

  const topRepositories = user.topRepositories.edges
    .map((edge) => edge.node)
    .map((repo) => {
      const repoContributions = contributions.filter(
        (contribution: any) => contribution?.repository?.name === repo.name
      );
      return {
        ...repo,
        contributions: repoContributions,
      };
    });

  return {
    contributions,
    profile: { avatar, bio, status },
    totalCommitContributions,
    totalPullRequestContributions,
    totalPullRequestReviewContributions,
    totalRepositoriesWithContributedCommits,
    totalRepositoriesWithContributedPullRequests,
    totalRepositoryContributions,
    pinnedItems: pinned,
    topRepositories,
    organizations: organizations.edges.map((edge) => edge.node),
    contributionCalendar,
  };
};

/**
 * Get an array of image urls from markdown text (usually a README)
 * @param {String} s The markdown text as a string
 * @return {Array<String>} An array of image urls
 */
export const getImagesFromMarkdown = (s) => {
  // notice the 4 capturing groups of this regular expression
  const regex = /(!\[.*?\]\()(.+?)(\))/g;
  const imageUrls = [];
  let match;
  // we get the urls from the 3rd captured group
  while ((match = regex.exec(s))) {
    imageUrls.push(match[2]);
  }
  return imageUrls;
};

/**
 * Parse the name inside an object by cleaning it
 * @param {Object} o object input
 * return {Object}
 */
export const parseName = (o) =>
  o.name ? Object.assign({}, o, { name: o.name.replace(/-/g, " ") }) : o;

/**
 * Parse the readme inside an object and add imageUrls to it if possible
 * @param {Object} o object input
 * return {Object}
 */
export const parseReadme = (o) =>
  o.readme
    ? Object.assign({}, o, {
        readme: {
          text: o.readme.text,
          // getImagesFromMarkdown will always return at least an empty array.
          // Therefore, we attempt to get the first image
          imageUrl: getImagesFromMarkdown(o.readme.text)[0],
        },
      })
    : o;
