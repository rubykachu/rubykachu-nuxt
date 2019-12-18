# Start App

## Config FireStore

- Tạo Project và config firebase trong file firebase.js
- Tạo database firestore
- Setting Rules cho database

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null
    }
  }
}
```

** Collection Articles **
```json
{
  "category": {
    "color": "",
    "id": "",
    "name": "",
    "slug": ""
  },
  "id": "DocumentRef",
  "category_id": "",
  "content": "",
  "description": "",
  "title": "",
  "slug": "",
  "image": "",
  "image_thumb": "",
  "reading_time": "",
  "created_at": ""
}
```

** Collection Categories **
```json
{
  "color": "",
  "id": "DocumentRef",
  "name": "",
  "slug": ""
}
```

** Tạo index **
```
CollectionID: articles
Fileds indexed: category_id Ascending created_at Descending
Query Scope: Collection
Status: Enabled
```

## Authentication

Tạo user với method là `Email/Password`

## Build Setup

``` bash
# install dependencies
$ npm run install

# Run server with Local environment
$ npm run dev

# Run server with Production environment
$ npm run prod

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Deploy

Merge vào nhánh firebase sẽ tự động deploy lên host Netlify
