// TODO: extract to independent entity
export type User = {
  id: number;
  name: string;
  photoUrl: string;
};

export type Review = {
  id: number;
  user: User;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: Date;
};
