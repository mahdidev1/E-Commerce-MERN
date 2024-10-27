import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseURL";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";

function Home() {
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProduct(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        Somthing went wrong try again!{" "}
      </Box>
    );
  }

  return (
    <Grid2 sx={{ maxWidth: "100%", m: 3 }}>
      <Grid2 container spacing={3}>
        {product.map((p) => (
          <Grid item md={4}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default Home;
