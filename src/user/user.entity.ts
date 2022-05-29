import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'user_nested' })
@Tree('closure-table', {})
export class UserNested {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  secondId?: number;

  @TreeChildren()
  children?: UserNested[];

  @TreeParent()
  parent?: UserNested;
}
