"use client";
import mechanicImage from "../../../../public/images/Admin/category/mechanic.jpg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Input, Typography } from "@mui/material";

// * API call
import { useFetchCategoryDataQuery,useEditCategoryAPIMutation,useListUnlistAPIMutation } from "../../../lib/features/api/adminApiSlice";

export default function Table() {
  // Fetch category data
  const { data: categoryData, error, isLoading } = useFetchCategoryDataQuery(undefined);
  const [allCategory, setAllCategory] = useState<any[]>([]);
  
  // States for edit modal
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [newImage, setNewImage] = useState(false);  // Track if a new image is selected
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Validation message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // Success feedback
  const [categoryId,setCategoryId] = useState<string>('')

  // * API call | RTK Query 
  const [EditCategoryAPI] = useEditCategoryAPIMutation()
  const [ListUnlistAPI] = useListUnlistAPIMutation()

  useEffect(() => {
    if (categoryData) {
      setAllCategory(categoryData.totalCategory || []);
    }
  }, [categoryData]);

  // *  Open the modal with category data to edit
  const handleEditClick = (category: any) => {
    setEditedName(category.categoryName);
    setEditedDescription(category.categoryDescription);
    setEditedImage(category.categoryImage);
    setEditCategory(category);
    setCategoryId(category._id)
    setNewImage(false);  // Reset image change tracking
    setErrorMessage(null);  // Clear previous validation errors
    setOpen(true);
  };

  

  // *  Close the modal
  const handleClose = () => {
    setOpen(false);
    setEditCategory(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // *  Handle form submission with validation
  const handleSave = async () => {
    if (!editedName.trim() || !editedDescription.trim() || (!editedImage.trim() && !newImage)) {
      setErrorMessage("All fields are required and should not be empty.");
      return;
    }

    // Perform the save/update functionality (e.g., API call to update category)
    console.log("Saving the category:", { editedName, editedDescription, editedImage, newImage ,categoryId});

  
    const result = await EditCategoryAPI({categoryName:editedName,categoryDescription:editedDescription,categoryImage:editedImage,newImage,_id:categoryId}) 
    // *  Update the category data locally for testing

    setAllCategory(prevCategories =>
      prevCategories.map(category =>
        category._id === editCategory._id 
          ? { ...category, categoryName: editedName, categoryDescription: editedDescription, categoryImage: editedImage }
          : category
      )
    );

    // * Show success feedback
    setSuccessMessage("Category updated successfully!");

    // * Close the modal after saving with a delay
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  // *  Handle new image selection
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedImage(imageUrl);
      setNewImage(true); // * Mark that a new image has been selected
    }
  };

  // *  Handle delete confirmation
  const handleDeleteClick = (category: any) => {
    const confirmed = window.confirm(`Are you sure you want to delete category "${category.categoryName}"?`);
    if (confirmed) {
      console.log("Deleting category:", category._id);

      // Perform the delete functionality (e.g., API call to delete category)

      // Update local state for testing
      setAllCategory(prevCategories => prevCategories.filter(item => item._id !== category._id));
    }
  };

  // Handle list/unlist toggle
  const handleToggleList = (category: any) => {
    console.log(category)

    const updatedStatus = category.isListed ? "unlisted" : "listed";
    console.log(`Category "${category.categoryName}" is now ${updatedStatus}.`);

    // const result = ListUnlistAPI(category._id,category.isListed)
    // Toggle status in the local state for testing
    setAllCategory(prevCategories =>
      prevCategories.map(item =>
        item._id === category._id
          ? { ...item, isListed: !item.isListed }
          : item
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="p-5">
      <table className="w-full table-fixed border border-gray-300 rounded-md">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="w-1/12 px-4 py-2">Id</th>
            <th className="w-2/12 px-4 py-2">Image</th>
            <th className="w-3/12 px-4 py-2">Category</th>
            <th className="w-2/12 px-4 py-2">List/Unlist</th>
            <th className="w-2/12 px-4 py-2">Edit</th>
            <th className="w-2/12 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategory.map((val, i) => (
            <tr key={val._id} className="border-b">
              <td className="text-center">{i + 1}</td>
              <td className="text-center flex justify-center items-center">
                <div className="w-12 h-12">
                  <img loading="lazy" src={val?.categoryImage} alt={val?.categoryName} className="rounded-full" />
                </div>
              </td>
              <td className="text-center">{val?.categoryName}</td>
              <td className="text-center">
                <button
                  className={`p-2 px-7 rounded text-white ${val.isListed ? 'bg-red-600' : 'bg-green-500'} cursor-pointer`}
                  onClick={() => handleToggleList(val)}
                >
                  {val.isListed ? 'Unlist' : 'List'}
                </button>
              </td>
              <td className="text-center">
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ color: "#1975d1", cursor: "pointer" }}
                  onClick={() => handleEditClick(val)}
                />
              </td>
              <td className="text-center">
                <DeleteOutlineIcon
                  style={{ color: "#D32F2F", cursor: "pointer" }}
                  onClick={() => handleDeleteClick(val)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing the category */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            required
            error={!editedName.trim()}
          />
          <TextField
            margin="dense"
            label="Category Description"
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
            error={!editedDescription.trim()}
          />
          
          {/* Show image preview and allow user to select a new image */}
          <Box mt={2} display="flex" alignItems="center">
            <img src={editedImage} alt="Category" width={100} height={100} style={{ marginRight: "1rem" }} />
            <Input type="file" onChange={handleImageChange} inputProps={{ accept: "image/*" }} />
          </Box>

          {errorMessage && <Typography color="error" variant="body2">{errorMessage}</Typography>}
          {successMessage && <Typography color="primary" variant="body2">{successMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
