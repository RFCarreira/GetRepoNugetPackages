import { getInput, setOutput, setFailed } from '@actions/core';
import { Octokit } from "octokit";

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');
  const packageName = getInput('package-name');

  const octokit = new Octokit({
    auth: `${token}`
  })

  const  {data} = await octokit.request('GET /user/packages/{package_type}/{package_name}/versions', {
    package_type: 'nuget',
    package_name: `${packageName}}`
  })

  const payload = JSON.stringify(data, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  
    setFailed(error.message);

}