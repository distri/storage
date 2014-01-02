(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "storage\n=======\n\nStore data in local storage\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Storage\n=======\n\nA wrapper on the Local Storage API \n\nStore an object in local storage.\n\nMethods\n-------\n\n`set`\n\nYou can store strings\n\n>     Storage.set('name', 'Matt')\n\nNumbers\n\n>     Storage.set('age', 26)\n\nEven objects\n\n>     Storage.set('person', {name: 'Matt', age: 26})\n\n    store = (key, value) ->\n      localStorage[key] = JSON.stringify(value)\n\n      return value\n\n`get` retrieves an object from local storage.\n\n>     Storage.get('name')\n>     # => 'Matt'\n\n>     Storage.get('age')\n>     # => 26\n  \n>     Storage.get('person')\n>     # => { age: 26, name: 'Matt' }\n  \n    retrieve = (key) ->\n      value = localStorage[key]\n  \n      if value?\n        JSON.parse(value)\n\n    module.exports =\n      get: retrieve\n      set: store\n      put: store\n\nAccess an instance of Storage with a specified prefix.\n\nReturns an interface to local storage with the given prefix applied.\n\n      new: (prefix) ->\n        prefix ||= \"\"\n  \n        get: (key) ->\n          retrieve(\"#{prefix}_#{key}\")\n        set: (key, value) ->\n          store(\"#{prefix}_#{key}\", value)\n        put: (key, value) ->\n          store(\"#{prefix}_#{key}\", value)\n",
      "type": "blob"
    },
    "test/storage.coffee": {
      "path": "test/storage.coffee",
      "mode": "100644",
      "content": "Storage = require \"../main\"\n\nequal = assert.equal\n\ndescribe \"Storage\", ->\n  \n  it \"should set and get\", ->\n    object =\n      key: \"test\"\n      cool: true\n      num: 17\n      sub:\n        a: true\n        b: 14\n        c: \"str\"\n  \n    Storage.set(\"__TEST\", object)\n    ret = Storage.get(\"__TEST\")\n    equal ret.key, object.key\n    equal ret.cool, object.cool\n    equal ret.num, object.num\n    equal ret.sub.a, object.sub.a\n    equal ret.sub.b, object.sub.b\n    equal ret.sub.c, object.sub.c\n\n    Storage.set(\"__TEST\", 0)\n    ret = Storage.get(\"__TEST\")\n    equal ret, 0\n\n    Storage.set(\"__TEST\", false)\n    ret = Storage.get(\"__TEST\")\n    equal ret, false\n\n    Storage.set(\"__TEST\", \"\")\n    ret = Storage.get(\"__TEST\")\n    equal ret, \"\"\n\n  it \"should have Storage.new\", ->\n    local = Storage.new(\"TEST\")\n    key = \"a test value\"\n\n    local.set(key, true)\n    equal local.get(key), true\n\n    equal Storage.get(key), null\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var retrieve, store;\n\n  store = function(key, value) {\n    localStorage[key] = JSON.stringify(value);\n    return value;\n  };\n\n  retrieve = function(key) {\n    var value;\n    value = localStorage[key];\n    if (value != null) {\n      return JSON.parse(value);\n    }\n  };\n\n  module.exports = {\n    get: retrieve,\n    set: store,\n    put: store,\n    \"new\": function(prefix) {\n      prefix || (prefix = \"\");\n      return {\n        get: function(key) {\n          return retrieve(\"\" + prefix + \"_\" + key);\n        },\n        set: function(key, value) {\n          return store(\"\" + prefix + \"_\" + key, value);\n        },\n        put: function(key, value) {\n          return store(\"\" + prefix + \"_\" + key, value);\n        }\n      };\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "test/storage": {
      "path": "test/storage",
      "content": "(function() {\n  var Storage, equal;\n\n  Storage = require(\"../main\");\n\n  equal = assert.equal;\n\n  describe(\"Storage\", function() {\n    it(\"should set and get\", function() {\n      var object, ret;\n      object = {\n        key: \"test\",\n        cool: true,\n        num: 17,\n        sub: {\n          a: true,\n          b: 14,\n          c: \"str\"\n        }\n      };\n      Storage.set(\"__TEST\", object);\n      ret = Storage.get(\"__TEST\");\n      equal(ret.key, object.key);\n      equal(ret.cool, object.cool);\n      equal(ret.num, object.num);\n      equal(ret.sub.a, object.sub.a);\n      equal(ret.sub.b, object.sub.b);\n      equal(ret.sub.c, object.sub.c);\n      Storage.set(\"__TEST\", 0);\n      ret = Storage.get(\"__TEST\");\n      equal(ret, 0);\n      Storage.set(\"__TEST\", false);\n      ret = Storage.get(\"__TEST\");\n      equal(ret, false);\n      Storage.set(\"__TEST\", \"\");\n      ret = Storage.get(\"__TEST\");\n      return equal(ret, \"\");\n    });\n    return it(\"should have Storage.new\", function() {\n      var key, local;\n      local = Storage[\"new\"](\"TEST\");\n      key = \"a test value\";\n      local.set(key, true);\n      equal(local.get(key), true);\n      return equal(Storage.get(key), null);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/storage.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\"};",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 15595932,
    "name": "storage",
    "full_name": "distri/storage",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/storage",
    "description": "Store data in local storage",
    "fork": false,
    "url": "https://api.github.com/repos/distri/storage",
    "forks_url": "https://api.github.com/repos/distri/storage/forks",
    "keys_url": "https://api.github.com/repos/distri/storage/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/storage/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/storage/teams",
    "hooks_url": "https://api.github.com/repos/distri/storage/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/storage/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/storage/events",
    "assignees_url": "https://api.github.com/repos/distri/storage/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/storage/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/storage/tags",
    "blobs_url": "https://api.github.com/repos/distri/storage/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/storage/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/storage/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/storage/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/storage/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/storage/languages",
    "stargazers_url": "https://api.github.com/repos/distri/storage/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/storage/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/storage/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/storage/subscription",
    "commits_url": "https://api.github.com/repos/distri/storage/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/storage/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/storage/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/storage/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/storage/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/storage/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/storage/merges",
    "archive_url": "https://api.github.com/repos/distri/storage/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/storage/downloads",
    "issues_url": "https://api.github.com/repos/distri/storage/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/storage/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/storage/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/storage/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/storage/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/storage/releases{/id}",
    "created_at": "2014-01-02T22:58:53Z",
    "updated_at": "2014-01-02T22:58:53Z",
    "pushed_at": "2014-01-02T22:58:53Z",
    "git_url": "git://github.com/distri/storage.git",
    "ssh_url": "git@github.com:distri/storage.git",
    "clone_url": "https://github.com/distri/storage.git",
    "svn_url": "https://github.com/distri/storage",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "defaultBranch": "master"
  },
  "dependencies": {}
});