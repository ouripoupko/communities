import styles from './Main.module.scss';
import bob from 'assets/bobthebuilderweb_1663316a.webp'

const Main = () => {
  return (
    <div className={styles.header}>
      <div>gloKi</div>
      <img src={bob} alt="profile"></img>
    </div>
  );
};

export default Main;