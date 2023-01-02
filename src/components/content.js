export async function getPages() {
  const modules = import.meta.glob("../pages/work/*.md");

  const pageArray = [];
  for (const path in modules) {
    pageArray.push(await modules[path]());
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

// webgl Assets
export async function pagesToString() {
  const array = await getGlPages();
  return array;
}
