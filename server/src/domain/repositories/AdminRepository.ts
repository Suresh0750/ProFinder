import { AddCategory,addCategoryData } from "../entities/Admin";
import {WorkerInformation} from "../entities/Worker"
import {User} from "../entities/User"



export interface IAdminRepository{
    CheckExistCategory(categoryName:string) : Promise<AddCategory | null>  // * Admin in category side
    AddCategoryQuery(categoryDetails:AddCategory) :Promise<AddCategory> ;
    getAllCategoryQuery() : Promise<AddCategory[]>
    IsListedQuery(_id:string,isListed:boolean):Promise<void>
    deleteProductQuery(_id:string) : Promise<void>;
    EditeCategoryQuery(categoryData:AddCategory) : Promise<void>
<<<<<<< HEAD
    getEditCategoryName(_id:string) : Promise<{categoryName:string} |null>
    getAllWorkerList(): Promise<WorkerInformation[] | undefined> // * all worker list
    getAllUserList(): Promise<User[]>     // * Admin in User side
=======
    getAllWorkerList(): Promise<WorkerInformation[]> // * all worker list
    getEditCategoryName(_id:string) : Promise<{categoryName:string} |null>
>>>>>>> ec33c107a0e67bace27bb858d2e1b00eb8a894f4
}