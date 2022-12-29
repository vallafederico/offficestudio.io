export async function getPages() {
  const pages = import.meta.glob("../pages/work/*.md");
  const pageArray = [];

  for (const path in pages) {
    // console.log(pages[path]);
    const page = await pages[path]();
    pageArray.push(page);
  }

  // sort by date
  pageArray.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );

  // uncheck featured

  return pageArray;
}

// webgl Assets
export async function getGlPages() {
  const array = await getPages();

  return array.map((item, i) => {
    const { modelurl, textureurl } = item.frontmatter;

    return {
      i,
      modelurl,
      url: item.url,
      textureurl,
    };
  });
}
