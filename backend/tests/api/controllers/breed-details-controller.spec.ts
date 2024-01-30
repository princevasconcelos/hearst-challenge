import BreedDetailsController from "../../../src/api/controllers/breed-details-controller"
import { BreedServiceSpy } from "../../mocks/mock-breeds"

const makeCompleteRequest = (): any => ({
  params: {
    id: 'id'
  }
})

const makeSut = (): { sut: BreedDetailsController, breedServiceSpy: BreedServiceSpy } => {
  const breedServiceSpy = new BreedServiceSpy()
  const sut = new BreedDetailsController(breedServiceSpy)

  return {
    sut,
    breedServiceSpy
  }
}

describe('Breed Details Controller handle', () => {
  it('should call loadDetails with corret params', async () => {
    const { sut, breedServiceSpy } = makeSut()
    const request = makeCompleteRequest()

    await sut.handle(request)
    expect(breedServiceSpy.loadDetailsParam).toBe(request.params.id)
  })

  it('should return a breed on success', async () => {
    const { sut, breedServiceSpy } = makeSut()
    const request = makeCompleteRequest()

    const result = await sut.handle(request)
    expect(breedServiceSpy.loadDetailsResult).toBe(result)
  })

  it('should return null when not found', async () => {
    const { sut, breedServiceSpy } = makeSut()
    const request = makeCompleteRequest()
    breedServiceSpy.loadDetailsResult = null

    const result = await sut.handle(request)
    expect(result).toBeNull()
  })
})
