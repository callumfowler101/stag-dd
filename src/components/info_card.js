import classes from '../stores/classes'

export default function InfoCard() {
  const elf = classes.elf
  return (
    <div>
      <h2>{elf.classname}</h2>
      <p>Luck: {elf.luck}</p>
      <p>Wisdom: {elf.wisdom}</p>
      <p>Agility: {elf.agility}</p>
      <p>Speed: {elf.speed}</p>
      <p>Fishing: {elf.fishing}</p>
    </div>
  )
}
