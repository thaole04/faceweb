import UserCard from '@/components/cards/UserCard';
import { getUsersByModel } from '@/lib/actions/user.actions';
async function Page() {
  const res = await getUsersByModel();
  return (
    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 p-0 xl:px-12'>
      {
        // @ts-ignore
        res.map((user: any) => {
          return (
            <UserCard
              key={user.id}
              username={user.username}
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
