import { BreedRepository } from "../../../src/api/repositories/breed-repository"
import { makeManyBreeds } from "../../mocks/mock-breeds"

const makeSut = () => {
    const sut = new BreedRepository()
    return { sut }
}

describe('Breed Repository load', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('should return a list of breeds on success', async () => {
        const { sut } = makeSut()
        const breeds = makeManyBreeds()
        let result: any

        const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds').mockResolvedValue(breeds)

        result = await sut.load(false)
        expect(result).toEqual(breeds)
        result = await sut.load(false, 3)
        expect(result).toEqual(breeds.slice(0, 3))

        expect(spy).toHaveBeenCalledTimes(2)
    })
})

describe('Breed Repository loadByName', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('should return a list of breeds filteres by name on success', async () => {
        const { sut } = makeSut()
        const breeds = makeManyBreeds()
        breeds[0].name = 'miau1'
        breeds[1].name = 'miau2'

        const spy = jest.spyOn(BreedRepository.prototype, 'fetchBreeds')
            .mockResolvedValue(breeds)

        const result = await sut.loadByName('miau', false)
        expect(result).toEqual([breeds[0], breeds[1]])
        expect(spy).toHaveBeenCalledTimes(1)
    })
})
