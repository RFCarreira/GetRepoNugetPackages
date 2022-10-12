import { getInput, setOutput, setFailed, setSecret } from '@actions/core';
import { context } from '@actions/github';
import { Octokit, App } from "octokit";

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  let a = await octokit.request('GET /user/packages', { package_type: "nuget"});

  console.log(`packages ${a}!`);
  
  const pack = getInput('package-name');
  console.log(`Hello ${pack}!`);
  const names = context.repo;
  setOutput("names", JSON.stringify(names, undefined, 3));

  const payload = JSON.stringify(context.payload, undefined, 3)
  console.log(`The event payload: ${payload}`);



} catch (error) {
  
    setFailed(error.message);

}