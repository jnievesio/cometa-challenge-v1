export type INewItem = {
  name: string;
  quantity: number;
};

export type IRound = {
  id: number;
  items: INewItem[];
};
