import { getInput, setOutput, setFailed, setSecret } from '@actions/core';
import { context } from '@actions/github';

try {
  // `who-to-greet` input defined in action metadata file
  const token = getInput('package-token');
  console.log(`Hello ${token}!`);
  
  const pack = getInput('package-name');
  console.log(`Hello ${pack}!`);
  const names = context.repo;
  setOutput("names", JSON.stringify(names, undefined, 3));

  const payload = JSON.stringify(context.payload, undefined, 3)
  console.log(`The event payload: ${payload}`);



} catch (error) {
  
    setFailed(error.message);

}