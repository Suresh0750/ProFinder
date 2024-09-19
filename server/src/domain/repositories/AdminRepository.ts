import { AddCategory } from "../entities/Admin";




export interface IAdminRepository{
    AddCategoryQuery(categoryDetails:AddCategory) :Promise<AddCategory> ;
    CheckExistCategory(categoryName:string) : Promise<AddCategory | null>
    getAllCategoryQuery() : Promise<AddCategory[]>
    IsListedQuery(_id:string,isListed:boolean):Promise<void>
    deleteProductQuery(_id:string) : Promise<void>;
}