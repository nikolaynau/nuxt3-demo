import { resolve } from 'path';
import { promises as fs } from 'fs';

const ignoreFile = resolve('./.nuxtignore');

async function run() {
  const fileContent = `
pages/ui.vue
pages/ui/**/*
`;
  await fs.writeFile(ignoreFile, fileContent);
}

if (!process.env.BUILD_UI_KIT || !parseInt(process.env.BUILD_UI_KIT)) {
  run()
    .then(() => console.log('.nuxtignore generated'))
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
} else {
  console.log('skip generate .nuxtignore');
}
