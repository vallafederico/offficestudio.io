export async function getWork() {
  const works = import.meta.glob("../pages/work/*.md");
  const workArray = [];

  for (const path in works) {
    const w = await works[path]();
    workArray.push(w);
  }

  return workArray;
}
