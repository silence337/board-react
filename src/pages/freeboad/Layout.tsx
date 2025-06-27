import { NavLink, Outlet } from 'react-router-dom';

const BoardLayout = () => (
  <div>
    <h1>게시판</h1>
    <nav>
      <NavLink to=''>목록</NavLink> |{' '}
      <NavLink to='/FreeBoard/write'>글쓰기</NavLink>
    </nav>
    <hr />
    <Outlet />
  </div>
);

export default BoardLayout;
