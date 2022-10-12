import { getInput, setOutput, setFailed, setSecret, saveState } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from "octokit";

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  const { data } = await octokit.request('GET /user/packages', { package_type: "nuget"});

  console.log(`packages ${JSON.stringify(data, undefined, 2)}!`);

  const pack = getInput('package-name');
  console.log(`Hello ${pack}!`);
  const names = context.repo;
  setOutput("names", JSON.stringify(names, undefined, 2));

  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);



} catch (error) {
  
    setFailed(error.message);

}