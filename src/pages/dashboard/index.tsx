import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Clock } from '@/components/Clock';
import { api } from '@/utils/api';

export default function Dashboard() {
  const { data } = useSession();
  return (
    <>
      <h1>Dashboard</h1>
      <Link href="/dashboard/schedule/create">Create Pie</Link>

      <p>Is auth: {data?.user?.name || 'Not authed.'}</p>

      <h2>Schedules</h2>
      <Schedules />
    </>
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
