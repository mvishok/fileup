# fileup

`fileup` is a Python package that simplifies the auto-update process by updating individual files with remote versions based on file-specific version comments.

## Installation

Install the package using pip:

``` pip install fileup ```

## Usage
1. Set the remote file URL in your script.
2. Call the `update` function from the `fileup` package.

### Example

```python
#0.0.1

import fileup
from fileup import RepoURLBuilder

# Example URL creation
REMOTE_FILE_URL = RepoURLBuilder.github("mvishok", "tests", "main", "example.py")

def main():
    # Your main script logic here
    print("Running the main script...")

if __name__ == "__main__":
    fileup.update(REMOTE_FILE_URL)
    main()
```

### A NPM Version
A NPM version of this package is available [here](https://www.npmjs.com/package/jsfileup).