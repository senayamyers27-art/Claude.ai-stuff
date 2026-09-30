# Getting the site into Google and Bing

The site already does the work search engines need: every lesson, cheat sheet, comparison and career page is a real
web page with a title, description and structured data, and `sitemap.xml` lists them all (English and Spanish).
What's left is telling the search engines the site is yours, which only you can do.

The site now lives at `https://www.studytocert.com/`, so verify that address.

## Google Search Console

1. Go to <https://search.google.com/search-console> and sign in with your Google account.
2. **Add property** → choose **URL prefix** → enter the site address, `https://www.studytocert.com/`.
3. Pick the **HTML tag** method. Google shows a tag like
   `<meta name="google-site-verification" content="AbC123...">`. Copy only the `content` value.
4. Put it in `site.config.json`:
   ```json
   "searchVerification": { "google": "AbC123...", "bing": "" }
   ```
   (or ask Claude to do it and publish). The build adds the tag to the home page only.
5. Once the site is published with the tag, click **Verify** in Search Console.
6. Open **Sitemaps**, enter `sitemap.xml` and click **Submit**.

Pages usually start appearing within a few days to a few weeks. **Pages** (under Indexing) shows what Google has
indexed and why anything was skipped.

## Bing Webmaster Tools (also covers DuckDuckGo and Yahoo results)

1. Go to <https://www.bing.com/webmasters>. The quickest path is **Import from Google Search Console** once Google is
   verified; it copies the site and sitemap across.
2. Or add the site by hand, choose **HTML meta tag**, and put the `content` value in `searchVerification.bing`.
3. Submit `https://<your address>/sitemap.xml` under **Sitemaps**.

## Nothing else to add

- No tracking is added: verification tags are ownership checks only and send nothing about visitors.
- Content Security Policy is unaffected (meta tags load nothing).
