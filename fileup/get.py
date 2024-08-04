class URLBuilder:
    @staticmethod
    def github(user, repo, branch, file):
        return f"https://raw.githubusercontent.com/{user}/{repo}/{branch}/{file}"

    @staticmethod
    def gitlab(user, repo, branch, file):
        return f"https://gitlab.com/{user}/{repo}/-/raw/{branch}/{file}"

    @staticmethod
    def bitbucket(user, repo, branch, file):
        return f"https://bitbucket.org/{user}/{repo}/raw/{branch}/{file}"
