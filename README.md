# HAIS - HPI AI Safety Club

Static website for the HPI AI Safety Club, built with [Hugo](https://gohugo.io/) and deployed on GitHub Pages. The generated site uses semantic HTML, plain CSS, and a few lines of vanilla JavaScript for the spam-resistant email link. It has no client-side framework or server-side runtime.

## Local development

Hugo **v0.160.0 or newer** is recommended.

```sh
hugo server
```

Open the URL printed by Hugo. To create the production site in `public/`:

```sh
hugo --minify
```

Set `baseURL` in `hugo.toml` if the repository or deployment URL changes.

## Project structure

- `content/` - legal pages and page metadata
- `layouts/` - Hugo templates and partials
- `assets/css/` - site styles, processed and fingerprinted by Hugo Pipes
- `assets/js/` - minimal progressive-enhancement JavaScript
- `static/images/` - ready-to-serve WebP assets
- `agent-instructions/` - original copy and source images

## Image processing

The checked-in WebP files were processed once with **ImageMagick 7.1.2-12**. There is deliberately no image-processing script or image dependency in the project. Processing consisted of applying EXIF orientation, removing metadata, constraining large event photographs to 1800 × 1350 px without upscaling, and encoding them as WebP at quality 82. Organizer portraits use quality 84.

| Source | Output | Source size | Output size |
| --- | --- | ---: | ---: |
| `slideshow/cover.jpg` | `static/images/slideshow/cover.webp` | 3700×2775 | 1800×1350 |
| `slideshow/jan.jpg` | `static/images/slideshow/jan.webp` | 4624×3472 | 1798×1350 |
| `daniel.jpg` | `static/images/organizers/daniel.webp` | 640×640 | 640×640 |
| `jan.png` | `static/images/organizers/jan.webp` | 506×506 | 506×506 |

Representative commands:

```sh
# Event photograph
magick source.jpg -auto-orient -strip -resize '1800x1350>' -quality 82 output.webp

# Organizer portrait
magick source.jpg -auto-orient -strip -resize '800x800>' -quality 84 output.webp
```

Jan's transparent PNG was flattened against the site's warm paper color (`#f3eee5`) before WebP conversion. The existing HPI WebP was copied without re-encoding.

The Pathfinder source SVG was not valid as a standalone SVG because it lacked the `xmlns="http://www.w3.org/2000/svg"` namespace. The namespace was added in a temporary copy, which was rasterized at 316×64 px (twice its intrinsic dimensions) to `static/images/partners/pathfinder.webp` at WebP quality 90. The repaired intermediate SVG was then removed.

## Deployment

Pushing to `main` triggers the workflow in `.github/workflows/hugo.yml`. GitHub Actions builds the static output and publishes it through GitHub Pages. In the repository settings, the Pages source must be set to **GitHub Actions**.
