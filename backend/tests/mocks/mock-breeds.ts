import { BreedRepositoryInterface } from "../../src/api/core/interfaces/breed-repository-interface"
import { BreedListLoadParams, BreedServiceInterface } from "../../src/api/core/interfaces/breed-service-interface"
import { BreedModel, Image, Weight } from "../../src/api/core/models/breed-model"

const makeImage = (): Image => ({
    height: 1,
    id: 'id',
    url: 'url',
    width: 1
})

const makeWeight = (): Weight => ({
    imperial: 'imperial',
    metric: 'metric',
})

export const makeOneBreed = (): BreedModel => ({
    adaptability: 1,
    affection_level: 1,
    alt_names: 'alt_names',
    cfa_url: 'cfa_url',
    child_friendly: 1,
    country_code: 'country_code',
    country_codes: 'country_codes',
    description: 'description',
    dog_friendly: 1,
    energy_level: 1,
    experimental: 1,
    grooming: 1,
    hairless: 1,
    health_issues: 1,
    hypoallergenic: 1,
    id: 'id',
    image: makeImage(),
    indoor: 1,
    intelligence: 1,
    life_span: 'life_span',
    name: 'name',
    natural: 1,
    origin: 'origin',
    rare: 1,
    reference_image_id: 'reference_image_id',
    rex: 1,
    shedding_level: 1,
    short_legs: 1,
    social_needs: 1,
    stranger_friendly: 1,
    suppressed_tail: 1,
    temperament: 'temperament',
    vcahospitals_url: 'vcahospitals_url',
    vetstreet_url: 'vetstreet_url',
    vocalisation: 1,
    weight: makeWeight(),
    wikipedia_url: 'wikipedia_url'
})

export const makeManyBreeds = (): BreedModel[] => ([
    makeOneBreed(),
    makeOneBreed(),
    makeOneBreed(),
    makeOneBreed(),
    makeOneBreed(),
    makeOneBreed(),
])

export class BreedServiceSpy implements BreedServiceInterface {
    breedListLoadParams: BreedListLoadParams
    loadListResult: BreedModel[] = makeManyBreeds()

    loadDetailsParam: string
    loadDetailsResult: BreedModel = makeOneBreed()

    async loadList(params: BreedListLoadParams) {
        this.breedListLoadParams = params
        return this.loadListResult
    }

    async loadDetails(id: string) {
        this.loadDetailsParam = id
        return this.loadDetailsResult
    }
}

export class BreedRepositorySpy implements BreedRepositoryInterface {
    loadParams: any
    loadResult: BreedModel[] = makeManyBreeds()

    loadByNameParams: any
    loadByNameResult: BreedModel[] = makeManyBreeds()

    loadByIdParams: any
    loadByIdResult: BreedModel = makeOneBreed()

    async load(randomize: boolean, limit?: number) {
        this.loadParams = limit
        return this.loadResult
    }

    async loadByName(name: string, randomize: boolean, limit?: number) {
        this.loadByNameParams = { name, limit }
        return this.loadByNameResult
    }

    async loadById(id: string) {
        this.loadByIdParams = id
        return this.loadByIdResult
    }
    
}
