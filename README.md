# Config FireStore

- Tạo Project và config firebase trong file firebase.js
- Tạo database firestore
- Setting Rules cho database

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

- Tạo collection `categories`. Tạo 1 record đầu tiên với `id là DocRef`, `color`, `name`
- Tạo index:
```
CollectionID: articles
Fileds indexed: category_id Ascending created_at Descending
Query Scope: Collection
Status: Enabled
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

