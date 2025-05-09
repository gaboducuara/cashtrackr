import { createRequest, createResponse } from 'node-mocks-http'
import { BudgetController } from '../../../controllers/BudgetController'
import { budgets } from '../../mocks/budgets'
import Budget from '../../../models/Budget'
import Expense from '../../../models/Expense'

//prueba hacia presupuestos
jest.mock('../../../models/Budget', () => ({
  /*Simulacion de metodos en Sequelize*/
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}))
//Pruebas unitarias
describe('BudgetController.getAll', () => {

  // se Ejecuta antes de que cada TEST arranque
  //EL metodo de "mockImplementation" resuelve el test en base al request que se le envia en el options
  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();
    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
      return Promise.resolve(updatedBudgets)
    })
  })

  it('debe recuperar 2 Presupuestos para el usuario con el id 1', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 1 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa
    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(2)
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('debe recuperar 1 Presupuesto para el usuario con el id 2', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 2 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa
    const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);
    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(1);
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('debe recuperar 0 Presupuesto para el usuario con el id 10', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 10 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa
    const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);
    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(0);
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('Gestionar error al obtener presupuestos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 10 }
    });

    const res = createResponse();

    (Budget.findAll as jest.Mock).mockRejectedValue(new Error)
    await BudgetController.getAll(req, res);

    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Existe error en traer todos los presupuestos.' }) /*ayuda a similar el mensaje de error del controlador es decir se debe poner el mismo mensaje de error del controlador aqui*/
  })
})
describe('BudgetController.create', () => {
  it('Debería Crear un nuevo Presupuesto y responder con statusCode 201', async () => {

    const mockBudget = {
      save: jest.fn().mockResolvedValue(true)
    };
    (Budget.create as jest.Mock).mockResolvedValue(mockBudget);

    const req = createRequest({
      method: 'POST',
      url: '/api/budget',
      user: { id: 1 },
      body: { name: 'Presupuesto Prueba', amount: 1000 }
    });

    const res = createResponse();
    await BudgetController.create(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(data).toBe('Presupuesto Creado Correctamente.')
    /*Prueba para simular que el controlador create realmente guarda algo en la base de datos*/
    expect(mockBudget.save).toHaveBeenCalled(); /*Metodo de Realizacion de llamado toHaveBeenCalled*/
    /*Forma normal para que se mande a llamar una ves y evitar registros duplicados, si se manda a llamar dos veces deberia salir error*/
    expect(mockBudget.save).toHaveBeenCalledTimes(1);
    /*Un metodo ha sido llamado por un valor en especifico //Budget.create(req.body) -- Probar si Budget.create fue instanciado por req.body*/
    expect(Budget.create).toHaveBeenCalledWith(req.body);
  })
  it('Controlar handle budget creation error', async () => {

    const mockBudget = {
      save: jest.fn()
    };

    (Budget.create as jest.Mock).mockRejectedValue(new Error);
    const req = createRequest({
      method: 'POST',
      url: '/api/budget',
      user: { id: 1 },
      body: { name: 'Presupuesto Prueba', amount: 1000 }
    });

    const res = createResponse();

    (Budget.create as jest.Mock).mockRejectedValue(new Error)
    await BudgetController.create(req, res);
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Existe error al crear los presupuestos.' }) /*Simulando el error (500)*/
    /*Esta parte se realiza para no mandar a llamar el metodo save*/
    expect(mockBudget.save).not.toHaveBeenCalled();
    /*Un metodo ha sido llamado por un valor en especifico //Budget.create(req.body) -- Probar si Budget.create fue instanciado por req.body*/
    expect(Budget.create).toHaveBeenCalledWith(req.body);
  })
})
describe('BudgetController.getById', () => {
  // se Ejecuta antes de que cada TEST arranque
  //EL metodo de "mockImplementation" resuelve el test en base al request que se le envia en el options
  beforeEach(() => {
    (Budget.findByPk as jest.Mock).mockImplementation((id) => {
      //debe retornar un objeto por eso se pone posicion 0
      const budget = budgets.filter(budget => budget.id === id)[0];
      return Promise.resolve(budget)
    })
  })
  it('debe recuperar un Presupuesto para el id 1 y 3 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:budgetId',
      budget: { id: 1 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    /*toHaveLength -> sirve para saber cuantos elementos existen en un arreglo*/
    expect(data.expenses).toHaveLength(3);
    /*Metodo toHaveBeenCalled de Realizacion de llamado al metodo findByPk*/
    expect(Budget.findByPk).toHaveBeenCalled();
    /*Metodo toHaveBeenCalledTimes metodo de realizacion de llamado a findByPk cuantas veces se llama en este caso 1 vez*/
    expect(Budget.findByPk).toHaveBeenCalledTimes(1);
    /*Hace test a req.budget.id del controlador con el metodo toHaveBeenCalledWith*/
    expect(Budget.findByPk).toHaveBeenCalledWith(req.budget.id, {
      include: [Expense],
    });
  })

  it('debe recuperar un Presupuesto para el id 2 y 2 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:id',
      budget: { id: 2 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    /*toHaveLength -> sirve para saber cuantos elementos existen en un arreglo*/
    expect(data.expenses).toHaveLength(2);
  })

  it('debe recuperar un Presupuesto para el id 2 y 2 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:id',
      budget: { id: 3 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    /*toHaveLength -> sirve para saber cuantos elementos existen en un arreglo*/
    /*Se require saber cuantos gastos existen por Id*/
    expect(data.expenses).toHaveLength(0);
  })
})
describe('BudgetController.updateById', () => {
  it('Recuperar la actualizacion del Presupuesto y Retornar el mensaje', async () => {
    const BudgetMock = {
      update: jest.fn().mockResolvedValue(true)
    }
    const req = createRequest({
      method: 'PUT',
      url: '/api/budget/:budgetId',
      budget: BudgetMock,
      //Simular formulario
      body: { name: 'Presupuesto Actualizado', amount: 1000 },
    });
    const res = createResponse();
    await BudgetController.updateById(req, res);
    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toBe('Presupuesto actualizado correctamente.')
    /*que realice el llamado*/
    expect(BudgetMock.update).toHaveBeenCalled()
    /*La Cantidad de veces el cual realiza el llamado*/
    expect(BudgetMock.update).toHaveBeenCalledTimes(1)
    /*Forma de como se realiza el llado al en este caso es req.body*/
    expect(BudgetMock.update).toHaveBeenCalledWith(req.body)
  })
})
describe('BudgetController.deleteById', () => {
  it('Eliminar el Presupuesto y Retornar el mensaje', async () => {
    const BudgetMock = {
      destroy: jest.fn().mockResolvedValue(true)
    }
    const req = createRequest({
      method: 'DELETE',
      url: '/api/budget/:budgetId',
      budget: BudgetMock,
    });
    const res = createResponse();
    await BudgetController.deleteById(req, res);
    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toBe('Presupuesto Eliminado.')
    /*que realice el llamado*/
    expect(BudgetMock.destroy).toHaveBeenCalled()
    /*La Cantidad de veces el cual realiza el llamado*/
    expect(BudgetMock.destroy).toHaveBeenCalledTimes(1)
  })
})