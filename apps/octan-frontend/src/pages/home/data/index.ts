import { DataKeys } from "consts";

export const chartOptions = {
  [DataKeys.total_degree]: {
    caption: "Total degree",
    color: "#FFDA16"
  },
  [DataKeys.total_transactions]: {
    caption: "Txns",
    color: "#165DFF"
  },
  [DataKeys.total_gas_spent]: {
    caption: "Total gas burn",
    color: "#16FFD5"
  },
  [DataKeys.total_reputation_score]: {
    caption: "Total global RS",
    color: "#B416FF"
  },
}

export const dummyData = [
  {
    name: 'A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];