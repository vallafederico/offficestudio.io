export async function getPages() {
  const pages = import.meta.glob("../pages/work/*.md");
  const pageArray = [];

  for (const path in pages) {
    const w = await pages[path]();
    pageArray.push(w);
  }

  // sort by date
  pageArray.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );

  // uncheck featured

  // push to global store

  return pageArray;
}

// webgl Assets
export async function getGlPages() {
  const array = await getPages();

  return array.map((item, i) => {
    const { modelurl, url } = item.frontmatter;
    return {
      i,
      modelurl,
      url: item.url,
    };
  });
}
