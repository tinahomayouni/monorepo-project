import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks";
import CircularProgress from "@mui/material/CircularProgress";

const AddProduct = () => {
  const [addProductData, addProduct] = useFetch();
  const [uploadData, uploadFile] = useFetch();

  const [images, setImages] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (addProductData?.data) {
      navigate("/products");
    }
  }, [addProductData]);

  React.useEffect(() => {
    if (uploadData?.data) {
      setImages((prev) => [...prev, uploadData?.data?.id]);
    }
  }, [uploadData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    addProduct({
      method: "post",
      url: "/products/register",
      data: {
        images: images,
        name: data.get("name"),
        price: data.get("price"),
        description: data.get("description"),
      },
    });
  };
  const onFileChange = (event) => {
    // Update the state
    const formData = new FormData();

    const file = event.target.files[0];
    console.log(file, "event.target.files");

    // Update the formData object
    formData.append("file", file, file?.name);

    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    uploadFile({
      method: "post",
      url: "/image/upload",
      data: formData,
    });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input type="file" onChange={onFileChange} />

        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="price"
          label="price"
          type="price"
          id="price"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="description"
          type="description"
          id="description"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {uploadData?.loading ? (
            <CircularProgress color="secondary" />
          ) : (
            "Create Product"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
