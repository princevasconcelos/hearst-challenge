import { BreedListController } from "../../../src/api/controllers/breed-list-controller"
import { BreedListLoadParams } from "../../../src/api/core/interfaces/breed-service-interface"
import { BreedServiceSpy } from "../../mocks/mock-breeds"

const makeCompleteRequest = (): any => ({
  query: {
    limit: 10,
    name: 'Breed Name',
    randomize: 0
  }
})

const makeEmptyRequest = (): any => ({})

const makeBreedListLoadParams = (): BreedListLoadParams => ({
  limit: 10,
  name: 'name',
  randomize: false
})

const makeSut = (): { sut: BreedListController, breedServiceSpy: BreedServiceSpy } => {
  const breedServiceSpy = new BreedServiceSpy()
  const sut = new BreedListController(breedServiceSpy)

  return {
    breedServiceSpy,
    sut
  }
}

describe('Breed List Controller handle', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should call mapParams with the correct params', async () => {
    const { sut } = makeSut()
    const request = makeCompleteRequest()
    const spy = jest.spyOn(BreedListController.prototype, 'mapParams').mockImplementation(() => makeBreedListLoadParams())

    await sut.handle(request)

    expect(spy).toBeCalledWith(request)
  })

  it('should call loadList with the correct params', async () => {
    const { breedServiceSpy, sut } = makeSut()
    const request = makeCompleteRequest()
    const loadParams = makeBreedListLoadParams()
    jest.spyOn(BreedListController.prototype, 'mapParams').mockImplementation(() => loadParams)

    await sut.handle(request)

    expect(breedServiceSpy.breedListLoadParams).toBe(loadParams)
  })

  it('should return a list of breeds on success', async () => {
    const { breedServiceSpy, sut } = makeSut()
    const request = makeCompleteRequest()
    const breeds = await sut.handle(request)

    expect(breeds).toBe(breedServiceSpy.loadListResult)
  })
})

describe('Breed List Controller mapParams', () => {
  it('should return a correct BreedListLoadParams', () => {
    const { sut } = makeSut()
    const request = makeCompleteRequest()
    expect(sut.mapParams(request)).toEqual({ limit: request.query.limit, name: request.query.name, randomize: request.query.randomize === '1' })
    expect(sut.mapParams(makeEmptyRequest())).toEqual({ limit: null, randomize: false })
  })
})
