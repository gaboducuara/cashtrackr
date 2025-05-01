import { Table, Model, Column, DataType, HasMany, Default, Unique, AllowNull,  BelongsTo, ForeignKey } from 'sequelize-typescript'
import Budget from './Budget'
@Table({
  tableName: 'users',
})

class User extends Model {
  @AllowNull(false)
  @Column({
    type:DataType.STRING(60),
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string

  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare email: string

  @Column({
    type: DataType.STRING(6),
  })
  declare token: string

  @Default(false) /*el usuario no puede loguearse a menos que se confirme el token*/
  @Column({
    type: DataType.BOOLEAN,
  })
  declare confirmed: string

  /*Un usuario a muchos presupuestos*/
  @HasMany(() => Budget, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  declare budgets: Budget[]
}
export default User;