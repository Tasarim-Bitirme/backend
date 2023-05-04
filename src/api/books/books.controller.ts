import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BooksService } from './books.service';
import { BookQueryDto, RecommendedBookQueryDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() query: BookQueryDto): Promise<Book[]> {
    return this.booksService.findAll(query);
  }

  @Get('recommended')
  getRecommendedBooks(@Query() query: RecommendedBookQueryDto) {
    return this.booksService.getRecommendedBooks(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post('by-expression')
  getBooksByExpression(
    @Body() expressionDto: { imageString64: string; take: number },
  ) {
    return this.booksService.getBooksByExpression(expressionDto);
  }
}
