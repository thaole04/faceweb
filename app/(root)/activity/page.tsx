import { getActivities } from '@/lib/actions/activity.actions';

import ActivityCard from '@/components/cards/ActivityCard';

async function Page() {
  const res = await getActivities();
  return (
    <div>
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
