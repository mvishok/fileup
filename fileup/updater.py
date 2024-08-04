import os
import sys
import requests

class FileUpdater:
    def __init__(self, remote_url):
        self.remote_url = remote_url
        self.local_path = sys.argv[0]
        self.current_version = self.get_current_version()

    def get_current_version(self):
        # Read the first line of the current file to get the version
        try:
            with open(self.local_path, 'r') as file:
                first_line = file.readline().strip()
                if first_line.startswith("#"):
                    return [first_line.lstrip("#").strip(), None]
        except Exception as e:
            return ["0.0.0", e]  # Default version if not found

    def get_remote_version(self):
        # Fetch the first line of the remote file to get the version
        try:
            response = requests.get(self.remote_url)
            response.raise_for_status()
            first_line = response.text.splitlines()[0].strip()
            if first_line.startswith("#"):
                return [first_line.lstrip("#").strip(), None]
        except Exception as e:
            return ["0.0.0", e]  # Default version if not found

    def download_and_replace_file(self):
        # Download the file from the remote URL
        response = requests.get(self.remote_url)
        response.raise_for_status()
        # Write the file to the local path
        with open(self.local_path, 'wb') as file:
            file.write(response.content)

    def restart_script(self):
        # Restart the script with the same arguments
        os.execv(sys.executable, [sys.executable, self.local_path] + sys.argv[1:])

    def update(self):
        remote_version = self.get_remote_version()
        if remote_version[1] == None and self.current_version[1] == None:
            if remote_version[0] > self.current_version[0]:
                self.download_and_replace_file()
                self.restart_script()
            else:
                return [True, True]
        
        return [remote_version[1], self.current_version[1]]

# User will create an instance of FileUpdater with the remote URL
def update(remote_url):
    updater = FileUpdater(remote_url)
    return updater.update()

