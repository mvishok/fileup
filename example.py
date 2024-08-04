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
