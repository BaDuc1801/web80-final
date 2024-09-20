import express from 'express'
import multer from 'multer';
import movieController from '../controller/movieController.js';

const movieRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})
movieRouter.get('/', movieController.getMovies);
movieRouter.post('/', movieController.postMovie);
movieRouter.put('/update-movie-img/:id', upload.single('image'), movieController.uploadImage);
movieRouter.put('/update-movie/:id', movieController.updateMovie);
movieRouter.delete('/delete-movie/:id', movieController.deleteMovie);
movieRouter.get('/find-movie', movieController.findByName);
movieRouter.get('/sort', movieController.sortMovies)

export default movieRouter