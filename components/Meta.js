import React from "react";
import Head from "next/head";

import { site } from "../config";

export const Meta = props => {
  const title = props.title ? `${props.title} - ${site.name}` : site.name;
  const description = props.description ? props.description : site.description;
  const image = props.image ? props.image : site.image;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="author"
        content="Daniel Martins, daniellmarttins@hotmail.com"
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={site.base} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
