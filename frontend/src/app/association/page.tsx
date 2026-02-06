import AssociationClient from './AssociationClient';
import { getAssociationVideoUrl } from '@/lib/home-settings';

export default async function Association() {
  const associationVideoUrl = await getAssociationVideoUrl();
  return <AssociationClient associationVideoUrl={associationVideoUrl} />;
}
