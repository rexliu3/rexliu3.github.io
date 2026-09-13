# Rex's Personal Website
Find it here: [rexliu.dev](rexliu.dev)

## Content management

The site reads all profile, apartment, experience, project, education, community, city, interest, and music metadata from the public `production` dataset in the **Rex’s Internet Apartment** Sanity project.

To edit content locally:

```bash
npm --prefix studio install
npm run sanity:dev
```

The Studio is configured in `studio/` and deployed at [rex-internet-apartment.sanity.studio](https://rex-internet-apartment.sanity.studio/). Publish changes there and the application will pick them up from Sanity's API CDN.

To restore the current source content into a new or empty dataset, provide a write token and run the idempotent seed:

```bash
SANITY_API_TOKEN=... npm run sanity:seed
```

Optional `SANITY_PROJECT_ID` and `SANITY_DATASET` environment variables override the default target. The write token is used only by the seed script and must never be exposed to the browser or committed.
