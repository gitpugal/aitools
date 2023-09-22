const EXTERNAL_DATA_URL = 'https://aitoolsnext.com/';

function generateSiteMap({ tools, categories }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://aitoolsnext.com</loc>
     </url>
     <url>
       <loc>https://aitoolsnext.com/categroies</loc>
     </url>
     <url>
       <loc>https://aitoolsnext.com/tools</loc>
     </url>
     <url>
       <loc>https://aitoolsnext.com/deals</loc>
     </url>
     <url>
       <loc>https://aitoolsnext.com/profile</loc>
     </url>
     ${tools
      .map(({ id }) => {
        return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/tools/${id}`}</loc>
       </url>
     `;
      })
      .join('')}

            ${categories
      .map(({ id }) => {
        return `
         <url>
             <loc>${`${EXTERNAL_DATA_URL}/categories/${id}`}</loc>
         </url>
       `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
}

export async function getServerSideProps({ res }) {
  const toolsRequest = await fetch("https://aitoolsnext.com/api/tools");
  const tools = await toolsRequest.json();
  const categoriesRequest = await fetch("https://aitoolsnext.com/api/categories");
  const categories = await categoriesRequest.json();



  const sitemap = generateSiteMap({ tools: tools, categories: categories });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;