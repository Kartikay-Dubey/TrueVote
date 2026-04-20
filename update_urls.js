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
  
  // Inject the BASE_URL constant right after the component exports or imports
  const injection = `\nconst BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://truevote-backend-fcmt.onrender.com";\n`;
  
  // Check if it's already there
  if (!content.includes('const BASE_URL')) {
    // Basic injection after the first bunch of imports and before the main function
    content = content.replace(/(import .*;\n)+/g, match => match + injection);
  }

  // Now replace all the inline fetch templates with the clean one
  content = content.split('${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}').join('${BASE_URL}');
  
  fs.writeFileSync(f, content);
  console.log('Refactored', f);
});
