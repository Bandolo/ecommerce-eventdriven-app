type ItemId = string;
type ItemGroup = 'phone' | 'computer' | 'accessories';
type Type = string;
type Brand = string

export interface ItemsRecord {
  id: ItemId,
  pk: ItemGroup,
  sk: `${Type}#${Brand}#${ItemId}`;

  title: string;
  description: string;
  storage: string;
  colorPreference?: {
    colorCode: number;
    displayValue: string;
  } [];
}

type Timestamp = number;

export type OrderStatus = 'placed' | 'packed' |'delivered' | 'error'

export interface OrderRecord {
  id: string,
  pk: string,
  sk: `order#${Timestamp}`,

  userId: string,
  userEmail: string,
  dateCreated: Timestamp;
  dateUpdated?: Timestamp;
  status: OrderStatus;
  items: { id: ItemId; count: number; color?: number}[];

}