import {
  getActivities,
  getActivitiesByUsername,
} from '@/lib/actions/activity.actions';
import { getUsersByModel } from '@/lib/actions/user.actions';
import ListActivities from '@/components/ListActivities';
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const username = searchParams?.q ?? '';
  const activitiesFromUser = await getActivitiesByUsername(username);
  const users = await getUsersByModel();
  const activities = await getActivities();
  activities.reverse();
  return (
    <div>
      <ListActivities
        key={'1'}
        activities={activities}
        users={users}
      />
    </div>
  );
}
export default Page;
