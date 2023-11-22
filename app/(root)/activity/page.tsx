import { getActivities, fetchActivity } from '@/lib/actions/activity.actions';
import { getUsersByModel } from '@/lib/actions/user.actions';
import ListActivities from '@/components/ListActivities';
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const users = await getUsersByModel();
  const activities = await getActivities();
  const activitiesByUser = await fetchActivity('thaole04');
  activities.reverse();
  return (
    <ListActivities
      key={'1'}
      activities={activities}
      users={users}
    />
  );
}
export default Page;
