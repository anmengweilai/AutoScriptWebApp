import {protocol, net} from 'electron';
import path from 'path';
import {URL} from 'url';

export const createProtocol = (scheme: string) => {
  if (Object.hasOwn(protocol,'handle')) {
    protocol.handle(scheme, (request) => {
      let pathName = new URL(request.url).pathname;
      pathName = decodeURI(pathName); // Needed in case URL contains spaces
      const filePath = path.join(__dirname, '../renderer', pathName);
      return net.fetch(filePath)
    });
  } else {
    protocol.registerFileProtocol(scheme, (request, respond) => {
      let pathName = new URL(request.url).pathname;
      pathName = decodeURI(pathName); // Needed in case URL contains spaces

      const filePath = path.join(__dirname, '../renderer', pathName);
      respond({path: filePath});
    });
  }

};
