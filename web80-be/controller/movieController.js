import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import MovieModel from "../model/movie.Schema.js";

dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);


const movieController = {
    getMovies: async (req, res) => {
        const movie = await MovieModel.find();
        res.status(200).send(movie);
    },

    postMovie: async (req, res) => {
        const newMovie = req.body;
        const result = await MovieModel.create(newMovie);
        res.status(200).send(result);
    },

    updateMovie: async (req, res) => {
        let newMovie = req.body;
        let movie = req.params.id;
        let result = await MovieModel.findByIdAndUpdate(
            movie,
            newMovie
        )
        res.status(200).send(result)
    },

    deleteMovie: async (req, res) => {
        const rs = await MovieModel.findByIdAndDelete(req.params.id);
        res.status(200).send(rs);

    },

    uploadImage: async (req, res) => {
        let image = req.file;
        let { id } = req.params;
        let movie = await MovieModel.findById(id);
        if (movie) {
            if (image) {
                const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
                const uploaded = await cloudinary.uploader.upload(dataUrl,
                    { resource_type: 'auto' },
                    async (err, result) => {
                        if (result && result.url) {
                            movie.image = result.url;
                            await movie.save()
                            return res.status(200).json({
                                message: 'Movie information updated successfully',
                                movie: result.url
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Error when upload file: ' + err.message
                            });
                        }
                    }
                )
            } else {
                return res.status(404).json({
                    message: 'Image not found'
                });
            }
        } else {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }
    },

    findByName: async (req, res) => {
        try {
            const { name } = req.query;  
            const result = await MovieModel.findOne({ name: name });        if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send({
                    message: "Không tìm thấy phim"
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Lỗi khi tìm phim"
            });
        }
    },
    
    sortMovies: async (req, res) => {
        try {
            const { order } = req.query; 
            const int = parseInt(order)
            const movies = await MovieModel.find().sort({ year: int });
            res.status(200).send(movies);
        } catch (error) {
            res.status(500).send({
                message: "Lỗi khi tìm và sắp xếp phim"
            });
        }
    }    
}

export default movieController;