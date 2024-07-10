import { Controller, Get, Post, Body, Query, Request, UseGuards, Param, ExecutionContext, BadRequestException, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Controller('contacts')
@UseGuards(AuthGuard("jwt"))
export class ContactController {
  constructor(private contactsService: ContactService) {}

  @Post()
  create(@Body() contact: Contact, @Request() req) {
    contact.user = req.user;
    return this.contactsService.create(contact);
  }

  @Get()
  // findAll(@Param('page') page:string, @Param('limit') limit:string, @Request() req) {
  //   const pageNumber = parseInt(page, 10);
  //   const limitNumber = parseInt(limit, 10);
  //   return this.contactsService.findAll(req.user.id, pageNumber, limitNumber);
  // }

  async findAll(@Query('page',new DefaultValuePipe(1),ParseIntPipe) page:number=1,
  @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit:number=1,@Request() req):Promise<Pagination<Contact>> {
    const options:IPaginationOptions={
      limit,page
    }
    return await this.contactsService.findAll(req.user.id,options);
  }


  @Get('search/:name')
  findByNameOrPhone(@Param('name') name: string, @Request() req) {
    return this.contactsService.findByName(req.user.id, name);
  }
} 
