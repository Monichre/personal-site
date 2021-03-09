// import React from "react";

// import { useStaticQuery, graphql } from "gatsby";

// export const useSiteContent = () => {
//   const staticData = useStaticQuery(graphql`
//     query SiteDataQuery {
//       site {
//         siteMetadata {
//           title
//           description
//         }
//       }
//       allFile {
//         nodes {
//           childMarkdownRemark {
//             frontmatter {
//               date
//               title
//               slug
//             }
//           }
//           name
//           relativeDirectory
//         }
//       }
//     }
//   `);
//   const {
//     allFile: { nodes },
//   } = staticData;

//   const siteContent: { initiatives: any; workHistory: any } = nodes.reduce(
//     (acc, node) => {
//       const { relativeDirectory } = node;
//       if (acc[relativeDirectory]) {
//         acc[relativeDirectory].push(node);
//       }
//       return acc;
//     },
//     { initiatives: [], workHistory: [] }
//   );
//   return { siteContent };
// };
