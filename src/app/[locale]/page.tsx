import { redirect } from 'next/navigation';
import { routesName } from '@/interfaces/routeName.interface';
 
export default function HomePage() {
  redirect(routesName.login);
}