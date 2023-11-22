import ActivityCard from '@/components/cards/ActivityCard';
import ButtonReload from '@/components/ButtonReload';
interface Props {
  activities: any;
  users: any;
}

async function ListActivities({ activities, users }: Props) {
  return (
    <div className='flex flex-col'>
      <div className='text-light-1 mb-2'>
        <ButtonReload />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        {
          // @ts-ignore
          activities.map((activity: any) => {
            // find name by username in users
            const user = users.find(
              (user: any) => user.username === activity.username
            );
            return (
              <ActivityCard
                key={activity.id}
                time={activity.time}
                date={activity.date}
                name={user?.name || 'Unknown'}
                image={activity.image}
                secured={activity.secured}
              />
            );
          })
        }
        d
      </div>
    </div>
  );
}
export default ListActivities;
