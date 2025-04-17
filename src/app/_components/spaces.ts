import dayjs, { Dayjs } from "dayjs";

export interface Space {
  name: string;
  times: { date: Dayjs; times: string[] }[];
}

export const spaces: Space[] = [
  {
    name: "Space 1",
    times: [{ date: dayjs(), times: ["1700", "1830"] }],
  },
  {
    name: "Space 2",
    times: [{ date: dayjs(), times: ["1700", "1830"] }],
  },
  {
    name: "Space 3",
    times: [{ date: dayjs(), times: ["1700"] }],
  },
  {
    name: "Space 4",
    times: [{ date: dayjs(), times: ["1700", "1830"] }],
  },
  {
    name: "Space 5",
    times: [{ date: dayjs(), times: ["1700", "1830"] }],
  },
];
