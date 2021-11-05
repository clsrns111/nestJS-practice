import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsStatus } from './boarder-status.enum';
import { CreateBoardDTO } from '../boards/DTO/createBoard.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  }

  async deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  async updateBoard(id: number, status: BoardsStatus): Promise<Board> {
    return this.boardRepository.updateBoard(id, status);
  }

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }

  // private boards: Board[] = [];
  // getallBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDTO: CreateBoardDTO) {
  //   const { title, description } = createBoardDTO;
  //   const board: Board = {
  //     id: uuid(), // v1을 uuid로 사용하겠다.
  //     title,
  //     description,
  //     status: BoardsStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id == id);
  //   if (!board) {
  //     throw new NotFoundException('해당 아이디를 찾을 수 없습니다.');
  //   }
  //   return board;
  // }
  // deleteBoard(id: string): void {
  //   this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
  // updateBoardStatus(id: string, status: BoardsStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
