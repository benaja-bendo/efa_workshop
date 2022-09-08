/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
import { fetch } from "undici";

// function escapeHtml(text: string): string {
//   var map = {
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#039;",
//   };

//   return text.replace(/[&<>"']/g, function (m) {
//     return map[m];
//   });
// }

Route.get("/", async ({ view, request }) => {
  if (Object.keys(request.all()).length === 0) {
    return view.render("welcome", { datas: [] });
  }

  const { q, lang, max, sortby } = request.all();

  const url = `https://gnews.io/api/v4/search?q=${
    q == "" ? "bitcoin" : q
  }&lang=${lang == "" ? "fr" : lang}&max=${
    max == "" ? 20 : max
  }&country=fr&sortby=${sortby}&token=943c6ea25801e2dd81bca4003c5f6d88`;

  const res = await fetch(url);
  const { articles }: any = await res.json();

  return view.render("welcome", { datas: articles });
});
