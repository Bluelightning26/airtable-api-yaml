### Run:
1. `git update-index --skip-worktree api.yaml` to stop updates of confidential api.yaml being tracked
    - (only first time)
2. insert data from Airtable API in json or yaml format in [api.yaml](api.yaml)
   - I'm not sure why it works when you insert json in the yaml file but it does work and is easier to paste
3. `node clean-data.js` to regenerate the data.yml file with only the wanted information.