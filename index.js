import { getInput, setOutput, setFailed, setSecret } from '@actions/core';
import { context } from '@actions/github';
import { Octokit, App } from "octokit";

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  let { data  } = await octokit.request('GET /user/packages', { package_type: "nuget"});

  data.forEach((d) => 
  {
    console.log(`packages ${JSON.stringify(d, undefined, 2)}!`);
  })

  
  const pack = getInput('package-name');
  console.log(`Hello ${pack}!`);
  const names = context.repo;
  setOutput("names", JSON.stringify(names, undefined, 2));

  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);



} catch (error) {
  
    setFailed(error.message);

}