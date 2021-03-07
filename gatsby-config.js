const siteTitle = "gatsby-starter-typescript-deluxe";
const siteDescription =
  "A Gatsby starter with TypeScript, Storybook, Styled Components, Framer Motion, Jest, and more.";
const siteAuthor = "@gojutin";
const siteUrl = "https://gatsby-starter-typescript-deluxe.netlify.com";
const siteImage = `${siteUrl}/icons/icon_512x512.png`;
const siteKeywords = ["gatsby", "typescript", "starter", "javascript", "react"];

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    author: siteAuthor,
    url: siteUrl,
    keywords: siteKeywords,
    image: siteImage,
  },
  plugins: [
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: `f86abde781d4f400fa0e2fd0f119df6279bb2434`,
        graphQLQuery: `
        query {
          user(login: "monichre") {
            login
            status {
              message
            }
            avatarUrl
            bio
            repositoriesContributedTo(first: 20) {
              edges {
                node {
                  name
                  url
                  owner {
                    login
                  }
                }
              }
            }
            pinnedItems(first:10) {
              edges {
                node{
                  ...on Repository {
                    name
                    url
                    owner {
                      login
                    }
                  }

                }
              }
            }
            repositories(first: 20, orderBy: {field: STARGAZERS, direction: DESC}) {
              edges {
                node {
                  name
                  description
                  url
                  stargazers {
                    totalCount
                  }
                  readme: object(expression:"master:README.md"){
                    ... on Blob{
                      text
                    }
                  }
                }
              }
            }
          }
        }`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: "content",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: "data",
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-plugin-react-axe",
      options: {
        showInProduction: false,
        // Options to pass to axe-core.
        // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
        axeOptions: {
          // Your axe-core options.
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
        icons: [
          {
            src: "icons/icon_512x512.png",
            sizes: "512x512",
          },
          {
            src: "icons/icon_192x192.png",
            sizes: "192x192",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
