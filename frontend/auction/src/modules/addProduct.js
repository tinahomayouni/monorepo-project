import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks";

const AddProduct = () => {
  const [addProductData, addProduct] = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (addProductData?.data) {
      navigate("/products");
    }
  }, [addProductData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    addProduct({
      method: "post",
      url: "/products/register",
      data: {
        images: [],
        name: data.get("name"),
        price: data.get("price"),
        description: data.get("description"),
      },
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
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
