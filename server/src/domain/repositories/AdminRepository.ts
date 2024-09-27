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
    getEditCategoryName(_id:string) : Promise<{categoryName:string} |null>
    getAllWorkerList(): Promise<WorkerInformation[] | undefined> // * all worker list
    getAllUserList(): Promise<User[]>     // * Admin in User side
    isBlockUser(_id:string,isBlock:boolean) : Promise<void>
}