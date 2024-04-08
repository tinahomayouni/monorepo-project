import * as React from "react";
import useFetch from "../hooks";
import ProductCard from "../components/productCard";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Products = () => {
  const [productsData, fetchProducts] = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts({
      url: "/products?order=ASC&page=1&take=10",
      method: "get",
    });
  }, []);

  React.useEffect(() => {
    console.log(productsData);
  }, [productsData]);

  return (
    <Container>
      <Stack spacing={2} direction="row" style={{ marginBottom: 32 }}>
        <Button variant="contained" onClick={() => navigate("/add-product")}>
          Sell
        </Button>
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Logout
        </Button>
      </Stack>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {productsData?.data?.data?.map((product, index) => {
          return (
            <Grid item xs={3}>
              <ProductCard key={index} product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Products;
