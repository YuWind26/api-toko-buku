const {Book, Category} = require('../../db/models');
const {Op} = require('sequelize')

module.exports = {
    
    // Read Books
    getAllBooks: async (req, res, next) => {
        try {

            const { keyword = '',category=''} = req.query;

            let condition = {
                user: req.user.id,
            };

            if (keyword !== '') {
                condition = { ...condition, title: {[Op.like]: `%${keyword}%`} };
            }

            if (category !== '') {
                condition = { ...condition, category: category };
            }

            const books = await Book.findAll({
                where: condition,
                include:{
                    model: Category,
                    attributes: ['id', 'name'],
                },

            });
            res.status(200).json({
                message: 'Sukses Menampilkan Semua Buku', 
                data: books
            });
        } catch (err) {
            next(err);
        }
    },

    // Create Books
    createBooks: async (req, res, next) => {
        try {
            let user = req.user.id;
            const {title, category, author, image, published, price, stock} = req.body; 
            
            const checkCategory = await Category.findOne({
                where: {
                    id: category,
                    user: user,
                }
            });

            if (!checkCategory) {
                throw {
                    status: 400,
                    message: 'Kategori tidak ditemukan',
                };
            }

            const books = await Book.create({
                title,
                user:user,
                category,
                author,
                image,
                published,
                price,
                stock,
            });

            res.status(201).json({
                message: 'Sukses Menambahkan Buku',
                data: books,
            });
        
        } catch (error) {
            next(error);
        }
    },

    updateBooks: async (req, res, next) => {
        try {
            let user = req.user.id;
            const {id} = req.params;
            const {title, category, author, image, published, price, stock} = req.body; 
            
            const checkCategory = await Category.findOne({
                where: {
                    id: category,
                    user: user,
                }
            });

            if (!checkCategory) {
                return res.status(404).json({
                    message: 'ID Kategori tidak ditemukan',
                });
            }

            const checkBook = await Book.findOne({
                where: {
                    id: id
                }
            });

            if (!checkBook) {
                return res.status(404).json({
                    message: 'ID Book tidak ditemukan',
                });
            }

            const books = await checkBook.update({
                title,
                user:user,
                category,
                author,
                image,
                published,
                price,
                stock,
            });

            res.status(200).json({
                message: 'Sukses Update Buku',
                data: books,
            });
        
        } catch (error) {
            next(error);
        }
    },

    // Delete Books
    deleteBooks : async (req, res, next) => {   
        try {
            const books = await Book.findOne({where: {id: req.params.id}});

            if (!books){
                return res.status(404).json({
                    message: 'ID Book tidak ditemukan',
                });
            }

            books.destroy();

            res.status(200).json({
                message: 'Sukses Menghapus Buku',
                data: books
            });
        } catch (error) {
            next(error);
        }
    }
};