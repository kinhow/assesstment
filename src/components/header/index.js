import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { media } from '../../utils';
import Image from '../../components/image';
import styles from './header.module.scss';

const Header = (props) => {
  const { onClick } = props;
  const { state } = useContext(UserContext);

  return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <div className={styles.image}>
              <Image src={media('user.png')} alt={'image'}/>
            </div>
            <div className={styles.userName}>{state.token.name}</div>
          </div>

          <div className={styles.logout} onClick={onClick}>Logout</div>
        </div>
      </div>
  );
};

export default Header;
