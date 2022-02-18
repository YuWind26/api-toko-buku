const {Category} = require('../../db/models');

module.exports = {
    
    // Read Categories
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Category.findAll({
                where: {user: req.user.id},
                attributes: ['id', 'name'],
            });
            res.status(200).json({message: 'Sukses', data: categories});
        } catch (err) {
            next(err);
        }
    },

    // Create Categories
    createCategories: async (req, res, next) => {
        try {
            const {name} = req.body;
            const categories = await Category.create({
                name : name,
                user: req.user.id,
            });
            res.status(201).json({message: 'Sukses membuat Kategori', data: categories});
        } catch (err) {
            next(err);
        }
    },
    

    // Update Categories
    updateCategories: async (req, res, next) => {
        try {
            const {name} = req.body;
            const {id} = req.params;
            const checkCategory = await Category.findOne({
                where: {id: id, user: req.user.id},
            });


            const categories = await checkCategory.update({
                name : name,
            });
            res.status(201).json({message: 'Sukses mengubah Kategori', data: categories});
        } catch (err) {
            next(err);
        }
    },

    // Delete Categories
    deleteCategories : (req, res, next) => {
        Category.findOne({
            where: {id: req.params.id, user: req.user.id},
        })
        .then((categories) => {
            if(categories) {
                categories.destroy();

                res.status(200).json({
                    message: 'Sukses menghapus Kategori',
                    data: categories
                });
            }
        })
        .catch(err => {
            next(err);
        }); 
    },
};