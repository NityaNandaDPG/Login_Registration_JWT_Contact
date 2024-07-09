import { Controller, Get, Post, Body, Query, Request, UseGuards, Param, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';

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
  findAll(@Param('page') page=1, @Param('limit') limit=10, @Request() req) {
    return this.contactsService.findAll(req.user.id, page, limit);
  }

  @Get('search/:name')
  findByNameOrPhone(@Param('name') name: string, @Request() req) {
    return this.contactsService.findByName(req.user.id, name);
  }
}
