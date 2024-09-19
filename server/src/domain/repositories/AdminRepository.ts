import { AddCategory } from "../entities/Admin";




export interface IAdminRepository{
    AddCategoryQuery(categoryDetails:AddCategory) :Promise<AddCategory> ;

}