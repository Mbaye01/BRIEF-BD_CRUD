// const pool = require("./db");

// async function get() {
//   const connection = await pool.getConnection();
//   try {
//     const [rows, _fields] = await connection.execute("SELECT * FROM products");
//     return rows;
//   } catch (error) {
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// async function add(
//   id,
//   name,
//   price,
//   stock,
//   description,
//   category,
//   barcode,
//   status
// ) {
//   const connection = await pool.getConnection();
//   try {
//     const [result] = await connection.execute(
//       "INSERT INTO products (id, name, price, stock, description, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [id, name, price, stock, description, category, barcode, status]
//     );
//     return result.insertId;
//   } catch (error) {
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// async function update(
//   id,
//   name,
//   price,
//   stock,
//   description,
//   category,
//   barcode,
//   status
// ) {
//   const connection = await pool.getConnection();
//   try {
//     const [result] = await connection.execute(
//       "UPDATE products SET name = ?, price = ?, stock = ?, description = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
//       [name, price, stock, description, category, barcode, status, id]
//     );
//     return result.affectedRows;
//   } catch (error) {
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// async function destroy(id) {
//   const connection = await pool.getConnection();
//   try {
//     const [result] = await connection.execute(
//       "DELETE FROM products WHERE id = ?",
//       [id]
//     );
//     return result.affectedRows;
//   } catch (error) {
//     if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
//       throw new Error(
//         `Cannot delete product with ID ${id} as it is referenced elsewhere.`
//       );
//     }
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// module.exports = { get, add, update, destroy };

const cnx = require("./db");

const productsModule = {
  async getAll() {
    try {
      const [rows] = await cnx.query("SELECT * FROM products");
      return rows;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Unable to retrieve products. Please try again later.");
    }
  },

  async getById(id) {
    try {
      const [rows] = await cnx.query("SELECT * FROM products WHERE id = ?", [
        id,
      ]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error(`Product with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error retrieving product with ID ${id}:`, error);
      throw new Error(`Unable to retrieve product with ID ${id}.`);
    }
  },

  async create(product) {
    try {
      const { name, description, stock, price, category, barcode, status } =
        product;

      // Validate input
      if (
        !name ||
        !description ||
        !stock ||
        !price ||
        !category ||
        !barcode ||
        !status
      ) {
        throw new Error(
          "All fields (name, description, stock, price, category, barcode, status) are required."
        );
      }

      const [result] = await cnx.query(
        "INSERT INTO products (name, description, stock, price, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, description, stock, price, category, barcode, status]
      );
      return result.insertId; // Returns the newly created product ID
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error(
        "Unable to create product. Please check your input and try again."
      );
    }
  },

  async update(id, product) {
    try {
      const { name, description, stock, price, category, barcode, status } =
        product;

      // Validate input
      if (
        !name ||
        !description ||
        !stock ||
        !price ||
        !category ||
        !barcode ||
        !status
      ) {
        throw new Error(
          "All fields (name, description, stock, price, category, barcode, status) are required."
        );
      }

      const [result] = await cnx.query(
        "UPDATE products SET name = ?, description = ?, stock = ?, price = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
        [name, description, stock, price, category, barcode, status, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of affected rows
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new Error(
        `Unable to update product with ID ${id}. Please check the input.`
      );
    }
  },

  async delete(id) {
    try {
      const [result] = await cnx.query("DELETE FROM products WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of deleted rows
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw new Error(`Unable to delete product with ID ${id}.`);
    }
  },
};

module.exports = productsModule;

const cnx = require("./db");

const productsModule = {
  async getAll() {
    try {
      const [rows] = await cnx.query("SELECT * FROM products");
      return rows;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Unable to retrieve products. Please try again later.");
    }
  },

  async getById(id) {
    try {
      const [rows] = await cnx.query("SELECT * FROM products WHERE id = ?", [
        id,
      ]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error(`Product with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error retrieving product with ID ${id}:`, error);
      throw new Error(`Unable to retrieve product with ID ${id}.`);
    }
  },

  async create(product) {
    try {
      const { name, description, stock, price, category, barcode, status } =
        product;

      // Validate input
      if (
        !name ||
        !description ||
        !stock ||
        !price ||
        !category ||
        !barcode ||
        !status
      ) {
        throw new Error(
          "All fields (name, description, stock, price, category, barcode, status) are required."
        );
      }

      const [result] = await cnx.query(
        "INSERT INTO products (name, description, stock, price, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, description, stock, price, category, barcode, status]
      );
      return result.insertId; // Returns the newly created product ID
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error(
        "Unable to create product. Please check your input and try again."
      );
    }
  },

  async update(id, product) {
    try {
      const { name, description, stock, price, category, barcode, status } =
        product;

      // Validate input
      if (
        !name ||
        !description ||
        !stock ||
        !price ||
        !category ||
        !barcode ||
        !status
      ) {
        throw new Error(
          "All fields (name, description, stock, price, category, barcode, status) are required."
        );
      }

      const [result] = await cnx.query(
        "UPDATE products SET name = ?, description = ?, stock = ?, price = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
        [name, description, stock, price, category, barcode, status, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of affected rows
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new Error(
        `Unable to update product with ID ${id}. Please check the input.`
      );
    }
  },

  async delete(id) {
    try {
      const [result] = await cnx.query("DELETE FROM products WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of deleted rows
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw new Error(`Unable to delete product with ID ${id}.`);
    }
  },
};

module.exports = productsModule;
