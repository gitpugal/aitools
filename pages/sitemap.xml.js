const BASE_URL = 'https://aitoolsnext.com';

function generateSiteMap({ tools, categories }) {
  const toolUrls = tools.tools.map(({ slug }) => `${BASE_URL}/tools/${slug}`);
  const categoryUrls = categories.map(({ slug }) => `${BASE_URL}/categories/${slug}`);

  const allUrls = [BASE_URL, `${BASE_URL}/categories`, `${BASE_URL}/tools`, `${BASE_URL}/deals`, ...toolUrls, ...categoryUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allUrls
      .map((url) => {
        return `
       <url>
           <loc>${url}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>`;
}

function Sitemap() {
  // This function should remain here.
}

export async function getServerSideProps({ res }) {
  const toolsRequest = await fetch("https://aitoolsnext.com/api/tools");
  const tools = await toolsRequest.json();
  const categoriesRequest = await fetch("https://aitoolsnext.com/api/getCategories");
  const categories = await categoriesRequest.json();

  const sitemap = generateSiteMap({ tools: tools, categories: categories });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
