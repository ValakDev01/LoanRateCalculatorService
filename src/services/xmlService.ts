import { Parser } from "xml2js";

async function parseXMLData(xmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const parser = new Parser({ explicitArray: false });
    parser.parseString(xmlData, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export default parseXMLData;