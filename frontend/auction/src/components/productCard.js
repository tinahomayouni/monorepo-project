import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => navigate(`/products/${product?.id}`)}
    >
      <CardHeader
        title={product?.name}
        subheader={product?.created_at.split("T")[0]}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:3000/api/image/${product?.images[0]}`}
        alt="Paella dish"
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Chip label={product?.status} color="primary" />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
