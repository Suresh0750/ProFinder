import { AddCategory,addCategoryData } from "../entities/Admin";
import {WorkerInformation} from "../entities/Worker"




export interface IAdminRepository{
    AddCategoryQuery(categoryDetails:AddCategory) :Promise<AddCategory> ;
    CheckExistCategory(categoryName:string) : Promise<AddCategory | null>
    getAllCategoryQuery() : Promise<AddCategory[]>
    IsListedQuery(_id:string,isListed:boolean):Promise<void>
    deleteProductQuery(_id:string) : Promise<void>;
    EditeCategoryQuery(categoryData:AddCategory) : Promise<void>
    getAllWorkerList(): Promise<WorkerInformation[]> // * all worker list
    getEditCategoryName(_id:string) : Promise<{categoryName:string} |null>
}