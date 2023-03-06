import { writeFile } from 'fs/promises';
import seedDataGenerator from './generateItemJson';

const writeSeedToFile = () => {
  const records = seedDataGenerator();

  writeFile('./seedData/items.json', JSON.stringify(records));
};

writeSeedToFile();