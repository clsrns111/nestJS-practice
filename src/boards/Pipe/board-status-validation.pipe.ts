import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardsStatus } from '../boarder-status.enum';

export class BoardValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardsStatus.PRIVATE, BoardsStatus.PUBLIC];

  transform(value: any, meatadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusVaild(value)) {
      throw new BadRequestException('잘못된 상태입니다.');
    }

    return value;
  }

  private isStatusVaild(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
