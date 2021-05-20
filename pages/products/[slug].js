import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/cknu741214cwd01wj4aev8oxz/master"
);

export async function getStaticProps({ params }) {
  const { cloth } = await graphcms.request(
    `
    query ProductPageQuery($slug: String!) {
      cloth(where: { slug: $slug }) {
        name
        description
        price
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      cloth,
    },
  };
}

export async function getStaticPaths() {
  const { cloth } = await graphcms.request(`
    {
      cloth {
        slug
        name
      }
    }
  `);

  return {
    paths: cloth.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ cloth }) => (
  <div>
    <h1>{cloth.name}</h1>
    <p>{cloth.description}</p>
    <p>{cloth.price / 100}</p>
  </div>
);
