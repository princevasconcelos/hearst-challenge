import { Request } from "express";
import { BaseController } from "./interfaces/base-controller";
import { BreedModel } from "../core/models/breed-model";
import { BreedListLoadParams, BreedServiceInterface } from "../core/interfaces/breed-service-interface";

export class BreedListController implements BaseController<BreedModel[]> {
    constructor(
        private readonly breedService: BreedServiceInterface
    ) {}

    async handle(req: Request) {
        console.log('BreedListController.handle')
        const params = this.mapParams(req);
        return await this.breedService.loadList(params)
    }

    mapParams(req: Request): BreedListLoadParams {
        return {
            limit: Number(req.query?.limit) || 10,
            name: req.query?.name as string,
            randomize: req.query?.randomize === '1'
        }
    }
}