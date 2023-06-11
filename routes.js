const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json({ err });
    } else {
      conn.query("SELECT * FROM books", (err, rows) => {
        if (err) {
          res.json({ err });
        } else {
          res.status(200).json({
            status: "ok",
            rows,
          });
        }
      });
    }
  });
});

routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json({ err });
    } else {
      conn.query("INSERT INTO books set ?", [req.body], (err, rows) => {
        if (err) {
          res.json({ err });
        } else {
          res.status(201).json({
            status: "ok",
            message: rows,
          });
        }
      });
    }
  });
});

routes.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json({ err });
    } else {
      conn.query(
        "DELETE FROM books WHERE id = ?",
        [req.params.id],
        (err, rows) => {
          if (err) {
            res.json({ err });
          } else {
            res.status(201).json({
              status: "ok",
              message: rows,
            });
          }
        }
      );
    }
  });
});

routes.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json({ err });
    } else {
      conn.query(
        "UPDATE books set ? WHERE id = ?",
        [req.body, req.params.id],
        (err, rows) => {
          if (err) {
            res.json({ err });
          } else {
            res.status(201).json({
              status: "ok",
              message: rows,
            });
          }
        }
      );
    }
  });
});

module.exports = routes;
