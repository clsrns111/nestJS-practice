import { NotFoundException } from '@nestjs/common';
import { Entity, EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardsStatus } from './boarder-status.enum';
import { CreateBoardDTO } from './DTO/createBoard.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: BoardsStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException('해당 아이디를 찾을 수 없습니다.');
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id); //찾고 삭제

    if (result.affected === 0) {
      throw new NotFoundException('등록되지 않은 아이디입니다.');
    }
    console.log(result);
  }

  async updateBoard(id: number, status: BoardsStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.save(board);

    return board;
  }

  async getAllBoard(): Promise<Board[]> {
    const bords = await this.find();

    console.log(bords);

    return bords;
  }
}
