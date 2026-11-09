import fs from 'fs';
import path from 'path';

const geoContent = fs.readFileSync(path.join(process.cwd(), 'src/data/bangladesh-geo.ts'), 'utf8');

const districtSection = geoContent.slice(geoContent.indexOf('export const DISTRICTS'), geoContent.indexOf('export const UPAZILAS'));
const lines = districtSection.split('\n').filter(l => l.includes('divisionId:'));
console.log('Total lines with divisionId in DISTRICTS:', lines.length);

const regex = /\{\s*id:\s*['"]([^'"]+)['"],\s*divisionId:\s*['"]([^'"]+)['"],\s*nameEn:\s*['"]([^'"]+)['"],\s*nameBn:\s*['"]([^'"]+)['"],\s*lat:\s*([0-9.]+),\s*lng:\s*([0-9.]+)\s*\}/;

lines.forEach((l, i) => {
  if (!regex.test(l)) {
    console.log('FAILED LINE ' + i + ':', l);
  }
});
