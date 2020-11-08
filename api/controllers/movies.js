const movieModel = require('../models/movies');

module.exports = {
  getById: function (req, res, next) {
    movieModel.findById(req.params.movieId, function (err, movieInfo) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        res.json({
          status:"Success", 
          message: "Movie found",
          data:{
            movies: movieInfo
          }
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let moviesList = [];
    movieModel.find({}, function (err, movies) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        movies.forEach(movie => {
          moviesList.push({
            id: movie._id,
            name: movie.name,
            released_on: movie.released_on
          });
        });
        res.json({
          status:"Success",
          message: "Movies list found",
          data: {
            movies: moviesList
          }
        });
      }
    });
  },
  updateById: function (req, res, next) {
    movieModel.findByIdAndUpdate(
      req.params.movieId,
      { name:req.body.name },
      function (err, movieInfo) {
        if (err) {
          console.log(err)
          next(err);
        } else {
          res.json({
            status:"Success",
            message: "Movie updated successfully",
            data: movieInfo
          });
        }
      });
  },
  deleteById: function (req, res, next) {
    movieModel.findByIdAndRemove(req.params.movieId, function (err, movieInfo) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        res.json({
          status:"Success",
          message: "Movie deleted successfully",
        });
      }
    });
  },
  create: function (req, res, next) {
    movieModel.create({
      name: req.body.name,
      released_on: req.body.released_on
    }, function (err, result) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        res.json({
          status: "Success",
          message: "Movie created successfully",
          data: result
        });
      }
    });
  },
}
