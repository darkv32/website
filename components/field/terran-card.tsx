import s from './field.module.css';

/** The "main race" badge shared by the front-page hobbies band and the Hobbies page. */
export function TerranCard() {
  return (
    <div className={s.race}>
      <span className={s.ic} role="img" aria-label="Terran logo" />
      <div>
        <span className={s.label}>Main race</span>
        <h3>Terran</h3>
        <span className={s.sc2}>StarCraft II</span>
      </div>
    </div>
  );
}
