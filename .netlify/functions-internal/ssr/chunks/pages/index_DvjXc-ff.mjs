import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead } from '../astro_DmVzWyap.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/config.js';
import { Blog, Client, Author, Comment, CheckResult } from '@cedx/akismet';
/* empty css                          */

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN ?? "8ae06d7d1c939d7ecca1f8787e694d2f3275058b:gbailwmz98kg0o3yfj1tagm0gs7u:gbailwmz98kg0o3yfj1tagm0gs7u", {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const GuestBook = asDrizzleTable("GuestBook", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "GuestBook", "primaryKey": true } }, "author": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "author", "collection": "GuestBook", "primaryKey": false, "optional": false } }, "content": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "content", "collection": "GuestBook", "primaryKey": false, "optional": false } }, "timestamp": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "timestamp", "collection": "GuestBook", "default": { "__serializedSQL": true, "sql": "CURRENT_TIMESTAMP" } } } }, "deprecated": false }, false);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (Astro2.request.method === "POST") {
    const blog = new Blog({ url: "https://www.ryantrimble.com/" }), client = new Client("244a22c20216", blog);
    let formData = await Astro2.request.formData(), author = formData.get("author"), content = formData.get("content"), isValid = false;
    try {
      isValid = await client.verifyKey();
    } catch (error) {
      handleError(error);
    }
    if (isValid) {
      if (typeof author === "string" && typeof content === "string") {
        try {
          let commentAuthor = new Author({
            name: author
          });
          let comment = new Comment({
            author: commentAuthor,
            content
          });
          const result = await client.checkComment(comment);
          if (result === CheckResult.ham) {
            await db.insert(GuestBook).values({ author, content });
          }
        } catch (error) {
          if (typeof error === "string" || typeof error === "object") {
            handleError(error);
          }
        }
      }
    }
  }
  function handleError(error) {
    if (typeof error === "string" || typeof error === "object") {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`An error occurred: ${message}`);
    }
  }
  const guestBook = await db.select().from(GuestBook);
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title><link rel="stylesheet" href="https://unpkg.com/@mrtrimble/untitled-design-system@0.0.1-2/lib/style.css">${renderHead()}</head> <body data-astro-cid-j7pv25f6> <div class="skip-link" data-astro-cid-j7pv25f6><a href="#main-content" data-astro-cid-j7pv25f6>Skip to content.</a></div> <header class="container mx-auto text-center mt-lg" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>This is a Guest Book.</h1> <div class="mt-sm" data-astro-cid-j7pv25f6> <button type="button" class="button modal-toggle" data-target="dialog-modal" data-astro-cid-j7pv25f6> Sign here </button> </div> </header> <main id="main-content" class="container mx-auto px-sm mt-sm flow" style="--container-max-width: 60ch;" data-astro-cid-j7pv25f6> <dl class="flow flow-sm" data-astro-cid-j7pv25f6> ${guestBook.map(({ author, content, timestamp }) => renderTemplate`<div class="card" data-astro-cid-j7pv25f6> <dt data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${author}</strong> </dt> <dd data-astro-cid-j7pv25f6>${content}</dd> <dd data-astro-cid-j7pv25f6> ${timestamp.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </dd> </div>`).reverse()} </dl> <dialog class="modal" id="dialog-modal" role="dialog" data-astro-cid-j7pv25f6> <div class="modal-inner" data-astro-cid-j7pv25f6> <h4 data-astro-cid-j7pv25f6>Leave a message:</h4> <form method="POST" class="grid flow flow-sm" data-astro-cid-j7pv25f6> <label for="author" data-astro-cid-j7pv25f6>
Author
<input id="author" name="author" data-astro-cid-j7pv25f6> </label> <label for="content" data-astro-cid-j7pv25f6>
Content
<textarea id="content" name="content" data-astro-cid-j7pv25f6></textarea> </label> <div class="flex gap gap-sm justify-end" data-astro-cid-j7pv25f6> <button class="button secondary modal-toggle" data-target="dialog-modal" type="reset" data-astro-cid-j7pv25f6>Cancel</button> <button type="submit" data-astro-cid-j7pv25f6>Leave your mark</button> </div> </form> </div> </dialog> </main> <footer class="container mx-auto text-center my-lg" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>Made with 💜 by Ryan</p> </footer>  </body> </html> `;
}, "/Users/ryantrimble/Development/astro-db-test/src/pages/index.astro", void 0);
const $$file = "/Users/ryantrimble/Development/astro-db-test/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
