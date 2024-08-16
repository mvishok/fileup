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
