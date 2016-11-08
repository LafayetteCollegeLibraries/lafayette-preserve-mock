# MetaDB Mock Server

## A server which mocks responses for the MetaDB User Interface (UI) App.

## Usage
```
$ gem install sass
$ npm i
$ gulp
```
The mock server should now be accessible at `http://localhost:3000`

### Usage with the MetaDB UI App.
_(Running the MetaDB UI within a separate terminal)_
```
$ AUTH_BASE_URL="http://authority.lafayette.edu/ns" API_BASE_URL="http://localhost:3000" SEARCH_BASE_URL="$API_BASE_URL/catalog.json" npm run dev
```
