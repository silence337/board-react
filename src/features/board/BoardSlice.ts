import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Board } from '../../types/board';
import { type User, getAuth } from 'firebase/auth';

interface BoardState {
  list: Board[];
  current: Board | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  listsPerPage: number;
}

const initialState: BoardState = {
  list: [],
  current: null,
  loading: false,
  error: null,
  currentPage: 1,
  listsPerPage: 10,
};

// user 토큰 인증
const getAuthHeaders = async (user: User | null) => {
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

// 리스트 가져오기
export const fetchBoardList = createAsyncThunk('board/fetchList', async () => {
  const res = await axios.get<Board[]>('http://localhost:3001/posts');
  return res.data;
});

// 상세페이지 가져오기
export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (id: string) => {
    const res = await axios.get<Board>(`http://localhost:3001/posts/${id}`);
    return res.data;
  }
);

// 작성 페이지
export const createBoard = createAsyncThunk(
  'board/create',
  async (newBoard: Omit<Board, 'id'>, thunkAPI) => {
    const auth = getAuth();
    const firebaseUser = auth.currentUser; // Firebase 에서 현재 로그인 유저 가져오기
    const headers = await getAuthHeaders(firebaseUser);
    await axios.post('http://localhost:3001/posts', newBoard, { headers });
    thunkAPI.dispatch(fetchBoardList()); // 글 등록 후 목록 갱신
  }
);

// 수정 페이지
export const updateBoard = createAsyncThunk(
  'board/update',
  async (updatedBoard: Board, thunkAPI) => {
    const auth = getAuth();
    const firebaseUser = auth.currentUser; // Firebase 에서 현재 로그인 유저 가져오기
    const headers = await getAuthHeaders(firebaseUser);
    await axios.put(
      `http://localhost:3001/posts/${updatedBoard.id}`,
      updatedBoard,
      { headers }
    );
    thunkAPI.dispatch(fetchBoardList()); // 글 등록 후 목록 갱신
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 리스트 목록 처리
    builder
      .addCase(fetchBoardList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBoardList.rejected, (state) => {
        state.loading = false;
        state.error = '게시글 목록을 불러올 수 없습니다. ';
      });

    // 상세페이지 처리
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        console.log('fetchBoardById fulfilled, payload:', action.payload);
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state) => {
        state.loading = false;
        state.error =
          '게시글을 불러올 수 없습니다. (npx json-server --watch db.json --port 3001)';
      });
  },
});

export default boardSlice.reducer;
export const { setCurrentPage } = boardSlice.actions;
