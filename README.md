
# data-blocks

React based UI Component Library for big data handling, interactions, presentation and visualisation.


_Currently a work in progress - Aug, 2022_


## Authors

[Andy Clarke](https://github.com/andyclarkemedia) - Data Scientist & Engineer @ [UBDC](https://github.com/urbanbigdatacentre)


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Installation
To install this package in your React Project directly from the `npm` registry.
```bash
npm i @urbanbigdatacentre/data-blocks
```
Check it out on `npm` [here](https://www.npmjs.com/package/@urbanbigdatacentre/data-blocks).

## Components
_Currently a work in progress - Aug, 2022_

### Cookies Banner
A customizable floating cookies banner sitting at the bottom of pages to control a user's cookie preferences.

Includes a basic description of cookie use and buttons to handle accept / reject behaviour.

__Usage__

_Import the component_
```js
import {CookiesBanner} from '@urbanbigdatacentre/data-blocks'
```
_Use the component with a `color` prop: string._
```jsx
<CookiesBanner color={"#219FF3"}/>
```

## New Package Releases
This package uses Github Actions to automatically publish to the `npm` registry once a new release has been made on Github.

To make a new release ...

Update the version inside `package.json`

```json
  {
    "version": "0.0.3"
  }
```

Run rollup locally

```bash
  npm run rollup
```

Add all changes to Github repo

```bash
  git add .
```

Commit all changes for new version

```bash
  git commit -m Added Cookies Banner - v.0.0.3
```

Push changes to remote origin

```bash
  git push origin main
```

__Draft__ and __Publish__ new release in Github `data-blocks` repo

Github Actions will automatically create a pipeline to publish the new version to the `npm` registry.

Follow the changes [inside this repo's Actions tab](https://github.com/urbanbigdatacentre/data-blocks/actions).