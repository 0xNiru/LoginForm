import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createClient } from "@supabase/supabase-js";

const niru = express();

niru.use(express.json());
niru.use(express.urlencoded({ extended: true }));

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

niru.post("/signup", async (req, res) => {
  try {
    const { mail, pswd, first_name, last_name, dob } = req.body;

    if (!mail || !pswd || !first_name || !last_name || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email: mail,
      password: pswd
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const userId = data.user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        first_name,
        last_name,
        dob
      });

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(201).json({
      success: true,
      message: "Signup successful"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

niru.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
