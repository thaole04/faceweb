import LineChart from '@/components/LineChart';
import { connectToDB } from '@/lib/mongoose';
import Activities from '@/lib/models/activity.model';

export default async function Home() {
  try {
    connectToDB();
    const data = await Activities.find();
    return <LineChart activities={JSON.parse(JSON.stringify(data))} />;
  } catch (err: any) {
    console.log(err);
  }
}
