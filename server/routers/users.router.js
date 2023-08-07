const express = require("express");
const router = express.Router();
const db = require("../utils/database");

// get all
router.get("/", async (req, res) => {
  try {
    const data = await db.execute("SELECT * FROM users");
    return res.status(200).json({
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.execute(" SELECT * FROM users WHERE users_id = ?", [
      id,
    ]);
    return res.status(200).json({
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// thêm 1 users
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const data = await db.execute(
      "INSERT INTO users (name, description) VALUES (?,?)",
      [name, description]
    );
    return res.json({
      message: "Create new student successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const data = await db.execute(
      " UPDATE users SET name = ?, description = ? WHERE users_id = ? ",
      [name, description, id]
    );
    if (data.length === 0) {
      res.json({
        message: `không tìm thấy id: ${id}`,
      });
    } else {
      res.json({
        message: `cập nhật thành công id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.execute(" DELETE FROM users WHERE users_id =?", [id]);
    // console.log(data);
    if (data[0].affectedRows > 0) {
      return res.json({
        message: `Xóa thành công id: ${id}`,
      });
    } else {
      return res.json({
        message: `Không có id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
