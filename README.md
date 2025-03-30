# Netlify Template

Use this template to create a react app with backend to be deployed to Netlify.

# Manual Steps

1. Create react project using vite

```
npm create vite -- -t react netlify-template
```

2. Open newly created folder in VS Code
3. Install dependencies

```
npm install
```

4. Install dependencies for backend with netlify related packages

```
npm install express mongoose dotenv serverless-http
```

5. Create a folder called `functions`
6. Add express API code in a separate file called `app.js`, exclude `app.listen` code.
7. Import the `app` from `app.js` and add `app.listen` code as given below in another file called `app-local.js`

```js
import { app } from "./app.js";

app.listen(5000, () => {
  console.log("Server started at 5000");
});
```

8. Import the `app` from `app.js` and add below code in another file called `app-netlify.js`

```js
import serverless from "serverless-http";

import { app } from "./app.js";

export const handler = serverless(app);
```

9. Create a file called `netlify.toml` at the top level with below content

```toml
[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"
[[redirects]]
  force = true
  from = "/api/*"
  status = 200
  to = "/.netlify/functions/app-netlify/:splat"
```
