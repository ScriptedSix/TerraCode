const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse('http://35.183.20.75:5173', options);

  // Save the report
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lighthouse-report.html', reportHtml);

  // Print the scores
  console.log('\n=== Lighthouse Performance Report ===\n');
  console.log('Performance:', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices:', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO:', runnerResult.lhr.categories.seo.score * 100);
  console.log('\nFull report saved to: lighthouse-report.html');

  await chrome.kill();
}

runLighthouse();
