import UserCard from '@/components/cards/UserCard';
import { getUsersByModel } from '@/lib/actions/user.actions';
async function Page() {
  const res = await getUsersByModel();
  return (
    <div>
      {
        // @ts-ignore
        res.map((user: any) => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
            />
          );
        })
      }
    </div>
  );
}
export default Page;
