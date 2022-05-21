import { Posts, searchPost } from '../models/posts';

export interface PostsContext {
  posts: Posts[];
  getList: (page: number, searchData: searchPost) => void;
  addItem: (content: string) => void;
  removeItem: (id: number) => void;
  updateItemIsDone: (id: number) => void;
  updateItem: (
    id: number,
    content: string,
    list: Posts[],
    refId?: string
  ) => void;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
