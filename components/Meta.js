import React from "react";
import Head from "next/head";

import { site } from "../config";

export const Meta = () => (
  <Head>
    <title>{site.name}</title>
  </Head>
);
