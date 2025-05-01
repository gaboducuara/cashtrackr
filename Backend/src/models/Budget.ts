/*Presupuesto*/
import { Table, Model, Column, DataType, HasMany, BelongsTo, ForeignKey, AllowNull } from 'sequelize-typescript'
import Expense from './Expense'
import User from './User'

@Table({
  tableName: 'budgets',
})
class Budget extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number

  /*Un presupuesto puede tener muchos gastos */
  @HasMany(() => Expense, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  declare expenses: Expense[]

  /* Establece que este modelo tiene una clave foránea hacia User, es decir, cada presupuesto pertenece a un usuario.*/
  @ForeignKey(() => User)
  declare userId: number

  /*Un presupuesto pertenece a un usuario*/
  @BelongsTo(() => User)
  declare user: User
}
export default Budget