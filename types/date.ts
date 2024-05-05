export type date = {
  username: string;
  password:string;
  match: string | null;
  gender: "Man" | "Women";
  age: number;
  dates_gender: "Man" | "Women";
  age_range: Array<number>;
};
