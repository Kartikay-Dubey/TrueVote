const fs = require('fs');

const files = [
  'frontend/src/app/admin/page.tsx',
  'frontend/src/app/vote/page.tsx',
  'frontend/src/app/login/page.tsx',
  'frontend/src/app/verify/page.tsx',
  'frontend/src/app/admin-login/page.tsx',
  'frontend/src/app/assisted-vote/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Handle literal "http://localhost:5000" replacements
  content = content.replace(/"http:\/\/localhost:5000(.*?"|[^\"]*?)"/g, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}$1`');
  content = content.replace(/http:\/\/localhost:5000/g, '${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}');
  fs.writeFileSync(f, content);
  console.log('Fixed', f);
});
