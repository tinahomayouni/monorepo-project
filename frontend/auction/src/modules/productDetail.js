import * as React from "react";
import useFetch from "../hooks";
import { Box, Container, ListItemButton } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductDetail = () => {
  const [productData, fetchProduct] = useFetch();
  const [offersData, fetchOffers] = useFetch();
  const [makeOfferApiData, makeOfferApi] = useFetch();
  const [buyProductApiData, buyProductApi] = useFetch();
  const [acceptOfferData, acceptOffer] = useFetch();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { id } = useParams();

  React.useEffect(() => {
    fetchProduct({
      url: `/products/${id}`,
      method: "get",
    });
    fetchOffers({
      url: `/offers/${id}?order=DESC&page=1&take=10`,
      method: "get",
    });
  }, []);

  React.useEffect(() => {
    if (buyProductApiData?.data) {
      fetchProduct({
        url: `/products/${id}`,
        method: "get",
      });
    }
  }, [buyProductApiData]);

  React.useEffect(() => {
    if (makeOfferApiData?.data) {
      handleClose();
      fetchProduct({
        url: `/products/${id}`,
        method: "get",
      });
      fetchOffers({
        url: `/offers/${id}?order=DESC&page=1&take=10`,
        method: "get",
      });
    }
  }, [makeOfferApiData]);

  React.useEffect(() => {
    console.log(acceptOfferData, "acceptOfferData");
    if (acceptOfferData?.data) {
      navigate("/products");
    }
  }, [acceptOfferData]);

  const buyProduct = () => {
    buyProductApi({
      url: `/products/buy/${id}`,
      method: "get",
    });
  };

  const makeOffer = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    makeOfferApi({
      url: `/offers/makeOffer`,
      method: "post",
      data: {
        productId: id,
        price: data.get("price"),
      },
    });
  };

  const accept = () => {
    acceptOffer({
      url: `/offers/accept-offer/${id}`,
      method: "get",
    });
  };

  const isSeller = offersData?.data?.user === productData?.data?.creator_id;

  const lastOfferMadeByBuyer =
    offersData?.data?.data[0]?.creator_id !== productData?.data?.creator_id;

  const lastOfferMadeBySeller =
    offersData?.data?.data[0]?.creator_id === productData?.data?.creator_id;

  return (
    <Container>
      <Stack spacing={2} direction="row" style={{ marginBottom: 32 }}>
        <Button variant="contained" onClick={buyProduct}>
          Buy
        </Button>
        <Button
          variant="outlined"
          onClick={handleOpen}
          disabled={isSeller ? lastOfferMadeBySeller : lastOfferMadeByBuyer}
        >
          Counter Offer
        </Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Chip label={productData?.data?.status} color="primary" />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {productData?.data?.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {productData?.data?.price}
      </Typography>

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          margintop: 100,
        }}
      >
        {offersData?.data?.data?.map((offer, index) => {
          return (
            <ListItem key={index}>
              <ListItemText
                primary={offer?.price}
                secondary={offer?.created_at?.split("T")[0]}
              />
              {index === 0 &&
              ((isSeller && lastOfferMadeByBuyer) ||
                (!isSeller && lastOfferMadeBySeller)) ? (
                <ListItemButton onClick={accept}>Accept</ListItemButton>
              ) : null}
            </ListItem>
          );
        })}
      </List>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" onSubmit={makeOffer} noValidate sx={{ mt: 1 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Input Your Price
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              type="price"
              id="price"
            />
            <Stack spacing={2} direction="row" style={{ marginBottom: 32 }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
