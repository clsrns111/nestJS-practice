/* export interface Board {
  id: String;
  title: String;
  description: String;
  status: BoardsStatus; //공개 게시글인지 비공개 게시글인지
}
 */
export enum BoardsStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
