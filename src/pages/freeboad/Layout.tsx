import { NavLink, Outlet } from 'react-router-dom';

const BoardLayout = () => (
  <div className=''>
    <nav className='button_wrap -board'>
      <NavLink className='button -custom' to=''>
        목록
      </NavLink>
      <NavLink className='button -custom' to='/FreeBoard/write'>
        글쓰기
      </NavLink>
    </nav>
    <div className=''>
      <Outlet />
    </div>
  </div>
);

export default BoardLayout;
