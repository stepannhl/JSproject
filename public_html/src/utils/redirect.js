const rootdir = "/src/pages"
export const redirect = (page, catalog)=>{
    const path = [rootdir, catalog, page, `${page}.html`].filter(Boolean).join('/')
    window.location.replace(path)
}