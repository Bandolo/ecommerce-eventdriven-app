import { v4 as uuid } from 'uuid';

const rawItemData = {
  phone: {
    smart: {
      apple: [
        {
          id: uuid(),

          title: 'Apple iPhone 11',
          brand: 'apple',
          description: 'Apple iPhone 11 - 64GB - GSM+CDMA Factory Unlocked "Excellent"',
          storage: '64GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Apple iPhone 7 Plus',
          brand: 'apple',
          description: 'Apple iPhone 7 Plus - 128GB - All Colors - Unlocked - Good Condition',
          storage: '126GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Apple iPhone 5s',
          brand: 'apple',
          description: 'Apple iPhone 5s - Unlocked - 16GB - Black (A1533) Smartphone',
          storage: '16GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
          ],
        },
      ],
      google: [
        {
          id: uuid(),

          title: 'Google Pixel 6',
          brand: 'Google',
          description: 'Google Pixel 6 - 128GB - Sorta Seafoam (Google Ed. and Unlocked)',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Google Pixel 5',
          brand: 'Google',
          description: 'Google Pixel 5 128GB (Verizon & Unlocked) Sorta Sage (Green)',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            ,
          ],
        },
      ],
      huawei: [
        {
          id: uuid(),

          title: 'Huawei Y9 Prime 2019',
          brand: 'Huawei',
          description: 'Huawei Y9 Prime 2019 128GB Smartphone Android Cellphone International Model',
          storage: '128GB',
          colorPreference: [
          {
              colorCode: 2,
              displayValue: 'silver',
          },
          ],
        },
        {
          id: uuid(),

          title: 'Huawei P40 Pro',
          brand: 'Huawei',
          description: 'Huawei P40 Pro Unlocked 5G 256GB, Smartphone ELS-NX9-Black n Sliver Never Used',
          storage: '256GB',
          colorPreference: [
          {
              colorCode: 1,
              displayValue: 'black',
          },

          ],
        },
      ],
      samsung: [
        {
          id: uuid(),

          title: 'Samsung Galaxy S20',
          brand: 'Samsung',
          description: 'Samsung Galaxy S20 5G G981U Unlocked 128GB Good',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Samsung Galaxy A04E',
          brand: 'Samsung',
          description: 'Samsung Galaxy A04E 32GB 2022 Mobile Phone DUAL SIM Smart Phone New UNLOCKED',
          storage: '32GB',
          colorPreference: [
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
    },
    feature: {
      zte: [
        {
          id: uuid(),

          title: 'ZTE FLIP 2 4GX',
          brand: 'ZTE',
          description: 'SNew TELSTRA ZTE FLIP 2 4GX Rural phone',
          storage: '4GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'ZTE Z222',
          brand: 'ZTE',
          description: 'Unlocked ZTE Z222 GSM Basic Flip Phone Camera Bluetooth Large Buttons Elderly',
          storage: '64GB',
          colorPreference: [
            ,
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'ZTE Nubia Red Magic 6s Pro',
          brand: 'ZTE',
          description: 'ZTE Nubia Red Magic 6s Pro 6.8" AMOLED 165Hz 64MP Snapdragon 888+Phone By FedEx',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
      nokia: [
        {
          id: uuid(),

          title: 'Nokia 5710',
          brand: 'Nokia',
          description: 'Nokia 5710 4G Xpress Audio (2.4 inch) QVGA Display Dual Sim Feature Phone',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Nokia 225',
          brand: 'Nokia',
          description: 'Nokia 225 4G Dual SIM Feature Phone with Long Battery Life, Camera, Mult',
          storage: '',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            ,
          ],
        },
      ],
    },
  },
  computer: {
    laptop: {
      apple: [
        {
          id: uuid(),

          title: 'MacBook Pro 13"',
          brand: 'Apple',
          description: 'MacBook Pro 13" Core i5 Custom |8GB RAM + 256gb SSD| Turbo 2.5Ghz Laptop',
          storage: '256GB',
          colorPreference: [
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
      hp: [
        {
          id: uuid(),

          title: 'HP ProBook 6470b',
          brand: 'Hp',
          description: 'HP ProBook 6470b 14" Core i5-3210M laptop2.5GHz 8GB 500GB Webcam Wifi Win 10 Pro',
          storage: '500GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
          ],
        },
        {
          id: uuid(),

          title: 'HP EliteBook X360',
          brand: 'HP',
          description: 'HP EliteBook X360 1030 G3 13.3 FHD Touch screen i7-8650U 16GB 512GB SSD Laptop',
          storage: '512GB',
          colorPreference: [
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
    },
    desktop: {
      hp: [
        {
          id: uuid(),

          title: 'HP Z420',
          brand: 'HP',
          description: 'HP Z420 PC 8-Core 2.60GHz E5-2670 No OS Wholesale Custom To Order',
          storage: '512GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'HP ELITEDESK 800',
          brand: 'HP',
          description: 'HP ELITEDESK 800 G3 SFF i5 7500 8/16GB RAM 128/256/512GB/1TB SSD Desktop PC',
          storage: '512GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
      dell: [
        {
          id: uuid(),

          title: 'Dell Optiplex 3020',
          brand: 'Dell',
          description: 'Dell Optiplex 3020 i5-4590 8GB RAM 120GB SSD Windows 10 Pro',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Dell OptiPlex 7040',
          brand: 'Dell',
          description: 'Dell OptiPlex 7040 micro i5 6500T 8/16GB RAM 256-1TB SSD mini PC Win10 Pro WiFi',
          storage: '128GB',
          colorPreference: [
            {
              colorCode: 1,
              displayValue: 'black',
            },
            {
              colorCode: 2,
              displayValue: 'silver',
            },
          ],
        },
      ],
    },
  },
};

export default rawItemData;