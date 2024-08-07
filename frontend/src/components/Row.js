import classNames from 'classnames/bind';
import styles from './Row.module.scss';

const cx = classNames.bind(styles);

function Row({ user, index }) {
  if(index % 2 === 0) {
    return (
      <tr className={cx('row', 'gray')}>
        <td>{user.name.title + ' ' + user.name.first + ' ' + user.name.last}</td>
        <td>{user.login.username}</td>
        <td>
          <img src={user.picture.thumbnail} alt="user_thumbnail" />
        </td>
      </tr>
    );
  }
  return (
    <tr className={cx('row')}>
      <td>{user.name.title + ' ' + user.name.first + ' ' + user.name.last}</td>
      <td>{user.login.username}</td>
      <td>
        <img src={user.picture.thumbnail} alt="user_thumbnail" />
      </td>
    </tr>
  );
}

export default Row;
