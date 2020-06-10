import React from 'react';
import { MonthGroup } from "../../services/TransactionGroupingService";
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';

export interface CumulativeGraphProps {
  data: MonthGroup
}

export const CumulativeGraph = ({ data }: CumulativeGraphProps) => {
  const graph = calculateData(data)
  return (
    <AreaChart width={730} height={250} data={graph}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  )
}

function calculateData(input: MonthGroup) {
  let acc = 0
  let res = []
  for(const [date, data] of Object.entries(input.dailyGrouping).reverse()) {
    acc += data.totalSpent
    res.push({
      date,
      value: acc,
    })
  }
  return res
}