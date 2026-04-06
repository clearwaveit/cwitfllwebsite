# ACF JSON (Home Page)

## Import

1. Copy `group_cwit_home_page.json` into your WordPress theme’s **acf-json** folder **or** use **Custom Fields → Tools → Import** and upload the file.
2. If you already have a field group exposing **`homePage`** on the front page, **either**:
   - **Replace:** deactivate/delete the old group (export a backup first), then sync/import this one, **or**
   - **Merge:** do not import the whole file; open this JSON in an editor and copy only the subfield definitions for `heroVideoUrl`, `heroVideoMobileUrl`, `videoUrl` (inside Studios repeater), and `genaiVideoUrl` into your existing group in the ACF UI (same **GraphQL Field Name** values as in this file).
3. **WPGraphQL for ACF** must be active. After import, check **GraphQL IDE** for `page { homePage { ... } }` and confirm the new URL fields appear.
4. **Post types:** `featurePortfolioHome` targets **`portfolio`**; `homeBlogsSelectedPosts` targets **`post`**. Change `post_type` in the JSON if your CPT slugs differ.

## Video URL fields (Cloudflare Stream, CDN, direct MP4)

| Location in admin        | GraphQL field        |
|---------------------------|----------------------|
| Hero → Hero video URL     | `heroVideoUrl`       |
| Hero → Hero video URL (mobile) | `heroVideoMobileUrl` |
| Studios (row) → Video URL | `videoUrl`           |
| Studios (row) → CTA link / button label | `link`, `buttonText` |
| GenAI → GenAI video URL   | `genaiVideoUrl`      |

Paste full URLs, e.g. `https://customer-….cloudflarestream.com/…/downloads/default.mp4`.
