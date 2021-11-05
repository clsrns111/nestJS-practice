import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsStatus } from './boarder-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './DTO/createBoard.dto';
import { BoardValidationPipe } from './Pipe/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards') // .localhost:3000/boards
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: BoardsStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, status);
  }
  // constructor(private boardsService: BoardsService) {}
  // //get handler
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getallBoards();
  // }
  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() CreateBoardDTO: CreateBoardDTO,
  //   /* @Body('title') title: string,
  //   @Body('description') description: string, */
  // ): Board {
  //   return this.boardsService.createBoard(CreateBoardDTO);
  // }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardValidationPipe) status: BoardsStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
