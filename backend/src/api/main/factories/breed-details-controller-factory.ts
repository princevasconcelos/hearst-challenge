import BreedDetailsController from "../../controllers/breed-details-controller"
import { BreedService } from "../../core/breed-service"
import { BreedRepository } from "../../repositories/breed-repository"

export const makeBreedDetailsController = () => {
    const breedRepository = new BreedRepository()
    const breedService = new BreedService(breedRepository)
    return new BreedDetailsController(breedService)
}