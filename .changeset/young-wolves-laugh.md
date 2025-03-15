---
"eri": minor
---

Improve pks handling using React Router middlewares.
This should make it available in HTTP methods other than just GET.
The middleware is registered globally in `root.tsx` so no need to use it in-place anymore.
