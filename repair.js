const fs = require('fs');

const files = [
  'frontend/src/app/admin/page.tsx',
  'frontend/src/app/vote/page.tsx',
  'frontend/src/app/login/page.tsx',
  'frontend/src/app/admin-login/page.tsx',
  'frontend/src/app/assisted-vote/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // The string that got double injected:
  const brokenStr = '${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL || \\"http://localhost:5000\\"}"}';
  const fixedStr = '${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}';

  // Using split join is safer than regex for literal brackets
  content = content.split('${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL || \\"http://localhost:5000\\"}"}').join(fixedStr);
  
  // Wait, the inner quotes were literally encoded as `"` or `\"`? Let's check the grep.
  // The grep output: fetch(`${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL || \"http://localhost:5000\"}"}/api...
  // In the file, it is: "${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}"
  
  content = content.split('${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}"}').join(fixedStr);
  
  fs.writeFileSync(f, content);
  console.log('Repaired', f);
});
