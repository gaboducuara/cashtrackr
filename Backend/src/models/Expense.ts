/*Gastos*/
import { Table, Model, Column, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Budget from './Budget'

@Table({
  tableName: 'expenses',
})
class Expense extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare amount: number

  /*El gasto le pertenece al presupuesto*/
  @ForeignKey(() => Budget)
  declare budgetId: number

  @BelongsTo(() => Budget)
  declare budget: Budget
}
export default Expense