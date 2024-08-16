import fs from "fs";
import https from "https";
import { exec } from "child_process";

class FileUpdater {
    constructor(remoteUrl) {
        this.remoteUrl = remoteUrl;
        this.localPath = process.argv[1];
        this.currentVersion = this.getCurrentVersion();
    }

    getCurrentVersion() {
        try {
            const data = fs.readFileSync(this.localPath, "utf8");
            const firstLine = data.split("\n")[0].trim();
            if (firstLine.startsWith("//")) {
                return [firstLine.replace("//", "").trim(), null];
            }
        } catch (error) {
            return ["0.0.0", error]; // Default version if not found
        }
    }

    getRemoteVersion() {
        return new Promise((resolve) => {
            https
                .get(this.remoteUrl, (res) => {
                    let data = "";
                    res.on("data", (chunk) => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        const firstLine = data.split("\n")[0].trim();
                        if (firstLine.startsWith("//")) {
                            resolve([firstLine.replace("//", "").trim(), null]);
                        } else {
                            resolve(["0.0.0", new Error("No version found")]);
                        }
                    });
                })
                .on("error", (e) => {
                    resolve(["0.0.0", e]);
                });
        });
    }

    async downloadAndReplaceFile() {
        return new Promise((resolve, reject) => {
            https
                .get(this.remoteUrl, (res) => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Failed to get file: ${res.statusCode}`));
                        return;
                    }

                    const fileStream = fs.createWriteStream(this.localPath);
                    res.pipe(fileStream);

                    fileStream.on("finish", () => {
                        fileStream.close(resolve); // Close and resolve the promise
                    });

                    fileStream.on("error", (err) => {
                        fs.unlink(this.localPath, () => reject(err)); // Delete the file on error and reject the promise
                    });
                })
                .on("error", (err) => {
                    reject(err); // Handle network errors
                });
        });
    }

    restartScript() {
        // Using `exec` to restart the script with the same arguments
        exec(
            `node ${this.localPath} ${process.argv.slice(2).join(" ")}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error restarting script: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
                console.log(stdout);
            }
        );
    }

    async downloadAndReplaceFile() {
        try {
            const res = await new Promise((resolve, reject) => {
                https
                    .get(this.remoteUrl, (res) => {
                        const fileStream = fs.createWriteStream(this.localPath);
                        res.pipe(fileStream);
                        fileStream.on("finish", () => {
                            fileStream.close();
                            resolve();
                        });
                    })
                    .on("error", (err) => {
                        reject(err);
                    });
            });
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default async function update(remoteUrl) {
    const updater = new FileUpdater(remoteUrl);
    const remoteVersion = await updater.getRemoteVersion();
    if (!remoteVersion[1] && !updater.currentVersion[1]) {
        if (remoteVersion[0] > updater.currentVersion[0]) {
            try {
                await updater.downloadAndReplaceFile();
                updater.restartScript();
                return [true, null]; // Indicate success
            } catch (err) {
                return [false, err]; // Return any errors
            }
        } else {
            return [true, true]; // No update needed
        }
    }
    return [remoteVersion[1], updater.currentVersion[1]]; // Return any errors
}
