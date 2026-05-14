import { getAllCharactersFromDb, initDB } from '../../../scripts/database.js'
import DmClient from './dm_client.js'

export const dynamic = 'force-dynamic'

export default async function MasterPage() {
  initDB();
  const _players = await getAllCharactersFromDb();
  const players = JSON.parse(JSON.stringify(_players));

  return <DmClient initialPlayers={players} />;
}
