import Link from "next/link";
import { GraphQLClient } from "graphql-request";
import "tailwindcss/tailwind.css";

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    "https://api-us-east-1.graphcms.com/v2/cknu741214cwd01wj4aev8oxz/master"
  );

  const { cloth } = await graphcms.request(
    `
      { 
        cloth {
          slug
          name
          price
          description
          images{
            id
              url
            
          }

        }
      }
    `
  );

  return {
    props: {
      cloth,
    },
  };
}

export default ({ cloth }) => {
  return (
    <div>
      {cloth.map((cloth, index) => (
        <div className=" w-full  md:flex md:flex-wrap md:p-2 ">
          <div
            className="lg:w-1/4 md:w-1/2 w-5/6 lg:h-1/4 m-auto mb-6 border-2
          lg:m-10 sm:w-3/4 text-center border-gray-100 overflow-hidden shadow-xl
          hover:shadow-md "
          >
            <h3>
              <strong>Product Name:</strong>
              {cloth.name}
            </h3>
            <h3>
              <strong>Description:</strong>
              {cloth.description}
            </h3>
            <h3>
              <strong></strong>
              <h3>
                <strong>Review:</strong>
                {cloth.slug}
              </h3>
            </h3>
            <h3>
              <strong>Price:</strong> {cloth.price}
            </h3>
            <img src={cloth.images.url} />
            {console.log(cloth)}
          </div>
        </div>
      ))}
    </div>
  );
};
