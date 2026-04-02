import styles from './styles.module.css'
import { getAllCharactersFromDb, initDB } from '../../../scripts/database.js'
import PlayerCell from './components/player_cell.js'
import NotificationCentre from './components/notification_centre.js'

export default async function MasterPage() {
  // const [viewUserStats, setViewUserStats] = useState(false)
  // const [viewEventDetails, setViewEventDetails] = useState(false)
  initDB()
  const _players = await getAllCharactersFromDb()
  const players = JSON.parse(JSON.stringify(_players))

  return (
    <>
      <div className={styles.container}>
        <h2>Dungeon Master Page</h2>
        <div>
          <h3>Players</h3>
          <ul className={styles.sub_container}>
            {players.map((e) => {
              return <PlayerCell key={e.uuid} data={e} />
            })}
          </ul>
        </div>
        <div>
          <h3>Events</h3>
          <ul className={styles.sub_container}>
            <li>Action</li>
            <li>Action</li>
            <li>Action</li>
          </ul>
        </div>
        <div>
          <NotificationCentre />
        </div>
      </div>
    </>
  )
}
