# fileup

`fileup` is a npm package that simplifies the auto-update process by updating individual files with remote versions based on file-specific version comments.

## Installation

Install the package using pip:

``` npm install fileup.js ```

## Usage
1. Set the remote file URL in your script.
2. Call the `update` function from the `fileup` package.

### Example

```js
//0.0.1

import update from './fileUpdater.js';
import URLBuilder from './urlBuilder.js';

// Example URL creation
const REMOTE_FILE_URL = URLBuilder.github("mvishok", "tests", "main", "example.js");

async function main() {
    // Your main script logic here
    console.log("Running the main script...");
}

(async () => {
    await update(REMOTE_FILE_URL);
    main();
})();
```

### A Python Version
A Python version of this package is available [here](https://pypi.org/project/fileup.py/)