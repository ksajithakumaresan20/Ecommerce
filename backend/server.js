require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://statuesque-boba-99c0ff.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get all products
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.log("GET ALL ERROR =", error);
    return res.status(500).json(error);
  }

  res.json(data);
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("GET ONE ERROR =", error);
    return res.status(500).json(error);
  }

  res.json(data);
});

// Add product
app.post("/api/products", async (req, res) => {
  try {
    console.log("========== POST HIT ==========");
    console.log("POST BODY =", req.body);

    const { title, price, category, image, description, stock } =
      req.body;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title,
          price,
          category,
          image,
          description,
          stock,
        },
      ])
      .select();

   if (error) {
  console.log("========== POST ERROR ==========");
  console.log(JSON.stringify(error, null, 2));
  return res.status(500).json(error);
}

    res.status(201).json(data);
  } catch (err) {
    console.log("POST CATCH ERROR =", err);
    res.status(500).json(err);
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    console.log("PUT ROUTE HIT");
    console.log("ID =", req.params.id);
    console.log("BODY =", req.body);

    const { data, error } = await supabase
      .from("products")
      .update(req.body)
      .eq("id", req.params.id)
      .select();

    console.log("DATA =", data);
    console.log("ERROR =", error);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);
  } catch (err) {
    console.log("PUT CATCH ERROR =", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("DELETE ERROR =", error);
      return res.status(500).json(error);
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log("DELETE CATCH ERROR =", err);
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running 🚀"
  });
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});