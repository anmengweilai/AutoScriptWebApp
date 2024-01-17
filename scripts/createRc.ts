import fs from 'fs';
import yaml from "js-yaml";


function writeRc() {
  fs.writeFileSync('.webapprc', `scriptAppPath: ${process.cwd()}`, 'utf8')
}


if (fs.existsSync('.webapprc')) {
  console.log('已经存在 .webapprc 文件')
  const webapprc = fs.readFileSync('.webapprc', 'utf8');
   const config = yaml.load(webapprc) as Record<'scriptAppPath', string>;
   if (!config.scriptAppPath) {
     writeRc()
   }else {
      console.log(config)
   }
} else {
  writeRc()
}


