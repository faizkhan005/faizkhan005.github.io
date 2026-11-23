# Portfolio — Faizan Ahmed Khan

A portfolio with a recruiter view (default) and an interactive terminal at `#terminal`. Plain HTML/CSS/JS with no build step.

| File | What it is |
|---|---|
| `data.js` | **All content** (summary, impact numbers, experience, projects, skills, education, links). Edit this to update the site. Wrap text in `**…**` to highlight it. |
| `index.html` | Page shell. After changing CSS/JS, bump the `?v=` number on its links so browsers fetch the new files. |
| `style.css` | Styles and color themes |
| `script.js` | Terminal commands, boot sequence, recruiter view, background animation |
| `assets/Faizan_Ahmed_Khan_Resume.pdf` | Résumé served by the `resume` command and the buttons |

## Run locally
```bash
python -m http.server 5500
```
Then open http://localhost:5500 (recruiter view, the default). Terminal: http://localhost:5500/#terminal

## Publish free on GitHub Pages
1. Create a repo named `faizkhan005.github.io` and push these files to it.
2. In the repo, go to Settings → Pages and set Source to "Deploy from a branch", branch `main`, folder `/`.
3. Your site will be live at `https://faizkhan005.github.io`. The plain URL opens the recruiter view; share `…/#terminal` with engineers.

## Terminal commands
`help`, `whoami`, `about`, `impact`, `experience`, `projects`, `skills`, `education`, `contact`, `resume`, `gui`, `theme <green|amber|cyan|violet>`, `clear`
Hidden ones: `ls`, `cat`, `cd`, `sudo hire faizan`, `matrix`, `coffee`, `history`, `rm`, `exit`, `vim`
