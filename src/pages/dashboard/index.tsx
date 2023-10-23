import Link from 'next/link';
import React from 'react';
import {
  Cell,
  LabelList,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { Clock } from '@/components/Clock';
import { api } from '@/utils/api';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/dashboard/schedule/create">Create Pie</Link>

      <h2>Schedules</h2>
      <Schedules />
    </div>
  );
}

const Schedules = () => {
  const pies = api.pie.getAll.useQuery();

  if (!pies.data) return null;

  return pies.data.map((pie) => (
    <div key={`pie-${pie.id}`}>
      <p>{pie.name}</p>

      <Clock
        data={[
          { name: 'A', start: '08:00', end: '12:30', color: '#ff0000' },
          // { name: 'B', value: 4, color: '#00ff00' },
          // { name: 'C', value: 4, color: '#0000ff' },
          { name: 'C', start: '14:00', end: '16:00', color: '#eaeaea' },
        ]}
      />
    </div>
  ));
};
