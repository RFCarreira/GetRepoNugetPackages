import { getInput, setOutput, setFailed } from '@actions/core';
import { Octokit } from "octokit";

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');

  const octokit = new Octokit({
    auth: `${token}`
  })

  const  data = await octokit.request('GET /user/packages', { package_type: "nuget"});
  const packagesNames = data.map(x => x.name)

  const payload = JSON.stringify(packagesNames, undefined, 2)
  console.log(`The event payload: ${payload}`);

  setOutput("names", packagesNames);

} catch (error) {
  
    setFailed(error.message);

}