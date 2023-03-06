import { ItemGroup, ItemsRecord } from '../src/types/dynamo';
import rawItemData from './rawData';

const seedDataGenerator = () => {
  const records: ItemsRecord[] = [];

  Object.entries(rawItemData).map(([category, categoryData]) => {
    Object.entries(categoryData).map(([type, typeData]) => {
      Object.entries(typeData as Record<string, ItemsRecord[]>).map(
        ([brand, itemArray]) => {
          itemArray.map((item) => {
            const fullItemData: ItemsRecord = {
              ...item,
              pk: category as ItemGroup,
              sk: `${type}#${brand}#${item.id}`,
            };

            records.push(fullItemData);
          });
        }
      );
    });
  });

  return records;
};

export default seedDataGenerator;