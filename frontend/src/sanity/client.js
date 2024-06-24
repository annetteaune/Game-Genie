import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "4trl9uor",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-10-21",
});

//kilde for oppsett:
//https://github.com/toremake/UIN2023_sanity_create/blob/main/frontend/src/utils/sanity/client.js

export const writeClient = createClient({
  token: process.env.REACT_APP_SANITY_TOKEN,
  projectId: "4trl9uor",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
});
