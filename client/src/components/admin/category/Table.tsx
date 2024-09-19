"use client";
import mechanicImage from "../../../../public/images/Admin/category/mechanic.jpg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Input, Typography } from "@mui/material";

// Import SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// * API call
import { useFetchCategoryDataQuery, useEditCategoryAPIMutation, useListUnlistAPIMutation, useDeleteProductAPIMutation } from "../../../lib/features/api/adminApiSlice";

export default function Table() {
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
  const [categoryId, setCategoryId] = useState<string>('')

  const MySwal = withReactContent(Swal); // Initialize SweetAlert with React

  // * API calls | RTK Query 
  const [EditCategoryAPI] = useEditCategoryAPIMutation();
  const [ListUnlistAPI] = useListUnlistAPIMutation();
  const [deleteProductAPI, { isLoading: deleteLoading }] = useDeleteProductAPIMutation();

  useEffect(() => {
    if (categoryData) {
      setAllCategory(categoryData.totalCategory || []);
    }
  }, [categoryData]);

  // *  Open modal with category data for editing
  const handleEditClick = (category: any) => {
    setEditedName(category.categoryName);
    setEditedDescription(category.categoryDescription);
    setEditedImage(category.categoryImage);
    setEditCategory(category);
    setCategoryId(category._id);
    setNewImage(false);  // Reset image change tracking
    setErrorMessage(null);  // Clear previous validation errors
    setOpen(true);
  };

  // *  Close modal
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

    // Save/update functionality (e.g., API call)
    const result = await EditCategoryAPI({ categoryName: editedName, categoryDescription: editedDescription, categoryImage: editedImage, newImage, _id: categoryId });

    setAllCategory(prevCategories =>
      prevCategories.map(category =>
        category._id === editCategory._id
          ? { ...category, categoryName: editedName, categoryDescription: editedDescription, categoryImage: editedImage }
          : category
      )
    );

    setSuccessMessage("Category updated successfully!");

    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  // * Handle image selection
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedImage(imageUrl);
      setNewImage(true);  // New image selected
    }
  };

  // * Handle delete with SweetAlert confirmation
  const handleDeleteClick =async (category: any) => {
    try{

      MySwal.fire({
        title: `Delete category "${category.categoryName}"?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (deleteLoading) return; // Prevent multiple clicks
  
          // API call to delete
          
          const result = await deleteProductAPI(category._id)
          console.log(result)
          if(result.data.success){
            setAllCategory(prevCategories => prevCategories.filter(item => item._id !== category._id));
            MySwal.fire("Deleted!", `${category.categoryName} has been deleted.`, "success");
          }
        }
      });
    }catch(error){
      console.log(error)
    }
  };

  // * Toggle list/unlist
  const handleToggleList = (category: any) => {
    const updatedStatus = category.isListed ? "unlisted" : "listed";
    ListUnlistAPI({ _id: category._id, isListed: category?.isListed });

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
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            margin="dense"
            label="Category Description"
            fullWidth
            multiline
            rows={3}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
            error={!editedDescription.trim()}
            sx={{ marginBottom: '1.5rem' }}
          />

          {/* Image upload */}
          <Box className="flex flex-col justify-center items-center gap-4">
            <Typography>Category Image</Typography>
            {editedImage && <img src={editedImage} alt="Category" width="150" />}
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </Box>

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
