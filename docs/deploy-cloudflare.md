# Deploying llm.energy

llm.energy is split across two hosts:

| Hostname | What it serves | Host |
|----------|----------------|------|
| `llm.energy`, `www.llm.energy` | Next.js app (UI and `/api/*`) | Cloud Run service `llm-energy` (project `aerial-vehicle-466722-p5`, region `us-central1`) behind the Cloudflare Worker `llm-energy-proxy` |
| `docs.llm.energy` | MkDocs documentation from `docs-site/` | Cloudflare Pages project `llm-energy` |

The `llm.energy` zone lives on Cloudflare. At Namecheap, the domain's nameservers point to Cloudflare.

## Why there's a Worker in front of Cloud Run

A Cloud Run domain mapping only works for a domain verified in Google Search Console under the deploying account. Instead, the Worker in [`deploy/cloudflare-proxy/`](../deploy/cloudflare-proxy/) is attached to the hostnames as a Workers Custom Domain and forwards each request to the `run.app` URL. Along the way it:

- sets `X-Forwarded-Host` to the public hostname and `X-Forwarded-Proto: https`
- passes redirects through unchanged (`redirect: "manual"`)
- rewrites a `Location` header that points at the `run.app` origin back to the public hostname

Cloudflare creates the DNS records and the certificate for a Workers Custom Domain itself. Don't add `A` or `CNAME` records for `llm.energy` or `www`.

## App (Cloud Run)

The repository has no Dockerfile, so Cloud Run builds from source with Google Cloud buildpacks. Run from the repository root:

```bash
P=aerial-vehicle-466722-p5
gcloud run deploy llm-energy --source . \
  --region us-central1 --project "$P" \
  --service-account "three-ws@$P.iam.gserviceaccount.com" \
  --build-service-account "projects/$P/serviceAccounts/three-ws-build@$P.iam.gserviceaccount.com" \
  --update-secrets ADMIN_KEY=llm-energy-admin-key:latest \
  --memory 1Gi --cpu 1 --allow-unauthenticated
```

### Secrets and environment

| Variable | Source | Notes |
|----------|--------|-------|
| `ADMIN_KEY` | Secret Manager `llm-energy-admin-key` | Required by `/api/cache`. The runtime service account `three-ws` has `roles/secretmanager.secretAccessor` on it. |
| `ANTHROPIC_API_KEY` | not set | `/api/generate-install` returns `503` until it's set. To enable it, store the key as a secret and add `--update-secrets ANTHROPIC_API_KEY=<secret>:latest`. |
| `VERIFY_TIMEOUT_MS`, `VERIFY_CACHE_TTL_MS`, `HEALTH_TIMEOUT_MS` | defaults | Override with `--update-env-vars`. |

To rotate the admin key:

```bash
openssl rand -hex 32 | tr -d '\n' | gcloud secrets versions add llm-energy-admin-key --data-file=-
gcloud run services update llm-energy --region us-central1 --update-secrets ADMIN_KEY=llm-energy-admin-key:latest
```

## Proxy Worker

[`deploy/cloudflare-proxy/wrangler.toml`](../deploy/cloudflare-proxy/wrangler.toml) sets the origin URL (`ORIGIN`) and the two custom domains. Redeploy with an API token that has Workers Scripts:Edit and Zone:Edit on `llm.energy`:

```bash
cd deploy/cloudflare-proxy
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler@4 deploy
```

If the Cloud Run service is recreated under a different URL, update `ORIGIN` and redeploy the Worker.

## Docs (Cloudflare Pages)

```bash
cd docs-site
pip install -r requirements.txt
mkdocs build --strict -d ../_site
cd ..
npx wrangler@4 pages deploy _site --project-name=llm-energy --branch=main
```

[`.github/workflows/cloudflare-pages.yml`](../.github/workflows/cloudflare-pages.yml) does the same thing on each push to `main` that touches `docs-site/`. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. `public/docs/` holds the same build. The Next.js app redirects `/docs` and `/docs/<page>` to `https://docs.llm.energy/` (see `redirects()` in [`next.config.mjs`](../next.config.mjs)), so the Pages site is the single canonical docs URL; files with an extension under `/docs`, such as `/docs/llms.txt`, are still served from `public/`.

## Verify

```bash
curl -sI https://llm.energy | head -1                 # 200 (Worker -> Cloud Run)
curl -s -o /dev/null -w '%{http_code}\n' https://llm.energy/api/extract   # 400 without parameters
curl -sI https://docs.llm.energy | head -1            # 200 (Pages)
curl -s -o /dev/null -w '%{redirect_url}\n' https://llm.energy/docs   # https://docs.llm.energy/
curl -s -X POST -o /dev/null -w '%{http_code}\n' https://llm.energy/api/cache  # 401 without x-admin-key
```

## Rollback

- **App:** `gcloud run services update-traffic llm-energy --region us-central1 --to-revisions <REVISION>=100`. List revisions with `gcloud run revisions list --service llm-energy --region us-central1`.
- **Docs:** in the Cloudflare dashboard, open Pages → `llm-energy` → Deployments and choose **Rollback** on an earlier deployment.
- **Worker:** `npx wrangler@4 rollback` from `deploy/cloudflare-proxy/`.
