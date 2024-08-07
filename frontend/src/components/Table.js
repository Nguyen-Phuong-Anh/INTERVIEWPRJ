import { useState, useEffect } from 'react';
import Row from './Row';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table({ currentPage }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrderUsername, setSortOrderUsername] = useState('none')
  const [sortOrderName, setSortOrderName] = useState('none')

  const fetchData = async () => {
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
      });
  };

  const sortUsername = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a.login.username.toLowerCase() < b.login.username.toLowerCase()) {
        return sortOrderUsername === 'ascending' ? -1 : 1;
      }
      if (a.login.username.toLowerCase() > b.login.username.toLowerCase()) {
        return sortOrderUsername === 'ascending' ? 1 : -1;
      }
      return 0;
    })
    setSortOrderUsername(sortOrderUsername === 'ascending' ? 'descending' : 'ascending');
    setUsers(sortedUsers);
  }

  function firstLastname(user) {
    return user.name.first + ' ' + user.name.last;
  }

  const sortFullname = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (firstLastname(a).toLowerCase() < firstLastname(b).toLowerCase()) {
        return sortOrderName === 'ascending' ? -1 : 1;
      }
      if (firstLastname(a).toLowerCase() > firstLastname(b).toLowerCase()) {
        return sortOrderName === 'ascending' ? 1 : -1;
      }
      return 0;
    })
    setSortOrderName(sortOrderName === 'ascending' ? 'descending' : 'ascending');
    setUsers(sortedUsers);
  }

  useEffect(() => {
    setPage(currentPage)
    fetchData();
  }, [currentPage]);

  const ascendingSortUsername = () => {
    setSortOrderUsername('ascending')
    sortUsername();
  }

  const descendingSortUsername = () => {
    setSortOrderUsername('descending')
    sortUsername();
  }

  const ascendingSortName = () => {
    setSortOrderName('ascending')
    sortFullname();
  }

  const descendingSortName = () => {
    setSortOrderName('descending')
    sortFullname();
  }

  return (
    <div className={cx('table-container')}>
      <table className={cx('user-table')}>
        <thead>
          <tr>
            <th>Full Name
              <button
                onClick={ascendingSortName}
                className={sortOrderName !== 'none' && cx('hide')}
              >&#x2195;</button>
              <button onClick={ascendingSortName} className={sortOrderName === 'ascending' ? cx('show') : cx('hide')}>&uarr;	</button>
              <button onClick={descendingSortName} className={sortOrderName === 'descending' ? cx('show') : cx('hide')}>&darr;	</button>
            </th>
            <th>Username
              <button
                onClick={ascendingSortUsername}
                className={sortOrderUsername !== 'none' && cx('hide')}
              >&#x2195;</button>
              <button onClick={ascendingSortUsername} className={sortOrderUsername === 'ascending' ? cx('show') : cx('hide')}>&uarr;	</button>
              <button onClick={descendingSortUsername} className={sortOrderUsername === 'descending' ? cx('show') : cx('hide')}>&darr;	</button>
            </th>
            <th>Thumbnail</th>
          </tr>
        </thead>

        <tbody>{Array.isArray(users) && users.map((user, index) => <Row key={index} user={user} index={index} />)}</tbody>
      </table>
    </div>
  );
}

export default Table;
