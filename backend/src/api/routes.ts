import { Router, Express, Request, Response } from "express"
import { makeBreedListController } from "./main/factories/breed-list-controller-factory";
import { BaseController } from "./controllers/interfaces/base-controller";
import { makeBreedDetailsController } from "./main/factories/breed-details-controller-factory";

const adaptRoute = (controller: BaseController<any>) => async (req: Request, res: Response) => {
    try {
        const result = await controller.handle(req)
        res.status(200).json(result)
    } catch (error) {
        console.error(error.error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const setupRoutes = (app: Express) => {
    const router = Router();

    router.get('/breed', adaptRoute(makeBreedListController()))
    router.get('/breed/:id', adaptRoute(makeBreedDetailsController()))

    app.use('/api', router)
}
