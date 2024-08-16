export default class URLBuilder {
    static github(user, repo, branch, file) {
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${file}`;
    }

    static gitlab(user, repo, branch, file) {
        return `https://gitlab.com/${user}/${repo}/-/raw/${branch}/${file}`;
    }

    static bitbucket(user, repo, branch, file) {
        return `https://bitbucket.org/${user}/${repo}/raw/${branch}/${file}`;
    }
}
