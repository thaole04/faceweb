import { getActivities } from '@/lib/actions/activity.actions';

import ActivityCard from '@/components/cards/ActivityCard';

async function Page() {
  const res = await getActivities();
  // Đảo ngược thứ tự các phần tử trong mảng
  res.reverse();
  return (
    <div className='grid grid-cols-1 gap-3'>
      {
        // @ts-ignore
        res.map((activity: any) => {
          return (
            <ActivityCard
              key={activity.id}
              time={activity.time}
              date={activity.date}
              name={activity.name}
              image={activity.image}
            />
          );
        })
      }
    </div>
  );
}
export default Page;
