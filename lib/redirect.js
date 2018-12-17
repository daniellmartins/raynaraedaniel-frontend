import Router from "next/router";

export const redirect = (context, href, asPath = null) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: !asPath ? href : asPath });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    const as = !asPath ? href : asPath;
    Router.replace(href, as);
  }
};
