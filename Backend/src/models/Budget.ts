import { Table, Model, Column, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'

@Table({
  tableName: 'budgets',
})

class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100], // Coincide con Zod
      notNull: { msg: 'El nombre es requerido' }
    }
  })
  declare name: string

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: { msg: 'El monto debe ser un número' },
      min: { args: [0], msg: 'El monto debe ser positivo' }
    }
  })
  declare amount: number
}
export default Budget