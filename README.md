# Rajdeep Sinh Chavda - Portfolio

Personal portfolio built with Next.js, Tailwind CSS and shadcn/ui, based on the
MIT-licensed [Magic UI portfolio template](https://github.com/magicuidesign/portfolio).

## Run locally

```bash
npm install
npm run dev
```

All site content lives in `src/data/resume.tsx`. The downloadable resume is
`public/Rajdeep-Sinh-Chavda-Resume.pdf`.

## Contact form

The form sends mail through [Web3Forms](https://web3forms.com) (free, no backend).

1. Enter your email on web3forms.com to receive an access key.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Add the same variable in your hosting provider's settings.

Until a key is set, the form opens the visitor's mail app instead.
