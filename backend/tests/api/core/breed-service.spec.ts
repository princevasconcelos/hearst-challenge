import { BreedService } from "../../../src/api/core/breed-service"
import { BreedRepositorySpy } from "../../mocks/mock-breeds"


const makeSut = (): { sut: BreedService, breedRepositorySpy: BreedRepositorySpy } => {
  const breedRepositorySpy = new BreedRepositorySpy()
  const sut = new BreedService(breedRepositorySpy)

  return {
    sut,
    breedRepositorySpy
  }
}

describe('Breed Service loadList', () => {
  it('should call load if name is not passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'load')
    const params = { randomize: false }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not call loadByName if name is not passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'loadByName')
    const params = { randomize: false }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not call load if name is passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'load')
    const params = { name: 'name', randomize: false }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should call loadByName if name is passed', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const spy = jest.spyOn(breedRepositorySpy, 'loadByName')
    const params = { name: 'name', randomize: false }

    await sut.loadList(params)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should return a list of breeds', async () => {
    const { sut, breedRepositorySpy } = makeSut()

    let params: any = { randomize: false }
    let breeds = await sut.loadList(params)
    expect(breeds).toBe(breedRepositorySpy.loadResult)

    params = { name: 'name', randomize: false }
    breeds = await sut.loadList(params)
    expect(breeds).toBe(breedRepositorySpy.loadByNameResult)
  })
})

describe('Breed Service loadDetails', () => {
  it('should call loadById with correct params', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const id = 'id'

    await sut.loadDetails(id)
    expect(breedRepositorySpy.loadByIdParams).toBe(id)
  })

  it('should return a breed on success', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const id = 'id'

    const result = await sut.loadDetails(id)
    expect(breedRepositorySpy.loadByIdResult).toBe(result)
  })

  it('should return null when not found', async () => {
    const { sut, breedRepositorySpy } = makeSut()
    const id = 'id'
    breedRepositorySpy.loadByIdResult = null

    const result = await sut.loadDetails(id)
    expect(result).toBeNull()
  })
})
