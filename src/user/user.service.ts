import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { UserNested } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserNested)
    private userRepository: Repository<UserNested>,
  ) {}

  async createUser(body: any): Promise<void> {
    if (body.parent) {
      const parent = await this.findOne(body.parent);
      body.parent = parent;
    }
    const newUser = this.userRepository.create(body);
    await this.userRepository.save(newUser);
  }

  async findAll() {
    return await getManager()
      .getTreeRepository(UserNested)
      .findTrees({ depth: 5 });
  }

  async findParrents() {
    return await getManager()
      .getTreeRepository(UserNested)
      .findRoots({ depth: 5 });
  }

  async findChild(id: number) {
    const parrent = await this.userRepository.findOne(id);
    return await getManager()
      .getTreeRepository(UserNested)
      .findDescendants(parrent);
  }

  async findChildTree(id: number) {
    const parrent = await this.userRepository.findOne(id);
    return await getManager()
      .getTreeRepository(UserNested)
      .findDescendantsTree(parrent);
  }

  async findParrent(id: number) {
    const child = await this.userRepository.findOne(id);
    return await getManager()
      .getTreeRepository(UserNested)
      .findAncestors(child);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }
}
